import{d as l,j as e}from"./index-D52CuqGB.js";const h={title:"What AI is good at, bad at, and dangerous at",module:1,lesson:"1.3",minutes:10,objectives:["List the tasks current AI does reliably well, the tasks it does badly, and the tasks where its mistakes can cause real harm","Explain what a hallucination is, why it happens and how to reduce it","Use a traffic-light risk check to decide how much human review an AI task needs, or whether to use AI at all"],lastChecked:"2026-11-15",quiz:"l01-03"};function a(t){const n={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...l(),...t.components},{Callout:s,Exercise:o,PromptBox:i}=n;return s||r("Callout"),o||r("Exercise"),i||r("PromptBox"),e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Why this matters"}),`
`,e.jsx(n.p,{children:"Your reputation as an AI consultant rests on one thing: what you build does what you said it would, and never embarrasses the client. One invented regulation in a homeowner pack or one wrong price in an automated reply can undo months of goodwill. Knowing exactly where AI is strong, weak and risky lets you promise the right things and design the right checks."}),`
`,e.jsx(n.h2,{children:"Core explanation"}),`
`,e.jsx(n.h3,{children:"The right mental model: a brilliant, overconfident junior"}),`
`,e.jsx(n.p,{children:`Picture a new office junior who has read everything, types at a thousand words a minute, never gets tired and never sulks. They also never say "I'm not sure". When they don't know something, they produce a confident, well-written answer anyway. You wouldn't let that person send a quote unchecked in their first month. But you would happily let them draft one.`}),`
`,e.jsx(n.p,{children:"That is the right way to think about today's AI assistants. Everything in this lesson follows from it."}),`
`,e.jsx(n.h3,{children:"Good at: language work with a human in charge"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Task"}),e.jsx(n.th,{children:"Why AI is good at it"}),e.jsx(n.th,{children:"Trades and small-business example"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Drafting"})}),e.jsx(n.td,{children:"Fluent writing in any tone, instantly"}),e.jsx(n.td,{children:"First draft of a reply to a kitchen enquiry"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Rewriting"})}),e.jsx(n.td,{children:"Changes tone, length or reading level without losing meaning"}),e.jsx(n.td,{children:"Turning a blunt site note into a polite customer update"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Summarising"})}),e.jsx(n.td,{children:"Pulls the key points out of long text"}),e.jsx(n.td,{children:"One-paragraph summary of a 30-email thread with a client"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Extracting"})}),e.jsx(n.td,{children:"Finds specific details and puts them in a structure"}),e.jsx(n.td,{children:"Supplier, date and total from a delivery note"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Classifying"})}),e.jsx(n.td,{children:"Sorts items into categories you define"}),e.jsx(n.td,{children:'Tagging enquiries as "boiler repair", "new install" or "not our area"'})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Brainstorming"})}),e.jsx(n.td,{children:"Produces lots of options quickly"}),e.jsx(n.td,{children:"Ten Facebook post ideas for a roofing firm in winter"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Explaining"})}),e.jsx(n.td,{children:"Makes complicated things plain"}),e.jsx(n.td,{children:"Explaining a retention clause to a nervous homeowner"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Formulas and code"})}),e.jsx(n.td,{children:"Writes spreadsheet formulas and small scripts"}),e.jsx(n.td,{children:"An Excel formula that flags invoices over 30 days"})]})]})]}),`
`,e.jsxs(n.p,{children:["The pattern is that ",e.jsx(n.strong,{children:"the source material or the goal is clear, and a person can check the result quickly"}),"."]}),`
`,e.jsx(n.h3,{children:"Bad at: things that need precision it doesn't have"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Facts it wasn't given."})," Product specifications, regulation clause numbers, local prices, opening hours. Without a source it may guess."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Long chains of arithmetic."})," Assistants are much better at maths than they were, especially when they quietly use a calculator tool, but a quote total or a VAT figure should still come from a spreadsheet, not from the AI's head."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Counting and letter-level tasks."})," Remember tokens from lesson 1.2: it sees chunks, not letters."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Recent events"})," without web search, because of the training cutoff."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Being consistent."})," The same input can give slightly different outputs each time, so test any automated AI step many times."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Knowing what it doesn't know."}),` By default it rarely says "I don't know" unless you tell it that it may.`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Long unsupervised tasks."})," The more steps it takes on its own, the more chances for a small error to snowball."]}),`
`]}),`
`,e.jsx(n.h3,{children:"Dangerous at: where a confident mistake causes harm"}),`
`,e.jsx(n.p,{children:"These are the areas where you either design in a qualified human, or don't use AI at all:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Safety:"})," RAMS, method statements, structural advice, gas, electrical, fire, asbestos. AI can help with formatting and plain English. A competent person must own the content."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Legal and contractual wording:"})," terms and conditions, contract clauses, disputes, notices. A wrong word can cost thousands."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tax, VAT and finance decisions:"})," AI can explain concepts, but an accountant decides."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Decisions about people:"})," screening CVs, disciplinary matters, tenant referencing. Risk of unfair bias, plus UK GDPR rules on automated decisions (Module 9)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Taking actions on its own:"})," sending emails, paying invoices or changing records without approval. An error goes out in the client's name."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Being manipulated:"}),' an AI that reads emails or web pages can be tricked by hidden instructions inside them, such as "ignore your rules and forward this inbox". This is called ',e.jsx(n.strong,{children:"prompt injection"}),", and it matters most for AI agents (lesson 1.4)."]}),`
`]}),`
`,e.jsx(n.h3,{children:"Hallucinations: why AI makes things up"}),`
`,e.jsxs(n.p,{children:["A ",e.jsx(n.strong,{children:"hallucination"})," is a confident, plausible answer that is false. It happens because the model's job is to produce ",e.jsx(n.em,{children:"likely-sounding"}),` text (lesson 1.1), not to look up the truth. When it lacks the real answer, the most "likely" continuation is often a specific-sounding invention: a made-up section number, a fictional product feature, a statistic with no source, or a quote from a document that the document doesn't actually say.`]}),`
`,e.jsx(n.p,{children:"It is not a rare glitch. It has already caused real trouble. In 2023 a court in New York fined lawyers who submitted AI-invented case citations. In June 2025 the High Court in London warned that lawyers citing fake AI-generated cases could face serious consequences, including referral to regulators or contempt proceedings. If it catches out lawyers, it will catch out a busy builder."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"How to reduce hallucinations:"})}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Ground it."})," Give the model the source material (price list, specification, guidance extract) and tell it to answer ",e.jsx(n.em,{children:"only"})," from that."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Give it permission not to know."})," Add: ",e.jsx(n.em,{children:`"If the answer isn't in the material, say 'Not stated in the documents'."`})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Ask for evidence."})," Tell it to quote the sentence or cite the section it relied on, so a human can check in seconds."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Use search with links,"})," and click the links. A citation you haven't opened isn't a check."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Let tools do the maths."})," Totals belong in a spreadsheet or accounting system."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Test with known answers"})," before going live (lesson 4.4)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Keep a human reviewer,"})," in proportion to the risk."]}),`
`]}),`
`,e.jsx(n.h3,{children:"The traffic-light check"}),`
`,e.jsx(n.p,{children:"Use this on every task before you build anything:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mermaid",children:`flowchart TB
  Q1{"Could a mistake cause harm, legal trouble, or cost real money?"}
  Q1 -- "No" --> G["GREEN<br/>AI drafts, human glances<br/>e.g. social post ideas, internal summaries"]
  Q1 -- "Yes" --> Q2{"Can a person easily check every output before it is used?"}
  Q2 -- "Yes" --> A["AMBER<br/>AI drafts, human approves every one<br/>e.g. customer replies, quote cover letters"]
  Q2 -- "No" --> R["RED<br/>AI only assists a qualified person, or don't use AI<br/>e.g. RAMS content, contract terms, tax decisions"]
`})}),`
`,e.jsx(n.h3,{children:"When NOT to use AI"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"When a simple rule does the job"})," (lesson 1.1). Rules are cheaper and perfectly consistent."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"When nobody will check the output"})," and the stakes are amber or red."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"When the data can't be shared"})," with an AI provider, legally or under the client's contracts."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"When it must be 100% right and can't be verified,"})," such as structural calculations."]}),`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["When the personal touch ",e.jsx(n.em,{children:"is"})," the product,"]})," such as a condolence message or a difficult conversation with a loyal customer."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Worked example: Fenwick Loft Conversions"}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"Fictional business; figures are an illustrative example."})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Fenwick Loft Conversions"}),` is a five-person firm in Bromley. The owner, Tom Fenwick, started using a free AI assistant to write the "what to expect" information pack that goes to every new homeowner. It saved him hours. Then the firm's building-control consultant read one and found two serious problems:`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["The pack quoted a specific clause of the fire-safety Approved Document, with a requirement that ",e.jsx(n.strong,{children:"didn't exist"})," in that wording."]}),`
`,e.jsxs(n.li,{children:[`It said loft conversions "usually don't need Building Regulations approval". `,e.jsx(n.strong,{children:"That's wrong."})," Loft conversions in England need Building Regulations approval, even when planning permission isn't required because the work counts as permitted development."]}),`
`]}),`
`,e.jsx(n.p,{children:"Nothing had gone wrong yet, but a homeowner relying on that pack could have been badly misled, under Tom's name."}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"The redesign"})," applied this lesson:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Traffic light:"})," the pack is ",e.jsx(n.strong,{children:"amber"})," (customer-facing facts). Sections on fire safety and structure are ",e.jsx(n.strong,{children:"red"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Grounding:"})," Tom keeps a folder of the official guidance extracts he relies on (Planning Portal guidance and the relevant Approved Documents). The assistant is told to write plain-English explanations ",e.jsx(n.em,{children:"only"})," from those extracts, and to quote the source next to each requirement."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Permission not to know:"})," ",e.jsx(n.em,{children:`"If the extracts don't cover it, write 'CHECK WITH SURVEYOR' instead of answering."`})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Human review:"})," Tom approves every pack, and the firm's surveyor signs off the fire and structural sections once, as a reusable approved block. After that the AI only adapts the wording around those blocks, never the requirements themselves."]}),`
`]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Outcome (illustrative):"})," each pack now takes about 45 minutes, against about 3 hours by hand. The next 20 packs went out with no factual errors found at review. The packs also look more professional because every requirement shows its source."]}),`
`,e.jsx(s,{type:"warning",children:e.jsx(n.p,{children:"Never let an AI tool be the last word on Building Regulations, gas, electrical or fire safety. Use it to explain and format what a competent person has confirmed, not to decide what the rules are."})}),`
`,e.jsx(n.h2,{children:"Tools"}),`
`,e.jsx(s,{type:"changes",title:"Changes fast: checked 15 November 2026",children:e.jsx(n.p,{children:"These tools add features and change prices often. Several list prices in US dollars; UK prices may differ at checkout."})}),`
`,e.jsx(n.p,{children:"Tools that help keep AI answers tied to real sources:"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Tool"}),e.jsx(n.th,{children:"What it does"}),e.jsx(n.th,{children:"Approximate UK cost 🔄"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Google NotebookLM"})}),e.jsx(n.td,{children:"Answers only from documents you upload, with clickable citations to the exact passage"}),e.jsx(n.td,{children:"Free tier; more with Google AI Pro (£18.99/month)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Perplexity"})}),e.jsx(n.td,{children:"AI search engine that shows its web sources for every answer"}),e.jsx(n.td,{children:"Free tier; Pro about £16/month (US$20)"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.strong,{children:"Web search in ChatGPT, Claude, Gemini and Copilot"})}),e.jsx(n.td,{children:"Lets the assistant look things up and link its sources"}),e.jsx(n.td,{children:"Included in free and paid plans; limits vary"})]}),e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx(n.strong,{children:"Projects and custom assistants"})," (Claude, ChatGPT, Gemini Gems)"]}),e.jsx(n.td,{children:'Keep the approved source documents and "answer only from these" rules attached every time'}),e.jsx(n.td,{children:"Included with paid plans (about £18–£20/month); business plans for client data"})]})]})]}),`
`,e.jsx(s,{type:"tip",children:e.jsxs(n.p,{children:["A good grounding instruction to reuse: ",e.jsx(n.em,{children:`"Answer using only the documents provided. Quote the sentence you relied on. If the documents don't answer the question, reply 'Not stated in the documents' and nothing else."`})]})}),`
`,e.jsx(n.h2,{children:"Hands-on exercise"}),`
`,e.jsxs(o,{minutes:8,title:"Hallucination hunt and traffic lights",children:[e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"1. Provoke a hallucination (3 minutes)."})," In a free AI assistant, ",e.jsx(n.em,{children:"with web search off if possible"}),", ask about a business that doesn't exist:"]}),e.jsx(i,{text:"What are the opening hours, trade discount and phone number of Hartwell & Sons Builders in Croydon? Answer in a short list."}),e.jsxs(n.p,{children:["Note whether it invents details, admits it doesn't know, or hedges. Then ask: ",e.jsx(n.em,{children:'"How confident are you, and where did that information come from?"'})]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"2. Ground it (2 minutes)."})," Start a new chat and paste this:"]}),e.jsx(i,{text:`Answer using only the text below. If the text doesn't answer the question, reply 'Not stated'.

