---
title: Brownian Motion - Existence Proof
date: 2026-02-06
categories: [notes]
tags:
  - Probability
  - Stochastic Processes
  - Brownian Motion
course: 
---

# Brownian Motion

Existence of a probabilistic Brownian motion

<!-- more -->

## Statement: 核心定义 (Statements)

We know the definition of Brownian motion as below:

**Definition 1.1**:
A probabilistic brownian motion is a process on $[0,\infty)$, whichi is Gaussian with mean function $EX_{t} = 0\; \text{for}\; t \geq 0$ and covariance function $Cov(X_{s}, X_{t}) = \min\{s,t\}\; \text{for}\; s,t \in [0,\infty)$.

## Remarks:

In the initial stage of constructing Brownian motion, we merely defined the covariance structure it should satisfiy. But we do not know whether it really exists, or just a formalized ideal object.

Depends on the covariance function, we can do simulation on grid, but it is just a discrete approximation on a finite grid, which means we do not know:

- Is the sample path continuous?
- Does it osillate violently ar arbitrary small scales?
- Does the discrete approximation truly converge to a limiting object?

Now we need to prove there is a true random object exists in some space, corresponding to this formal content.

## Statement:

We find the covaraince structure $\min\{s,t\} = <1_{[0,s]}, 1_{[0,t]}>_{L^{2}[0,\infty)}$, which means the covariance of brownian motion is an inner product of two vectors in $L^{2}$ space.

Now we can abstract the question to:

**Definition 1.2**:
On a hilbert space, construct a Gaussian family $\{W(h), h\in \mathbb{H}\}$, satisfies

$$
E[W(h)] = 0\quad Cov(W(h), W(g)) = <h,g>_{H}
$$

this is the isonormal Guassian process.

So we transform the question of "whether Brownian motion exists" from path-level challenge into a natural result of Gaussian structure on a Hilbert space.

Now we need to prove the existence of the Gaussian isonormal process.

---

## Proof:

Define $n \in \mathbb{N}$, $h \in \mathbb{H}$, we have $W^{n}_{h} = \sum^{n}_{i=1} \langle h, e_{i} \rangle X_{i}$, where $\{e_{i}\}$ is the orthonormal basis.

THe individual terms in these sums are independent Gaussian variable, with mean zero. Using **Parseval's formula**, we find that

$$
\sum^{\infty}_{i=1} E(\langle h, e_{i} \rangle X_{i})^{2} = \sum^{\infty}_{i=1} \langle h, e_{i} \rangle^{2} = ||h||^{2} \lt \infty
$$

As this is finite, we can apply **Khintchine-Kolmogorov's theorem**, so there exists a limit variable, such that $W^{n}_{h} \rightarrow W_{h}\; a.s.\quad \text{and in}\; \mathcal{L}^{2}$.

Then we can get a process $\mathbb{W} = (W_{h})_{h \in \mathbb{H}}$. We claim that this process is isonormal.

We have $E W_{h} = \lim\limits_{n \rightarrow \infty} EW^{n}_{h} = 0$ and $EW^{2}_{h} = \lim\limits_{n \rightarrow \infty}E(W^{n}_{h})^{2} = ||h||^{2}$.

From $W^{n}_{h} \rightarrow W_{h}\; a.s.$, we know $W^{n}_{h} \stackrel{\mathcal{D}}{\rightarrow} W_{h}$, and from example 6.5, we know that $W^{n}_{h} \stackrel{\mathcal{D}}{\rightarrow} \mathcal{N}(0, ||h||^{2})$. then $W_{h} \rightarrow \mathcal{N}(0, ||h||^{2})$.

Next, to observe the map: $h \mapsto W_{h}$ is linear, which means

$$
W_{h_{1}} + W_{h_{2}} = W_{h_{1} + h_{2}}\quad c \cdot W_{h} = W_{c \cdot h}
$$

We can prove this by calculation.

Depends on the linear combination $\sum^{k}_{j = 1}c_{j}W_{h_{j}} = W_{\sum^{k}_{j=1}c_{j}h_{j}}$, the process is Gaussian as desired.

Now about the covariance structure, we know: $Cov(X,Y) = \frac{1}{2}(V(X+Y) - V(X) - V(Y))$. Then we can have:

