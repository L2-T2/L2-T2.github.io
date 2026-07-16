---
title: "KBC 空洞假说：我们是否住在一个巨大的局域低密度区？"
date: 2026-07-13
layout: entry
slug: kbc-void-hypothesis-review
lang: zh-CN
lang_path: zh/
translation_key: kbc-void-hypothesis-review
description: "从星系计数、BAO 与直接距离测量出发，审视 KBC 巨型局域空洞是否存在，以及它能否解释哈勃常数张力。"
subtitle: "从局域低密度证据到哈勃常数张力：六篇关键研究的证据链与反检验"
categories: [essay]
tags: [宇宙学, 宇宙空洞, 哈勃常数, 观测宇宙学]
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

> 本文按以下阅读顺序组织：**Banik & Kalaitzidis 2025 → Stiskalek et al. 2025 → Keenan et al. 2013 → Wong et al. 2022 → Huterer & Wu 2023/2024 → Banik et al. 2026**。这个顺序不是发表年表，而是从最新的 BAO 证据和直接距离反检验出发，再回到 KBC 空洞的观测源头，最后讨论它是否能解释哈勃常数张力。

![KBC空洞艺术想象图](/images/kbc-void-hypothesis-review/third_party_kbc_void_wikimedia.png)

**图源说明：**第三方图片。Wikimedia Commons, *File:Kbc void.png*，作者 Pablo Carlos Budassi，依 CC BY-SA 4.0 使用；站点采用未修改原图。它是艺术想象图，不是巡天数据图。[^img-kbc]

## 结论先行

KBC空洞假说的核心说法是：太阳系、银河系、本星系群乃至更大的近邻宇宙，可能处在一个**相对于宇宙平均密度偏低的巨大区域**中。常见的“强版本”大致是：半径约 **300 Mpc**、平均低密度约 **20%**，直径约 600 Mpc，约合 20 亿光年。这里的“空洞”不是“什么都没有”，而是“平均物质密度低于宇宙平均值”。

更严谨地说，KBC空洞涉及三个不同命题：

1. **局域低密度区存在。** 多项星系计数和近红外光度密度研究支持这一点。
2. **它具有 KBC 强版本的尺度和深度。** 这仍有争议，尤其取决于星系如何追踪总物质、选择函数如何处理、低红移速度场如何建模。
3. **它能解释哈勃常数张力。** 这是争议最大的命题。标准 ΛCDM 下的宇宙方差通常被认为不足以产生从 Planck 的约 67.4 到 SH0ES 的约 73.0 km/s/Mpc 的差距。[^planck][^sh0es]

我的综述判断是：**“我们周围存在一定局域低密度”有较强观测动机；“我们位于一个半径约300 Mpc、足以解决H₀张力的KBC巨型空洞内”尚未成为共识。**

<!-- more -->

![本文阅读顺序](/images/kbc-void-hypothesis-review/selfdrawn_reading_order.png)

**绘制目的：**自行绘制。用于说明本文的论证顺序，而非按发表年份组织。


## 1. 背景：宇宙空洞、宇宙网与哈勃张力

现代大尺度结构不是均匀撒开的星系海，而是由星系团、纤维、墙状结构和空洞组成的“宇宙网”。宇宙空洞是其中低密度区域。空洞中仍有星系、气体和暗物质，只是平均密度比周围低。宇宙空洞是大尺度结构的重要组成部分，也可作为宇宙学参数、暗能量、修正引力和星系形成环境效应的探针。[^void-review]

![宇宙网模拟图](/images/kbc-void-hypothesis-review/third_party_cosmic_web_nasa.jpg)

**图源说明：**第三方图片。NASA Science / Hubble “Mapping the Cosmic Web”。页面说明这是一幅宇宙网模拟可视化，亮结点代表星系，紫色纤维代表星系间物质；可视化由 Frank Summers（STScI）制作，模拟由 Martin White 与 Lars Hernquist（Harvard）完成。它用于解释宇宙网背景，不是 KBC 空洞的观测图。[^img-nasa]