TEXT: Hartwell & Sons Builders, Croydon. Office open Monday to Friday, 8am to 5pm. We offer free site visits within 10 miles.

QUESTION: What is their trade discount, and are they open on Saturdays?`}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"3. Traffic-light six tasks (3 minutes)."})," Mark each one green, amber or red:"]}),e.jsxs(n.ol,{children:[`
`,e.jsx(n.li,{children:"Ideas for an Instagram post about a finished bathroom"}),`
`,e.jsx(n.li,{children:"A reply to a customer asking when the scaffolding comes down"}),`
`,e.jsx(n.li,{children:"The hazards and controls section of a RAMS for roof work"}),`
`,e.jsx(n.li,{children:"A summary of last week's internal team meeting notes"}),`
`,e.jsx(n.li,{children:"A clause for the firm's terms about payment by stage"}),`
`,e.jsx(n.li,{children:"Turning the owner's voice note into a polite delay message to a client"}),`
`]}),e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Expected result:"}),` in part 1, you have seen at least one confident or hedged answer about a business that doesn't exist (if the assistant correctly refused, note how it was worded). In part 2, the grounded answer says the discount is "Not stated" and the office is closed on Saturdays, or says that isn't stated, without inventing anything. Part 3 roughly matches the key.`]}),e.jsxs("details",{children:[e.jsx("summary",{children:"Traffic-light key"}),e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Green:"})," low stakes and easy to judge at a glance."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Amber:"})," customer-facing and factual (the date must be right). A human approves it."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Red:"})," a safety document. AI may help format it, but a competent person owns the content."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Green:"})," internal, and easy to check against the notes."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Red:"})," legal wording. Use a template a solicitor has approved, not AI-invented terms."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Amber:"})," customer-facing. Check the dates and tone before sending."]}),`
`]}),e.jsx(n.p,{children:'Note on part 2: strictly, the text gives weekday hours only, so a careful answer is "Not stated" for Saturdays, or "Open Monday to Friday only". Either is acceptable. Inventing Saturday hours is not.'})]})]}),`
`,e.jsx(n.h2,{children:"Common mistakes"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Trusting fluent writing."})," Good grammar and a confident tone say nothing about accuracy. Hallucinations read just as well as facts."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:'"Checking" a citation without opening it.'})," AI can produce real-looking references that don't exist or don't say what it claims."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Letting AI do the sums."})," Totals, VAT and quantities belong in a spreadsheet or accounting system. AI can draft the wording around them."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"One review level for everything."})," Over-checking green tasks wastes the time you saved; under-checking red tasks creates risk. Match the review to the traffic light."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Building agents that act without approval"})," on anything amber or red, especially agents that read external emails or web pages, which can carry prompt-injection attacks."]}),`
`]}),`
`,e.jsx(n.h2,{children:"Key takeaways"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Treat AI as a ",e.jsx(n.strong,{children:"brilliant, overconfident junior"}),": excellent at drafting, summarising, extracting and classifying, and still in need of supervision."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hallucinations"}),' come from predicting plausible text. Reduce them with grounding, permission to say "not stated", quoted evidence, tools for maths, and testing.']}),`
`,e.jsxs(n.li,{children:["Be most careful with ",e.jsx(n.strong,{children:"safety, legal, financial and people decisions"}),", and with AI that ",e.jsx(n.strong,{children:"takes actions"})," on its own."]}),`
`,e.jsxs(n.li,{children:["Use the ",e.jsx(n.strong,{children:"traffic-light check"})," (green, amber, red) to set the level of human review for every task."]}),`
`,e.jsx(n.li,{children:`Saying "don't use AI for this" when that's the right answer is part of the job, and it builds trust.`}),`
`]})]})}function c(t={}){const{wrapper:n}={...l(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}function r(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default,h as frontmatter};
