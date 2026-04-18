<style>
body {
    font-family: 'Georgia', 'Times New Roman', serif;
    line-height: 1.6;
    color: #2c3e50;
    max-width: 8.5in;
    margin: 0 auto;
    padding: 0.5in;
    background-color: #ffffff;
}

h1 {
    color: #1a365d;
    border-bottom: 3px solid #3182ce;
    padding-bottom: 10px;
    margin-bottom: 5px;
    font-size: 2.2em;
    font-weight: 600;
}

h2 {
    color: #2d3748;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 5px;
    margin-top: 30px;
    margin-bottom: 15px;
    font-size: 1.4em;
}

h3 {
    color: #1a365d;
    margin-bottom: 5px;
    font-size: 1.1em;
    font-weight: 600;
}

.contact-info {
    text-align: center;
    margin-bottom: 20px;
    color: #4a5568;
    font-size: 1.1em;
}

.contact-info a {
    color: #3182ce;
    text-decoration: none;
}

.contact-info a:hover {
    text-decoration: underline;
}

.job-header {
    background-color: #f7fafc;
    padding: 10px 15px;
    border-left: 4px solid #3182ce;
    margin: 15px 0 10px 0;
    border-radius: 0 5px 5px 0;
}

.company {
    font-weight: 600;
    color: #1a365d;
}

.date {
    color: #718096;
    font-style: italic;
    float: right;
}

.job-description {
    margin: 10px 0 20px 20px;
}

ul {
    margin: 10px 0;
    padding-left: 25px;
}

li {
    margin-bottom: 8px;
    color: #4a5568;
}

.education-item {
    margin-bottom: 8px;
    color: #4a5568;
}

.skills-section {
    background-color: #f7fafc;
    padding: 15px;
    border-radius: 5px;
    border-left: 4px solid #38a169;
}

.quote {
    font-style: italic;
    text-align: center;
    color: #2d3748;
    background-color: #edf2f7;
    padding: 15px;
    border-radius: 5px;
    margin-top: 20px;
    border-left: 4px solid #3182ce;
}

strong {
    color: #1a365d;
}