哈勃张力指的是：早期宇宙观测在 ΛCDM 模型下推断出的 H₀，与本地距离阶梯测得的 H₀ 不一致。Planck 2018 在基准 ΛCDM 下给出 H₀ = 67.4 ± 0.5 km/s/Mpc；SH0ES 的 Cepheid-SN Ia 距离阶梯给出 H₀ = 73.04 ± 1.04 km/s/Mpc，并报告与 Planck+ΛCDM 存在约 5σ 差异。[^planck][^sh0es]

KBC空洞解释 H₀ 张力的基本机制是：如果我们位于低密度区内，那么物质会受到外部较高密度区域的引力牵引，产生从空洞内部向外的特殊速度场。对低红移星系而言，观测红移近似包含两部分：

```text
观测红移速度 ≈ 背景宇宙膨胀速度 + 沿视线方向的特殊速度
cz ≈ H_bg d + v_pec,los
```

如果特殊速度使局域星系红移被系统性抬高，那么用红移和距离拟合得到的局域 H₀ 就会偏高。这一逻辑不违反“宇宙整体膨胀率较低”，因为它诉诸的是局域速度场，而不是全宇宙都以更高 H₀ 膨胀。

![KBC空洞影响H₀的机制图](/images/kbc-void-hypothesis-review/selfdrawn_h0_mechanism.png)

**绘制目的：**自行绘制。用于说明“局域低密度 → 外流 → 低红移处的红移偏高 → 表观 H₀ 偏高”的假说链条。真实分析需要密度剖面、速度场、距离误差模型、巡天选择函数和协方差处理。


## 2. Banik 与 Kalaitzidis 2025：BAO是否支持局域空洞？

**论文：** *Testing the local void hypothesis using baryon acoustic oscillation measurements over the last 20 yr*<br>
**作者：** Indranil Banik, Vasileios Kalaitzidis<br>
**期刊：** *Monthly Notices of the Royal Astronomical Society* 540(1), 545–561, 2025<br>
**核心方法：**用过去约20年的 BAO 测量检验局域空洞模型。[^bk2025]

BAO，即重子声学振荡，是早期宇宙等离子体中声波留下的标准尺。今天的星系分布中仍保留了这个尺度。它能被用来测量不同红移处的宇宙距离。常见的各向同性 BAO 距离量是

```text
D_V(z) = [ D_M(z)^2 · c z / H(z) ]^(1/3)
```

其中 `D_M` 是横向共动距离，`H(z)` 是红移 z 处的膨胀率。`D_V` 把角向和径向 BAO 信息压缩成一个平均距离指标。

Banik & Kalaitzidis 的关键设定是：检验一个大约 **20% 低密度、延伸到约 300 Mpc** 的 KBC 空洞。作者把无空洞的均匀 Planck 宇宙学模型作为对照，并把不同空洞密度剖面与 BAO 数据比较。MNRAS 版本报告，对 42 个各向同性平均 BAO 距离 `D_V` 测量值而言，无空洞模型给出 `χ² = 75.7`，空洞模型给出 `χ² = 47.3–51.2`；按作者处理方式，总体张力从约 3.3σ 降到约 1.1–1.4σ。[^bk2025]

这篇论文的意义在于：它不是从星系计数本身出发，而是问一个更强的问题：**如果 KBC 空洞真的存在，它是否会在独立的 BAO 距离量尺中留下低红移异常？** 作者的回答偏肯定，尤其是低红移 BAO 数据似乎越来越偏离均匀 Planck 模型的预期。

但限制也明确：

- `D_V` 是压缩量。角向 BAO 和径向 BAO 单独分析时，模型差异没有 `D_V` 那么强。
- BAO 数据来自多代巡天，系统误差、协方差和样本重叠处理会影响统计解释。
- 这不是“直接看见空洞”，而是通过距离-红移关系检验空洞模型的后果。

所以，Banik & Kalaitzidis 2025 是 KBC 空洞假说的一个强支持论据，但它不能单独完成证明。


## 3. Stiskalek et al. 2025：直接距离数据给出的反检验

**论文：** *Testing the local supervoid solution to the Hubble tension with direct distance tracers*<br>
**作者：** Richard Stiskalek, Harry Desmond, Indranil Banik<br>
**期刊：** *MNRAS* 543(2), 1556–1573, 2025<br>
**核心方法：**使用 CosmicFlows-4 的 Tully–Fisher 直接距离数据，逐个星系检验空洞造成的特殊速度场。[^stiskalek2025]

