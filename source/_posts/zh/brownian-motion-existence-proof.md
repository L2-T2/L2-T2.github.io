---
title: 布朗运动——存在性证明
date: 2026-02-06
layout: entry
slug: brownian-motion-existence-proof
description: 一篇以构造为核心的笔记：通过将问题归约为等正态高斯过程，再借助初级布朗运动，证明布朗运动的存在性。
categories: [learning-journals]
tags:
  - 概率论
  - 随机过程
  - 布朗运动
course: 概率论
lang: zh-CN
lang_path: zh/
translation_key: brownian-motion-existence-proof
---

本文记录一条清晰的布朗运动存在性证明路径。其策略是将协方差核重新表述为内积，在希尔伯特空间上构造等正态高斯过程，再通过初级布朗运动这一中间模型恢复布朗运动。

<!-- more -->

---[陈述: 布朗运动的核心定义]

我们知道布朗运动的定义如下：

**定义 1.1**<br>
概率意义下的布朗运动是定义在 $[0,\infty)$ 上的过程。它是一个高斯过程，其均值函数为<br>
$E X_t = 0 \; \text{for } t \ge 0$<br>
协方差函数为<br>
$Cov(X_s, X_t) = \min\{s,t\}$，其中 $s,t \in [0,\infty)$。

---[end]

---[备注: 为什么存在性并非显然]

在构造布朗运动的初始阶段，我们只是定义了它应当满足的协方差结构。但我们尚不知道它是否真的存在，抑或只是一个形式化的理想对象。

根据协方差函数，我们可以在网格上进行模拟，但这只是在有限网格上的离散近似。以下几个根本问题仍然悬而未决：

- 样本路径是否连续？
- 它是否会在任意小的尺度上剧烈振荡？
- 离散近似是否收敛到一个真正的极限对象？

因此，我们必须证明：在与这一形式化描述相对应的适当函数空间中，确实存在一个真正的随机对象。

---[end]

---[陈述: 归约为等正态高斯过程]

我们观察如下协方差结构：
$$
\min\{s,t\} = \langle 1_{[0,s]}, 1_{[0,t]} \rangle_{L^{2}[0,\infty)},
$$
这表明，布朗运动的协方差是 $L^{2}$ 空间中两个向量的内积。

由此，我们可以对问题进行抽象：

**定义 1.2**<br>
在希尔伯特空间 $\mathbb{H}$ 上，构造一个高斯族 $\{W(h) : h \in \mathbb{H}\}$，使其满足
$$
E[W(h)] = 0, \qquad
Cov(W(h), W(g)) = \langle h, g \rangle_{\mathbb{H}}.
$$

这称为 **等正态高斯过程（isonormal Gaussian process）**。

这样，布朗运动的存在性问题便从一个路径层面的问题，归约为希尔伯特空间上某种高斯结构的存在性问题。

---[end]

---[证明: 等正态高斯过程的存在性]

设 $\{e_i\}_{i\in\mathbb{N}}$ 是 $\mathbb{H}$ 的一组标准正交基，并设 $(X_i)_{i\in\mathbb{N}}$ 是独立同分布的 $\mathcal{N}(0,1)$ 随机变量。<br>
对于 $h \in \mathbb{H}$，定义
$$
W_h^{(n)} = \sum_{i=1}^n \langle h, e_i \rangle X_i.
$$

每一项都是均值为零的高斯随机变量。由帕塞瓦尔恒等式，
$$
\sum_{i=1}^\infty E(\langle h, e_i \rangle X_i)^2
= \sum_{i=1}^\infty \langle h, e_i \rangle^2
= \|h\|^2 < \infty.
$$

由辛钦–柯尔莫哥洛夫定理，$W_h^{(n)}$ 几乎处处收敛且在 $\mathcal{L}^2$ 中收敛到某个极限 $W_h$。

