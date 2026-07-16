---
title: "KBC 空洞假说：我们是否住在一个巨大的局域低密度区？"
date: 2026-07-13
updated: 2026-07-16
layout: entry
slug: kbc-void-hypothesis-review
lang: zh-CN
lang_path: zh/
translation_key: kbc-void-hypothesis-review
description: "如果银河系身处一个横跨数亿秒差距的低密度区，它会怎样改变我们测量宇宙膨胀的方式？本文沿着星系计数、BAO、直接距离与宇宙方差四条证据线审视 KBC 空洞。"
subtitle: "从“附近星系是否更少”到“局域结构能否解释哈勃常数张力”"
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

“我们生活在一个宇宙空洞里”是一句很容易制造误解的话。它听起来像在说银河系四周空无一物，甚至像在暗示地球占据了宇宙中的特殊位置。KBC 空洞假说真正讨论的事情其实克制得多：银河系周围数亿秒差距范围内的平均物质密度，是否比足够遥远处的宇宙平均值低一些？

这个问题之所以值得认真对待，不只是因为它会改变我们对“宇宙住址”的想象。许多对宇宙膨胀率的本地测量，都要使用附近星系的距离与红移。如果周围确实存在一个足够大、足够深的低密度区，它所产生的相干外流便可能抬高局域测得的哈勃常数 H₀。于是，一个大尺度结构问题与当代宇宙学最著名的争议——哈勃常数张力——连在了一起。

![KBC 空洞艺术想象图](/images/kbc-void-hypothesis-review/third_party_kbc_void_wikimedia.png)

*这是一幅艺术想象图，而不是巡天数据图。原图由 Pablo Carlos Budassi 创作，取自 Wikimedia Commons，依 CC BY-SA 4.0 使用。[^img-kbc]*

这里的“<span id="void-meaning">空洞</span>”并非真空，而是一个统计意义上的低密度区。常被讨论的强版本大约是：半径 **300 Mpc**、平均密度比宇宙平均值低 **20%** 左右。现有证据确实给“局域宇宙偏低密度”提供了观测动机；但它是否真的达到这一尺度和深度，以及它能否解释全部 H₀ 张力，仍是两个更强、也更有争议的问题。