这篇论文比 BAO 论文更“局域运动学”。Tully–Fisher 关系可以给出螺旋星系的距离估计，而这个距离不直接依赖红移。于是可以比较：

```text
观测红移速度 - 背景膨胀速度 = 特殊速度
```

如果 KBC 巨型空洞造成显著外流，那么直接距离样本应当看到相应的速度场。Stiskalek 等人使用场级、逐星系的前向模型，拟合空洞剖面、尺度、观测者偏心位置和系统速度项。[^stiskalek2025]

其结果对“强 KBC 空洞”不利。论文摘要和结论指出，直接距离数据偏好的空洞尺度通常 **小于约 70 Mpc**，远小于 Haslbauer-Banik-Kroupa 2020 类模型采用的基准尺度；不同剖面下，偏好尺度可为约 69、61、34 cMpc。Gaussian 与 Maxwell-Boltzmann 剖面给出的 H₀ 约 70.4 和 70.2 km/s/Mpc，仍低于 SH0ES；exponential 剖面可到约 72.1 km/s/Mpc，但贝叶斯证据不偏好该剖面。[^stiskalek2025-conc][^haslbauer2020]

这篇论文的重要性是：它检验的不是“星系数是否少”，而是“少密度区应当引起的速度场是否存在”。如果直接距离数据确实偏好更小尺度，那么 KBC 强版本至少需要更复杂的剖面、系统误差解释，或修改引力/结构形成图景才能维持。

![KBC空洞尺度示意](/images/kbc-void-hypothesis-review/selfdrawn_kbc_scale_schematic.png)

**绘制目的：**自行绘制。用于说明两个尺度层次：KBC 强版本常用的约 300 Mpc 半径，以及 Stiskalek et al. 2025 直接距离数据偏好的更小尺度。图不是天球图，也不是拟合剖面。


## 4. Keenan、Barger 与 Cowie 2013：KBC名字的来源

**论文：** *Evidence for a ~300 Mpc Scale Under-density in the Local Galaxy Distribution*<br>
**作者：** Ryan C. Keenan, Amy J. Barger, Lennox L. Cowie<br>
**期刊：** *The Astrophysical Journal* 775, 62, 2013<br>
**核心方法：**用近红外 K 波段星系光度密度测量局域宇宙是否低密度。[^keenan2013]

KBC 空洞之所以叫 KBC，是因为 Keenan、Barger 和 Cowie 在 2013 年的这篇论文。他们把 UKIDSS、2MASS、SDSS、2dFGRS、6dFGRS、2MRS、GAMA 等巡天数据结合起来，研究 K 波段星系光度密度随红移的变化。K 波段近红外光主要追踪老年恒星群，因此常被作为恒星质量或总体发光物质的较稳定代理量。

他们发现：在 `z < 0.07` 的局域宇宙，K 波段光度密度较低；到 `z > 0.1`，光度密度大约达到局域值的 **1.5 倍**。如果发光物质能近似追踪总物质分布，那么这意味着我们所处的局域几百 Mpc 尺度可能低密度。[^keenan2013]

Keenan et al. 的贡献是给 KBC 假说提供了最直接的观测源头。但它也引入了后来所有争论的核心变量：

```text
星系/光度密度  ≠  自动等于  总物质密度
```

要从星系数或光度密度推断总物质密度，必须处理星系偏差、恒星质量-光度关系、K修正、星系演化、红移空间畸变、巡天完备性、天区遮挡和光度函数标定。KBC 的观测动机强，但从“星系少”到“总物质少到足以改变 H₀”中间隔着模型层。


## 5. Wong et al. 2022：Local Hole 是否覆盖大部分天空？

**论文：** *The Local Hole: a galaxy under-density covering 90 per cent of sky to ≈200 Mpc*<br>
**作者：** Jonathan H. W. Wong, T. Shanks, N. Metcalfe, J. R. Whitbourn 等<br>
**期刊：** *MNRAS* 511(4), 5742–5755, 2022<br>
**核心方法：**用 2MRS、2M++ 和 2MASS 星系计数把 Local Hole 分析扩展到接近全天。[^wong2022]

