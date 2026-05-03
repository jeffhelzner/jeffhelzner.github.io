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

The first series argued that decision quality under uncertainty cannot be reduced to outcomes or labeled accuracy. If a decision maker chooses before the uncertainty is resolved, then an evaluation has to ask something about the quality of the choice given what was knowable at the time. If the decision maker is supposed to combine beliefs and preferences in a principled way, then we also need to say what that principle is.

Subjective expected utility theory is one possible answer. On the SEU view, alternatives are evaluated by combining beliefs about possible consequences with utilities for those consequences. The alternative with the highest expected utility is the one favored by the standard.

But this immediately raises a practical problem. Real decision makers rarely satisfy an ideal standard exactly. Human decision makers make mistakes, attend unevenly, and respond to framing. AI systems may give answers that are approximately responsive to the relevant tradeoffs without behaving like perfect expected-utility maximizers. Human-machine processes may be more stable in some regions of a decision problem than in others.

So the useful question is not only:

> Does the decision maker satisfy SEU exactly?

It is also:

> How strongly do the decision maker's choices track SEU differences?

That second question is the entry point for the SEU Sensitivity framework.

## From a standard to a sensitivity question

Suppose a decision problem contains several alternatives. Each alternative has an expected utility according to the SEU standard. Some alternatives have higher expected utility than others. A perfectly SEU-maximizing decision maker would always choose an alternative with maximal expected utility, at least when the values are specified and there is a unique best alternative.

That gives us a clean reference point, but it is too rigid for many applied evaluations. If an AI system chooses a slightly lower expected-utility alternative in a close case, that departure is not necessarily as informative as choosing a much worse alternative in a high-stakes case. If two systems both make some departures from SEU, we may still want to know which one is more responsive to the expected-utility structure of the problem.

The SEU Sensitivity framework treats this as a graded relationship. It asks how choice probabilities change as expected utilities change.

The mathematical device used in the first foundational report is a softmax choice rule. In its abstract form, each alternative receives a value. The probability of choosing an alternative increases with that value, and a sensitivity parameter, called `alpha`, controls how sharply the probabilities concentrate on higher-valued alternatives.

When the value function is expected utility, `alpha` becomes a measure of sensitivity to SEU differences.

## What alpha means

In the model, `alpha` controls the relation between expected utility and choice.

When `alpha` is low, choices are only weakly related to expected utility. In the limiting case as `alpha` approaches zero, the model approaches uniform random choice among the available alternatives. Expected utility no longer makes much difference to what is chosen.

When `alpha` is high, choices become more sharply concentrated on alternatives with higher expected utility. In the limiting case as `alpha` grows without bound, the model approaches deterministic SEU maximization. If one alternative uniquely maximizes expected utility, it is chosen with probability approaching one.

Between those limits, the decision maker is neither random nor perfectly optimizing. The decision maker tends to choose higher expected-utility alternatives, but not with perfect consistency.

This is useful because many real evaluation problems live in that middle region. We do not expect the decision maker to be a theorem prover for SEU. But we may care whether its choices are mostly insensitive to expected-utility differences, moderately responsive, or highly concentrated on the alternatives favored by the standard.

The first foundational report establishes three basic properties of this setup.

First, holding expected utilities fixed, increasing `alpha` increases the probability assigned to expected-utility-maximizing alternatives and decreases the probability assigned to lower expected-utility alternatives.

Second, as `alpha` becomes very large, the model converges to expected-utility maximization.

Third, as `alpha` approaches zero, the model converges to random choice.

These properties are simple, but they do important interpretive work. They justify reading `alpha` as a sensitivity parameter rather than as an arbitrary fitting knob.

## Why scale matters

There is one important complication. Utility scales are not unique. If a utility function represents the same preferences after being stretched or shifted, then the numerical size of utility differences is not meaningful until a scale has been fixed.

That matters because `alpha` multiplies expected utility differences. If we double every utility difference, we can offset that by cutting `alpha` in half. The model could produce the same choice probabilities with a different utility scale and a different sensitivity value.