> [!NOTE|空洞不等于真空|#void-meaning]

> 宇宙空洞里仍有星系、气体和暗物质。“空洞”描述的是相对于宇宙平均密度的不足，而不是物质为零。20% 的低密度也意味着仍保留约 80% 的平均物质密度。

我的当前判断是：**我们周围存在某种局域低密度区，颇有观测依据；我们恰好位于一个半径约 300 Mpc、并足以解决哈勃常数张力的 KBC 巨型空洞内，则尚未成为共识。**真正有意思的不是在“存在”与“不存在”之间押注，而是看不同观测如何逼迫这个假说改变形状。

<!-- more -->

![本文的证据阅读地图](/images/kbc-void-hypothesis-review/selfdrawn_reading_order.png)

*这张自绘图给出本文的阅读路线：先寻找低密度的观测来源，再检查它是否产生了预期的距离与速度信号，最后讨论理论上是否容得下这种结构。它不是论文发表年表。*

## 1. 先把“KBC 空洞”拆成三个问题

关于 KBC 空洞的争论经常显得混乱，是因为三种强度完全不同的主张被塞进了同一句话里：

| 主张 | 真正要问的问题 | 当前证据气质 |
|---|---|---|
| **附近相对低密度** | 局域星系或近红外光度密度是否低于更远处？ | 有多项观测支持 |
| **存在强 KBC 尺度** | 低密度是否达到约 300 Mpc 半径、约 20% 深度？ | 有支持，也受直接距离约束 |
| **能够解决 H₀ 张力** | 由此产生的速度场能否弥合约 67.4 与 73.0 km/s/Mpc 的测量之间的差距？ | 在标准 ΛCDM 下高度困难 |

第一层成立，不会自动推出第二层；第二层成立，也不会自动推出第三层。后文许多看似互相矛盾的论文，实际上往往只是在检验这三层中的不同一层。

另一个常见误解是：如果我们<span id="center-anchor">身处一个大尺度空洞附近</span>，是否意味着地球又回到了宇宙中心？并不是。密度涨落有局部中心，和宇宙拥有全局中心是两件完全不同的事。真正的限制来自观测：如果我们离空洞中心太远，天空不同方向上的速度和距离信号就会出现过大的各向异性。

> [!NOTE|不是宇宙中心|#center-anchor]

> 宇宙学原则要求宇宙在足够大的尺度上统计均匀，而不是要求每一个有限区域都具有完全相同的密度。位于一次局域涨落之中并不特殊；“涨落大到什么程度仍然合理”才是问题。

名称也值得先厘清。**KBC Void** 得名于 Keenan、Barger 与 Cowie；**Local Hole** 常被用作同一大尺度低密度现象的另一名称；而大写的 **Local Void** 往往指银河系附近另一个尺度更小的结构，不应混为一谈。[^wiki-localhole]

## 2. 为什么会怀疑我们周围“少了些星系”

宇宙在大尺度上近似均匀，却并不是均匀铺开的星系海。物质沿着纤维和墙状结构汇聚，星系团位于结点之间，大片低密度区域则穿插其中，共同组成宇宙网。空洞不是理论上的例外，而是大尺度结构的正常组成部分。[^void-review]

![宇宙网模拟图](/images/kbc-void-hypothesis-review/third_party_cosmic_web_nasa.jpg)

*NASA/Hubble 的宇宙网模拟可视化：亮结点代表星系，紫色纤维代表星系间物质。它用于说明宇宙网背景，并非 KBC 空洞的观测图。[^img-nasa]*

KBC 这个名字来自 Keenan、Barger 与 Cowie 2013 年的研究。作者把 UKIDSS、2MASS、SDSS、2dFGRS、6dFGRS、2MRS 与 GAMA 等巡天结合起来，追踪 K 波段光度密度随红移的变化。结果显示，在 `z < 0.07` 的局域宇宙中，K 波段光度密度较低；到了 `z > 0.1`，它大约上升到局域值的 **1.5 倍**。[^keenan2013]

这个变化对应的不是“隔壁少了几个星系”，而是<span id="scale-anchor">数百 Mpc 的尺度</span>。300 Mpc 约为 **9.8 亿光年**；如果把它理解为半径，那么整个结构的直径接近 20 亿光年。即使相对于可观测宇宙它仍是局域结构，相对于星系和星系团却已经极其巨大。

> [!NOTE|300 Mpc 有多大？|#scale-anchor]

> 1 Mpc 约等于 326 万光年。光穿过半径 300 Mpc 的区域约需 9.8 亿年。这里的尺度通常由红移、距离模型和密度剖面共同定义，并不是一道清晰可见的球形边界。

2013 年的结果仍可能被质疑为天区覆盖或巡天选择造成的错觉。Wong 等人在 2022 年把分析扩展到约 **90% 的天空**，结合 2MRS、2M++ 和 2MASS 数据，报告 `z < 0.075` 内存在约 **21–22%** 的星系数密度不足；2MASS 星系计数给出的低密度幅度约为 **20 ± 2%**。他们估计，这种结构可能令本地 H₀ 偏高约 **2–3%**。[^wong2022]

这两项结果共同构成 KBC 假说最直观的起点：越过一个局域范围后，星系发出的近红外光似乎变多了。但其中有一道不能跳过的桥梁：<span id="tracer-anchor">星系和星光只是总物质的有偏示踪物</span>。暗物质不发光，星系形成效率又会随环境变化。要把光度密度不足换算成总质量不足，必须处理星系偏差、光度函数、K 修正、红移空间畸变、巡天完备性和星系演化。

> [!NOTE|星系不是总质量|#tracer-anchor]

> K 波段光较稳定地追踪老年恒星群，因此比可见光更接近恒星质量代理量，但它仍不是暗物质地图。“星系少 20%”与“总物质少 20%”只有在给定偏差模型后才能建立对应关系。

![KBC 强版本与直接距离偏好尺度的比较](/images/kbc-void-hypothesis-review/selfdrawn_kbc_scale_schematic.png)

*自绘尺度示意：外圈表示常见的约 300 Mpc KBC 强版本，内圈表示后文直接距离分析偏好的约 70 Mpc 或更小尺度。它不是天球图，也不是任何论文的拟合剖面。*

## 3. 一个低密度区怎样抬高局域 H₀

哈勃常数张力把这个原本属于星系分布的问题推到了聚光灯下。Planck 2018 数据在基准 ΛCDM 下给出 `H₀ = 67.4 ± 0.5 km/s/Mpc`；SH0ES 的 Cepheid–SN Ia 距离阶梯给出 `H₀ = 73.04 ± 1.04 km/s/Mpc`，两者相差约 6 km/s/Mpc，按该项研究的误差估计达到约 5σ。[^planck][^sh0es]

如果我们在一个低密度区内，外部较高密度的物质会对内部物质产生净引力牵引，形成朝空洞外部的相干特殊速度。对低红移星系，可以把观测关系概念性地写成：

$$
cz \simeq H_{\mathrm{bg}}d + v_{\mathrm{pec,los}}.
$$

若外流让附近星系的观测红移系统性增大，在给定独立距离 `d` 时拟合出的<span id="h0-bias-anchor">局域 H₀ 就会偏高</span>。这并不意味着整个宇宙膨胀得更快，而是局域速度场混入了我们用来估计背景膨胀的信号。

> [!NOTE|偏高的是本地估计|#h0-bias-anchor]

> 特殊速度对附近星系最重要，因为此时背景哈勃流本身较小。距离增大后，同样的几百 km/s 只占总红移的一小部分，所以空洞模型预言的 H₀ 偏置应随距离逐渐减弱。

![KBC 空洞影响 H₀ 的机制图](/images/kbc-void-hypothesis-review/selfdrawn_h0_mechanism.png)

*自绘机制图：局域低密度产生外流，外流抬高低红移处的观测红移，进而抬高表观 H₀。真实推断还需要密度剖面、距离误差、选择函数和完整协方差。*

这套机制的吸引力在于，它不必立即修改早期宇宙物理，就能让“本地”和“背景”测量朝不同方向移动。但它也给自己设置了明确考题：如果外流真的足够强，BAO、超新星哈勃图和不依赖红移的直接距离样本，都应该看到彼此相容的痕迹。

## 4. 2025 年的交叉询问：BAO 提供支持，直接距离则收紧约束

2025 年出现了两项方向不同、却恰好应该放在一起阅读的检验。它们不是简单的“支持方论文”与“反对方论文”，而是用两种不同尺子询问同一个模型。

**BAO 看距离—红移关系。** Banik 与 Kalaitzidis 汇总了过去约 20 年的重子声学振荡测量。BAO 是早期宇宙声波留下的统计标准尺；常见的各向同性压缩距离为：

$$
D_V(z)=\left[D_M^2(z)\frac{cz}{H(z)}\right]^{1/3}.
$$

他们把约 **20% 低密度、延伸至约 300 Mpc** 的空洞剖面，与无空洞的均匀 Planck 背景模型比较。对 42 个各向同性平均 `D_V` 测量，论文报告无空洞模型的 `χ² = 75.7`，空洞模型为 `χ² = 47.3–51.2`；在作者的统计处理下，总体张力由约 3.3σ 降到约 1.1–1.4σ。[^bk2025]

这是一项值得重视的支持证据，但<span id="bao-proxy-anchor">BAO 并不是空洞的照片</span>。`D_V` 把角向和径向信息压缩到一个数值中；数据又来自多代巡天，样本重叠、协方差与系统误差都会影响模型比较。单独分析横向和径向 BAO 时，模型差异也没有压缩后的 `D_V` 那么强。

> [!NOTE|BAO 检验的是后果|#bao-proxy-anchor]

> BAO 提供的是一把统计标准尺。式中的 $D_M$ 是横向共动距离，$H(z)$ 是红移 $z$ 处的膨胀率；$D_V$ 将横向与径向信息压缩成一个平均距离。它能问“距离—红移关系是否像空洞模型预言的那样弯曲”，却不能直接告诉我们空洞内有多少暗物质。因而它与星系计数相互补充，而不是彼此重复。

**直接距离看速度场。** Stiskalek、Desmond 与 Banik 则使用 CosmicFlows-4 的 Tully–Fisher 距离，逐个星系建立前向模型。Tully–Fisher 关系用旋转速度和光度估计螺旋星系距离，不需要先把红移当作距离；因此可以直接考察：

$$
v_{\mathrm{pec}}=cz-H_{\mathrm{bg}}d.
$$

结果对“强 KBC”版本更不友好。不同剖面下，数据偏好的尺度约为 **69、61 和 34 cMpc（共动兆秒差距）**，明显小于 Haslbauer–Banik–Kroupa 2020 一类模型采用的基准尺度。Gaussian 与 Maxwell–Boltzmann 剖面得到的 H₀ 约为 **70.4** 和 **70.2 km/s/Mpc**；exponential 剖面可达到约 **72.1 km/s/Mpc**，但贝叶斯证据并不偏好这一剖面。[^stiskalek2025][^haslbauer2020]

![概念性密度剖面与 H₀ 偏置](/images/kbc-void-hypothesis-review/selfdrawn_density_profile_concept.png)

*自绘概念图：不同密度剖面会对应不同的外流与 H₀ 偏置。曲线只解释模型结构，不是论文数据或最佳拟合结果。*

这两项工作合在一起，给出的不是一句含糊的“科学界仍有争议”，而是更具体的张力：**低红移 BAO 的距离关系可因强空洞得到改善，但直接距离追踪到的速度场更偏好小尺度结构。**一个可行模型必须让同一条密度剖面同时通过这两关，而不能分别为每种数据挑选最有利的形状。

## 5. 标准 ΛCDM 为什么认为它“不够空”

即使接受附近存在一定低密度，仍要问这种涨落在标准 ΛCDM 中是否常见，以及它能造成多大的 H₀ 偏移。Huterer 与 Wu 用理论估计和大尺度结构模拟回答了第二个问题：按照实际 Ia 型超新星样本的空间分布，局域结构引起的 H₀ 样本方差约为 **0.31 km/s/Mpc**；微扰理论估计约为 **0.4 km/s/Mpc**。这远小于 Planck 与 SH0ES 之间约 6 km/s/Mpc 的差距。[^hutererwu2023]

若要单靠空洞制造完整差距，他们估计需要大约 `δ ≈ -0.8`、尺度约 `120 h⁻¹ Mpc` 的极端结构——在其 ΛCDM 评估中相当于约 <span id="sigma-anchor">20σ 的宇宙方差事件</span>。

> [!NOTE|20σ 不是测量显著性|#sigma-anchor]

> 这里的 20σ 表示：若 ΛCDM 对密度涨落幅度的统计描述成立，这样深而大的空洞会极端罕见。式中的密度反差 $\delta=(\rho-\bar{\rho})/\bar{\rho}$；$\delta\approx-0.8$ 表示密度比平均值低约 80%。$h=H_0/(100\,\mathrm{km\,s^{-1}\,Mpc^{-1}})$ 是无量纲哈勃参数，因此 $120\,h^{-1}\mathrm{Mpc}$ 的实际尺度取决于 $h$。这不是某台仪器“以 20σ 直接发现空洞”，而是在评价模型先验下的结构概率。

Kenworthy、Scolnic 与 Riess 2019 也利用 Ia 型超新星哈勃图限制了能够显著改变本地 H₀ 的大幅局域外流。[^kenworthy2019] 这些工作主要反对的是“空洞可以在标准 ΛCDM 内自然地解释全部 H₀ 张力”，而不是否认任何程度的局域低密度。

> **需要保留的逻辑边界：**发现局域低密度，不等于证明它有 300 Mpc 半径；证明这一尺度，也不等于证明它能抬高全部 H₀ 差值，更不等于证明标准 ΛCDM 会自然产生它。

支持者因此常把讨论推进到增强结构形成或 Milgromian/MOND 类引力框架。Haslbauer、Banik 与 Kroupa 2020 便在这一方向上探索 KBC 空洞与 H₀ 张力。[^haslbauer2020] 这让假说更具解释空间，也提高了它的理论成本：现在需要检验的已不只是一条密度剖面，而是一整套结构形成与引力图景。

## 6. 把证据放在同一张图上

Banik、Desmond、Kalaitzidis 与 Mazurenko 2026 年的观点综述（Perspective）预印本，代表了支持方目前最完整的整合叙事：星系计数指向局域低密度，外流同时影响低红移 H₀ 与 BAO，而高红移观测应逐渐回到 Planck 背景宇宙学。它还把快速射电暴、红移漂移、kSZ 和结构增长列为未来检验。[^banik2026]

![KBC 空洞证据结构图](/images/kbc-void-hypothesis-review/selfdrawn_evidence_map.png)

*自绘证据图：左侧是支持局域低密度或强空洞的线索，右侧是对速度场、尺度和 ΛCDM 概率的反检验。*

把核心证据按它们真正测量的对象排列，会比逐篇论文计票更有用：

| 证据线 | 它直接测量什么 | 对假说的压力 |
|---|---|---|
| Keenan et al. 2013 | K 波段光度密度随红移变化 | 支持附近发光物质较少 |
| Wong et al. 2022 | 近全天星系计数与红移分布 | 支持 Local Hole 不是小天区假象；H₀ 效应约 2–3% |
| Banik & Kalaitzidis 2025 | 低红移 BAO 距离—红移关系 | 强空洞剖面改善其 `D_V` 拟合 |
| Stiskalek et al. 2025 | Tully–Fisher 直接距离对应的速度场 | 偏好约 70 Mpc 或更小尺度，收紧强 KBC |
| Kenworthy et al. 2019 | Ia 型超新星哈勃图 | 限制足以大幅抬高 H₀ 的局域外流 |
| Huterer & Wu 2023/2024 | ΛCDM 下局域 H₀ 的宇宙方差 | 认为正常涨落远不足以解决全部张力 |
| Banik et al. 2026 | 多类异常的统一模型与预测 | 提供可检验框架，但可能需要非标准结构形成 |

这张表也解释了为什么“KBC 空洞被证明了吗？”不是一个能用单篇论文回答的问题。星系计数、BAO 和直接距离观察的是同一假说的不同投影；只有它们能由同一密度剖面、速度场和宇宙学背景共同解释时，证据链才真正闭合。

## 7. 我的当前判断：保留一个分层答案

我更愿意把结论写成四档，而不是“相信”或“不相信”：

| 命题 | 当前判断 | 我认为最关键的理由 |
|---|---|---|
| 局域宇宙存在某种低密度区 | **较有观测动机** | 近红外光度密度与近全天星系计数方向一致 |
| 低密度达到约 300 Mpc、约 20% 的强 KBC 版本 | **有支持但未定论** | BAO 结果有利，直接距离却偏好显著更小的尺度 |
| 它影响部分低红移测量 | **合理且可检验** | Wong 等估计 H₀ 效应约 2–3%，速度场应有距离依赖 |
| 它在标准 ΛCDM 内解释全部 H₀ 张力 | **目前很不可信** | 所需结构过于极端，且直接距离与超新星检验不支持完整幅度 |

因此，KBC 空洞既不是“已被证明的巨洞”，也不是一句可以轻易丢弃的错误。它更像一个正在接受交叉询问的模型：星系计数让它进入法庭，BAO 为它提供了一部分证词，直接距离和宇宙方差则迫使它缩小尺度、修改剖面，或承认自己只能解释一部分异常。

对我而言，最值得保留的也正是这种方法论意义。一个有吸引力的解释不应只复述支持自己的异常，而要主动给出会令自己失败的观测条件。KBC 假说的价值，最终取决于它能否把“附近星系较少”“低红移距离关系异常”和“存在相干外流”压缩进同一组参数，而不是不断为每一项新结果增加例外。

## 8. 接下来什么结果会真正改变判断

未来检验的优先级，应从“再数一次星系”逐步移向对总质量、速度场和距离的独立测量：

1. **更完整的直接距离样本。** Tully–Fisher、基本面、表面亮度涨落、TRGB 与 SNe Ia 可以重建三维特殊速度场，并检查外流是否具有空洞模型要求的径向形状。
2. **低红移 BAO 的拆分检验。** DESI、Euclid 与 Roman 可提高精度；横向与径向 BAO 若分别支持同一剖面，会比单独的 `D_V` 改善更有说服力。
3. **kSZ 效应。** 大尺度相干流会让星系团相对于 CMB 的运动留下动力学 Sunyaev–Zel’dovich 信号。
4. **快速射电暴色散量。** 大样本 FRB 可沿不同视线追踪自由电子柱密度，为局域重子分布提供不同于星光的地图。
5. **红移漂移与距离分层的 H₀。** 空洞效应应随距离衰减；如果本地偏高在越过假定边界后仍不回落，简单空洞模型就会遇到困难。

真正有判别力的，不会是某一类数据再给出一个更显著的异常，而是这些方法能否恢复同一幅三维图像。若星系计数、独立距离、BAO 与 kSZ 最终指向相同的尺度和深度，KBC 假说会变得非常强；若它只在一种压缩统计量中成立，那么系统误差或模型选择将是更节制的解释。

## 9. 关于本文图片

本文使用两张第三方图片：标题处的 KBC 空洞艺术想象图来自 Wikimedia Commons，宇宙网模拟图来自 NASA/Hubble；作者、来源链接与授权信息均列在各自图注和尾注中。其余五张示意图为本文自行绘制，用于解释阅读路线、尺度、外流机制、密度剖面与证据关系；除非图注明确说明，它们都不是观测数据或论文拟合结果。

## 参考文献与材料

[^bk2025]: Banik, I. & Kalaitzidis, V. (2025). “Testing the local void hypothesis using baryon acoustic oscillation measurements over the last 20 yr.” *MNRAS*, 540(1), 545–561. DOI: 10.1093/mnras/staf781. <https://academic.oup.com/mnras/article/540/1/545/8129689>；arXiv: <https://arxiv.org/abs/2501.17934>

[^stiskalek2025]: Stiskalek, R., Desmond, H. & Banik, I. (2025). “Testing the local supervoid solution to the Hubble tension with direct distance tracers.” *MNRAS*, 543(2), 1556–1573. DOI: 10.1093/mnras/staf1571. <https://doi.org/10.1093/mnras/staf1571>. 论文结论部分给出不同空洞剖面下的偏好尺度和 H₀ 结果，并指出直接距离数据总体偏好比基准 KBC/HBK20 模型小得多的尺度。

[^haslbauer2020]: Haslbauer, M., Banik, I. & Kroupa, P. (2020). “The KBC void and Hubble tension contradict ΛCDM on a Gpc scale—Milgromian dynamics as a possible solution.” *MNRAS*, 499(2), 2845–2883. DOI: 10.1093/mnras/staa2348. <https://doi.org/10.1093/mnras/staa2348>

[^keenan2013]: Keenan, R. C., Barger, A. J. & Cowie, L. L. (2013). “Evidence for a ~300 Mpc Scale Under-density in the Local Galaxy Distribution.” *The Astrophysical Journal*, 775, 62. DOI: 10.1088/0004-637X/775/1/62. arXiv: <https://arxiv.org/abs/1304.2884>

[^wong2022]: Wong, J. H. W., Shanks, T., Metcalfe, N., Whitbourn, J. R., et al. (2022). “The Local Hole: a galaxy under-density covering 90 per cent of sky to ≈200 Mpc.” *MNRAS*, 511(4), 5742–5755. DOI: 10.1093/mnras/stac396. <https://academic.oup.com/mnras/article/511/4/5742/6534633>；arXiv: <https://arxiv.org/abs/2107.08505>

[^hutererwu2023]: Huterer, D. & Wu, H.-Y. (2024). “Not empty enough: a local void cannot solve the H₀ tension.” In E. Di Valentino & D. Brout (Eds.), *The Hubble Constant Tension*, 391–401. Springer Nature Singapore. DOI: 10.1007/978-981-99-0177-7_21. Preprint (2023): <https://arxiv.org/abs/2309.05749>

[^kenworthy2019]: Kenworthy, W. D., Scolnic, D. & Riess, A. (2019). “The Local Perspective on the Hubble Tension: Local Structure Does Not Impact Measurement of the Hubble Constant.” *The Astrophysical Journal*, 875, 145. DOI: 10.3847/1538-4357/ab0ebf. <https://doi.org/10.3847/1538-4357/ab0ebf>

[^banik2026]: Banik, I., Desmond, H., Kalaitzidis, V. & Mazurenko, S. (2026). “The local void model for the Hubble and BAO tensions.” arXiv: <https://arxiv.org/abs/2602.03928>

[^planck]: Planck Collaboration (2020). “Planck 2018 results. VI. Cosmological parameters.” *Astronomy & Astrophysics*, 641, A6. arXiv: <https://arxiv.org/abs/1807.06209>

[^sh0es]: Riess, A. G. et al. (2022). “A Comprehensive Measurement of the Local Value of the Hubble Constant with 1 km/s/Mpc Uncertainty from the Hubble Space Telescope and the SH0ES Team.” *The Astrophysical Journal Letters*, 934, L7. arXiv: <https://arxiv.org/abs/2112.04510>

[^void-review]: van de Weygaert, R. & Platen, E. (2011). “Cosmic Voids: structure, dynamics and galaxies.” *International Journal of Modern Physics: Conference Series*. arXiv: <https://arxiv.org/abs/0912.2997>

[^wiki-localhole]: Wikipedia, “Local Hole.” 用作术语背景，不作为主要科学证据。<https://en.wikipedia.org/wiki/Local_Hole>

[^img-kbc]: Wikimedia Commons, *File:Kbc void.png*. Author: Pablo Carlos Budassi. Original file used without modification. Source: <https://commons.wikimedia.org/wiki/File:Kbc_void.png>. License: <https://creativecommons.org/licenses/by-sa/4.0/>

[^img-nasa]: NASA Science / Hubble, “Mapping the Cosmic Web.” Visualization: Frank Summers (STScI); simulation: Martin White and Lars Hernquist (Harvard). Source: <https://science.nasa.gov/mission/hubble/science/science-highlights/mapping-the-cosmic-web/>. NASA image-use guidance: <https://www.nasa.gov/nasa-brand-center/images-and-media/>

补充背景教材：Peebles, *The Large-Scale Structure of the Universe*；Dodelson, *Modern Cosmology*；Ryden, *Introduction to Cosmology*；Peacock, *Cosmological Physics*。这些教材主要用于密度反差、线性扰动、宇宙网和特殊速度场等背景概念。
