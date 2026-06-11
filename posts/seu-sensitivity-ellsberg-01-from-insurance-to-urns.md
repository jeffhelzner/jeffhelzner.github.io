---
title: "From Insurance to Urns: Background and the Ellsberg Paradigm"
date: 2026-06-08
author: "Jeff Helzner"
slug: "seu-sensitivity-ellsberg-part-1-from-insurance-to-urns"
description: "Bridging from the insurance applications series to a new task family — Ellsberg-style urn gambles — and setting out what this series does and does not measure."
summary: "The previous applications series found a clear temperature–sensitivity relationship for GPT-4o on an insurance triage task and no such relationship for Claude 3.5 Sonnet. The natural next question is whether either pattern travels to a different task family. Before answering it, the choice of Ellsberg-style urns as that new task family — and the scholarly weight Ellsberg's example carries — has to be set up carefully."
image: "https://jeffhelzner.github.io/assets/social-card.png"
tags: ["ai","decision-making","subjective-expected-utility","ellsberg","series:seu-sensitivity-ellsberg"]
series: "Applying SEU Sensitivity to Ellsberg-Style Decisions"
part: 1
draft: false
format:
  html:
    include-in-header:
      text: |
        <link rel="canonical" href="https://jeffhelzner.github.io/posts/seu-sensitivity-ellsberg-01-from-insurance-to-urns.html">
        <meta property="og:type" content="article">
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "From Insurance to Urns: Background and the Ellsberg Paradigm",
          "description": "Bridging from the insurance applications series to a new task family — Ellsberg-style urn gambles — and setting out what this series does and does not measure.",
          "author": {"@type": "Person", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/"},
          "datePublished": "2026-06-08",
          "dateModified": "2026-06-08",
          "image": "https://jeffhelzner.github.io/assets/social-card.png",
          "mainEntityOfPage": "https://jeffhelzner.github.io/posts/seu-sensitivity-ellsberg-01-from-insurance-to-urns.html",
          "isPartOf": {"@type": "Blog", "name": "Jeff Helzner", "url": "https://jeffhelzner.github.io/posts/"},
          "keywords": ["SEU sensitivity", "Ellsberg paradox", "ambiguity", "GPT-4o", "Claude 3.5 Sonnet", "AI decision evaluation", "Bayesian decision model"]
        }
        </script>
---

::: {.series-nav}
**Applying SEU Sensitivity to Ellsberg-Style Decisions** · Part 1 of 3  
Part 1 · Part 2 · Part 3
:::

The [previous applications series](seu-sensitivity-applications-01-temperature-as-methodological-probe.html) reported a pair of pilots in which the SEU Sensitivity framework was applied to real LLM choice data on an insurance claims triage task. The GPT-4o pilot found a clear broad decline in estimated sensitivity `alpha` as sampling temperature increased; a [follow-up Claude pilot on the same task](seu-sensitivity-applications-02-result-that-did-not-travel.html) showed no comparable pattern. The framework picked up a structured temperature–`alpha` relationship in one LLM and refused to support one in the other.

The natural next question is whether either result travels. A pattern detected in a single task family in a single LLM is, by itself, an existence claim. It says that the framework can identify a structured temperature effect when one is present, and it says that the effect is present in this particular combination of LLM, task, and design. It does not say anything about how task-specific or model-specific the effect is.

