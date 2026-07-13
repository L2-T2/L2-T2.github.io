---
title: Brownian Motion - Existence Proof
date: 2026-02-06
layout: entry
slug: brownian-motion-existence-proof
lang: en
lang_path: ''
translation_key: brownian-motion-existence-proof
description: A construction-focused note on proving the existence of Brownian motion by reducing the problem to an isonormal Gaussian process and then passing through baby Brownian motion.
categories: [learning-journals]
tags:
  - Probability
  - Stochastic Processes
  - Brownian Motion
course: Probability Theory
---

This note records a clean existence route for Brownian motion. The strategy is to recast the covariance kernel as an inner product, build an isonormal Gaussian process on a Hilbert space, and then recover Brownian motion through the intermediate model of baby Brownian motion.

<!-- more -->

---[Statements: Core definition of Brownian motion]

We know the definition of Brownian motion as below:

**Definition 1.1**  
A probabilistic Brownian motion is a process on $[0,\infty)$, which is Gaussian with mean function  
$E X_t = 0 \; \text{for } t \ge 0$  
and covariance function  
$Cov(X_s, X_t) = \min\{s,t\}$ for $s,t \in [0,\infty)$.

---[end]

---[Remarks: Why existence is nontrivial]

In the initial stage of constructing Brownian motion, we merely defined the covariance structure it should satisfy. But we do not know whether it really exists, or is just a formalized ideal object.

Depending on the covariance function, we can do simulations on a grid, but this is only a discrete approximation on a finite grid. This leaves open several fundamental questions:

- Is the sample path continuous?
- Does it oscillate violently at arbitrarily small scales?
- Does the discrete approximation converge to a genuine limiting object?

Thus we must prove that a true random object exists in an appropriate function space corresponding to this formal description.

---[end]

---[Statements: Reduction to an isonormal Gaussian process]

We observe the covariance structure
$$
\min\{s,t\} = \langle 1_{[0,s]}, 1_{[0,t]} \rangle_{L^{2}[0,\infty)},
$$
which shows that the covariance of Brownian motion is an inner product of two vectors in an $L^{2}$ space.

This allows us to abstract the problem:

**Definition 1.2**  
On a Hilbert space $\mathbb{H}$, construct a Gaussian family $\{W(h) : h \in \mathbb{H}\}$ such that
$$
E[W(h)] = 0, \qquad
Cov(W(h), W(g)) = \langle h, g \rangle_{\mathbb{H}}.
$$

This is called an **isonormal Gaussian process**.

Thus, the existence of Brownian motion is reduced from a pathwise problem to the existence of a Gaussian structure on a Hilbert space.

---[end]

---[Proof: Existence of the isonormal Gaussian process]

Let $\{e_i\}_{i\in\mathbb{N}}$ be an orthonormal basis of $\mathbb{H}$, and let $(X_i)_{i\in\mathbb{N}}$ be i.i.d. $\mathcal{N}(0,1)$ random variables.  
For $h \in \mathbb{H}$, define
$$
W_h^{(n)} = \sum_{i=1}^n \langle h, e_i \rangle X_i.
$$

Each term is Gaussian with mean zero. By Parseval’s identity,
$$
\sum_{i=1}^\infty E(\langle h, e_i \rangle X_i)^2
= \sum_{i=1}^\infty \langle h, e_i \rangle^2
= \|h\|^2 < \infty.
$$

By the Khintchine–Kolmogorov theorem, $W_h^{(n)}$ converges almost surely and in $\mathcal{L}^2$ to a limit $W_h$.

Define $\mathbb{W} = (W_h)_{h\in\mathbb{H}}$. Then
$$
E W_h = 0, \qquad
E W_h^2 = \|h\|^2.
$$

Since $W_h^{(n)} \Rightarrow \mathcal{N}(0,\|h\|^2)$, we obtain
$$
W_h \sim \mathcal{N}(0,\|h\|^2).
$$

Linearity follows from direct computation:
$$
W_{h_1} + W_{h_2} = W_{h_1 + h_2}, \qquad
c W_h = W_{c h}.
$$

Hence any finite linear combination is Gaussian, and for covariance:
$$
\begin{aligned}
Cov(W_h, W_g)
&= \frac12\big(\|h+g\|^2 - \|h\|^2 - \|g\|^2\big) \\
&= \langle h, g \rangle.
\end{aligned}
$$

Therefore, $\mathbb{W}$ is an isonormal Gaussian process.  
Q.E.D.

---[end]

---[Remarks: Technical tools involved]

1. Hilbert space structure  
2. Parseval’s identity  
3. Khintchine–Kolmogorov theorem  
4. Weak convergence of Gaussian sequences (Example 6.5)

---[end]

---[Statements: Baby Brownian motion]

Before proving the existence of Brownian motion on $[0,\infty)$, we introduce **baby Brownian motion**.

**Definition 1.3**  
A (probabilistic) baby Brownian motion is a Gaussian process $\mathbb{Y} = (Y_t)_{t\in[0,1]}$ such that
$$
E Y_t = 0, \qquad
Cov(Y_s, Y_t) = s \quad (0 \le s \le t \le 1).
$$

Given such a process, define
$$
X_t = \frac{1}{1+t} Y_{\frac{t}{1+t}} - t Y_1, \qquad t \ge 0.
$$
Then $(X_t)$ is a Brownian motion on $[0,\infty)$.

---[end]

---[Statements: Series construction of baby Brownian motion]

**Theorem**  
Let $(X_n)_{n\in\mathbb{N}}$ be i.i.d. $\mathcal{N}(0,1)$ variables, and let $(e_n)_{n\in\mathbb{N}}$ be an orthonormal basis of $L^2([0,1])$. Then
$$
Y_t = \sum_{i=1}^\infty \langle 1_{[0,t]}, e_i \rangle X_i
$$
defines a probabilistic baby Brownian motion.

---[end]

---[Proof: Baby Brownian motion via isonormal process]

Let $\mathbb{H} = L^2([0,1])$ and $h_t = 1_{[0,t]}$. Then $Y_t = W_{h_t}$ where $\mathbb{W}$ is the isonormal Gaussian process on $\mathbb{H}$.

Since $\mathbb{W}$ is Gaussian,
$$
E Y_t = 0,
$$
and
$$
Cov(Y_s, Y_t)
= \langle h_s, h_t \rangle
= \int 1_{[0,s]} \, d\lambda
= s \quad (s \le t).
$$

Thus $\mathbb{Y}$ is a baby Brownian motion.

---[end]

---[Intuition: Brownian bridge]

A **Brownian bridge** is a Gaussian process $\mathbb{Y} = (Y_t)_{t\in[0,1]}$ with
$$
E Y_t = 0, \qquad
Cov(Y_s, Y_t) = s(1-t).
$$

It satisfies $Y_0 = Y_1 = 0$ almost surely, hence the name “tied-down Brownian motion”.

---[end]

---[Remarks: Relationship between the three processes]

If $\mathbb{X} = (X_t)_{t\in[0,1]}$ is a baby Brownian motion, then
$$
Y_t = X_t - t X_1
$$
defines a Brownian bridge.

Thus Brownian motion, baby Brownian motion, and Brownian bridge can all be constructed from one another.

---[end]
