---
title: "How Dense Are Chinese, Japanese, and English—Really?"
date: 2026-07-15
updated: 2026-07-16
layout: entry
slug: chinese-japanese-english-information-density
lang: en
lang_path: ''
translation_key: chinese-japanese-english-information-density
description: "A closer look at speech rate, writing systems, Unicode, reading costs, and model tokens—and why Chinese, Japanese, and English cannot be placed on a single density leaderboard."
subtitle: "When characters, syllables, time, typography, and comprehension give different answers"
categories: [essay]
tags: [Linguistics, Information Theory, Writing Systems, Cognitive Science, Computational Linguistics]
byline: L2-T2
---

<style>
.entry-reading-layout-essay,
.entry-body-essay,
.prose-essay {
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.entry-body-essay {
  overflow-x: hidden;
}

.prose-essay a {
  overflow-wrap: anywhere;
  word-break: break-word;
}

.prose-essay table {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.prose-essay figure.highlight,
.prose-essay pre {
  max-width: 100%;
  overflow-x: auto;
}

.prose-essay .math.display {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>

`人工智能` takes four Chinese characters. Its English counterpart, `artificial intelligence`, takes twenty-three visible characters; the Japanese `人工知能` also fits into four kanji positions. At a glance, Chinese and Japanese seem to have already won the information-density contest.

But store those expressions as UTF-8, say them aloud, place them in a natural conversation, or run them through different tokenizers, and the ranking changes. This tiny example exposes the mistake at the centre of the debate: **we think we are comparing languages when we are often comparing only one choice of unit.**

<!-- more -->

The question I actually want to answer is not “Which language is superior?” It is more concrete: when Chinese, Japanese, and English express roughly the same content, where does compactness appear, and where do the displaced costs go? The answer is not a vague “they are all the same.” It is a patterned set of trade-offs.

## One question is really five

Asking how “dense” a sentence is first requires asking <span id="unit">“per what?”</span> It may mean at least five different things:

| What is compared | Typical denominator | What it tells us | What it does not tell us |
|---|---|---|---|
| Written sequence | Characters, grapheme clusters, words, morphemes | How many surface units a text needs | How much page space it takes or how easy it is to read |
| Digital representation | UTF-8 bytes, compressed bytes | Storage and transmission cost | How much a human sees or understands |
| Speech sequence | Syllables, morae, phonemes | Statistical information per sound unit | Information conveyed per unit of time |
| Temporal process | bit/s, propositions/min | How quickly information arrives | Whether the listener understands accurately or tires |
| Communicative outcome | Recovered meaning per unit of time or cost | Whether a task is completed efficiently | Whether a language has an abstract “intelligence level” |

If an event $x$ has probability $p(x)$, its Shannon surprisal is:

\[
I(x)=-\log_2 p(x)
\]

Surprisal measures how much statistical uncertainty disappears when $x$ occurs; entropy describes the average uncertainty of a probability distribution or random source. Neither measures how profound a concept is. A string drawn from a high-entropy source may have high cumulative surprisal and no recoverable message, while a highly predictable formulaic legal phrase may carry a precise and consequential function.[[1]](#ref-1)

For natural language, conditional entropy given context, $H(X_t\mid X_{<t})$, is usually more useful. If time matters, information per unit must be multiplied by the rate at which those units are produced:

\[
R=H_{\text{unit}}\times v_{\text{unit}}
\]

That simple equation runs through this essay. A language can place less information in each unit while producing those units faster. Looking at only one of the two factors on the right-hand side invites a distorted conclusion.

> [!NOTE|Always ask “per what?”|#unit]
>
> Any claim about the “highest density” needs a denominator: per character, syllable, second, byte, token, or unit of cognitive effort? Without one, density is an intuition rather than a measurement.

### Language, writing, and encoding occupy different layers {.no-toc}

The same message moves through <span id="writing">distinct layers of language, writing, and encoding</span>:

\[
\text{intended meaning }M
\rightarrow \text{linguistic form }L
\rightarrow \text{orthographic units }O
\rightarrow \text{Unicode sequence }U
\rightarrow \text{bytes }B
\rightarrow \text{layout }A
\]

Lexicon, grammar, context, and omission shape the move from $M$ to $L$. The choice among characters, kana, and Roman letters shapes the move from $L$ to $O$. Unicode and an encoding format take over from $O$ to $U$ and $B$. Finally, fonts, size, spacing, and line breaking turn the sequence into a page. Length at a later layer cannot stand in automatically for efficiency at an earlier one.

Chinese primarily uses a morphosyllabic writing system. A character often relates both to a morpheme and a syllable, but it is not universally a complete word: `人` can stand as a word, `自由` is a word made of two characters, and the two characters in `葡萄` cannot each be assigned an independent modern lexical meaning within that word.[[17]](#ref-17)[[21]](#ref-21)

Standard Japanese mixes kanji, hiragana, katakana, Roman letters, and numerals. Kana are organised primarily around the **mora**, which is not identical to the syllable used in cross-linguistic comparison. `か/ka` looks like one kana for two Roman letters, but `あ/a` and `ん/n` are one-to-one, while `きゃ/kya` uses two kana for three letters.[[18]](#ref-18)[[19]](#ref-19)

English uses alphabetic writing and visible spaces. It has relatively little inflection, but articles, pronouns, function words, and fairly fixed order carry many grammatical relations. Compact English noun strings result from noun compounding and premodification, not from “free word order.” Chinese, Japanese, and English can all build new concepts through compounding, derivation, borrowing, calquing, and abbreviation.[[17]](#ref-17)[[18]](#ref-18)[[20]](#ref-20)

> [!NOTE|Writing is not language|#writing]
>
> Calling hanzi, kana, and Roman letters three “alphabets” hides the fact that they map onto different linguistic units. Coarser written units can shorten a symbol sequence, but they do not shorten speech, bytes, or learning effort for free.

## The first pattern in speech: density and speed compensate

Written symbols are easy to count, but speech reveals language as a process unfolding in time. The two most important studies here did not find a simple rule that all languages run at exactly the same rate. They did reveal the same broad tendency: **languages with less information per unit tend to produce units faster.**

### 2011: How many syllables does the same content need? {.no-toc}

Pellegrino, Coupé, and Marsico used twenty English passages and translations into six other languages. They collected 585 controlled readings from 59 speakers across seven target languages, with Vietnamese as an external reference.[[2]](#ref-2) Their “information density” was not a full estimate of Shannon entropy. It was a relative measure based on how many syllables parallel passages needed to express roughly the same content.

| Language | Normalized information density ID | Syllable rate SR (syllables/s) | Normalized information rate IR |
|---|---:|---:|---:|
| English | 0.91 ± 0.04 | 6.19 ± 0.16 | 1.08 ± 0.08 |
| Japanese | 0.49 ± 0.02 | 7.84 ± 0.09 | 0.74 ± 0.06 |
| Mandarin | 0.94 ± 0.04 | 5.18 ± 0.15 | 0.94 ± 0.08 |
| Vietnamese reference | 1.00 | 5.22 | 1.00 |

Japanese carried the least relative content per syllable in these materials but was spoken fastest. Mandarin had high syllabic density and a slower rate. English combined relatively high density with medium speed. Speed compensated for density, but not completely, so the study should not be summarised as proof that all languages have exactly the same information rate.

### 2019: Do seventeen languages converge on a similar rate? {.no-toc}

Coupé and colleagues later expanded the design to seventeen languages from nine families and 170 native speakers.[[3]](#ref-3) They estimated conditional syllable entropy from corpora, then combined it with reading rate as $IR=ID\times SR$. The reported cross-language mean was approximately <span id="rate"><strong>39.15 bit/s</strong></span>, with a standard deviation of about **5.10 bit/s**.

The three rows below are descriptive means obtained by weighting each recording equally in the public `InfoRateData.csv`. They are not a refit of the paper’s mixed-effects model:

| Language | Conditional density ID (bit/syllable) | Mean syllable rate SR | Mean information rate IR (bit/s) |
|---|---:|---:|---:|
| Mandarin | 6.96 | 5.858 | 40.770 |
| English | 7.09 | 6.338 | 44.938 |
| Japanese | 5.03 | 8.035 | 40.415 |

The three languages look quite different in bit per syllable and much closer in bit per second. That supports the idea that human languages develop similar encoding efficiencies within a shared communicative niche; it does not establish a precise physiological constant. Speakers, passages, languages, and the estimation model all still contribute variation.[[3]](#ref-3)[[29]](#ref-29)

Nor are the two studies simple replications of the same experiment. The 2011 measure is close to “how many syllables are needed for matched semantic content.” The 2019 measure comes from local conditional entropy in syllable sequences. Both use controlled readings of translated material. Neither captures hesitation, overlap, repair, politeness negotiation, or shared visual context in spontaneous conversation.

> [!NOTE|How to read 39 bit/s|#rate]
>
> The value depends on how syllables are segmented and how much context the probability model can see. A different language model changes the absolute number of bits. The durable finding is compensation and convergence—not that every person produces exactly 39 bit/s in every situation.

Work on uniform information density adds that speakers use lexical choice, reduction, and duration to avoid local information spikes; a broad cross-linguistic study likewise found that less predictable phonemes tend to last longer.[[4]](#ref-4)[[5]](#ref-5)[[6]](#ref-6) These findings look more like flexible processing constraints than a fixed bandwidth to which every language is locked.

## The illusion in writing: fewer characters do not lower every cost

Chinese characters genuinely make many parallel passages visually shorter. There is no reason to deny that phenomenon merely to resist claims of linguistic superiority. The important question is how much shorter—and the answer changes across code points, UTF-8 bytes, terminal columns, and actual font width.

### Change the script, not the language {.no-toc}

The most direct way to separate language from writing system is a <span id="translit">controlled transliteration</span>. The examples below keep the language and meaning approximately constant while rendering Mandarin in pinyin and Japanese in all-kana or rōmaji. Inputs were normalised to NFC; terminal columns follow a common `wcwidth` convention; font width uses the same Noto Sans CJK Regular face.

> **Mandarin in characters**: 人人生而自由，在尊严和权利上一律平等。<br>
> **Mandarin in pinyin**: Rénrén shēng ér zìyóu, zài zūnyán hé quánlì shàng yīlǜ píngděng.

> **Japanese mixed script**: すべての人間は、生まれながらにして自由であり、かつ、尊厳と権利とについて平等である。<br>
> **Japanese all-kana**: すべてのにんげんは、うまれながらにしてじゆうであり、かつ、そんげんとけんりとについてびょうどうである。<br>
> **Japanese rōmaji**: Subete no ningen wa, umarenagara ni shite jiyū de ari, katsu, songen to kenri to ni tsuite byōdō de aru.

| Language and rendering | Code points | Extended grapheme clusters | UTF-8 bytes | Terminal columns | Font advance (em) |
|---|---:|---:|---:|---:|---:|
| Mandarin: characters | 19 | 19 | 57 | 38 | 19.00 |
| Mandarin: pinyin | 64 | 64 | 81 | 64 | 30.01 |
| Japanese: mixed script | 42 | 42 | 126 | 84 | 41.73 |
| Japanese: all-kana | 51 | 51 | 153 | 102 | 50.73 |
| Japanese: rōmaji | 104 | 104 | 107 | 104 | 47.32 |

The character version of Mandarin uses about 30% as many code points as pinyin, yet about 63% of its font advance. Japanese rōmaji uses 2.48 times as many code points as mixed script but fewer UTF-8 bytes, and only about 13% more physical width. Changing only the writing system can alter both the size of the difference and, for some measures, the ranking itself.

> [!NOTE|Transliteration is not translation|#translit]
>
> This control is not cognitively lossless. Pinyin does not uniquely recover every homophonous character, while all-kana and rōmaji remove semantic and segmentation cues supplied by kanji. Transliteration isolates surface encoding costs; it does not hold decoding effort constant.

### One UN passage, four rulers, four different answers {.no-toc}

Now consider Article 1 of the *Universal Declaration of Human Rights* in official English and Chinese and the Japanese translation hosted by OHCHR.[[27]](#ref-27)[[28]](#ref-28) This is a reproducible example, not a representative sample of entire languages. Inputs are NFC-normalised; raw length is counted in Unicode <span id="unicode">code points</span>; bytes use UTF-8; Chinese and Japanese are not “tokenized” by spaces.

| Language | Code points | UTF-8 bytes | Terminal columns | Noto Sans CJK advance (em) |
|---|---:|---:|---:|---:|
| English | 170 | 170 | 170 | 79.87 |
| Chinese | 43 | 125 | 84 | 41.56 |
| Japanese | 85 | 255 | 170 | 84.58 |

By code points, Chinese is one quarter the length of English and Japanese one half. By font advance, Chinese is about 52% as wide as English, while Japanese is slightly wider. In UTF-8 bytes, Chinese is only about one quarter shorter than English, and Japanese is substantially longer. Chinese remains the most compact on the page in this example, but its lead is far less dramatic than the character count suggests.

There is no contradiction. Common ASCII letters usually take one byte in UTF-8, while many common hanzi and kana take three. East Asian characters are also commonly estimated as two columns in terminal environments. In proportional typography, actual advance is determined by the font.[[21]](#ref-21)[[22]](#ref-22)[[23]](#ref-23)

> [!NOTE|“Character” is not one thing|#unicode]
>
> What a user perceives as one character may contain several code points: precomposed `é` and `e` plus a combining accent look alike but differ underneath. Use extended grapheme clusters for interface limits, bytes for storage, and direct font-and-line measurements for layout.

Character count is not word count either. English `machine learning` can be split into two orthographic words at the space; Chinese `机器学习` and Japanese `機械学習` are normally written continuously. A naïve `text.split()` can count an entire Chinese or Japanese sentence as “one word.” The result is exact but not cross-linguistically meaningful.

## Reading speed: compactness carries cognitive costs

Surface compression shifts some work to the reader. Omitting a subject, preposition, or relation marker shortens a sentence, but the reader must restore it from context. Repetition, particles, or confirmation exchanges make the interaction longer, but may lower misunderstanding and repair costs. Visible length and comprehension efficiency therefore need not move together.

### Eye-movement windows adapt to writing systems {.no-toc}

Classic experiments estimated the effective perceptual span in English at roughly three to four characters to the left of fixation and fourteen to fifteen to the right. A Chinese study estimated roughly one character to the left and three to the right.[[10]](#ref-10)[[11]](#ref-11) Those numbers do not mean that English readers process more information at once or that one hanzi is worth exactly four letters. Character size, visual complexity, word-boundary cues, and masking methods all differ.

Japanese provides a finer contrast. Sainio and colleagues found that spaces clearly helped word recognition and eye guidance in all-hiragana text, but helped conventional kanji–kana text less.[[12]](#ref-12) The visual alternation between scripts can itself cue segmentation. Even with similar pronunciation and meaning, `情報密度` and `じょうほうみつど` are not cognitively identical strings.

### Memory span measures task fit, not general intelligence {.no-toc}

Short-term serial recall is affected by the time needed to pronounce and subvocally rehearse the items—the classic word-length effect.[[13]](#ref-13)[[14]](#ref-14) Mandarin number names are comparatively short, and Mandarin speakers show an advantage in some digit-span tasks. But this <span id="cognition">task effect</span> changes with materials, rehearsal rate, familiarity, and strategy. Replace digits with spatial patterns, hard-to-name figures, or items matched on duration, and the original ranking need not survive.

Reading across scripts relies on shared language and visual networks while adapting to the orthography at hand. Character-to-morpheme and syllable mappings in Chinese, letter-to-phoneme patterns in English, and the dual routes for kanji and kana in Japanese invite different training strategies.[[15]](#ref-15)[[16]](#ref-16) These differences demonstrate neural adaptation, not that a writing system inherently raises abstract intelligence.

> [!NOTE|A task effect is not intelligence|#cognition]
>
> Perceptual span, digit span, and activation in a particular brain region first belong to a specific task and stimulus set. Processing mechanisms can be compared only after controlling proficiency, pronunciation time, visual complexity, and education; none of these measures ranks languages or their speakers by intelligence.

## Why conversation can be “less dense” and highly efficient

Writing removes a message from the immediate scene, so it tends to supply nouns, links, and background. Conversation comes with shared surroundings, gesture, prosody, and immediate feedback, making omission safer. Chinese “已经发了,” Japanese `もう送った`, and colloquial English `Sent it already` can all accomplish the same communicative task in context, even though none is a textbook-complete sentence.[[7]](#ref-7)

Conversational items such as “mm-hm,” “right,” “do you mean…?”, repetition, and self-repair may add no new proposition, yet they coordinate turn-taking, confirmation, and error correction. Human communication is not noiseless file compression. Redundancy can work like an error-correcting code, sacrificing local brevity to increase the chance of completing the task.[[8]](#ref-8)[[9]](#ref-9)[[29]](#ref-29)

“The same content” itself has at least three levels:

1. the same propositional core—who did what to whom;
2. the same grammatical information—tense, aspect, number, definiteness, case, and so on;
3. the same communicative effect—including politeness, stance, information structure, and social relations.

English `Could you send it?`, Chinese “能发一下吗？”, and Japanese `送っていただけますか` all accomplish the same communicative task: asking someone to send something. Japanese encodes the politeness relation more overtly in this comparison. If the analyst retains only the proposition “request that something be sent,” the additional form looks redundant. If the social relation is part of the message, it is information. Translation length depends not only on structure but on what we decide must be preserved.

## Bytes and Tokens Belong to the System, Not the Language

UTF-8 is an engineering standard, not a theory of natural language. It preserves compatibility with ASCII, so common English letters use one byte and many hanzi and kana use three.[[22]](#ref-22) Switch to UTF-16, compressed bytes, or another representation and the ratio changes again. The resulting costs are real, but they belong to system design.

Language-model <span id="token">tokens</span> depend even more directly on training data and vocabulary construction. Whether a frequent string is merged into one subword, how vocabulary capacity is divided among languages, and whether the model falls back to bytes or characters all change the token count for the same sentence.

Petrov and colleagues found large token-length disparities for parallel content across existing tokenizers. Ahia and colleagues showed across twenty-two languages that these differences propagate into API price, effective context length, service availability, and practical utility.[[24]](#ref-24)[[25]](#ref-25) Rust and colleagues found that replacing a multilingual model’s tokenizer with one trained for a single language benefited almost every tested language and task.[[26]](#ref-26)

If a language uses fewer tokens in one model, the most direct conclusion is that **the tokenizer fits that language better**, not that the language contains “higher-grade information.” A fair audit should keep unlike quantities separate, reporting token count alongside characters or grapheme clusters, bytes, propositions that fit in the context, and final task performance.

> [!NOTE|Tokens are the model’s ledger|#token]
>
> A token is neither a word nor a stable linguistic unit. Change the tokenizer and the length, price, and often model performance change too. The engineering response is to correct uneven vocabulary allocation, not to turn billing differences into a hierarchy of languages.

## Why “intelligence density” cannot be a leaderboard

“Intelligence density” is not a standard construct in linguistics, psychometrics, or information theory. It blends at least four distinct properties: short surface form, statistical unpredictability, many propositions per unit, and rapid accurate comprehension. The four may align, but they can just as easily pull apart.

A short sentence may depend on extensive background knowledge. A high-entropy source may simply be generating noise. Packing propositions too tightly can increase regressions and misunderstanding. Adding politeness or confirmation can make collaboration more successful. More fundamentally, a language is an evolving system of shared encoding and interaction—not a proxy for the intelligence of its speakers.

If we want to retain the intuition, we can reformulate it as <span id="efficiency"><strong>task-conditioned communicative efficiency</strong></span>:

\[
\eta_T=\frac{I(M;\hat M)}{T+\alpha E+\beta C+\gamma L}
\]

In this expression, $I(M;\hat M)$ is mutual information defined over the joint distribution of intended messages and recovered outcomes; it is not the surprisal of a single event.

Here $M$ is the sender’s intended information, $\hat M$ is what the receiver recovers, $T$ is time, $E$ the cost of error, $C$ cognitive cost, and $L$ dependence on additional background knowledge. The weights come from the task. This is not a validated psychometric scale; it is a framework for keeping unlike quantities from being conflated.

> [!NOTE|Replace “intelligence” with measurable efficiency|#efficiency]
>
> The useful question is how much intended meaning a receiver recovers, with how much time and effort, for a given audience, context, noise level, and error tolerance. Any advantage belongs to a particular text, formulation, and situation—not to a whole language.

## If I Were Designing the Comparison

At minimum, a serious comparison must control content, genre, and representation together:

| Stage | Minimum requirement | Measures to report together |
|---|---|---|
| Corpus | Include originals and translations in both directions; cover conversation, news, law, and technical prose | Source language, translator, regional variety, genre |
| Writing | Normalise Unicode; fix font, size, measure, and line breaking | Grapheme clusters, code points, bytes, font advance, line count |
| Linguistic units | Use language-appropriate segmentation and test sensitivity to granularity | Morphemes, words, syllables; morae separately for Japanese |
| Speech | Collect both controlled reading and spontaneous conversation | Voiced duration, pauses, syllable/mora rate, conditional information |
| Cognitive outcome | Have participants perform a genuine comprehension or coordination task | Accuracy, response time, regressions, memory, reported effort |
| Computing | Test several tokenizers and compressors | Tokens, bytes, latency, effective context capacity, task score |

The compact script below reproduces only the Unicode code-point, UTF-8 byte, grapheme-cluster, terminal-column, and font-advance measurements in the three-language *Universal Declaration of Human Rights* table, plus the descriptive three-language means from the public 2019 data. It does not reproduce the paper’s hierarchical model, the cognitive experiments, or the essay’s other conclusions.

The width table uses the conditions recorded in the original calculation: Noto Sans CJK Regular 2.004 at 100 px, with font-file SHA-256 `b76b0433203017ca80401b2ee0dd69350349871c4b19d504c34dbdd80541690a`. The Linux font path in the code reflects that environment; a rerun must verify the font version or file hash before its width values can be compared directly.

<details>
<summary>Show the reproduction code and run notes</summary>

```python
from pathlib import Path
import unicodedata

import pandas as pd
import regex
from PIL import ImageFont
from wcwidth import wcswidth


def measure(text: str, font: ImageFont.FreeTypeFont) -> dict[str, float | int]:
    text = unicodedata.normalize("NFC", text)
    return {
        "codepoints": len(text),
        "grapheme_clusters": len(regex.findall(r"\X", text)),
        "utf8_bytes": len(text.encode("utf-8")),
        "terminal_columns": wcswidth(text),
        "advance_em": font.getlength(text) / font.size,
    }


font_path = Path("/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc")
font = ImageFont.truetype(str(font_path), size=100, index=2)

texts = {
    "English": (
        "All human beings are born free and equal in dignity and rights. "
        "They are endowed with reason and conscience and should act towards "
        "one another in a spirit of brotherhood."
    ),
    "Chinese": "人人生而自由,在尊严和权利上一律平等。他们赋有理性和良心,并应以兄弟关系的精神相对待。",
    "Japanese": (
        "すべての人間は、生まれながらにして自由であり、かつ、尊厳と権利とについて平等である。"
        "人間は、理性と良心とを授けられており、互いに同胞の精神をもって行動しなければならない。"
    ),
}

for language, text in texts.items():
    print(language, measure(text, font))

# Coupé et al. (2019), supplementary InfoRateData.csv
df = pd.read_csv("InfoRateData.csv", sep="\t")
df["SR"] = df["NS"] / df["Duration"]
df["IR"] = df["SR"] * df["ID"]
print(
    df[df["Language"].isin(["CMN", "ENG", "JPN"])]
    .groupby("Language")[["ID", "SR", "IR"]]
    .mean()
)
```

</details>

The `InfoRateData.csv` used here has SHA-256 `f4dde6def980ed4c461ad8fd666af64cbbaa967a2ac73702855fc70484c0732a`; the data are available with the paper’s supplementary materials.[[3]](#ref-3) Equal weighting by recording is suitable for checking direction and order of magnitude, but formal inference should retain the hierarchical structure of speakers, passages, and languages.

## Returning to the original question

Chinese, Japanese, and English have no overall ranking independent of the measurement unit. That does not mean they have no meaningful differences. A more accurate summary is:

- **For visible characters or code points in matched content, Chinese is often shortest.** Morphosyllabic cues, unspaced writing, relatively little inflection, and compounding all contribute to this visual compactness.
- **Japanese cannot be reduced to “verbose.”** In controlled reading it often lies at the low-information-per-syllable, high-syllable-rate end; mixed writing also uses kanji for compression and segmentation cues.
- **English does not lack compositional resources.** Compounding, derivation, conversion, borrowing, and abbreviation build new concepts from existing material, even though more letters and spaces often remain visible.
- **Switching to bytes, physical width, or tokens changes the effect size and sometimes the order.** Those differences are real engineering costs, but they are not intrinsic intellectual properties of a language.
- **Cognitive efficiency can only be measured in a task.** A shorter form may be faster, or it may shift disambiguation, background knowledge, and memory load onto the reader.

No language wins across every layer. The interesting question is how each one redistributes costs among **explicitness, speed, predictability, page space, learning, and error recovery**. Languages operate across layers to solve a harder problem: helping another person understand us reliably.

## References and data

1. <span id="ref-1"></span>Shannon, C. E. (1948). *A Mathematical Theory of Communication*. **Bell System Technical Journal, 27**, 379–423, 623–656. <https://doi.org/10.1002/j.1538-7305.1948.tb01338.x>
2. <span id="ref-2"></span>Pellegrino, F., Coupé, C., & Marsico, E. (2011). A Cross-Language Perspective on Speech Information Rate. **Language, 87**(3), 539–558. <https://doi.org/10.1353/lan.2011.0057>
3. <span id="ref-3"></span>Coupé, C., Oh, Y. M., Dediu, D., & Pellegrino, F. (2019). Different languages, similar encoding efficiency. **Science Advances, 5**(9), eaaw2594. <https://doi.org/10.1126/sciadv.aaw2594>
4. <span id="ref-4"></span>Jaeger, T. F. (2010). Redundancy and reduction: Speakers manage syntactic information density. **Cognitive Psychology, 61**(1), 23–62. <https://doi.org/10.1016/j.cogpsych.2010.02.002>
5. <span id="ref-5"></span>Meister, C., Pimentel, T., Haller, P., Jäger, L., & Cotterell, R. (2021). Revisiting the Uniform Information Density Hypothesis. *EMNLP 2021*, 963–980. <https://aclanthology.org/2021.emnlp-main.74/>
6. <span id="ref-6"></span>Pimentel, T., Meister, C., Salesky, E., Teufel, S., Blasi, D. E., & Cotterell, R. (2021). A Surprisal–Duration Trade-Off across and within the World’s Languages. *EMNLP 2021*, 949–962. <https://aclanthology.org/2021.emnlp-main.73/>
7. <span id="ref-7"></span>Chafe, W., & Tannen, D. (1987). The Relation between Written and Spoken Language. **Annual Review of Anthropology, 16**, 383–407. <https://doi.org/10.1146/annurev.an.16.100187.002123>
8. <span id="ref-8"></span>Levinson, S. C., & Torreira, F. (2015). Timing in Turn-Taking and Its Implications for Processing Models of Language. **Frontiers in Psychology, 6**, 731. <https://doi.org/10.3389/fpsyg.2015.00731>
9. <span id="ref-9"></span>Dingemanse, M., Blythe, J., & Dirksmeyer, T. (2014). Formats for Other-Initiation of Repair across Languages. **Studies in Language, 38**(1), 5–43. <https://doi.org/10.1075/sl.38.1.01din>
10. <span id="ref-10"></span>Inhoff, A. W., & Liu, W. (1998). The Perceptual Span and Oculomotor Activity during the Reading of Chinese Sentences. **Journal of Experimental Psychology: Human Perception and Performance, 24**(1), 20–34. <https://doi.org/10.1037/0096-1523.24.1.20>
11. <span id="ref-11"></span>Rayner, K. (1998). Eye Movements in Reading and Information Processing. **Psychological Bulletin, 124**(3), 372–422. <https://doi.org/10.1037/0033-2909.124.3.372>
12. <span id="ref-12"></span>Sainio, M., Hyönä, J., Bingushi, K., & Bertram, R. (2007). The Role of Interword Spacing in Reading Japanese. **Vision Research, 47**(20), 2575–2584. <https://doi.org/10.1016/j.visres.2007.05.017>
13. <span id="ref-13"></span>Mattys, S. L., Baddeley, A. D., & Trenkic, D. (2018). Is the Superior Verbal Memory Span of Mandarin Speakers Due to Faster Rehearsal? **Memory & Cognition, 46**, 361–369. <https://doi.org/10.3758/s13421-017-0770-8>
14. <span id="ref-14"></span>Baddeley, A. D., Thomson, N., & Buchanan, M. (1975). Word Length and the Structure of Short-Term Memory. **Journal of Verbal Learning and Verbal Behavior, 14**(6), 575–589. <https://doi.org/10.1016/S0022-5371(75)80045-4>
15. <span id="ref-15"></span>Perfetti, C. A., Liu, Y., & Tan, L. H. (2005). The Lexical Constituency Model. **Psychological Review, 112**(1), 43–59. <https://doi.org/10.1037/0033-295X.112.1.43>
16. <span id="ref-16"></span>Tan, L. H., Spinks, J. A., Eden, G. F., Perfetti, C. A., & Siok, W. T. (2005). Reading Depends on Writing, in Chinese. **PNAS, 102**(24), 8781–8785. <https://doi.org/10.1073/pnas.0503523102>
17. <span id="ref-17"></span>Packard, J. L. (2000). *The Morphology of Chinese*. Cambridge University Press. <https://doi.org/10.1017/CBO9780511486821>
18. <span id="ref-18"></span>Kageyama, T., & Kishimoto, H. (Eds.). (2016). *Handbook of Japanese Lexicon and Word Formation*. De Gruyter Mouton. <https://doi.org/10.1515/9781614512097>
19. <span id="ref-19"></span>Kubozono, H. (1999). Mora and Syllable. In *The Handbook of Japanese Linguistics*, 31–61. <https://www.blackwellpublishing.co.uk/content/BPL_Images/Content_Store/WWW_Content/9780631234944/002.pdf>
20. <span id="ref-20"></span>Plag, I. (2018). *Word-Formation in English* (2nd ed.). Cambridge University Press. <https://doi.org/10.1017/9781316771402>
21. <span id="ref-21"></span>Coulmas, F. (2003). *Writing Systems*. Cambridge University Press. <https://doi.org/10.1017/CBO9781139164597>
22. <span id="ref-22"></span>Yergeau, F. (2003). *UTF-8, a Transformation Format of ISO 10646* (RFC 3629). <https://www.rfc-editor.org/rfc/rfc3629>
23. <span id="ref-23"></span>Unicode Consortium. *The Unicode Standard*; *UAX #11: East Asian Width*; *UAX #29: Unicode Text Segmentation*. <https://www.unicode.org/standard/standard.html>
24. <span id="ref-24"></span>Petrov, A., La Malfa, E., Torr, P. H. S., & Bibi, A. (2023). Language Model Tokenizers Introduce Unfairness Between Languages. *NeurIPS 2023*. <https://proceedings.neurips.cc/paper_files/paper/2023/hash/74bb24dca8334adce292883b4b651eda-Abstract-Conference.html>
25. <span id="ref-25"></span>Ahia, O., Kumar, S., Gonen, H., Kasai, J., Mortensen, D. R., Smith, N. A., & Tsvetkov, Y. (2023). Do All Languages Cost the Same? *EMNLP 2023*. <https://aclanthology.org/2023.emnlp-main.614/>
26. <span id="ref-26"></span>Rust, P., Pfeiffer, J., Vulić, I., Ruder, S., & Gurevych, I. (2021). How Good Is Your Tokenizer? *ACL-IJCNLP 2021*. <https://aclanthology.org/2021.acl-long.243/>
27. <span id="ref-27"></span>Ziemski, M., Junczys-Dowmunt, M., & Pouliquen, B. (2016). The United Nations Parallel Corpus v1.0. *LREC 2016*. <https://aclanthology.org/L16-1561/>
28. <span id="ref-28"></span>Office of the United Nations High Commissioner for Human Rights. *Universal Declaration of Human Rights* — [English](https://www.ohchr.org/en/human-rights/universal-declaration/translations/english), [Chinese](https://www.ohchr.org/en/human-rights/universal-declaration/translations/chinese), [Japanese](https://www.ohchr.org/en/human-rights/universal-declaration/translations/japanese-nihongo).
29. <span id="ref-29"></span>Gibson, E., Futrell, R., Piantadosi, S. T., Dautriche, I., Mahowald, K., Bergen, L., & Levy, R. (2019). How Efficiency Shapes Human Language. **Trends in Cognitive Sciences, 23**(5), 389–407. <https://doi.org/10.1016/j.tics.2019.02.003>
