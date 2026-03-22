# QoScore Framework

*Ver. 1.0, Q1-2026* 

## **A Quick Note**

How to evaluate the quality and safety of enterprise-grade self-hosted LLM+Agents service systems is a grand topic. 

Although we have tried our best to convey our understanding through the practice of **<u>QoScore Framework and QoScore Platform</u>**, due to time and capacity constraints, coupled with the rapid development of AI, we can only give the current QoScore system a passing grade. There are still too many new understandings and demands, and we haven't had time to keep up with theory and practice.

We very much hope to discuss, improve, and build an enterprise-level self-built AI service quality and safety evaluation system with interested peers.

## The Problem We Started From

When we worked with mid-to-large enterprises deploying self-hosted LLMs and Agents,

we kept running into the same wall: **there was no principled way to answer the
question "is this AI service actually good enough - and will it stay that way?"** 

Existing standards weren't designed for this reality:

| Standard / Tool   | Primary Focus            | What's Missing for Enterprise AI                                                    |
| ----------------- | ------------------------ | ----------------------------------------------------------------------------------- |
| **ISO/IEC 23894** | AI Risk Management       | No metrics for multi-step reasoning or tool invocation; no self-hosted AI framework |
| **GB/T 42589**    | Generative AI Security   | Content safety only; no capability dimensions (accuracy, completeness)              |
| **IEEE 7010**     | Well-being Impact        | Ethics-focused; no technical implementation guidance                                |
| **RAGAS**         | RAG retrieval evaluation | Single-dimension; no generation quality or Agent behavior                           |
| **LangSmith**     | Tracing & debugging      | Logging only; no quality judgment or governance                                     |
| **Evidently AI**  | Data/model monitoring    | Traditional ML-focused; not adapted for LLM+Agent stacks                            |

> IBM Research (NAACL 2025) found that public benchmarks like MMLU systematically 
> 
> overestimate LLM performance on enterprise private data. The Goby Benchmark (2025) > confirmed a significant distribution gap between enterprise private datasets and > public test sets.

We're not claiming to have solved this problem definitively. We're documenting what
enterprise AI quality *actually* requires - starting from operational reality rather
than standards committees - and sharing it as a reference others can build on.

## Why Enterprise AI Is a Different Problem

Before the metrics, the context. Three aspects make enterprise AI

categorically different from consumer AI and general-purpose LLM evaluation.

### 1. Different technical architectures

**🧩 Constraints of Smaller Models:** Due to cost and data privacy, enterprises often deploy smaller-parameter LLMs. These models inherently lack the robustness and reasoning stability of massive frontier models, making them more prone to degradation.

**📦 The "Blind Box" of Fine-Tuning:** Enterprises frequently fine-tune models to fit domain-specific needs. However, this process often lacks rigorous, standardized QA. Fixing one domain-specific edge case often inadvertently degrades general reasoning capabilities.

**🔄 Fragile Agent Ecosystems:** Agents rely on a complex web of components. A minor tweak to a Prompt, an update to the RAG knowledge base, a tweak to retrieval algorithms, or changes in external Tool parameters can trigger a butterfly effect, breaking previously stable workflows.

### 2. Different quality requirements

Consumer-facing AI services typically carry minimal liability for incorrect answers. However, enterprise AI services face strict liability requirements, and higher service quality standards are required. This has even become a stumbling block for enterprises in building AI services.

| Domain         | Deployment Example          | Cost of Failure                          |
| -------------- | --------------------------- | ---------------------------------------- |
| **Government** | Policy interpretation Agent | Public misguidance; legal accountability |
| **Finance**    | Compliance disclosure Agent | Regulatory violation; legal liability    |
| **Healthcare** | Clinical consultation Agent | Patient safety risk                      |
| **HR / Legal** | Contract review Agent       | Binding obligation errors                |

### 3. Different technical capabilities

**🧑‍💻 Asymmetric Engineering Resources:** Unlike Big Tech companies with massive alignment and evaluation teams, most enterprises lack the resources to manually monitor and debug these complex, compounding failures.

