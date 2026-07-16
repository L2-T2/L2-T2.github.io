---
title: '中文、日文与英文，到底哪一种“信息密度”更高？'
date: 2026-07-15
updated: 2026-07-16
layout: entry
slug: chinese-japanese-english-information-density
lang: zh-CN
lang_path: zh/
translation_key: chinese-japanese-english-information-density
description: "从说话速度、文字系统、Unicode、阅读成本与模型 token 出发，重新回答中、日、英三种语言谁更紧凑，以及为什么这个问题没有单一排行榜。"
subtitle: "当字符、音节、时间、版面与理解成本给出不同答案"
categories: [essay]
tags: [语言学, 信息论, 文字系统, 认知科学, 计算语言学]
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

`人工智能` 只有四个汉字，`artificial intelligence` 却有二十三个可见字符；日文的 `人工知能` 也只占四个汉字的位置。只看这一眼，中文和日文似乎已经赢下了“信息密度”比赛。

但把这三个词存成 UTF-8、读出声、放进一段自然对话，或送进不同大语言模型的分词器，排名都会改变。这个小例子指出了整场讨论最容易忽略的事实：**我们以为在比较语言，实际上经常只是在比较某一种计量单位。**

<!-- more -->

我真正想回答的不是“哪种语言最高级”，而是一个更具体的问题：当中文、日文和英文表达近似相同的内容时，紧凑性究竟出现在哪一层，又把成本转移到了哪里？答案并不是一句“都一样”，而是一组有规律的权衡。

## 先把一个问题拆成五个

“这句话有多密”至少可能在问五件不同的事；首先要问清<span id="unit">“每什么”</span>：

| 比较对象 | 常见分母 | 它回答的问题 | 它没有回答的问题 |
|---|---|---|---|
| 书写序列 | 字符、字素簇、词、语素 | 一段文字需要多少表面单位 | 实际占多少页面、是否容易读 |
| 数字表示 | UTF-8 字节、压缩后字节 | 存储与传输成本有多大 | 人类看到或理解多少内容 |
| 语音序列 | 音节、拍、音素 | 每个发音单位承载多少统计信息 | 单位时间能传多少信息 |
| 时间过程 | bit/s、命题/min | 信息以多快速度到达 | 听者是否正确理解、是否疲劳 |
| 交际结果 | 正确恢复的意义/时间或成本 | 一项任务是否高效完成 | 语言是否具有抽象的“智力等级” |

如果事件 $x$ 的概率为 $p(x)$，香农惊奇度写作：

\[
I(x)=-\log_2 p(x)
\]