$$
\begin{aligned}
Cov(W_{h},W_{g}) &= \frac{1}{2}(V(W_{h+g}) - V(W_{h}) - V(W_{g}))\\
&= \frac{1}{2}(||h+g||^{2} - ||h||^{2} - ||g||^{2})\\
&= \langle h, g \rangle\\
\end{aligned}
$$

Q.E.D.
---

## Remark:

1. Hilbert space:

2. Parseval's ormula:

3. Khintchine-Kolmogorov's theorem:

4. Example 6.5:


---

## Statement

Before we prove the existence of Brownian motion, we need to introduce a definition of Baby - Brownian motion.

**Definition 1.3**
A (probabilistic) baby - Brownian motion is a Guassian process $\mathbb{Y}_{t} = (Y_{t})_{t \in [0,1]}$ on $[0,1]$ with

$$
E Y_{t} = 0\quad \text{for}\; t \in [0,1] \qquad Cov(Y_{s}, Y_{t}) = s\; \text{for}\; 0 \leq s \leq t \leq 1
$$

If we have a baby - Brownian motion, we can define $X_{t} = \frac{1}{1+t} Y_{\frac{t}{1+t}} - tY_{1},\; \text{for} t \in [0, \infty)$. Because $\frac{t}{1+t} \in [0,1]$ and this is a linear combination, then $X_{t}$ is Brownian motion.

**Theorem**:
Let $(X_{n})_{n \in \mathbb{N}}$ be a sequence of independent $\mathcal{N}(0,1)$ - distributed real-valued variables. Let $(e_{n})_{n \in \mathbb{N}}$ be an orthonormal basis of $L^{2}(\mathbb{R}, \mathbb{B}, \lambda)$ where $\lambda$ is the restriction of the Lebesgue measure to $[0,1]$. Then

$$
Y_{t} = \sum^{\infty}_{i=1} \langle 1_{[0,t]}, e_{i} \rangle X_{i},\quad \text{for}\; t \in [0,1]
$$

is a well-defined probabilistic baby - Brownian motion.

---

## Proof:

Let $\mathbb{H} = L^{2}(\mathbb{R}, \mathbb{B}, \lambda),\; \text{for}\; t \in [0,1]$, we let $h_{t} = 1_{[0,t]}$. Then $h_{t} \in \mathbb{H},\; h_{t} = W_{h_{t}}$ where $\mathbb{W} = (W_{h})_{h \in \mathbb{H}}$ is isonormal process.

As $\mathbb{W}$ is Gaussian, then $\mathbb{Y}$ is also Gaussian. we have

$$
\begin{aligned}
E Y_{t} &= E W_{h_{t}} = 0\\
Cov(Y_{s}, Y_{t}) &= Cov(W_{h_{s}}, W_{h_{t}}) = \langle h_{s}, h_{t} \rangle = \int 1_{[0,s]} 1_{[0,t]} d \lambda = \int 1_{[0,s]} d \lambda = s\; (s \leq t)\\
\end{aligned}
$$

so $\mathbb{Y}$ is indeed a probabilistic baby - Brownian motion.

---

## Intuition:

### Example 1: Brownian bridge

Brwoian bridge is a Gaussian process $\mathbb{Y} = (Y_{t})_{t \in [0,1]}$ on $[0,1]$ with mean function

$$
E Y_{t} = 0\quad \text{for}\; t \in [0,1]
$$

and covariance function 

$$
Cov(Y_{s}, Y_{t}) = s(1-t)\quad \text{for}\; 0 \leq s \leq t \leq 1
$$


In addtion to $Y_{0} =0\; a.s.$, we have that $Y_{1} = 0\; a.s.$. For this reason a Brownian motion is often reffered to as a tied-down Brownian motion.

---

## Remark:

We can generate a Brownian bridge from a baby - Brownian motion, if $\mathbb{X} = (X_{t})_{t \in [0,1]}$is a baby - Brownian motion, it is easy to see that

$$
Y_{t} = X_{t} - tX_{1}\quad \text{for}\; t \in [0,1]
$$

where $\mathbb{Y} = (Y_{t})_{t \in [0,1]}$ is a Brownian bridge.

So if we have one of Brownian motion, baby-Brownian motion and Brownian bridge, we can generate the other two.