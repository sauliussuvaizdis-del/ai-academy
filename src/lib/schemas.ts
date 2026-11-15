// Shared data shapes for course content. The content check script validates
// every JSON file against these; the app imports only the inferred types.
import { z } from 'zod'

export const CurriculumSchema = z.object({
  modules: z.array(
    z.object({
      number: z.number().int().min(0),
      slug: z.string(),
      title: z.string(),
      summary: z.string(),
      lessons: z.array(z.object({ id: z.string(), title: z.string(), minutes: z.number().positive() })).min(1),
    }),
  ),
  examMinutes: z.number().positive(),
})

export const LessonFrontmatterSchema = z.object({
  title: z.string().min(3),
  module: z.number().int().min(0),
  lesson: z.string().regex(/^\d+\.\d+$/),
  minutes: z.number().positive(),
  objectives: z.array(z.string().min(5)).min(2),
  lastChecked: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  quiz: z.string().optional(),
})

const OptionSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  correct: z.boolean(),
  explanation: z.string().min(10),
})

export const QuestionSchema = z
  .object({
    id: z.string(),
    type: z.enum(['single', 'multi', 'scenario']),
    scenario: z.string().optional(),
    prompt: z.string().min(5),
    options: z.array(OptionSchema).min(2),
    module: z.number().int().optional(),
  })
  .refine((q) => q.options.some((o) => o.correct), { message: 'Question needs at least one correct option' })
  .refine((q) => q.type === 'multi' || q.options.filter((o) => o.correct).length === 1, {
    message: 'Single-answer and scenario questions need exactly one correct option',
  })
  .refine((q) => q.type !== 'scenario' || !!q.scenario, { message: 'Scenario questions need a scenario' })

export const QuizSchema = z.object({
  id: z.string(),
  title: z.string(),
  kind: z.enum(['lesson', 'module', 'exam']),
  questions: z.array(QuestionSchema).min(1),
})

export const GlossarySchema = z.object({
  terms: z.array(
    z.object({
      id: z.string(),
      term: z.string(),
      definition: z.string().min(10),
      example: z.string().optional(),
      lesson: z.string().optional(),
    }),
  ),
})

const ChoiceSchema = z.object({
  text: z.string(),
  next: z.string(),
  points: z.number().int().min(0).max(2),
  reaction: z.string(),
  coaching: z.string(),
})

export const ScenarioSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  persona: z.object({ name: z.string(), business: z.string(), background: z.string() }),
  goal: z.string(),
  start: z.string(),
  nodes: z.record(
    z.string(),
    z.object({
      owner: z.string(),
      choices: z.array(ChoiceSchema).optional(),
      end: z.boolean().optional(),
    }),
  ),
  debrief: z.array(z.object({ minScore: z.number(), message: z.string() })),
  practisePrompt: z.string(),
})

export type Curriculum = z.infer<typeof CurriculumSchema>
export type LessonFrontmatter = z.infer<typeof LessonFrontmatterSchema>
export type Question = z.infer<typeof QuestionSchema>
export type Quiz = z.infer<typeof QuizSchema>
export type Glossary = z.infer<typeof GlossarySchema>
export type Scenario = z.infer<typeof ScenarioSchema>