惊奇度测量“看到 $x$ 后减少了多少统计不确定性”，熵则描述一个概率分布或随机源的平均不确定性；两者都不是“概念有多深刻”的分数。来自高熵随机源的一串字符可能具有很高的累计惊奇度，却完全没有可恢复的意思；一句熟悉的法律套语可能很可预测，却承担明确而重要的功能。[[1]](#ref-1)

对自然语言，更有意义的通常是给定上下文后的条件熵 $H(X_t\mid X_{<t})$。如果再关心时间，就要把单位信息量与产生速度相乘：

\[
R=H_{\text{unit}}\times v_{\text{unit}}
\]

这条简单公式会贯穿全文：一种语言可以让每个单位承载较少信息，同时更快地产生这些单位。只比较右侧两个因子中的一个，结论自然会偏。

> [!NOTE|先说“每什么”|#unit]
>
> 任何“最高密度”结论都应先补全分母：每个字符、每个音节、每秒、每个字节、每个 token，还是每单位认知成本？没有分母，“密度”只是一个直觉词。

### 语言、文字与编码不是同一层 {.no-toc}

同一条消息会依次经过<span id="writing">语言、文字与编码等不同层次</span>的映射：

\[
\text{目标意义 }M
\rightarrow \text{语言形式 }L
\rightarrow \text{书写单位 }O
\rightarrow \text{Unicode 序列 }U
\rightarrow \text{字节 }B
\rightarrow \text{版面 }A
\]

从 $M$ 到 $L$，词汇、语法、语境和省略规则起作用；从 $L$ 到 $O$，我们选择汉字、假名或拉丁字母；从 $O$ 到 $U$ 和 $B$，Unicode 与具体编码格式接手；最后，字体、字号、字距和断行把它变成页面。后面一层的长度不能自动代表前面一层的效率。

中文主要使用形态音节文字。一个汉字往往同时关联一个语素和一个音节，但并不普遍等于一个完整单词：`人` 可以独立成词，`自由` 是两个字组成的词，而 `葡萄` 不能拆成两个各自保留现代词义的单字。[[17]](#ref-17)[[21]](#ref-21)

标准日文是汉字、平假名、片假名、拉丁字母与数字的混合系统。假名主要按**拍**组织，而拍不等于跨语言比较中的音节；`か/ka` 看似是一个假名对应两个拉丁字母，`あ/a` 和 `ん/n` 却是一比一，`きゃ/kya` 又是两个假名对应三个字母。[[18]](#ref-18)[[19]](#ref-19)

英文使用字母文字和显式空格，词法屈折相对较少，但冠词、代词、功能词和较固定的语序承担不少关系表达。英语长名词串的紧凑来自名词复合与前置修饰，不是“自由语序”；中文、日文和英文也都能通过复合、派生、借词、仿译与缩略创造新概念。[[17]](#ref-17)[[18]](#ref-18)[[20]](#ref-20)

> [!NOTE|文字不等于语言|#writing]
>
> 把汉字、假名和拉丁字母统称为“字母表”会掩盖它们对应的语言单位不同。较粗粒度的书写单位常能缩短符号序列，但不会免费缩短发音时间、字节数或学习成本。

## 口语里的第一条规律：密度与速度会互相补偿

书面字符很容易数，口语却更接近语言作为时间过程的真实面貌。这里最重要的两项研究都没有发现简单的“所有语言完全等速”，但它们共同揭示了一个稳定方向：**单位信息量较低的语言，往往产生单位更快。**

### 2011：同一内容需要多少音节 {.no-toc}

Pellegrino、Coupé 与 Marsico 使用二十段英语材料及其六种语言译文，收集了七种目标语言、59 名说话人的 585 段控制朗读，并以越南语作为外部参照。[[2]](#ref-2) 这里的“信息密度”不是完整的香农熵，而是平行文本表达近似相同内容所需音节数的相对指标。

| 语言 | 归一化信息密度 ID | 音节速率 SR（音节/秒） | 归一化信息率 IR |
|---|---:|---:|---:|
| 英语 | 0.91 ± 0.04 | 6.19 ± 0.16 | 1.08 ± 0.08 |
| 日语 | 0.49 ± 0.02 | 7.84 ± 0.09 | 0.74 ± 0.06 |
| 普通话 | 0.94 ± 0.04 | 5.18 ± 0.15 | 0.94 ± 0.08 |
| 越南语参照 | 1.00 | 5.22 | 1.00 |

日语在这批材料中每音节所承载的相对内容最少，却说得最快；普通话的单位音节密度较高，速度较慢；英语处在较高密度与中等速度的组合上。速度确实补偿了密度，但补偿并不完整，所以这项研究不能被概括为“所有语言的信息率严格相等”。

### 2019：17 种语言是否汇聚到相近速率 {.no-toc}

Coupé 等人随后把设计扩展到 17 种语言、9 个语系和 170 名母语说话人。[[3]](#ref-3) 他们先从各语言语料估计音节条件熵，再用朗读中的音节速率计算 $IR=ID\times SR$。论文报告的跨语言平均信息率约为 <span id="rate"><strong>39.15 bit/s</strong></span>，标准差约 **5.10 bit/s**。

下面三行是对论文公开 `InfoRateData.csv` 逐条录音等权计算的描述性均值，不是对论文混合效应模型的重新拟合：

| 语言 | 条件信息密度 ID（bit/音节） | 平均音节速率 SR | 平均信息率 IR（bit/s） |
|---|---:|---:|---:|
| 普通话 | 6.96 | 5.858 | 40.770 |
| 英语 | 7.09 | 6.338 | 44.938 |
| 日语 | 5.03 | 8.035 | 40.415 |

三种语言按 bit/音节看差别明显，按 bit/s 看则靠得更近。这个结果支持“人类语言在共同的交流生态中形成相近编码效率”，却不意味着一个精确的生理常数。说话人、文本、语言和估计模型都仍然产生变异。[[3]](#ref-3)[[29]](#ref-29)

两项研究也不能被当成同一个实验的简单复现：2011 年的指标接近“同一语义内容需要多少音节”，2019 年的指标来自语料中的局部音节条件熵。二者都使用控制朗读和翻译材料，并没有覆盖犹豫、抢话、修正、礼貌协商与共享场景中的自然对话。

> [!NOTE|如何理解 39 bit/s|#rate]
>
> 这个数字依赖“音节如何切分”和“概率模型看多长的上下文”。换一种语言模型，绝对 bit 数会改变。可靠的结论是速度与单位信息存在补偿、跨语言速率趋近，而不是每个人在任何场景都恒定输出 39 bit/s。

均匀信息密度研究进一步表明，说话者会通过词语选择、缩减与时长来避免局部信息峰值；跨语言语音研究也发现，较不可预测的音素通常持续更久。[[4]](#ref-4)[[5]](#ref-5)[[6]](#ref-6) 这些证据更像一种柔性的处理约束，而不是语言被锁定在固定带宽上。

## 书写里的错觉：字符少，不代表每一种成本都低

汉字确实常让同内容文本在视觉上更短。这是一个真实现象，没有必要为了反对语言优劣论而否认它。问题在于，“短了多少”会随 Unicode 码点、UTF-8 字节、终端列宽和实际字体宽度而变化。

### 不换语言，只换写法 {.no-toc}

要把“语言”与“文字系统”分开看，最直观的办法是做一次<span id="translit">控制转写</span>。下面保持句子的语言和意义近似不变，只把普通话改写为拼音，把日文混写改为全假名或罗马字。计数前统一采用 NFC；终端列宽按常见 `wcwidth` 规则估计；字体宽度使用同一 Noto Sans CJK Regular 字体。

> **普通话汉字**：人人生而自由，在尊严和权利上一律平等。<br>
> **汉语拼音**：Rénrén shēng ér zìyóu, zài zūnyán hé quánlì shàng yīlǜ píngděng.

> **日文汉字假名混写**：すべての人間は、生まれながらにして自由であり、かつ、尊厳と権利とについて平等である。<br>
> **日文全假名**：すべてのにんげんは、うまれながらにしてじゆうであり、かつ、そんげんとけんりとについてびょうどうである。<br>
> **日文罗马字**：Subete no ningen wa, umarenagara ni shite jiyū de ari, katsu, songen to kenri to ni tsuite byōdō de aru.

| 语言与写法 | Unicode 码点 | 扩展字素簇 | UTF-8 字节 | 终端列宽 | 字体行进宽度（em） |
|---|---:|---:|---:|---:|---:|
| 普通话：汉字 | 19 | 19 | 57 | 38 | 19.00 |
| 普通话：拼音 | 64 | 64 | 81 | 64 | 30.01 |
| 日语：汉字假名混写 | 42 | 42 | 126 | 84 | 41.73 |
| 日语：全假名 | 51 | 51 | 153 | 102 | 50.73 |
| 日语：罗马字 | 104 | 104 | 107 | 104 | 47.32 |

普通话汉字写法只有拼音约 30% 的 Unicode 码点，实际行进宽度却是拼音约 63%；日文罗马字的 Unicode 码点是混写的 2.48 倍，UTF-8 字节反而更少，物理宽度也只多约 13%。仅仅更换书写方式，就足以同时改变长度比例和部分指标的排序。

> [!NOTE|转写不是翻译|#translit]
>
> 这个控制并非认知上完全等价。拼音不能唯一恢复所有同音汉字，全假名与罗马字会失去汉字提供的词义和切分线索。转写适合隔离表面编码成本，却不能证明读者的解码成本不变。

### 同一份联合国文本，四把尺子，四个不同答案 {.no-toc}

再看《世界人权宣言》第一条的官方英文、中文与 OHCHR 日文译文。[[27]](#ref-27)[[28]](#ref-28) 为避免把翻译当成总体语言样本，这里只把它当成一个可复算的示例。输入统一为 NFC；原始长度按 <span id="unicode">Unicode 码点</span>计算；字节使用 UTF-8；不对中日文做空格“分词”。

| 语言 | Unicode 码点 | UTF-8 字节 | 终端列宽 | Noto Sans CJK 行进宽度（em） |
|---|---:|---:|---:|---:|
| 英文 | 170 | 170 | 170 | 79.87 |
| 中文 | 43 | 125 | 84 | 41.56 |
| 日文 | 85 | 255 | 170 | 84.58 |

按 Unicode 码点，中文只有英文的四分之一，日文只有一半；按字体行进宽度，中文约为英文的 52%，日文反而略宽于英文。按 UTF-8 字节，中文只比英文少约四分之一，日文则明显更多。中文仍然在这个页面示例中最紧凑，但“领先幅度”远没有字符数看上去那么极端。

这并不矛盾。常用 ASCII 字母在 UTF-8 中通常占 1 byte，多数常用汉字与假名通常占 3 bytes；东亚字符在终端中又常按两列估计。比例字体里的真实宽度则由字形设计决定。[[21]](#ref-21)[[22]](#ref-22)[[23]](#ref-23)

> [!NOTE|“字符”不是一种东西|#unicode]
>
> 一个用户看到的字符可能由多个 Unicode 码点组成，例如预组 `é` 与 `e` 加组合重音看起来相同，底层长度却不同。做界面限制时应考虑扩展字素簇；做存储时看字节；做排版时直接测字体和断行。

字符数也不是词数。英文 `machine learning` 可以按空格算成两个正字法词，中文 `机器学习` 与日文 `機械学習` 通常连续书写。若直接使用 `text.split()`，整句中文或日文可能被算成“一个词”。这样的数字很精确，却没有跨语言可比性。

## 读得快不快：紧凑性也要支付认知成本

表面压缩会把一部分工作交给读者。省掉主语、介词或关系标记可以缩短句子，但读者必须从语境补回；增加重复、助词或确认话轮会拉长形式，却可能降低误解与修复成本。可见长度与理解效率因此不会始终同步。

### 眼动窗口会适应文字系统 {.no-toc}

经典实验估计，英文阅读的有效知觉广度大致覆盖注视点左侧 3—4 个字符、右侧 14—15 个字符；中文研究得到的范围约为左侧 1 个汉字、右侧 3 个汉字。[[10]](#ref-10)[[11]](#ref-11) 这不能换算成“英文一次处理更多信息”或“一个汉字恰好等于四个字母”。字符尺寸、视觉复杂度、词边界和实验掩蔽方法都不相同。

日文提供了一个更细的对照。Sainio 等人发现，空格明显帮助纯平假名文本的词识别与眼动引导，对常规汉字—假名混写的帮助却较小。[[12]](#ref-12) 混合脚本的视觉变化本身可以提供切分线索。因此，`情報密度` 与 `じょうほうみつど` 即使读音和意义近似相同，也不是认知上完全相同的字符串。

### 记忆广度测到的是任务匹配，不是一般智力 {.no-toc}

短时序列回忆受到项目发音时长与默读复述速度影响，也就是经典“词长效应”。[[13]](#ref-13)[[14]](#ref-14) 汉语数字名称较短，中文母语者在一些数字广度任务中会表现出优势，但这种<span id="cognition">任务效应</span>随材料、复述速度、熟悉度和策略而改变。换成空间任务、不可命名图形或不同词长的材料，原有排序不一定保留。

跨文字阅读依赖共享的语言—视觉网络，也会适应具体正字法。中文的字形—语素与音节映射、英文的字母—音位模式，以及日文汉字与假名的双重路径，要求不同训练策略。[[15]](#ref-15)[[16]](#ref-16) 这些差异说明大脑具有适应性，而不是某种文字天然提高抽象思维。

> [!NOTE|任务效应不是智力|#cognition]
>
> 眼动范围、数字广度或某一脑区的激活差异，都首先属于特定材料与任务。只有在控制熟练度、发音时长、视觉复杂度和教育背景后，才适合讨论处理机制；它们不能给语言或使用者排“智力等级”。

## 对话为什么常常“不够密”，却非常高效

写作把内容从现场抽离，所以倾向于补足名词、衔接和背景；对话拥有共享场景、手势、语调与即时反馈，可以放心省略。中文的“已经发了”、日文的 `もう送った` 和英文口语里的 `Sent it already` 都可能在共同语境中完成任务，即使它们不是教科书式完整句。[[7]](#ref-7)

反过来，对话里的“嗯”“对”“你是说……？”、重复和自我修正看起来不增加命题，却承担轮替、确认和纠错功能。人类通信并不是无噪声文件压缩：冗余有时像纠错码，牺牲局部长度来提高任务成功率。[[8]](#ref-8)[[9]](#ref-9)[[29]](#ref-29)

“相同内容”也至少有三层：

1. 命题核心相同——谁对谁做了什么；
2. 语法信息相同——时体、数、定指、格等是否都对齐；
3. 交际效果相同——礼貌、立场、信息结构和社会关系是否也对齐。

例如英文 `Could you send it?`、中文“能发一下吗？”和日文 `送っていただけますか` 都能完成同一个请求，但日文形式编码的礼貌关系更显式。如果研究者只保留“请求发送”这个命题，额外形式会被算作冗余；如果社会关系本来就是消息的一部分，它们便是信息。翻译长度从来不只是语言结构的结果，也取决于我们决定保留什么。

## 进入计算机后：字节和 token 都不是语言本体

UTF-8 是工程标准，不是自然语言理论。它让 ASCII 与既有系统兼容，因此常见英文字母用一个字节，许多汉字和假名用三个字节。[[22]](#ref-22) 换成 UTF-16、压缩字节或其他编码，比例还会变化。由此产生的成本是真实的，但它属于系统设计。

大语言模型的 <span id="token">token</span> 更进一步依赖训练语料与词表。一个常见字符串是否被合并为单一子词、词表容量如何分配给不同语言、模型以字节还是字符为后备单位，都会改变同一句话的 token 数。

Petrov 等人发现，不同语言的平行内容在现有分词器中可能出现很大的 token 长度差；Ahia 等人的 22 语言研究显示，这种差异会直接传导到 API 费用、有效上下文长度、服务可用性与实际服务效果。[[24]](#ref-24)[[25]](#ref-25) Rust 等人则发现，用针对单一语言训练的分词器替换多语模型原分词器，几乎所有受测语言与任务都能受益。[[26]](#ref-26)

所以，某语言在某个模型里 token 更少，最直接的结论是**这个分词器更适合它**，不是该语言“信息更高级”。公平审计至少应该同时报告：同任务的 token 数、字符或字素簇数、字节数、可容纳的命题数，以及最终任务表现。

> [!NOTE|Token 是模型的账本|#token]
>
> Token 既不是词，也不是稳定的语言学单位。同一种语言换一个 tokenizer，长度、费用和模型表现都会改变。工程上应该修正不公平的词表分配，而不是把账单差异解释成语言优劣。

## 为什么“智能密度”不是一个可用的排行榜

“智能密度”不是语言学、心理测量学或信息论中的标准指标。它把至少四件事揉在了一起：表面形式短、统计上不可预测、单位文本命题多，以及读者能快速正确理解。四者可能同向，也完全可能相反。

短句可以依赖大量背景知识；高熵随机源可以只是在生成噪声；命题压得太紧会增加回视与误解；多写几个礼貌或确认成分反而可能让协作更顺利。更根本的是，语言是共同体不断使用的编码与互动系统，不是使用者智力的代理变量。

如果一定要保留这个直觉，可以把它改写为<span id="efficiency">“任务条件下的交际效率”</span>：

\[
\eta_T=\frac{I(M;\hat M)}{T+\alpha E+\beta C+\gamma L}
\]

式中的 $I(M;\hat M)$ 是在目标消息与恢复结果的联合分布上定义的互信息，不是某一次消息或恢复结果的惊奇度。

这里 $M$ 是发送者的目标信息，$\hat M$ 是接收者恢复的信息，$T$ 是时间，$E$ 是错误代价，$C$ 是认知成本，$L$ 是对额外背景知识的依赖；权重由具体任务决定。这不是一张已经验证的心理量表，而是一种防止偷换概念的分析框架。

> [!NOTE|把“智能”换成可测的效率|#efficiency]
>
> 真正可比较的是：在给定受众、语境、噪声和错误容忍度时，接收者以多少时间与努力恢复了多少目标意义。优势属于具体文本、说法和场景，而不属于整种语言。

## 如果真要比，我会怎样设计

如果要把这个问题从网络争论变成研究，最低限度的设计应该同时控制内容、体裁和表示方式：

| 环节 | 最低要求 | 需要同时报告的量 |
|---|---|---|
| 语料 | 原创与双向翻译并存；覆盖对话、新闻、法律与技术文本 | 源语言、译者、地区变体、体裁 |
| 书写 | 统一 Unicode 规范化；固定字体、字号、版心与断行 | 字素簇、Unicode 码点、字节、行进宽度、行数 |
| 语言单位 | 使用语言适配的切分，并做粒度敏感性分析 | 语素、词、音节；日语另报拍 |
| 语音 | 同时采集控制朗读与自然对话 | 发声时长、停顿、音节/拍速率、条件信息量 |
| 认知结果 | 让受试者真正完成理解或协作任务 | 正确率、反应时、回视、记忆、主观努力度 |
| 计算系统 | 使用多个 tokenizer 与压缩器 | token、字节、延迟、上下文有效容量、任务表现 |

下面的精简代码只复算上文《世界人权宣言》三语表中的 Unicode 码点、UTF-8 字节、字素簇、终端列宽与字体行进宽度，以及 2019 年公开数据中的三语描述性均值；它不复现论文的层级模型、认知实验或本文其他结论。

宽度表沿用原始复算记录的测量条件：Noto Sans CJK Regular 2.004、100 px，字体文件 SHA-256 为 `b76b0433203017ca80401b2ee0dd69350349871c4b19d504c34dbdd80541690a`。代码中的 Linux 字体路径只是当时环境的示例；重新运行时必须核对字体版本或文件哈希，否则宽度结果不能直接比较。

<details>
<summary>展开复算代码与运行说明</summary>

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

本文复算使用的 `InfoRateData.csv` SHA-256 为 `f4dde6def980ed4c461ad8fd666af64cbbaa967a2ac73702855fc70484c0732a`，数据入口见论文补充材料。[[3]](#ref-3) 逐条录音等权平均只能用于检查方向与数量级；正式推断仍应保留说话人、文本和语言的层级结构。

## 回到最初的问题

中文、日文与英文不存在一个脱离计量单位的总排名，但这不等于三者“什么差别都没有”。更准确的结论是：

- **按同内容的 Unicode 码点或可见字符，中文经常最短。** 汉字的语素线索、无空格书写、较少屈折与复合构词共同塑造了这种视觉紧凑性。
- **日文不能被概括为冗长。** 它在控制朗读中常处于“每音节信息较低、音节速率较高”的一端；混合文字又用汉字提供压缩和切分线索。
- **英语也不缺乏组合能力。** 复合、派生、转类、借词和缩略让它能够用旧资源生成新概念，只是正字法通常把更多字母与空格留在表面。
- **改用字节、物理宽度或 token 后，幅度甚至排序会变化。** 这些变化是真实的工程成本，却不是语言本体的智力属性。
- **认知效率只能在任务中测量。** 形式更短可能更快，也可能把消歧、背景知识与记忆负担转移给读者。

所以，真正有趣的不是宣布某种语言获胜，而是观察每种语言如何在**显式性、速度、可预测性、版面、学习成本与错误恢复**之间重新分配代价。语言没有把信息藏在某一把万能尺子里；它们是在不同层面上完成同一件更困难的事：让另一个人可靠地理解我们。

## 参考文献与数据入口

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