Wong 等人的论文强化了“局域低密度区不是小天区假象”的论据。他们把 K 波段星系红移分布和星系计数拓展到约 90% 天空，报告在 `z < 0.075` 的范围内，相对均匀模型存在约 **21–22%** 星系数密度不足；2MASS 星系计数也给出约 **20 ± 2%** 的低密度。论文还估计，这类低密度可使本地 H₀ 被高估约 **2–3%**。[^wong2022]

这支持命题 A：“我们周围可能有显著局域低密度”。但对命题 C，即“它能完全解释 H₀ 张力”，它还不够。原因是 H₀ 张力约为 8–9%，而 Wong 等人估计的 H₀ 影响约 2–3%。即使局域低密度存在，它也可能只解释一部分张力。


## 6. Huterer 与 Wu 2023/2024：标准 ΛCDM 下，局域空洞不够“空”

**论文：** *Not empty enough: a local void cannot solve the H₀ tension*<br>
**作者：** Dragan Huterer, Hao-Yi Wu<br>
**形式：**2023 年预印本；2024 年正式收录于 *The Hubble Constant Tension*<br>
**核心方法：**用理论估计和大尺度结构模拟评估局域宇宙方差能否解释 H₀ 张力。[^hutererwu2023]

Huterer & Wu 的核心结论相当直接：局域结构当然会让本地 H₀ 有宇宙方差，但幅度远小于哈勃张力。他们估计，用实际 Ia 型超新星样本空间分布模拟得到的局域 H₀ 样本方差约为 **0.31 km/s/Mpc**，理论微扰估计约 **0.4 km/s/Mpc**；而 Planck 与 SH0ES 的差距约为 **6 km/s/Mpc**。要靠一个空洞解释这一级别偏差，需要大约 `δ ≈ -0.8`、尺度约 `120 h^-1 Mpc` 的极端空洞，相当于约 20σ 的异常宇宙方差事件。[^hutererwu2023]

这篇论文打击的是命题 C，尤其是在标准 ΛCDM 框架下的命题 C。它并不必然否定“局域低密度区存在”；它否定的是“正常 ΛCDM 宇宙方差足以制造 SH0ES 与 Planck 的整个 H₀ 差距”。

这一区分很关键：

```text
局域低密度存在
≠ 局域低密度足够大
≠ 局域低密度能完全解释 H₀ 张力
≠ 标准 ΛCDM 中自然出现这种结构
```

![概念性密度剖面与H₀偏置](/images/kbc-void-hypothesis-review/selfdrawn_density_profile_concept.png)

**绘制目的：**自行绘制。用于说明空洞模型中“低密度剖面”和“局域 H₀ 偏置随距离衰减”的概念关系。曲线不是任何论文的拟合结果，不应用作数据图。


## 7. Banik et al. 2026：把 H₀ 张力和 BAO 张力放在同一框架中

**论文：** *The local void model for the Hubble and BAO tensions*<br>
**作者：** Indranil Banik, Harry Desmond, Vasileios Kalaitzidis, Sergij Mazurenko<br>
**形式：**2026 年 Perspective 预印本<br>
**核心内容：**总结局域空洞模型如何同时关联 H₀ 张力、低红移 BAO 异常和未来检验。[^banik2026]

Banik et al. 2026 的定位不是单一数据分析，而是纲领性综述。它把以下线索合并：

- 星系计数显示局域宇宙可能低密度。
- 低密度区可产生外流，抬高低红移处的红移尺度。
- 如果空洞影响随距离衰减，那么高红移观测应回到与 Planck 背景宇宙学一致的状态。
- 低红移 BAO 可能出现与这种局域外流相关的异常。
- 未来可用星系计数、特殊速度、快速射电暴、红移漂移、kSZ 效应和结构增长检验该模型。[^banik2026]

这篇文章代表支持方当前的整合框架。它的优势是能把 H₀ 和 BAO 两类低红移异常放进同一个机制；弱点是它往往需要较强的结构形成或非标准引力背景，才能让如此大尺度、足够深的空洞不与标准 ΛCDM 概率发生严重冲突。


