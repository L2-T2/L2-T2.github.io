---
title: "The KBC Void Hypothesis: Do We Live in a Giant Local Underdensity?"
date: 2026-07-13
updated: 2026-07-16
layout: entry
slug: kbc-void-hypothesis-review
lang: en
lang_path: ''
translation_key: kbc-void-hypothesis-review
description: "If the Milky Way sits inside an underdense region hundreds of megaparsecs across, how would that affect our measurements of cosmic expansion? This essay follows four lines of evidence: galaxy counts, BAO, direct distances, and cosmic variance."
subtitle: "From a shortage of nearby galaxies to the question of whether local structure can explain the Hubble tension"
categories: [essay]
tags: [Cosmology, Cosmic Voids, Hubble Constant, Observational Cosmology]
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

“We live inside a cosmic void” is an irresistible sentence, and a dangerously misleading one. It sounds as if the Milky Way were surrounded by emptiness, or as if Earth had somehow regained a privileged place in the Universe. The KBC void hypothesis makes a more restrained claim: averaged over a region hundreds of megaparsecs around us, is the matter density lower than the cosmic mean measured farther away?

The question matters for more than our sense of cosmic address. Many local measurements of the expansion rate use the distances and redshifts of nearby galaxies. If our neighbourhood is sufficiently large and underdense, the coherent outflow it generates could raise the locally inferred Hubble constant, H₀. A problem in large-scale structure would then become entangled with one of modern cosmology’s best-known disputes: the Hubble tension.

![Artist’s impression of the KBC void](/images/kbc-void-hypothesis-review/third_party_kbc_void_wikimedia.png)

*This is an artist’s impression, not a survey map. The unmodified original is by Pablo Carlos Budassi, via Wikimedia Commons, and is used under CC BY-SA 4.0. [^img-kbc]*

A “<span id="void-meaning">void</span>” here is not a vacuum. It is a region whose mean density falls below the cosmic average. The strong version often discussed has a radius of roughly **300 Mpc** and an average underdensity of about **20%**. Observations give us good reason to investigate some degree of local underdensity. Whether it is really this large and deep—and whether it can explain the whole H₀ tension—are much stronger claims.

