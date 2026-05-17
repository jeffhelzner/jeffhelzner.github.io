---
title: "From Decision Quality to SEU Sensitivity"
date: 2026-05-24
author: "Jeff Helzner"
slug: "seu-sensitivity-foundations-part-1-decision-quality-to-sensitivity"
description: "How the SEU Sensitivity framework turns a stated decision standard into a graded measure of how consistently choices track expected utility."
summary: "Once SEU is used as a reference standard, the useful question is not only whether choices satisfy it exactly. It is how strongly choices move with expected utility differences."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","evaluation","series:seu-sensitivity-foundations"]
series: "Foundations of SEU Sensitivity"
part: 1
draft: true
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/seu-sensitivity-foundations-01-decision-quality-to-sensitivity.html">
        <meta name="robots" content="noindex, nofollow">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "From Decision Quality to SEU Sensitivity",
          "description": "How the SEU Sensitivity framework turns a stated decision standard into a graded measure of how consistently choices track expected utility.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-05-24",
          "dateModified": "2026-05-02",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-foundations-01-decision-quality-to-sensitivity.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "AI decision evaluation", "subjective expected utility", "softmax choice", "uncertainty"]
        }
        </script>
---

::: {.series-nav}
**Foundations of SEU Sensitivity** · Part 1 of 3  
Part 1 · [Part 2](seu-sensitivity-foundations-02-estimating-sensitivity-from-choices.html) · [Part 3](seu-sensitivity-foundations-03-when-measurement-is-meaningful.html)
:::

The first series began from a familiar point in decision analysis: the quality of a decision is not reducible to its outcome. The point is older than the SEU framework and applies to decision making in general, not specifically to decision making under uncertainty. What the first series did was draw out its relevance to the *evaluation of decision makers* — AI or human — and to argue that any such evaluation has to specify, in advance, the standard against which choices will be assessed.

The standard adopted across this project is *subjective expected utility theory*. SEU is not just one option in a list; it is the culmination of a long tradition that began with expected-value maximization, was refined into expected-utility maximization to handle attitudes toward risk (von Neumann and Morgenstern), and was given its mature subjective form by Savage. On this view, alternatives are evaluated by combining the decision maker's beliefs about possible consequences with the decision maker's utilities for those consequences. The alternatives with the highest subjective expected utility — possibly more than one, if there are ties — are the ones endorsed by the standard.

But this immediately raises a practical problem. Decision makers rarely satisfy an ideal standard exactly. Human decision makers make mistakes, attend unevenly, and respond to framing. AI systems may give answers that are approximately responsive to the relevant tradeoffs without behaving like perfect expected-utility maximizers. Human-machine processes may be more stable in some regions of a decision problem than in others.

So the useful question is not only:

> Does the decision maker satisfy SEU exactly?

It is also:

> How strongly do the decision maker's choices track SEU differences?

That second question is the entry point for the SEU Sensitivity framework.

## From a standard to a sensitivity question

Suppose a decision problem contains several alternatives. Each alternative has an expected utility according to the SEU standard. Some alternatives have higher expected utility than others. A perfectly SEU-maximizing decision maker would always choose an alternative with maximal expected utility.

That gives us a clean reference point, but it is too rigid for many applied evaluations. If an AI system chooses a slightly lower expected-utility alternative in a close case, that departure is not necessarily as informative as choosing a much worse alternative in a high-stakes case. If two systems both make some departures from SEU, we may still want to know which one is more responsive to the expected-utility structure of the problem.

The SEU Sensitivity framework treats this as a graded relationship. It asks how choice probabilities change as expected utilities change.