## 8. 证据如何互相制衡？

![证据结构图](/images/kbc-void-hypothesis-review/selfdrawn_evidence_map.png)

**绘制目的：**自行绘制。用于把支持证据、反检验和争议点放在同一逻辑图上。

从六篇核心文献看，KBC 空洞假说不是单线证据，而是多种观测之间的拉扯：

| 证据类型 | 代表论文 | 倾向 | 关键问题 |
|---|---:|---|---|
| 近红外光度密度 | Keenan et al. 2013 | 支持局域低密度 | 光度密度如何转成总物质密度 |
| 全天近红外星系计数 | Wong et al. 2022 | 支持大范围 Local Hole | 选择函数、星系偏差、H₀影响幅度 |
| BAO 距离量尺 | Banik & Kalaitzidis 2025 | 支持空洞模型优于均匀 Planck 模型 | BAO压缩量、数据协方差、系统误差 |
| Tully–Fisher 直接距离 | Stiskalek et al. 2025 | 限制强KBC尺度 | 速度场是否偏好更小空洞 |
| Ia 超新星 Hubble 图 | Kenworthy et al. 2019 等[^kenworthy2019] | 限制大幅局域外流 | 简化空洞模型、边界假设 |
| ΛCDM 宇宙方差 | Huterer & Wu 2023/2024 | 反对其完全解释H₀张力 | 标准模型下所需空洞过极端 |
| 综述与未来检验 | Banik et al. 2026 | 支持统一解释框架 | 是否需要非标准引力或增强结构形成 |

这里最容易出错的地方是把“星系分布低密度”和“物质总密度低密度”混为一谈。星系是有偏示踪物。暗物质不发光，星系形成也受环境影响，所以星系少不必然等于总质量同比例少。反过来，直接距离速度场也有自己的难点：Tully–Fisher 距离散度大，选择效应复杂，样本几何不均匀。

因此，KBC 假说的真正判断标准不是某一篇论文胜负，而是这些观测能否在同一个密度剖面、速度场和宇宙学模型下同时成立。


## 9. 术语澄清

### KBC Void、Local Hole、Local Void 不是同一个概念

- **KBC Void / Local Hole**：本文讨论的局域大尺度低密度假说，名称来自 Keenan、Barger、Cowie。
- **Local Void**：银河系附近另一个较小尺度的局域空洞结构，不应与 KBC Void 混淆。
- **Supervoid**：泛指非常大的宇宙空洞；KBC 若成立，常被归入 local supervoid。

Wikipedia 的 Local Hole 页面也明确说，KBC Void 又称 Local Hole，是一个仍有争议、尚属假说性的巨大低密度区；它并非完全空无一物，而是包含银河系、本星系群和更大的局域结构。[^wiki-localhole]

### 空洞不等于宇宙中心 {#void-not-cosmic-center}

KBC 空洞如果存在，只说明我们处在一个大尺度密度涨落中。它不自动推出宇宙有全局中心，也不自动推翻宇宙学原则。真正的问题是：这种低密度区的尺度和深度是否在标准 ΛCDM 中足够常见，以及它对低红移观测的影响是否足够大。

### “空洞解释 H₀ 张力”不只是几何问题

要解释 H₀ 张力，需要同时满足：

1. 空洞足够大、足够深。
2. 我们的位置不能太偏，否则会产生过大的各向异性信号。
3. 速度场要与直接距离数据、超新星、BAO、kSZ、CMB偶极约束相容。
4. 这种结构要能在所采用的引力和结构形成理论中产生。

这就是为什么 Huterer & Wu 认为标准 ΛCDM 下很难，而 Banik 等支持方常把问题推向增强结构形成或 Milgromian/MOND 类框架。


## 10. 当前最合理的分级判断