定义 $\mathbb{W} = (W_h)_{h\in\mathbb{H}}$。则
$$
E W_h = 0, \qquad
E W_h^2 = \|h\|^2.
$$

由于 $W_h^{(n)} \Rightarrow \mathcal{N}(0,\|h\|^2)$，可得
$$
W_h \sim \mathcal{N}(0,\|h\|^2).
$$

线性性可由直接计算得到：
$$
W_{h_1} + W_{h_2} = W_{h_1 + h_2}, \qquad
c W_h = W_{c h}.
$$

因此，任意有限线性组合都是高斯随机变量；对于协方差，有
$$
\begin{aligned}
Cov(W_h, W_g)
&= \frac12\big(\|h+g\|^2 - \|h\|^2 - \|g\|^2\big) \\
&= \langle h, g \rangle.
\end{aligned}
$$

因此，$\mathbb{W}$ 是一个等正态高斯过程。<br>
证毕。

---[end]

---[备注: 涉及的技术工具]

1. 希尔伯特空间结构
2. 帕塞瓦尔恒等式
3. 辛钦–柯尔莫哥洛夫定理
4. 高斯序列的弱收敛（例 6.5）

---[end]

---[陈述: 初级布朗运动]

在证明 $[0,\infty)$ 上布朗运动的存在性之前，我们先引入 **初级布朗运动（baby Brownian motion）**。

**定义 1.3**<br>
概率意义下的初级布朗运动是一个高斯过程 $\mathbb{Y} = (Y_t)_{t\in[0,1]}$，满足
$$
E Y_t = 0, \qquad
Cov(Y_s, Y_t) = s \quad (0 \le s \le t \le 1).
$$

给定这样一个过程，定义
$$
X_t = \frac{1}{1+t} Y_{\frac{t}{1+t}} - t Y_1, \qquad t \ge 0.
$$
则 $(X_t)$ 是 $[0,\infty)$ 上的布朗运动。

---[end]

---[陈述: 初级布朗运动的级数构造]

**定理**<br>
设 $(X_n)_{n\in\mathbb{N}}$ 是独立同分布的 $\mathcal{N}(0,1)$ 随机变量，并设 $(e_n)_{n\in\mathbb{N}}$ 是 $L^2([0,1])$ 的一组标准正交基。则
$$
Y_t = \sum_{i=1}^\infty \langle 1_{[0,t]}, e_i \rangle X_i
$$
定义了一个概率意义下的初级布朗运动。

---[end]

---[证明: 通过等正态高斯过程构造初级布朗运动]

令 $\mathbb{H} = L^2([0,1])$ 且 $h_t = 1_{[0,t]}$。则 $Y_t = W_{h_t}$，其中 $\mathbb{W}$ 是 $\mathbb{H}$ 上的等正态高斯过程。

由于 $\mathbb{W}$ 是高斯过程，
$$
E Y_t = 0,
$$
并且
$$
Cov(Y_s, Y_t)
= \langle h_s, h_t \rangle
= \int 1_{[0,s]} \, d\lambda
= s \quad (s \le t).
$$

因此，$\mathbb{Y}$ 是一个初级布朗运动。

---[end]

---[直觉: 布朗桥]

**布朗桥（Brownian bridge）** 是一个高斯过程 $\mathbb{Y} = (Y_t)_{t\in[0,1]}$，满足
$$
E Y_t = 0, \qquad
Cov(Y_s, Y_t) = s(1-t).
$$

它几乎处处满足 $Y_0 = Y_1 = 0$，因此也被称为“两端固定的布朗运动”（tied-down Brownian motion）。

---[end]

---[备注: 三种过程之间的关系]

如果 $\mathbb{X} = (X_t)_{t\in[0,1]}$ 是一个初级布朗运动，那么
$$
Y_t = X_t - t X_1
$$
定义了一个布朗桥。

因此，布朗运动、初级布朗运动和布朗桥可以相互构造。

---[end]