Given these three distinct enterprise realities, there is an even greater need for an evaluation system that is independent of traditional public AI service evaluation standards, and further guides practical implementation.

## Design Principle: Architectural Agnosticism at the I/O Boundary

To guarantee strict universality and objective fairness, the QoScore Framework enforces a black-box or Gray-box evaluation paradigm. All 12 metrics are anchored exclusively at the application's I/O boundary (User Prompt → Final System Response).

We deliberately decouple the measurement of capability from the complexity of implementation. Whether the underlying system is a monolithic fine-tuned LLM, a standard RAG pipeline, or a distributed Multi-Agent orchestration, its internal mechanics are treated as entirely opaque. This architectural agnosticism prevents evaluation bias and ensures that all AI systems are benchmarked on a universally leveled playing field: the empirical quality, safety, and utility of the final output delivered to the end user.

## **Note on Architectural Applicability & Calibration**

The following three dimensions and twelve indicators can serve as a general evaluation baseline for enterprise-level self-built AI services. 

However, AI evaluation is not one-size-fits-all. Across different architectural paradigms - such as Fine-tuned LLMs, standard RAG pipelines, Workflow orchestration, Tool-Calling Agents, and Multi-Agent systems - the applicability and optimal weighting of these metrics will fundamentally vary. 

Even for a specific sub-business of a certain evaluation object, there may be different performances.

Due to space limitations, we will not go into the relevant analysis and suggestions in detail. We encourage engineering teams to treat this framework as a composable taxonomy: actively pruning non-applicable dimensions and calibrating metric weights to align with the specific failure modes of your production architecture.

## The Framework: 3 Dimensions × 12 Metrics

The QoScore Framework organizes enterprise LLM + Agent service quality into **3 progressive dimensions** with **12 measurable metrics** and differentiated
thresholds for pilot and production phases.

The threshold design is intentional: lower pilot values give teams permission to
ship incrementally; higher production values define the governance target.

### What QoScore Framework Is - and Isn't

| ✅ It is...                                                  | ❌ It is not...                                                   |
| ----------------------------------------------------------- | ---------------------------------------------------------------- |
| A structured reference for enterprise AI quality governance | An officially recognized international standard                  |
| A practical, opinionated set of 12 measurable metrics       | A complete replacement for security audits or compliance reviews |
| A lifecycle methodology for continuous improvement          | A one-time certification or audit checklist                      |
| An open contribution to an industry conversation            | A claim to have solved enterprise AI evaluation definitively     |

### Dimension I - Security

> 🔴 **Non-negotiable floor.** Security metrics are binary gates, not sliding scales.
> *A 99% score here is an unacceptable result — there is no partial credit for safety.*

| #   | Metric                 | What It Measures                                                | Pilot | Production |
| --- | ---------------------- | --------------------------------------------------------------- | ----- | ---------- |
| 1   | **Fundamental Safety** | No generation of illegal, unethical, or harmful content         | 100%  | 100%       |
| 2   | **Business Security**  | No sensitive or confidential data exposed to unauthorized users | 100%  | 100%       |

### Dimension II - Core Capability

> 🟠 Functional threshold. Can the system perform the tasks it was deployed to do?

| #   | Metric                 | What It Measures                                                                | Pilot | Production |
| --- | ---------------------- | ------------------------------------------------------------------------------- | ----- | ---------- |
| 3   | **Refusal Capability** | Correctly rejects queries outside defined service scope                         | 95%   | 99%        |
| 4   | **Accuracy**           | Responses are necessary and sufficient — no hallucination, no critical omission | 85%   | 95%        |
| 5   | **Relevance**          | Response content is tightly aligned with query intent                           | 80%   | 93%        |
| 6   | **Completeness**       | All required elements covered without omission                                  | 80%   | 92%        |

> **Why Refusal outranks Accuracy in production threshold:** An Agent that confidently answers out-of-scope queries creates governance and
> liability exposure. An Agent that answers in-scope queries imperfectly is a
> quality problem. The former is harder to remediate.

---

### Dimension III - General Capability

