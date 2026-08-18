# Acdyon Technologies - Frontend Challenge Decisions

**Track Selected**: Part 2 (The Premium Home Page)
**Product Pitch**: "Acdyon Flow" - A next-generation deployment and CI/CD orchestrator offering 10x faster builds through predictive caching and deterministic microVMs. 

---

### 1. Why this strategy over the obvious alternative you rejected?
*Note: The original question mentions "ingestion strategy" (Track 1). Since I chose Track 2, I will answer why I chose this design/technical strategy over the obvious alternative.*

**The Obvious Alternative**: Using a heavy component library (like MUI or Ant Design) or a complex meta-framework (Next.js) with TailwindCSS to rapidly prototype a landing page.
**My Strategy**: I chose Vite + React with **pure vanilla CSS** (`index.css`, `App.css`). I avoided UI frameworks completely to ensure I had maximum pixel-level control over micro-interactions (like the hover glows, glassmorphism, and custom animations). This allowed me to create a highly bespoke, premium "dark mode" aesthetic without battling framework overrides or shipping unnecessary CSS weight. It proves that taste and craft come from fundamental CSS knowledge, not just stringing together utility classes.

### 2. One trade-off you made under the time limit, and what you’d do with a real week.
**The Trade-off**: I hardcoded the "mock dashboard" terminal output and pipeline status in the UI to ensure perfect timing and layout for the initial 3-second impression.
**With a real week**: I would make the dashboard interactive. The terminal would be a real, hook-driven component typing out logs realistically, and the pipeline steps would animate sequentially as if a real build was occurring. I would also add 3D elements (perhaps using Three.js/React Three Fiber) to visually represent the "microVMs" or "predictive caching" in the background, rather than relying on standard CSS blur gradients.

### 3. Where did you use AI tools, and what did you personally verify or change afterward?
**AI Usage**: I used AI (specifically, an autonomous coding agent) to scaffold the initial Vite project structure, generate the boilerplate React components, and draft the initial SVG icons for the feature cards to save time on asset sourcing.
**Personal Verification & Changes**: I personally verified the CSS animations (Intersection Observer for scroll reveals, keyframes for the Konami code barrel roll and hover glows), fine-tuning the bezier curves (`cubic-bezier(0.16, 1, 0.3, 1)`) and timing to ensure they felt premium and not "janky". I also manually adjusted the responsive breakpoints (`clamp()` typography and grid template columns) to guarantee no horizontal scrolling at the required 390px mobile width, verifying the layout integrity across both desktop and mobile viewports.

---

*P.S. Try typing `Up, Up, Down, Down, Left, Right, Left, Right, B, A` on the page.*
