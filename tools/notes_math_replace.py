#!/usr/bin/env python3
import os
import re
import sys
from typing import List, Tuple

RE_FENCE = re.compile(r"^\s*(```+|~~~+)")


def parse_front_matter(text: str) -> Tuple[dict, int]:
    if not text.startswith('---'):
        return {}, 0
    lines = text.splitlines(keepends=True)
    if len(lines) < 2:
        return {}, 0
    if not lines[0].strip() == '---':
        return {}, 0
    end_idx = None
    for i in range(1, len(lines)):
        if lines[i].strip() == '---':
            end_idx = i
            break
    if end_idx is None:
        return {}, 0
    fm_text = ''.join(lines[1:end_idx])
    fm = {}
    try:
        import yaml  # type: ignore
        fm = yaml.safe_load(fm_text) or {}
    except Exception:
        fm = {}
        current_key = None
        for raw in fm_text.splitlines():
            line = raw.rstrip()
            if not line or line.lstrip().startswith('#'):
                continue
            if re.match(r'^[A-Za-z0-9_\-]+\s*:', line):
                key, rest = line.split(':', 1)
                current_key = key.strip()
                rest = rest.strip()
                if rest.startswith('[') and rest.endswith(']'):
                    items = [x.strip().strip('"\'') for x in rest[1:-1].split(',') if x.strip()]
                    fm[current_key] = items
                elif rest:
                    fm[current_key] = rest
                else:
                    if current_key not in fm:
                        fm[current_key] = []
                continue
            if current_key and line.lstrip().startswith('- '):
                item = line.lstrip()[2:].strip().strip('"\'')
                if current_key not in fm or not isinstance(fm[current_key], list):
                    fm[current_key] = []
                fm[current_key].append(item)
    return fm, end_idx + 1


def is_notes_post(front_matter: dict) -> bool:
    tags = front_matter.get('tags', []) or []
    cats = front_matter.get('categories', []) or []
    if isinstance(tags, str):
        tags = [tags]
    if isinstance(cats, str):
        cats = [cats]
    tags = [str(t) for t in tags]
    cats = [str(c) for c in cats]
    return any(t.lower() == 'notes' for t in tags) or any(c.lower() == 'notes' for c in cats)


def replace_math(lines: List[str]) -> Tuple[List[str], int, int]:
    in_fence = False
    fence_marker = None
    inline_ticks = 0
    replaced_open = 0
    replaced_close = 0
    out_lines = []

    for line in lines:
        fence_match = RE_FENCE.match(line)
        if fence_match and inline_ticks == 0:
            marker = fence_match.group(1)
            if not in_fence:
                in_fence = True
                fence_marker = marker
            else:
                if fence_marker and marker.startswith(fence_marker[0]):
                    in_fence = False
                    fence_marker = None
            out_lines.append(line)
            continue

        if in_fence:
            out_lines.append(line)
            continue

        i = 0
        buf = []
        while i < len(line):
            ch = line[i]
            if ch == '`':
                j = i
                while j < len(line) and line[j] == '`':
                    j += 1
                tick_count = j - i
                if inline_ticks == 0:
                    inline_ticks = tick_count
                elif tick_count == inline_ticks:
                    inline_ticks = 0
                buf.append(line[i:j])
                i = j
                continue

            if inline_ticks == 0 and line.startswith('\\[', i):
                buf.append('$$')
                replaced_open += 1
                i += 2
                continue
            if inline_ticks == 0 and line.startswith('\\]', i):
                buf.append('$$')
                replaced_close += 1
                i += 2
                continue

            buf.append(ch)
            i += 1

        out_lines.append(''.join(buf))

    return out_lines, replaced_open, replaced_close


def main() -> int:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    posts_dir = os.path.join(root, 'source', '_posts')
    if not os.path.isdir(posts_dir):
        print('source/_posts not found')
        return 1

    changed_files = []
    for dirpath, _, filenames in os.walk(posts_dir):
        for name in filenames:
            if not name.endswith('.md'):
                continue
            path = os.path.join(dirpath, name)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            fm, body_start = parse_front_matter(content)
            if not is_notes_post(fm):
                continue

            lines = content.splitlines(keepends=True)
            head = lines[:body_start]
            body = lines[body_start:]

            new_body, open_cnt, close_cnt = replace_math(body)
            if open_cnt == 0 and close_cnt == 0:
                continue

            new_content = ''.join(head + new_body)
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                changed_files.append((path, open_cnt, close_cnt))

    if not changed_files:
        print('No changes made.')
        return 0

    print('Updated files:')
    for path, open_cnt, close_cnt in changed_files:
        rel = os.path.relpath(path, root)
        print(f'- {rel}: \\[ -> $$ x{open_cnt}, \\] -> $$ x{close_cnt}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