> 🟡 **Operational resilience.** Does quality hold up across users, time, and complexity?

| #   | Metric            | What It Measures                                                   | Pilot | Production |
| --- | ----------------- | ------------------------------------------------------------------ | ----- | ---------- |
| 7   | **Consistency**   | Semantically equivalent queries yield comparable responses         | 75%   | 90%        |
| 8   | **Robustness**    | Quality maintained across phrasing variations and edge inputs      | 75%   | 90%        |
| 9   | **Traceability**  | Answers traceable to cited source documents                        | 70%   | 85%        |
| 10  | **Formality**     | Writing style and terminology meet organizational standards        | 70%   | 85%        |
| 11  | **Continuity**    | Multi-turn conversations maintain coherent context and intent      | 65%   | 82%        |
| 12  | **Decomposition** | Complex, multi-part queries receive structured, complete responses | 60%   | 78%        |

### **About the Scoring Mechanism**

As an advisory evaluation framework, the Framework itself does not dictate a specific scoring mechanism. However, using the custom-developed Platform based on this Framework as an example, we can briefly outline the underlying scoring logic:

First, once the evaluation target is configured, the Platform automatically generates baseline test cases for each metric based on the user's uploaded materials and formulates a test plan. Upon completion of the test plan, the system outputs an evaluation dashboard and report based on the following backend logic:

**1. Security Dimension (2 metrics):** Serving as the baseline defense, this dimension is **excluded** from the 100-point total score calculation. It employs a "one-strike" (veto) rule—if any single test case within this dimension fails, the final overall evaluation result is immediately deemed "Failed" (Note: scores for other dimensions will still be displayed as a reference for engineering optimization).

**2. Core Dimension (4 metrics):** Each metric is scored on a 100-point scale based on parameters such as the test case pass rate. A single metric carries a weight of approximately 15% of the total score, making this dimension account for about 60% in total. Specific weights can be flexibly adjusted depending on the evaluation target.

**3. General Dimension (6 metrics):** Similarly scored on a 100-point scale. A single metric carries a weight of approximately 7% of the total score, making this dimension account for roughly 40% in total, which also supports on-demand fine-tuning.

### Implementation Guide - Continuous Evaluation Across the Full AI Service Lifecycle

📊 While the QoScore Framework can serve as a static reference standard for AI project delivery and acceptance testing—with the Platform functioning as the accompanying toolchain—we strongly advocate adopting it as a core evaluation infrastructure that spans the **entire lifecycle of an AI service**. As outlined in the preceding sections, AI services in production environments are inherently susceptible to gradual quality degradation and an expanding data exposure surface. Establishing a regime of periodic, runtime-grounded dynamic evaluation is therefore not optional—it is an operational imperative.

🎯 Drawing from our own engineering practice: we begin by integrating QoScore into the CI/CD pipeline in a **loosely coupled, non-intrusive manner**, enabling continuous evaluation and iterative optimization throughout the internal testing phase, until all metrics reach their predefined go-live thresholds. Upon approval for production release, the final evaluation scores - both the composite score and all individual metric scores—are system-locked as the service's **"Golden Baseline"**: the inviolable minimum standard for quality and safety against which all future states of the service will be measured.

⚓ Once the AI service enters production, **any change** - including the most minimal adjustment to a system prompt - triggers a full regression evaluation. Test execution is scheduled preferentially during low-utilization windows to minimize compute contention, with the resulting evaluation report reviewed the following day to inform next actions. If the new scores surpass the historical record, the results are automatically promoted as the new baseline. If any metric regresses, an engineering alert is immediately raised, mandating the team to optimize or roll back until the service meets or exceeds the most recently established baseline.

We refer to this mechanism as **"Ratchet Baselining"** - a unidirectional quality ratchet that ensures the capability and safety standards of an AI service can only advance, never retreat, across its entire operational lifetime. The result is a fully closed-loop evaluation system with end-to-end lifecycle coverage.

### ⚠️ Architectural Advisory: Guarding Against Score Masking in Composite AI Systems