| 命题 | 当前状态 | 理由 |
|---|---|---|
| 局域宇宙存在某种低密度区 | 较有观测动机 | Keenan 2013 与 Wong 2022 等星系计数/光度密度结果一致地指向局域不足 |
| KBC强版本：约300 Mpc半径、约20%低密度 | 有支持但未定论 | BAO 结果支持，但直接距离数据偏好更小尺度；星系到质量转换仍有系统不确定性 |
| 它能完全解释H₀张力 | 高度争议 | 标准 ΛCDM 宇宙方差不足；需要极端空洞或非标准物理 |
| 它能解释部分低红移异常 | 值得继续检验 | 低红移 BAO、H₀(z)、bulk flow 等现象给了支持方可测试预测 |

一句话概括：**KBC空洞假说不是“已被证明的巨洞”，也不是“已被彻底排除的错误”。它是一个有观测动机、但在尺度、深度和宇宙学解释上仍受强约束的局域大尺度结构假说。**


## 11. 未来哪些观测最关键？

未来检验应尽量减少“星系数 → 总质量”的模型依赖，并直接测量速度场或独立距离。优先级较高的方向包括：

1. **更完整的直接距离样本**：Tully–Fisher、基本面、表面亮度涨落、TRGB、SNe Ia 等方法可以直接约束低红移速度场。
2. **DESI、Euclid、Roman 等高质量 BAO 与星系巡天**：可检验低红移 BAO 是否持续偏离均匀 Planck 模型。
3. **kSZ 效应**：如果有大尺度相干流，星系团相对于 CMB 的运动会留下 kSZ 信号。
4. **快速射电暴色散量**：FRB 的色散量可能帮助追踪视线方向上的重子分布。
5. **红移漂移**：长期精密观测可直接检验宇宙膨胀历史，尽管技术难度高。

如果一个 KBC 级别空洞真实存在，未来数据应当在星系数、速度场、BAO、kSZ 和独立距离上给出相互一致的图像。如果只在某一类数据中出现，而在其他数据中缺席，那么系统误差或模型假设错误的可能性会上升。


## 12. 图像来源与授权

| 插图位置 | 文件名 | 类型 | 来源或绘制目的 |
|---|---|---|---|
| 标题图 | `third_party_kbc_void_wikimedia.png` | 第三方图片 | Wikimedia Commons, *File:Kbc void.png*，Pablo Carlos Budassi，CC BY-SA 4.0；艺术想象图，不是数据图 |
| 宇宙网背景 | `third_party_cosmic_web_nasa.jpg` | 第三方图片 | NASA Science / Hubble “Mapping the Cosmic Web”；宇宙网模拟可视化，用于背景说明 |
| 阅读顺序 | `selfdrawn_reading_order.png` | 自行绘制 | 说明本文的论文阅读顺序 |
| 尺度示意 | `selfdrawn_kbc_scale_schematic.png` | 自行绘制 | 比较约300 Mpc KBC强版本与约70 Mpc直接距离偏好尺度；非真实天图 |
| H₀机制 | `selfdrawn_h0_mechanism.png` | 自行绘制 | 解释低密度区如何通过外流影响低红移 H₀ |
| 密度剖面概念图 | `selfdrawn_density_profile_concept.png` | 自行绘制 | 说明空洞密度和 H₀偏置随距离衰减的概念关系；非拟合结果 |
| 证据结构 | `selfdrawn_evidence_map.png` | 自行绘制 | 汇总支持证据、反检验和主要争议 |


## 参考文献与材料

[^bk2025]: Banik, I. & Kalaitzidis, V. (2025). “Testing the local void hypothesis using baryon acoustic oscillation measurements over the last 20 yr.” *MNRAS*, 540(1), 545–561. DOI: 10.1093/mnras/staf781. <https://academic.oup.com/mnras/article/540/1/545/8129689> ；arXiv: <https://arxiv.org/abs/2501.17934>

[^stiskalek2025]: Stiskalek, R., Desmond, H. & Banik, I. (2025). “Testing the local supervoid solution to the Hubble tension with direct distance tracers.” *MNRAS*, 543(2), 1556–1573. DOI: 10.1093/mnras/staf1571. <https://doi.org/10.1093/mnras/staf1571>

[^stiskalek2025-conc]: 同上。论文结论部分给出不同空洞剖面下的偏好尺度和 H₀ 结果，并指出直接距离数据总体偏好比基准 KBC/HBK20 模型小得多的尺度。