This series takes a step toward that question by running the same two LLMs on a different task family: Ellsberg-style urn gambles. The work is documented in three technical reports — [GPT-4o × Ellsberg](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html), [Claude × Ellsberg](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html), and a [Factorial Synthesis](https://jeffhelzner.github.io/seu-sensitivity/applications/factorial_synthesis/01_factorial_synthesis.html) — and the three blog posts in this series provide a high-level reading of them. The present post sets up the substantive choice of task family, the historical and interpretive weight that Ellsberg's example carries, and the scope of what this series does and does not measure. [Part 2](seu-sensitivity-ellsberg-02-prior-calibration-and-per-llm-results.html) takes up prior calibration, model checking, and the per-LLM results. [Part 3](seu-sensitivity-ellsberg-03-factorial-synthesis.html) reads the four cells of the resulting 2×2 design — LLM crossed with task — as a single comparative picture.

## Why Ellsberg-style urns

The choice of Ellsberg-style urn gambles as the next task family is partly methodological and partly substantive.

The methodological reason is structural transparency. An urn gamble describes a finite collection of balls of various colors and a payout rule that maps colors to monetary consequences. The expected utility of a gamble — to the extent that it can be computed at all — is determined by the stated ball counts and payouts; there is no domain expertise required to evaluate the alternatives, and no LLM-generated intermediate text whose semantic content must be reconstructed by the choice model. Insurance triage required a two-stage prompting pipeline in which the LLM produced its own assessment text for each claim, and that text then became the feature representation the choice model worked with. Urn gambles strip out that mediating layer. They are a useful counterpoint to insurance triage precisely because they put less of the alternative's structure into the LLM's own language.

The substantive reason is that Ellsberg's example sits at a famous edge of the SEU framework itself. The example was constructed to put pressure on Savage's axioms — specifically the sure-thing principle — by exhibiting a pattern of preferences that most subjects find intuitively defensible but that violates the principle, and so cannot be represented by any single subjective probability and utility pair. As a task family for an SEU sensitivity study, urn gambles therefore carry a kind of theoretical loading that insurance triage does not. They are stimuli that have been historically used to challenge the very standard the framework is built around.

That loading needs to be handled carefully. It would be easy to slip from "we ran an SEU sensitivity study on Ellsberg-style stimuli" into "we tested whether the LLM exhibits ambiguity aversion." The two are different. The next two sections separate them.

## Ellsberg's example and how to read it

Ellsberg's original example, as developed in Ellsberg (1961), involves urns whose color compositions are partly specified. In the canonical setup, one urn contains 30 red balls and 60 other balls of unknown black-or-yellow composition; subjects are asked to choose between bets that pay on the drawn color. The pattern of preferences that subjects typically report — preferring the bet on the color with the known proportion to the bet on the color with the unknown proportion, both when the win-paying color is red and when it is black — cannot be represented by any single subjective probability over the urn's composition. The pattern is a violation of the sure-thing principle.

How to interpret that violation is a separate question, and the answer one gives matters for how this series is to be read.

The reading most familiar in the behavioral decision-making literature is **psychological**: subjects exhibit "ambiguity aversion" — a preference for known probabilities over unknown ones, even when expected values are comparable — and that preference is a bias relative to a normative standard that the standard takes to be SEU. The behavioral literature (Camerer and Weber 1992; Trautmann and van de Kuilen 2015) has documented this pattern extensively, and a parallel theoretical literature has developed non-SEU representations — for example Gilboa and Schmeidler's (1989) maxmin expected utility and the α-MEU model of Ghirardato, Maccheroni, and Marinacci (2004) — that incorporate set-valued probabilities or explicit ambiguity-attitude parameters.

This is not, however, the reading Ellsberg himself gave. Ellsberg argued that the typical responses to his example could be defended on **normative** grounds — that they reflect a reasonable response to a poorly specified probabilistic environment rather than a psychological deviation from a fixed standard. The argument is developed in Ellsberg (1961) and at much greater length in Ellsberg (2001), *Risk, Ambiguity and Decision*. Reading the response pattern as a bias, on this view, takes for granted that SEU is the right standard against which to evaluate the choice. Ellsberg's claim is that it is not — or at least, not unrestrictedly.

A further interpretive option, due to Isaac Levi (1980, *The Enterprise of Knowledge*; 1986, *Hard Choices*), reads the typical Ellsberg responses as violations of the *completeness* assumption on the agent's preference ordering over acts rather than of the sure-thing principle. On Levi's account, an agent facing the Ellsberg urn need not have, and need not commit to having, a unique preference ranking over the two relevant bets in each comparison; what looks from the outside like a violation of the sure-thing principle can be reread as a refusal to break ties between acts the agent regards as not strictly comparable. The relevant Savage axiom on this reading is not P2 (the sure-thing principle) but the ordering axiom; the normative question becomes whether agents should be required to have complete preferences over arbitrary acts at all.

None of this is settled. The point of laying out the three readings here is not to adjudicate between them but to flag that the historical weight of Ellsberg's example does not reduce to a single psychological gloss. A study that runs an SEU sensitivity analysis on Ellsberg-style stimuli is doing something different from a study that tests for ambiguity aversion, and the difference is easy to lose track of if the only available framing is the behavioral one.

## What this series does and does not measure

The model fit in the studies covered by this series is the same `m_0`-family softmax-over-expected-utility model used in the previous applications series, with a recalibrated prior on `alpha` to accommodate the change in the consequence space (treated in [Part 2](seu-sensitivity-ellsberg-02-prior-calibration-and-per-llm-results.html)). It assumes point-valued subjective probabilities for every alternative, including ambiguous ones, and it pools across the gamble pool when fitting a single posterior on `alpha` per condition. What it estimates, per condition, is one quantity: overall sensitivity of the LLM's choices to expected utility differences under the model's representation of the alternatives.

This means three things explicitly.

First, the study does **not** test ambiguity aversion. Testing for ambiguity aversion requires a model that can distinguish ambiguity-driven choice from EU-driven choice — for example, a set-valued probability representation or a model with an explicit ambiguity-attitude parameter such as α-MEU. The point-valued-probability SEU model used here is, by assumption, of the wrong form to make that distinction. If the LLM weights ambiguous gambles differently from unambiguous ones, a pooled `alpha` will reflect a mixture rather than identify the mechanism.

Second, the study does not estimate a tier-specific sensitivity. The gamble pool is constructed with three ambiguity tiers (see the next section), but the primary analysis pools across them. The reports flag tier-stratified analysis as a priority for future work; it is not part of the picture presented here. The relevant discussions are in the [Claude × Ellsberg report (§0.8.4)](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html#ambiguity-tier-analysis) and the [GPT-4o × Ellsberg report (§0.8.5)](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html#connection-to-the-ambiguity-aversion-literature).

Third, the study does not make a claim about whether the typical Ellsberg-style response pattern is normatively defective. That question is one that the framework, as set up here, would have no leverage on: a study that takes SEU as its measurement device cannot use the resulting estimates to vindicate or refute the use of SEU as a normative standard. The substantive interpretive work, in the spirit of the previous applications series, is that `alpha` is informative about how strongly the choices concentrate on the alternative the model ranks highest in expected utility under a fixed reference standard. Whether that reference standard is the right one for these stimuli, on either psychological or normative grounds, is a separate question with its own substantial literature.

## The gamble pool

The two Ellsberg studies use the same pool of 30 distinct urn gambles, organized into three tiers along an ambiguity gradient. The full specification is in [§Alternative Pool](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html#alternative-pool) of the Claude × Ellsberg report. The structure is the following.

**Tier 1 (no ambiguity; gambles E01–E08).** All ball counts are explicitly stated. These function like risky alternatives with known objective probabilities. *Example (E01):* an urn contains 100 balls — exactly 40 red, 30 blue, 20 green, and 10 white. Drawing red pays \$3, blue pays \$1, green pays \$2, white pays \$0.

**Tier 2 (moderate ambiguity; gambles E09–E20).** Some ball counts are bounded by "at least" or "at most" constraints, but the urn total is always stated. *Example (E09):* an urn contains 90 balls — exactly 30 red; of the remaining 60, at least 15 are black and at least 15 are yellow, but the exact split is unknown.

**Tier 3 (high ambiguity; gambles E21–E30).** Only one color's count is known; the remainder is described as an unknown mixture, closest to Ellsberg's original setup. *Example (E21):* an urn contains 90 balls — exactly 30 are red; the remaining 60 are an unknown mixture of black and yellow.

The consequence space across all three tiers is `K = 4` — payouts of `$0`, `$1`, `$2`, and `$3`. This is one more consequence than the insurance task, where `K = 3` (forward to investigation, decline, hold). The expansion is not cosmetic: it changes the random-choice baseline from `1/3` to `1/4`, and so changes the value of `alpha` that corresponds to any given SEU-maximization rate. That is why the prior on `alpha` has to be recalibrated for the Ellsberg task; the calibration is the first item taken up in [Part 2](seu-sensitivity-ellsberg-02-prior-calibration-and-per-llm-results.html).

## Design parallels with the previous series

So that the Ellsberg results can be read as continuous with the insurance pair rather than as a different kind of study, the experimental design mirrors the previous applications series wherever it can.

Both Ellsberg studies use 100 base decision problems, each presented three times under different position orderings to address position bias, for 300 observations per temperature condition and 1,500 per study. Alternatives enter the choice model through the same two-stage feature pipeline used in the insurance pair: the LLM first assesses each gamble individually at the relevant temperature, the assessment text is embedded with `text-embedding-3-small`, and the pooled embeddings are projected via PCA to `D = 32` dimensions. The pool size is `R = 30` distinct gambles. Position counterbalancing records any unparseable responses as missing rather than coercing them into a default choice; missing rates are negligible in both studies (a single unparseable response out of 1,500 in the GPT-4o study, none in the Claude study).

The one substantive design difference, beyond the change of task family, is the same provider-side constraint that already shaped the Claude × Insurance study. The Anthropic API allows temperature in `[0.0, 1.0]`, while the OpenAI API allows `[0.0, 2.0]`. The GPT-4o × Ellsberg study uses the same five temperature levels as the initial GPT-4o study — `{0.0, 0.3, 0.7, 1.0, 1.5}` — while the Claude × Ellsberg study uses `{0.0, 0.2, 0.5, 0.8, 1.0}`. The narrower Claude grid cannot probe the high-temperature regime, which matters for cross-LLM slope comparisons and is treated explicitly in [Part 3](seu-sensitivity-ellsberg-03-factorial-synthesis.html). The full design tables are in [§Experimental Design](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html#experimental-design) of the Claude report and [§Experimental Design](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html#sec-design) of the GPT-4o report.

With the choice of task family motivated, the historical and interpretive context laid out, the scope of the analysis stated, and the design parallels established, the next step is the measurement device itself: a new prior calibrated to the `K = 4` setting, the validation that licenses comparing per-condition `alpha` posteriors, and the headline per-LLM results. [Part 2](seu-sensitivity-ellsberg-02-prior-calibration-and-per-llm-results.html) takes those up.

## Sources

This post draws on the [Ellsberg study](https://jeffhelzner.github.io/seu-sensitivity/applications/ellsberg_study/01_ellsberg_study.html) and [GPT-4o × Ellsberg study](https://jeffhelzner.github.io/seu-sensitivity/applications/gpt4o_ellsberg_study/01_gpt4o_ellsberg_study.html) reports, with background from the [foundations series](seu-sensitivity-foundations-01-decision-quality-to-sensitivity.html) and the previous [applications series](seu-sensitivity-applications-01-temperature-as-methodological-probe.html).

Key references on the Ellsberg example and its interpretations: Ellsberg (1961), "Risk, Ambiguity, and the Savage Axioms," *Quarterly Journal of Economics* 75(4): 643–669; Ellsberg (2001), *Risk, Ambiguity and Decision*; Levi (1980), *The Enterprise of Knowledge*; Levi (1986), *Hard Choices*; Gilboa and Schmeidler (1989), "Maxmin Expected Utility with Non-Unique Prior," *Journal of Mathematical Economics* 18(2): 141–153; Ghirardato, Maccheroni, and Marinacci (2004), "Differentiating Ambiguity and Ambiguity Attitude," *Journal of Economic Theory* 118(2): 133–173; Camerer and Weber (1992), "Recent Developments in Modeling Preferences: Uncertainty and Ambiguity," *Journal of Risk and Uncertainty* 5(4): 325–370.