When evaluating AI projects of significant architectural or business complexity, we issue the following **mandatory engineering recommendation**: the system must be decomposed into its smallest logical or business units for granular, independent evaluation. Relying solely on aggregate system-level scores is insufficient and potentially dangerous.

Production observation consistently confirms that coarse-grained, holistic evaluation creates the conditions for a critical failure pattern we term the **"Score Masking Effect"**: the system's aggregate score appears satisfactory, while one or more sub-services have silently collapsed. High-performing components absorb and obscure the failures of underperforming ones, manufacturing a false impression of overall health—until the concealed failure surfaces as an irreversible production incident or a data security breach.

Consider a seemingly simple customer service chatbot serving dozens of distinct business intent categories: if even one category degrades to near-failure, the aggregate score will dilute and mask that breakdown entirely. This is the classic **Wooden Barrel Effect** - the system's true capacity is defined by its weakest component, not its average.

We therefore advocate a **dual-track evaluation discipline**: system-level aggregate evaluation running in parallel with component-level independent evaluation for each discrete business unit. Only this approach delivers genuinely comprehensive, blind-spot-free risk governance across the full surface area of a production AI system.

## On Diagnostic Logic and Optimization Guidance

It must be acknowledged that QoScore, operating on black-box or gray-box principles, is inherently less precise than APM-instrumented, LLM-native observability solutions when it comes to granular root-cause analysis and issue localization in the traditional sense. However, for AI projects that are **logic-heavy and code-light by nature**, the diagnostic dashboards and optimization recommendations produced by the QoScore Platform provide sufficient analytical resolution to drive confident version iteration decisions.

This is particularly true when paired with the **failing test cases** surfaced by the Platform - the specific evaluation instances responsible for metric regression. By treating these cases as direct optimization targets, development teams can execute targeted prompt tuning, retrieval strategy adjustments, or behavioral realignment with significantly greater efficiency, closing the fix-and-verify loop without the need for deep instrumentation.

> For teams that require a higher-fidelity, **full-chain business trace**, QoScore also accommodates a gray-box extension in practice: by ingesting the raw **LLM API interaction payloads** - capturing the precise content transitions of specific test cases across each processing node - teams can achieve far more granular root-cause localization. This approach forms a natural **two-tier diagnostic pathway**: QoScore's evaluation layer provides broad signal and directional guidance, while LLM API-level tracing delivers surgical precision where the situation demands it. 

## **About Business Security**

As an essential consideration for enterprise-level AI services, business security is paramount within the QoScore framework.

We define the evaluation boundaries of business security across two dimensions: **Attack Vectors**, specifically referring to content- or logic-based methods rather than traditional network cyberattacks; and **Attack Targets**, specifically referring to knowledge base documents containing sensitive content or databases housing sensitive data.

While this is a vast topic capable of supporting much heavier frameworks or tools, QoScore’s approach is deliberate: **rather than aiming for real-time detection or interception, we focus exclusively on evaluating whether the target system is exposed to content and data leakage risks.** The rationale is straightforward—this specific risk is precisely what global laws and regulations are scrutinizing, and it is the primary bottleneck hindering the enterprise adoption of AI. Once a vulnerability is properly evaluated and pinpointed, remediation becomes a highly solvable engineering task.

Objectively speaking, even when strictly assessing content and data exposure risks, the industry currently lacks actionable regulatory standards, presenting a significant challenge. Consequently, we recognized the necessity of fundamentally redesigning a data risk assessment methodology specifically tailored for enterprise AI projects.

After carefully balancing four key factors—**enterprise customer tolerance, legal compliance boundaries, implementation feasibility, and the Platform's strategic positioning**—we innovatively introduced and adapted the classic **"Canary Validation Model"** as our core detection mechanism. Over the past two months, field deployments of the QoScore Platform Business Edition across multiple customer environments have demonstrated its effectiveness: this method not only pinpoints data exposure risks with high confidence but also strictly adheres to compliance requirements, reducing any disruption to the customers' existing AI environments to an absolute minimum.

---

## Next Step: Explore the QoScore Platform