The framework resolves this by standardizing utilities to the interval from 0 to 1. The worst consequence receives utility 0, the best consequence receives utility 1, and intermediate consequences fall between them. This is a familiar decision-theoretic convention, and it gives `alpha` a stable interpretation.

With utilities standardized, expected utilities also lie between 0 and 1. Then `alpha` can be read as the log-odds change associated with a one-unit difference in standardized expected utility. Since a one-unit difference is the largest possible expected-utility difference under this convention, `alpha` tells us how much the model favors the better alternative across the full standardized range.

For a reader who does not need the algebra, the practical point is enough: the framework fixes the utility scale so that sensitivity estimates are comparable and interpretable.

## What the model is describing

It is important not to overread the framework.

The model does not claim that the decision maker consciously computes expected utilities. It does not claim that an AI system has beliefs and preferences in the same sense a person might. It does not provide a psychological or mechanistic account of deliberation. It specifies a probabilistic relationship between the expected-utility ranking supplied by the model and the choices we observe.

That makes the framework an as-if model. We ask whether the decision maker's behavior can be described as if it were generated by a process that is committed to SEU maximization but has limited sensitivity to the implications of that commitment.

One helpful analogy from the first foundational report is the distinction between commitment and performance. A person may be committed to arithmetic while sometimes making arithmetic errors. The errors do not show that the person rejects arithmetic as a standard. They show imperfect performance relative to the standard.

Similarly, if SEU is used as the reference standard, `alpha` can be understood as measuring performance relative to that standard. Low sensitivity does not necessarily mean the decision maker has a rival theory of choice. It means the observed choices are weakly aligned with the SEU ranking.

That distinction matters for AI evaluation. A system may be prompted, designed, or institutionally deployed in a way that makes SEU-like reasoning the relevant standard. But its observed outputs may only partially track that standard. Sensitivity gives us a way to describe that partial tracking.

## Why this is not just accuracy in different clothes

The sensitivity question differs from ordinary accuracy because it uses the structure of the decision problem.

An accuracy score asks how often the decision maker matched a label or benchmark. A sensitivity estimate asks how strongly choices respond to expected-utility differences. These can come apart.

A system might match many labels because most cases are easy, while still being poorly sensitive in the hard cases where tradeoffs matter. Another system might disagree with some historical labels while being more consistently responsive to the stated decision standard. Two systems might have similar accuracy but different sensitivity: one may choose the SEU-favored alternative reliably when the expected-utility gap is large, while another may be unstable across both close and clear cases.

This is why the framework is especially relevant for AI-assisted decisions under uncertainty. We often care not only about whether the system got a case right in retrospect, but whether its choices moved appropriately as probabilities, consequences, and utilities changed.

## The bridge to estimation

So far, the story is conceptual. If expected utilities are known and choices are observed, `alpha` gives us a way to express how strongly choices track expected utility differences.

But applications are not that simple. We do not observe a decision maker's subjective probabilities directly. We do not observe its utility function directly. We observe choices across a set of decision problems. From those choices, we need to estimate the quantities that connect the decision maker to the SEU standard.

That requires a statistical model.

The second foundational report turns the abstract framework into a concrete Bayesian implementation. It specifies how features of alternatives map to subjective probabilities, how ordered utilities are represented on the 0-to-1 scale, how expected utilities are computed, and how observed choices are treated as evidence about `alpha` and the other model parameters.

The next post explains that measurement setup at a high level. The central point is that sensitivity is not a score directly read off from a decision maker. It is an uncertain estimate from finite observed choices.

## Sources

This post draws primarily on the first foundational report of the SEU Sensitivity project: [Abstract Formulation of the SEU Sensitivity Model](https://jeffhelzner.github.io/seu-sensitivity/foundations/01_abstract_formulation.html). The implementation details discussed next are developed in [Concrete Implementation: The m_0 Stan Model](https://jeffhelzner.github.io/seu-sensitivity/foundations/02_concrete_implementation.html).