[^haslbauer2020]: Haslbauer, M., Banik, I. & Kroupa, P. (2020). “The KBC void and Hubble tension contradict ΛCDM on a Gpc scale—Milgromian dynamics as a possible solution.” *MNRAS*, 499(2), 2845–2883. DOI: 10.1093/mnras/staa2348. <https://doi.org/10.1093/mnras/staa2348>

[^keenan2013]: Keenan, R. C., Barger, A. J. & Cowie, L. L. (2013). “Evidence for a ~300 Mpc Scale Under-density in the Local Galaxy Distribution.” *The Astrophysical Journal*, 775, 62. DOI: 10.1088/0004-637X/775/1/62. arXiv: <https://arxiv.org/abs/1304.2884>

[^wong2022]: Wong, J. H. W., Shanks, T., Metcalfe, N., Whitbourn, J. R., et al. (2022). “The Local Hole: a galaxy under-density covering 90 per cent of sky to ≈200 Mpc.” *MNRAS*, 511(4), 5742–5755. DOI: 10.1093/mnras/stac396. <https://academic.oup.com/mnras/article/511/4/5742/6534633> ；arXiv: <https://arxiv.org/abs/2107.08505>

[^hutererwu2023]: Huterer, D. & Wu, H.-Y. (2024). “Not empty enough: a local void cannot solve the H₀ tension.” In E. Di Valentino & D. Brout (Eds.), *The Hubble Constant Tension*, 391–401. Springer Nature Singapore. DOI: 10.1007/978-981-99-0177-7_21. Preprint (2023): <https://arxiv.org/abs/2309.05749>

[^kenworthy2019]: Kenworthy, W. D., Scolnic, D. & Riess, A. (2019). “The Local Perspective on the Hubble Tension: Local Structure Does Not Impact Measurement of the Hubble Constant.” *The Astrophysical Journal*, 875, 145. DOI: 10.3847/1538-4357/ab0ebf. <https://doi.org/10.3847/1538-4357/ab0ebf>

[^banik2026]: Banik, I., Desmond, H., Kalaitzidis, V. & Mazurenko, S. (2026). “The local void model for the Hubble and BAO tensions.” arXiv: <https://arxiv.org/abs/2602.03928>

[^planck]: Planck Collaboration (2020). “Planck 2018 results. VI. Cosmological parameters.” *Astronomy & Astrophysics*, 641, A6. arXiv: <https://arxiv.org/abs/1807.06209>

[^sh0es]: Riess, A. G. et al. (2022). “A Comprehensive Measurement of the Local Value of the Hubble Constant with 1 km/s/Mpc Uncertainty from the Hubble Space Telescope and the SH0ES Team.” *The Astrophysical Journal Letters*, 934, L7. arXiv: <https://arxiv.org/abs/2112.04510>

[^void-review]: van de Weygaert, R. & Platen, E. (2011). “Cosmic Voids: structure, dynamics and galaxies.” *International Journal of Modern Physics: Conference Series*. arXiv: <https://arxiv.org/abs/0912.2997>

[^wiki-localhole]: Wikipedia, “Local Hole.” 用作术语背景，不作为主要科学证据。<https://en.wikipedia.org/wiki/Local_Hole>

[^img-kbc]: Wikimedia Commons, *File:Kbc void.png*. Author: Pablo Carlos Budassi. Original file used without modification. Source: <https://commons.wikimedia.org/wiki/File:Kbc_void.png>. License: <https://creativecommons.org/licenses/by-sa/4.0/>

[^img-nasa]: NASA Science / Hubble, “Mapping the Cosmic Web.” Visualization: Frank Summers (STScI); simulation: Martin White and Lars Hernquist (Harvard). Source: <https://science.nasa.gov/mission/hubble/science/science-highlights/mapping-the-cosmic-web/>. NASA image-use guidance: <https://www.nasa.gov/nasa-brand-center/images-and-media/>

补充背景教材：Peebles, *The Large-Scale Structure of the Universe*；Dodelson, *Modern Cosmology*；Ryden, *Introduction to Cosmology*；Peacock, *Cosmological Physics*。这些教材主要用于背景概念，如密度反差、线性扰动、宇宙网和特殊速度场。