hr {
    border: none;
    height: 2px;
    background: linear-gradient(to right, #3182ce, #e2e8f0, #3182ce);
    margin: 20px 0;
}

@media print {
    /* Ensure Chrome doesn't add extra page margins; body padding controls layout */
    @page { size: letter; margin: 0; }

    body {
        font-size: 11pt;
        line-height: 1.4;
        margin: 0;
        padding: 0.5in; /* keep your current visual margins */
    }

    /* Prevent headings from dangling at the bottom of a page */
    h1, h2, h3 {
        page-break-after: avoid;
        break-after: avoid-page;
        break-inside: avoid;
    }

    /* Keep job sections, skills, quote, and education items together */
    .job-header,
    .job-description,
    .skills-section,
    .quote,
    .education-item,
    .contact-info {
        page-break-inside: avoid;
        break-inside: avoid;
    }

    /* Keep header with its following description */
    .job-header + .job-description {
        page-break-inside: avoid;
        break-inside: avoid;
    }

    /* Avoid breaking around horizontal rules */
    hr {
        page-break-after: avoid;
        break-after: avoid-page;
    }
}
</style>

# Jeff Helzner
<div class="contact-info">
<strong>Brooklyn, NY</strong> · <a href="mailto:jeffhelzner@gmail.com">jeffhelzner@gmail.com</a> · <a href="https://www.linkedin.com/in/jeff-helzner-109a5498">LinkedIn</a>
</div>

---

## Summary
I design data systems and decision frameworks that help insurance organizations make better underwriting, claims, and portfolio decisions by combining human judgment with algorithmic intelligence. My background combines formal training in mathematics, logic, and decision theory (Ph.D., Carnegie Mellon) with a decade as a philosophy professor at Columbia University and more than ten years building production data infrastructure, probabilistic models, and human-in-the-loop decision tools in the insurance industry.

My work spans the full data lifecycle — from data pipelines and models to dashboards and executive reporting — with a particular focus on systems that allow underwriters, adjusters, and portfolio managers to blend domain expertise with principled uncertainty quantification. I lead teams and partner with senior leadership to translate model outputs into auditable, decision-ready workflows.

---

## Experience

<div class="job-header">
<h3>Director of Data Strategy and Analytics</h3>
<span class="company">Berkley Enterprise Risk Solutions (a Berkley company)</span> <span class="date">March 2024 – Present</span>
</div>

<div class="job-description">
Lead the design and development of data systems, probabilistic models, and AI-powered tools that support underwriting and claims decisions. My role bridges data engineering and decision science, focusing on building systems that combine algorithmic outputs with human expertise to improve decision quality.

- Created pipelines for ingestion and transformation of underwriting and exposure data to support ~10 weekly submissions (minimum required premium ≈ $500K) and ongoing claims monitoring for <100 claims/week.
- Designed and integrated Bayesian models combining class-rate priors with submission-level loss and payroll data to produce principled loss picks; deployed five Bayesian/ML models to production.
- Built automated alerting (≈10 weekly checks across the book of business) that surfaces anomalous shifts in claim-type frequency or severity for proactive portfolio management.
- Built ML pipelines to standardize and impute missing fields in OCR-extracted loss records.
- Developed automation workflows to generate client-facing service booklets delivered monthly, reducing preparation time by ~50%.
- Developed LLM-powered applications to draft claim status updates for adjusters; adopted broadly by adjusters and estimated to cut prep time by ~35%.
- Partnered with leadership to define decision-aligned metrics and dashboards used in underwriting and portfolio reviews.
</div>

---

<div class="job-header">
<h3>Decision Scientist</h3>
<span class="company">Joyn Insurance</span> <span class="date">October 2020 – January 2024</span>
</div>

<div class="job-description">
At this early-stage insurtech, I helped build a data-driven underwriting platform from the ground up, embedding decision science principles—particularly the integration of model outputs with underwriter judgment—into the company's technical infrastructure and culture.

- Designed and maintained a software package for managing third-party data used in underwriting decisions.
- Developed machine learning and Bayesian models to prioritize submissions.
- Created tools and dashboards that surfaced model outputs in intuitive, actionable formats for underwriters.
- Collaborated with product and engineering teams to ensure data integrity and model interpretability.
- Platform supported ~5 underwriters during production use and rollout.
</div>
<div class="job-description">
At this early-stage insurtech, I helped build a data-driven underwriting platform from the ground up, embedding decision science principles—particularly the integration of model outputs with underwriter judgment—into the company's technical infrastructure and culture.

- Designed and maintained a software package for managing third-party data used in underwriting decisions.
- Developed machine learning and Bayesian models to prioritize submissions.
- Created tools and dashboards that surfaced model outputs in intuitive, actionable formats for underwriters.
- Collaborated with product and engineering teams to ensure data integrity and model interpretability.
- Platform supported ~5 underwriters during production rollout.
</div>
</div>

---

<div class="job-header">
<h3>Decision Scientist, Blackboard Insurance</h3>
<span class="company">AIG</span> <span class="date">December 2018 – August 2020</span>
</div>
<div class="job-description">
Joined AIG's insurtech subsidiary to develop new methods for extracting behavioral insights from operational data, connecting behavioral analytics to human-in-the-loop decision systems and business strategy.

- Designed behavioral analytics models to understand underwriter and broker behavior.
- Worked with data engineering teams to build data pipelines to support analytics requirements.
- Managed an MS-level data scientist to support analytics and productionization efforts.
- Collaborated with other members of the R&D team on NLP and OCR projects to extract structured data from unstructured documents.
</div>

---

<div class="job-header">
<h3>Head of Behavioral Science Team</h3>
<span class="company">AIG</span> <span class="date">May 2014 – September 2018</span>
</div>

<div class="job-description">
Founded and led AIG's behavioral science group (5-person team), which included one PhD and two MS-level statisticians, focused on improving human judgment and decision quality across underwriting and claims operations.

- Led projects on behavioral analytics, choice architecture, and noise reduction in human judgment.
- Collaborated with teams across the business, including actuarial, claims, underwriting, and shared services.
- Regularly presented findings to senior leadership, including the CEO and Chief Underwriting Officer, and was selected to represent the science team at multiple board meetings.
- Drove process improvements to reduce noise in human judgment and improve underwriting consistency.
- Ran small experimental studies applying noise-reduction methods (adapted from Kahneman's work) that demonstrated reductions in variance of adjuster case-reserve estimates.
</div>

---

<div class="job-header">
<h3>Associate Professor of Philosophy</h3>
<span class="company">Columbia University</span> <span class="date">July 2011 – June 2014</span>
</div>

<div class="job-header">
<h3>Assistant Professor of Philosophy</h3>
<span class="company">Columbia University</span> <span class="date">August 2003 – June 2011</span>
</div>

<div class="job-description">
Taught undergraduate and graduate courses on logic, probability, decision theory, and the philosophy of science. Research focused on the foundations of decision theory under uncertainty. Mentored students who have since gone on to careers in data science, economics, software engineering, and academia.
</div>

---

## Education

<div class="education-item"><strong>Ph.D., Logic, Computation, and Methodology</strong> · Carnegie Mellon University</div>
<div class="education-item"><strong>M.S., Logic and Computation</strong> · Carnegie Mellon University</div>  
<div class="education-item"><strong>M.A., Mathematics</strong> · University at Buffalo</div>
<div class="education-item"><strong>B.A., Mathematics</strong> · University of Massachusetts</div>

---

<div class="skills-section">

## Selected Skills and Interests

- **Core Expertise:** Decision science, human-machine decision systems, data strategy, analytics
- **Tools:** SQL, Python, R, Stan, PyMC, scikit-learn, LLMs and prompt engineering, Git, GitHub Copilot, Power BI
- **Focus Areas:** Designing systems that combine human judgment with algorithmic intelligence, uncertainty quantification, reducing noise and bias in expert decisions, capturing domain expertise in interpretable models
- **Personal Interests:** Mathematical logic, rational choice theory, music (jazz), sports (ice hockey, football)
</div>

---

<div class="quote">
<em>"Knowledge is a resource for inquiry and deliberation." </em>
— Isaac Levi
</div>