> [!NOTE|A Void Is Not Empty|#void-meaning]

> Cosmic voids still contain galaxies, gas, and dark matter. The word describes a deficit relative to the cosmic mean, not zero matter. A 20% underdensity would still contain roughly 80% of the mean matter density.

My present view is therefore deliberately layered: **there is substantial observational motivation for some local underdensity; there is no consensus that we inhabit a 300 Mpc-radius KBC supervoid capable of resolving the Hubble tension.** The interesting part is not betting on “real” or “not real,” but watching different observations force the hypothesis to change shape.

<!-- more -->

![A reading map of the evidence in this essay](/images/kbc-void-hypothesis-review/selfdrawn_reading_order_en.png)

*This original diagram shows the route through the evidence: from the observational case for an underdensity, through its expected distance and velocity signatures, to the question of theoretical plausibility. It is not a publication timeline.*

## 1. One Name, Three Different Claims

Debates over the KBC void often become confused because three claims of very different strength are compressed into a single sentence:

| Claim | The actual question | Character of the evidence |
|---|---|---|
| **Our neighbourhood is relatively underdense** | Are the local galaxy or near-infrared luminosity densities lower than those farther away? | Supported by several observations |
| **A strong KBC-scale void exists** | Does the deficit extend to roughly 300 Mpc in radius and reach about 20%? | Some support, but direct-distance constraints push back |
| **It resolves the H₀ tension** | Can the resulting velocity field reconcile measurements near 67.4 and 73.0 km/s/Mpc? | Very difficult within standard ΛCDM |

The first claim does not imply the second, and the second does not imply the third. Many papers that appear to contradict one another are actually testing different rows of this table.

There is another recurring misconception. If we <span id="center-anchor">live somewhere inside a large underdensity</span>, have we placed Earth back at the centre of the Universe? No. A finite density fluctuation may have a local centre without the Universe having a global one. The meaningful constraint is observational: if we were too far off-centre, velocities and distances would become too anisotropic across the sky.

> [!NOTE|Not the Centre of the Universe|#center-anchor]

> The cosmological principle says that the Universe is statistically homogeneous on sufficiently large scales; it does not require every finite region to have exactly the same density. Living inside a fluctuation is ordinary. The question is how extreme that fluctuation can be.

The names are worth separating as well. **KBC Void** comes from Keenan, Barger, and Cowie. **Local Hole** is often used for the same proposed large-scale underdensity. The capitalised **Local Void**, however, commonly refers to a different and smaller structure near the Milky Way. [^wiki-localhole]

## 2. Why Suspect a Shortage of Nearby Galaxies?

On large enough scales the Universe approaches homogeneity, but galaxies are not spread through it like grains in a uniform fog. Matter collects along filaments and walls; clusters form at their intersections; underdense regions fill much of the intervening volume. Voids are not exceptions to the cosmic web but one of its normal components. [^void-review]

![Simulation of the cosmic web](/images/kbc-void-hypothesis-review/third_party_cosmic_web_nasa.jpg)

*A NASA/Hubble visualisation of a cosmic-web simulation. Bright nodes represent galaxies and purple filaments trace intergalactic matter. It provides context, not an observation of the KBC void. [^img-nasa]*

The KBC name originates in a 2013 study by Keenan, Barger, and Cowie. Combining UKIDSS, 2MASS, SDSS, 2dFGRS, 6dFGRS, 2MRS, and GAMA, they traced the K-band luminosity density as a function of redshift. They found a relatively low luminosity density in the local Universe at `z < 0.07`; beyond `z > 0.1`, the inferred density rose to roughly **1.5 times** the local value. [^keenan2013]

This is not a claim that a few galaxies are missing next door. It concerns <span id="scale-anchor">a scale of hundreds of megaparsecs</span>. A distance of 300 Mpc is about **980 million light-years**. If that number is a radius, the proposed structure would span nearly two billion light-years from edge to edge—local relative to the observable Universe, but enormous relative to galaxies and clusters.

> [!NOTE|How Large Is 300 Mpc?|#scale-anchor]

> One megaparsec is about 3.26 million light-years, so light takes roughly 980 million years to cross 300 Mpc. The scale is inferred through redshifts, distance models, and a density profile; it is not a sharply visible spherical boundary.

The 2013 signal could still have reflected limited sky coverage or survey selection. Wong and collaborators extended the analysis in 2022 to about **90% of the sky**, combining 2MRS, 2M++, and 2MASS. They reported a **21–22%** deficit in galaxy number density at `z < 0.075`, while 2MASS counts gave an underdensity of roughly **20 ± 2%**. Their estimated impact on the local H₀ was about **2–3%**. [^wong2022]

Together, these studies supply the hypothesis’s most intuitive starting point: once we look beyond a certain local volume, there appears to be more near-infrared galaxy light. But one bridge cannot be skipped. <span id="tracer-anchor">Galaxies and starlight are biased tracers of the total matter field</span>. Dark matter does not shine, and the efficiency of galaxy formation changes with environment. Converting a luminosity deficit into a mass deficit requires assumptions about galaxy bias, the luminosity function, K-corrections, redshift-space distortions, survey completeness, and galaxy evolution.

> [!NOTE|Galaxies Are Not Total Mass|#tracer-anchor]

> K-band light is a relatively stable tracer of older stellar populations, making it a useful proxy for stellar mass. It is still not a dark-matter map. “Twenty per cent fewer galaxies” and “twenty per cent less total matter” coincide only within a specified bias model.

![Comparison of the strong KBC scale and the scale preferred by direct distances](/images/kbc-void-hypothesis-review/selfdrawn_kbc_scale_schematic_en.png)

*Original scale schematic: the outer region represents the often-discussed 300 Mpc strong KBC model; the inner region represents the roughly 70 Mpc or smaller scales preferred by the direct-distance analysis discussed below. This is neither a sky map nor a fitted profile.*

## 3. How an Underdensity Can Raise the Local H₀

The Hubble tension brought this galaxy-distribution problem into the spotlight. Planck 2018 data give `H₀ = 67.4 ± 0.5 km/s/Mpc` under baseline ΛCDM. The SH0ES Cepheid–SN Ia distance ladder gives `H₀ = 73.04 ± 1.04 km/s/Mpc`, a difference of roughly 6 km/s/Mpc that the latter analysis reports at about 5σ. [^planck][^sh0es]

Inside an underdense region, the greater density outside exerts a net gravitational pull on matter within, producing a coherent outward peculiar velocity. For a low-redshift galaxy, the idea can be written schematically as:

$$
cz \simeq H_{\mathrm{bg}}d + v_{\mathrm{pec,los}}.
$$

If the outflow systematically increases nearby galaxies’ observed redshifts, the <span id="h0-bias-anchor">locally inferred H₀ will be biased high</span> at a fixed independent distance `d`. The entire Universe need not be expanding faster; rather, a local velocity field has leaked into the signal used to estimate the background expansion.

> [!NOTE|The Bias Is Local|#h0-bias-anchor]

> Peculiar velocities matter most for nearby galaxies because the background Hubble flow is still small. Farther away, the same few hundred km/s becomes a minor fraction of the total redshift. A void-induced H₀ bias should therefore fade with distance.

![How the KBC void could affect H₀](/images/kbc-void-hypothesis-review/selfdrawn_h0_mechanism_en.png)

*Original mechanism diagram: an underdensity drives outflow, the outflow raises low-redshift recession velocities, and the apparent H₀ rises. A real inference also requires a density profile, distance-error model, selection function, and full covariance treatment.*

The appeal of this mechanism is easy to see. It can pull local and background measurements apart without immediately revising early-Universe physics. Yet it also creates a precise empirical obligation: an outflow strong enough to matter should leave mutually consistent traces in BAO, the supernova Hubble diagram, and direct-distance samples that do not use redshift as a distance proxy.

## 4. The 2025 Cross-Examination: BAO Offers Support, Direct Distances Tighten the Constraints

Two 2025 tests point in different directions and are most informative when read together. They are not simply a paper “for” the void and another “against” it. They use different rulers to question the same physical model.

**BAO probes the distance–redshift relation.** Banik and Kalaitzidis assembled roughly twenty years of baryon acoustic oscillation measurements. BAO preserves a statistical standard ruler left by sound waves in the early Universe. One commonly used isotropic compression is:

$$
D_V(z)=\left[D_M^2(z)\frac{cz}{H(z)}\right]^{1/3}.
$$

They compared an underdensity of about **20%**, extending to roughly **300 Mpc**, with a homogeneous Planck-background model. Across 42 isotropically averaged `D_V` measurements, they report `χ² = 75.7` for the no-void model and `χ² = 47.3–51.2` for their void profiles. Under their statistical treatment, the overall tension falls from about 3.3σ to roughly 1.1–1.4σ. [^bk2025]

That is important evidence in favour of the model, but <span id="bao-proxy-anchor">BAO is not a photograph of a void</span>. `D_V` compresses angular and radial information into one quantity. The measurements also come from several generations of surveys, so sample overlap, covariance, and systematics affect the model comparison. When transverse and radial BAO are considered separately, the contrast is weaker than it is in compressed `D_V`.

> [!NOTE|BAO Measures an Effect, Not the Void Itself|#bao-proxy-anchor]

> BAO supplies a statistical standard ruler. In the equation, $D_M$ is the transverse comoving distance and $H(z)$ is the expansion rate at redshift $z$; $D_V$ compresses transverse and radial information into one average distance. It asks whether the distance–redshift relation bends as a void model predicts, but it does not directly reveal how much dark matter the region contains. BAO and galaxy counts are complementary rather than redundant.

**Direct distances probe the velocity field.** Stiskalek, Desmond, and Banik instead used CosmicFlows-4 Tully–Fisher distances in a galaxy-by-galaxy forward model. The Tully–Fisher relation estimates the distance to a spiral galaxy from its rotation and luminosity without first treating redshift as distance. It therefore permits a direct comparison:

$$
v_{\mathrm{pec}}=cz-H_{\mathrm{bg}}d.
$$

The result is less friendly to the strong KBC model. Depending on the profile, the preferred scales are about **69, 61, and 34 cMpc (comoving megaparsecs)**, much smaller than the baseline scale used in Haslbauer–Banik–Kroupa-type models. Gaussian and Maxwell–Boltzmann profiles yield H₀ values near **70.4** and **70.2 km/s/Mpc**. An exponential profile reaches about **72.1 km/s/Mpc**, but the Bayesian evidence does not favour it. [^stiskalek2025][^haslbauer2020]

![Conceptual density profiles and H₀ bias](/images/kbc-void-hypothesis-review/selfdrawn_density_profile_concept_en.png)

*Original conceptual diagram: different density profiles produce different outflows and distance-dependent H₀ biases. The curves explain the structure of the model; they are neither data nor best fits from a paper.*

Together, the two studies identify a specific tension rather than the vague conclusion that “scientists disagree”: **a strong void can improve the low-redshift BAO distance relation, while the velocity field inferred from direct distances prefers a substantially smaller structure.** A viable model must pass both tests with the same density profile. It cannot choose a different convenient shape for each dataset.

## 5. Why Standard ΛCDM Says the Void Is “Not Empty Enough”

Even if the local region is somewhat underdense, we must still ask how likely such a fluctuation is in standard ΛCDM and how much it can move H₀. Huterer and Wu addressed the second question with theory estimates and large-scale-structure simulations. For the actual spatial distribution of Type Ia supernovae, they find a local-H₀ sample variance of about **0.31 km/s/Mpc**; perturbation theory gives roughly **0.4 km/s/Mpc**. Both are far smaller than the approximately 6 km/s/Mpc gap between Planck and SH0ES. [^hutererwu2023]

To create the whole difference through a void alone, they estimate that one would need an extreme structure with roughly `δ ≈ -0.8` over about `120 h⁻¹ Mpc`—equivalent, in their ΛCDM assessment, to a <span id="sigma-anchor">roughly 20σ cosmic-variance event</span>.

> [!NOTE|This 20σ Is Not a Detection|#sigma-anchor]

> Here 20σ means that a fluctuation this deep and large would be extraordinarily rare if ΛCDM correctly describes the statistics of density fluctuations. The density contrast is $\delta=(\rho-\bar{\rho})/\bar{\rho}$, so $\delta\approx-0.8$ means roughly 80% below the mean. The dimensionless Hubble parameter is $h=H_0/(100\,\mathrm{km\,s^{-1}\,Mpc^{-1}})$, which is why the physical size represented by $120\,h^{-1}\mathrm{Mpc}$ depends on $h$. This is not an instrument detecting the void at twenty-sigma significance.

Kenworthy, Scolnic, and Riess used the Type Ia supernova Hubble diagram in 2019 to constrain large local outflows capable of substantially shifting H₀. [^kenworthy2019] Such results argue primarily against the claim that an ordinary ΛCDM fluctuation can explain the entire tension. They do not rule out every degree of local underdensity.

> **The logical boundary matters:** detecting a local underdensity does not establish a 300 Mpc radius; establishing that scale does not explain the full H₀ offset, and neither result would show that standard ΛCDM produces the structure naturally.

Supporters therefore often move the discussion towards enhanced structure formation or Milgromian/MOND-like gravity. Haslbauer, Banik, and Kroupa explored the KBC void and Hubble tension in such a setting in 2020. [^haslbauer2020] This gives the hypothesis more explanatory room, but at a theoretical cost: the test is no longer only of one density profile, but of an entire account of gravity and structure formation.

## 6. Putting All the Evidence on One Map

A 2026 Perspective preprint by Banik, Desmond, Kalaitzidis, and Mazurenko presents the supporters’ most integrated narrative so far: galaxy counts indicate a local underdensity; the resulting outflow affects both low-redshift H₀ and BAO; and observations should return towards the Planck background at higher redshift. It also identifies fast radio bursts, redshift drift, the kinetic Sunyaev–Zel’dovich effect, and structure growth as future tests. [^banik2026]

![Evidence map for the KBC void](/images/kbc-void-hypothesis-review/selfdrawn_evidence_map_en.png)

*Original evidence map: the left side collects observations that motivate a local underdensity or a strong void; the right side collects tests of its velocity field, scale, and probability within ΛCDM.*

It is more useful to organise the literature by what each observation measures than to count papers on either side:

| Line of evidence | What it measures directly | Pressure on the hypothesis |
|---|---|---|
| Keenan et al. 2013 | Change in K-band luminosity density with redshift | Supports a deficit in nearby luminous matter |
| Wong et al. 2022 | Near-all-sky galaxy counts and redshift distribution | Supports a Local Hole beyond a small patch of sky; estimates a 2–3% H₀ effect |
| Banik & Kalaitzidis 2025 | Low-redshift BAO distance–redshift relation | Strong-void profiles improve the `D_V` fit |
| Stiskalek et al. 2025 | Velocity field inferred from Tully–Fisher direct distances | Prefers a scale near 70 Mpc or smaller, tightening the strong KBC model |
| Kenworthy et al. 2019 | Type Ia supernova Hubble diagram | Limits a local outflow large enough to shift H₀ substantially |
| Huterer & Wu 2023/2024 | Cosmic variance of local H₀ within ΛCDM | Finds ordinary fluctuations far too small to resolve the whole tension |
| Banik et al. 2026 | A unified model and predictions for several anomalies | Offers a testable framework, but may require non-standard structure formation |

This table also explains why “Has the KBC void been proven?” cannot be settled by one paper. Galaxy counts, BAO, and direct distances observe different projections of the same proposal. The evidential loop closes only if one density profile, one velocity field, and one cosmological background can account for all of them together.

## 7. My Current View: Keep the Conclusion Layered

I find a four-part assessment more honest than a single choice between belief and disbelief:

| Proposition | Current assessment | The main reason |
|---|---|---|
| Some local underdensity exists | **Well motivated observationally** | Near-infrared luminosity density and near-all-sky galaxy counts point in the same direction |
| The deficit has the strong KBC scale—about 300 Mpc and 20% | **Supported but unsettled** | BAO is favourable, while direct distances prefer a much smaller scale |
| It affects part of the low-redshift inference | **Plausible and testable** | Wong et al. estimate a 2–3% H₀ effect, and the velocity signature should depend on distance |
| It explains the entire H₀ tension within standard ΛCDM | **Currently implausible** | The required structure is too extreme, while direct-distance and supernova tests do not support the full amplitude |

The KBC void is therefore neither a “proven cosmic hole” nor an error that can be casually dismissed. It is better understood as a model under cross-examination. Galaxy counts brought it into court; BAO offered supporting testimony; direct distances and cosmic variance now demand a smaller scale, a different profile, or an admission that the void can explain only part of the anomaly.

That methodological role is, to me, the most valuable part of the story. An attractive explanation should not merely retell the anomalies that favour it. It should specify the observations that could make it fail. The KBC hypothesis will earn its place if it can compress a deficit in nearby galaxies, an unusual low-redshift distance relation, and a coherent outflow into one set of parameters—rather than adding a new exception whenever another dataset arrives.

## 8. What Future Result Would Actually Change the Verdict?

The next round of tests should move beyond counting galaxies again and towards independent measurements of mass, velocity, and distance:

1. **Larger direct-distance samples.** Tully–Fisher, the fundamental plane, surface-brightness fluctuations, the tip of the red-giant branch, and SNe Ia can reconstruct the three-dimensional peculiar-velocity field and test whether its radial shape matches a void.
2. **Separated low-redshift BAO tests.** DESI, Euclid, and Roman can improve the precision. Transverse and radial BAO supporting the same profile independently would be more persuasive than an improvement in `D_V` alone.
3. **The kinetic Sunyaev–Zel’dovich effect.** A coherent flow on enormous scales should imprint the motion of galaxy clusters relative to the CMB.
4. **Fast-radio-burst dispersion measures.** A large FRB sample could trace free-electron columns along many sightlines, mapping local baryons independently of starlight.
5. **Redshift drift and distance-binned H₀.** A void effect should fade with distance. If the local excess does not recede beyond the proposed boundary, a simple void model will struggle.

What would be decisive is not another significant anomaly in a single statistic, but convergence on the same three-dimensional picture. If galaxy counts, independent distances, BAO, and kSZ all select the same scale and depth, the KBC case will become powerful. If the signal survives only in one compressed observable, a systematic error or a modelling choice will remain the more economical explanation.

## 9. A Note on the Images

This essay uses two third-party images: the KBC void artist’s impression from Wikimedia Commons and the cosmic-web simulation from NASA/Hubble. Creator credits, source links, and licensing details appear in their captions and endnotes. The other five diagrams were created for this essay to explain the reading path, scale comparison, outflow mechanism, density profiles, and structure of the evidence; unless a caption says otherwise, they are conceptual illustrations rather than observations or published fits.

## References and Further Reading

[^bk2025]: Banik, I. & Kalaitzidis, V. (2025). “Testing the local void hypothesis using baryon acoustic oscillation measurements over the last 20 yr.” *MNRAS*, 540(1), 545–561. DOI: 10.1093/mnras/staf781. <https://academic.oup.com/mnras/article/540/1/545/8129689>; arXiv: <https://arxiv.org/abs/2501.17934>

[^stiskalek2025]: Stiskalek, R., Desmond, H. & Banik, I. (2025). “Testing the local supervoid solution to the Hubble tension with direct distance tracers.” *MNRAS*, 543(2), 1556–1573. DOI: 10.1093/mnras/staf1571. <https://doi.org/10.1093/mnras/staf1571>. The conclusion reports the preferred scales and inferred H₀ under different profiles; the direct-distance data generally favour scales much smaller than the baseline KBC/HBK20 model.

[^haslbauer2020]: Haslbauer, M., Banik, I. & Kroupa, P. (2020). “The KBC void and Hubble tension contradict ΛCDM on a Gpc scale—Milgromian dynamics as a possible solution.” *MNRAS*, 499(2), 2845–2883. DOI: 10.1093/mnras/staa2348. <https://doi.org/10.1093/mnras/staa2348>

[^keenan2013]: Keenan, R. C., Barger, A. J. & Cowie, L. L. (2013). “Evidence for a ~300 Mpc Scale Under-density in the Local Galaxy Distribution.” *The Astrophysical Journal*, 775, 62. DOI: 10.1088/0004-637X/775/1/62. arXiv: <https://arxiv.org/abs/1304.2884>

[^wong2022]: Wong, J. H. W., Shanks, T., Metcalfe, N., Whitbourn, J. R., et al. (2022). “The Local Hole: a galaxy under-density covering 90 per cent of sky to ≈200 Mpc.” *MNRAS*, 511(4), 5742–5755. DOI: 10.1093/mnras/stac396. <https://academic.oup.com/mnras/article/511/4/5742/6534633>; arXiv: <https://arxiv.org/abs/2107.08505>

[^hutererwu2023]: Huterer, D. & Wu, H.-Y. (2024). “Not empty enough: a local void cannot solve the H₀ tension.” In E. Di Valentino & D. Brout (Eds.), *The Hubble Constant Tension*, 391–401. Springer Nature Singapore. DOI: 10.1007/978-981-99-0177-7_21. Preprint (2023): <https://arxiv.org/abs/2309.05749>

[^kenworthy2019]: Kenworthy, W. D., Scolnic, D. & Riess, A. (2019). “The Local Perspective on the Hubble Tension: Local Structure Does Not Impact Measurement of the Hubble Constant.” *The Astrophysical Journal*, 875, 145. DOI: 10.3847/1538-4357/ab0ebf. <https://doi.org/10.3847/1538-4357/ab0ebf>

[^banik2026]: Banik, I., Desmond, H., Kalaitzidis, V. & Mazurenko, S. (2026). “The local void model for the Hubble and BAO tensions.” arXiv: <https://arxiv.org/abs/2602.03928>

[^planck]: Planck Collaboration (2020). “Planck 2018 results. VI. Cosmological parameters.” *Astronomy & Astrophysics*, 641, A6. arXiv: <https://arxiv.org/abs/1807.06209>

[^sh0es]: Riess, A. G. et al. (2022). “A Comprehensive Measurement of the Local Value of the Hubble Constant with 1 km/s/Mpc Uncertainty from the Hubble Space Telescope and the SH0ES Team.” *The Astrophysical Journal Letters*, 934, L7. arXiv: <https://arxiv.org/abs/2112.04510>

[^void-review]: van de Weygaert, R. & Platen, E. (2011). “Cosmic Voids: structure, dynamics and galaxies.” *International Journal of Modern Physics: Conference Series*. arXiv: <https://arxiv.org/abs/0912.2997>

[^wiki-localhole]: Wikipedia, “Local Hole.” Used only for terminology, not as primary scientific evidence. <https://en.wikipedia.org/wiki/Local_Hole>

[^img-kbc]: Wikimedia Commons, *File:Kbc void.png*. Author: Pablo Carlos Budassi. Original file used without modification. Source: <https://commons.wikimedia.org/wiki/File:Kbc_void.png>. License: <https://creativecommons.org/licenses/by-sa/4.0/>

[^img-nasa]: NASA Science / Hubble, “Mapping the Cosmic Web.” Visualisation: Frank Summers (STScI); simulation: Martin White and Lars Hernquist (Harvard). Source: <https://science.nasa.gov/mission/hubble/science/science-highlights/mapping-the-cosmic-web/>. NASA media-use guidance: <https://www.nasa.gov/nasa-brand-center/images-and-media/>

For broader background, see Peebles, *The Large-Scale Structure of the Universe*; Dodelson, *Modern Cosmology*; Ryden, *Introduction to Cosmology*; and Peacock, *Cosmological Physics*. These texts are useful for density contrast, linear perturbations, the cosmic web, and peculiar velocity fields.