The mathematical device used in the [first foundational report](https://jeffhelzner.github.io/seu-sensitivity/foundations/01_abstract_formulation.html) is a softmax choice rule. In its abstract form, each alternative receives a value. The probability of choosing an alternative increases with that value, and a sensitivity parameter $\alpha$ controls how sharply the probabilities concentrate on higher-valued alternatives.

When the value function is expected utility, $\alpha$ becomes a measure of sensitivity to SEU differences. Concretely, the [SEU specialization in Report 1](https://jeffhelzner.github.io/seu-sensitivity/foundations/01_abstract_formulation.html#seu-as-a-value-function) gives the choice probability for alternative $r$ in problem $m$ as

$$
\chi_{m,r} \;=\; \frac{\exp(\alpha \cdot \eta_r)}{\sum_{j \in \text{problem } m} \exp(\alpha \cdot \eta_j)},
\qquad
\eta_r \;=\; \psi_r^{\top} \upsilon \;=\; \sum_{k=1}^{K} \psi_{r,k}\, \upsilon_k,
$$

where $\psi_r$ is the decision maker's subjective probability distribution over the $K$ possible consequences of alternative $r$, $\upsilon$ is the utility vector over those consequences, and $\eta_r$ is the resulting expected utility. The displayed formula is the only formal object the rest of this post depends on; everything that follows is interpretive commentary on it.

## What α means

In the model, $\alpha$ controls the relation between expected utility and choice.

When $\alpha$ is low, choices are only weakly related to expected utility. In the limiting case as $\alpha$ approaches zero, the model approaches uniform random choice among the available alternatives. Expected utility no longer makes much difference to what is chosen.

When $\alpha$ is high, choices become more sharply concentrated on alternatives with higher expected utility. In the limiting case as $\alpha$ grows without bound, the model approaches deterministic SEU maximization. If one alternative uniquely maximizes expected utility, it is chosen with probability approaching one.

Between those limits, the decision maker is neither random nor perfectly optimizing. The decision maker tends to choose higher expected-utility alternatives, but not with perfect consistency.

This is useful because many real evaluation problems live in that middle region. We do not expect the decision maker to be a theorem prover for SEU. But we may care whether its choices are mostly insensitive to expected-utility differences, moderately responsive, or highly concentrated on the alternatives favored by the standard.

The first foundational report establishes [three basic properties](https://jeffhelzner.github.io/seu-sensitivity/foundations/01_abstract_formulation.html#fundamental-properties-of-softmax-choice) of this setup.

First, holding expected utilities fixed, increasing $\alpha$ increases the probability assigned to expected-utility-maximizing alternatives and decreases the probability assigned to lower expected-utility alternatives.

Second, as $\alpha$ becomes very large, the model converges to expected-utility maximization.

Third, as $\alpha$ approaches zero, the model converges to random choice.

These properties are simple, but they do important interpretive work. They justify reading $\alpha$ as a sensitivity parameter rather than as an arbitrary fitting knob.

![Three fundamental softmax properties: increasing sensitivity concentrates probability on the best alternative, very high sensitivity approaches deterministic optimization, and very low sensitivity approaches uniform random choice.](https://jeffhelzner.github.io/seu-sensitivity/foundations/01_abstract_formulation_files/figure-html/fig-three-properties-output-1.svg){#fig-softmax-three-properties fig-alt="Visual summary of the three core softmax properties. The left panel shows the probability of the value-maximizing alternative increasing as alpha increases. The middle panel illustrates convergence toward deterministic optimization as alpha becomes large. The right panel illustrates convergence toward uniform random choice as alpha approaches zero."}

## Why scale matters

There is one important complication. Utility scales are not unique. If a utility function represents the same preferences after being stretched or shifted, then the numerical size of utility differences is not meaningful until a scale has been fixed.

That matters because $\alpha$ multiplies expected utility differences. If we double every utility difference, we can offset that by cutting $\alpha$ in half. The model could produce the same choice probabilities with a different utility scale and a different sensitivity value.

The framework resolves this by standardizing utilities to the interval from 0 to 1. The worst consequence receives utility 0, the best consequence receives utility 1, and intermediate consequences fall between them. This is a familiar decision-theoretic convention, and it gives $\alpha$ a stable interpretation.

With utilities standardized, expected utilities also lie between 0 and 1. Then $\alpha$ can be read as the log-odds change associated with a one-unit difference in standardized expected utility. Since a one-unit difference is the largest possible expected-utility difference under this convention, $\alpha$ tells us how much the model favors the better alternative across the full standardized range.

For a reader who does not need the algebra, the practical point is enough: the framework fixes the utility scale so that sensitivity estimates are comparable and interpretable.

## What the model is describing

It is important not to overread the framework.

The model does not claim that the decision maker consciously computes expected utilities. It does not claim that an AI system has beliefs and preferences in the same sense a person might. It does not provide a psychological or mechanistic account of deliberation. It specifies a probabilistic relationship between the expected-utility ranking supplied by the model and the choices we observe.

That makes the framework an as-if model. We ask whether the decision maker's behavior can be described as if it were generated by a process that is committed to SEU maximization but has limited sensitivity to the implications of that commitment.

One helpful analogy, developed in Report 1's [commitment-and-performance discussion](https://jeffhelzner.github.io/seu-sensitivity/foundations/01_abstract_formulation.html#a-conceptual-lens-commitment-and-performance), is Isaac Levi's distinction between commitment and performance. A person may be committed to arithmetic while sometimes making arithmetic errors. The errors do not show that the person rejects arithmetic as a standard. They show imperfect performance relative to the standard.

Similarly, if SEU is used as the reference standard, $\alpha$ can be understood as measuring performance relative to that standard. Low sensitivity does not necessarily mean the decision maker has a rival theory of choice. It means the observed choices are weakly aligned with the SEU ranking.

That distinction matters for AI evaluation. A system may be prompted, designed, or institutionally deployed in a way that makes SEU-like reasoning the relevant standard. But its observed outputs may only partially track that standard. Sensitivity gives us a way to describe that partial tracking.

## Why this is not just accuracy in different clothes

The sensitivity question differs from ordinary accuracy because it uses the *structure* of the decision problem rather than only the chosen-vs.-correct label.

An accuracy score asks how often the decision maker picked the alternative that some benchmark calls correct. A sensitivity estimate asks how strongly choice probabilities respond to expected-utility differences across the entire choice set. The two answer different questions, and a system's score on one does not determine its score on the other.

A simple illustration. Consider a decision problem with three alternatives whose standardized expected utilities are $\eta_A = 0.80$, $\eta_B = 0.78$, and $\eta_C = 0.20$, and suppose the benchmark labels $A$ as correct. A system that always chooses $A$ scores 100% accuracy; so does a system that chooses $A$ when the gap to the runner-up is large but is equally likely to choose $A$ or $B$ when the top two are nearly tied — in this problem, both systems' choices typically agree with the label. Sensitivity discriminates between them. The first system behaves like a high-$\alpha$ chooser across the full set; the second behaves like a high-$\alpha$ chooser only when the expected-utility gap is large, and like a near-random chooser otherwise. Conversely, two systems can have very different accuracy scores against a particular benchmark and still have indistinguishable sensitivities — if the benchmark labels are noisy in cases where the SEU-favored alternative is itself ambiguous, agreement with the label is not the same thing as responsiveness to expected utility.

This is why the framework is especially relevant for AI-assisted decisions under uncertainty. We often care not only about whether the system got a case right in retrospect, but whether its choices moved appropriately as probabilities, consequences, and utilities changed. The [temperature study](https://jeffhelzner.github.io/seu-sensitivity/applications/temperature_study/01_initial_study.html) in the next series makes this concrete with real LLM choice data.

## The bridge to estimation

So far, the story is conceptual. If expected utilities are known and choices are observed, $\alpha$ gives us a way to express how strongly choices track expected utility differences. From here on, the discussion shifts from the abstract object $\alpha$ to its concrete realization in a Bayesian computational pipeline, and we will write `alpha` in the typewriter form the Stan code uses.

Applications are not as simple as the abstract story suggests. We do not observe a decision maker's subjective probabilities directly. We do not observe its utility function directly. We observe choices across a set of decision problems. From those choices, we need to estimate the quantities that connect the decision maker to the SEU standard.

That requires a statistical model.

The next post takes the first step. It turns the abstract framework above into a concrete Stan program — the `m_0` model — and, more importantly, *names the modeling choices the implementation commits us to*: how features of an alternative map to subjective probabilities, how ordered utilities are parameterized on the unit interval, and what priors are placed on `alpha`, on the feature-to-belief mapping, and on the utility increments. Each of these is a decision that could in principle have been made differently, and each one shapes what the eventual posterior over `alpha` is allowed to mean.

The post after that asks whether the resulting implementation is one we should trust. It walks through the modern Bayesian workflow as applied to `m_0` — prior predictive checks, parameter recovery, simulation-based calibration, and posterior predictive checks — because a posterior is only as good as the model that produced it. Sensitivity is not a score directly read off from a decision maker. It is an uncertain estimate from finite observed choices, and the trust we can place in that estimate has to be earned by checks of the model that produced it.

## Sources

This post draws primarily on the first foundational report of the SEU Sensitivity project: [Abstract Formulation of the SEU Sensitivity Model](https://jeffhelzner.github.io/seu-sensitivity/foundations/01_abstract_formulation.html). The implementation details discussed next are developed in [Concrete Implementation: The m_0 Stan Model](https://jeffhelzner.github.io/seu-sensitivity/foundations/02_concrete_implementation.html).