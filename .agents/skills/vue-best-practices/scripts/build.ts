import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const RULES_DIR = join(import.meta.dir, '..', 'rules')
const SKILL_FILE = join(import.meta.dir, '..', 'SKILL.md')
const OUTPUT_FILE = join(import.meta.dir, '..', 'AGENTS.md')

interface RuleMeta {
  title: string
  impact: string
  impactDescription: string
  tags: string[]
}

function parseFrontmatter(content: string): { meta: RuleMeta | null; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: null, body: content }

  const frontmatter = match[1]
  const body = match[2]

  const meta: Partial<RuleMeta> = {}
  for (const line of frontmatter.split('\n')) {
    const [key, ...valueParts] = line.split(':')
    const value = valueParts.join(':').trim()
    if (key === 'title') meta.title = value
    if (key === 'impact') meta.impact = value
    if (key === 'impactDescription') meta.impactDescription = value
    if (key === 'tags') meta.tags = value.split(',').map(t => t.trim())
  }

  return { meta: meta as RuleMeta, body }
}

async function readSkillHeader(): Promise<string> {
  const skillContent = await readFile(SKILL_FILE, 'utf-8')
  const { body } = parseFrontmatter(skillContent)
  return body
}

async function readRuleFiles(): Promise<string[]> {
  const files = await readdir(RULES_DIR)
  const ruleFiles = files
    .filter(f => f.endsWith('.md') && !f.startsWith('_'))
    .sort()

  const rules: string[] = []
  for (const file of ruleFiles) {
    const content = await readFile(join(RULES_DIR, file), 'utf-8')
    const { meta, body } = parseFrontmatter(content)
    if (meta) {
      rules.push(`### ${meta.title}\n\n**Impact:** ${meta.impact} - ${meta.impactDescription}\n\n${body.trim()}`)
    }
  }
  return rules
}

function generateAgentsMd(skillBody: string, rules: string[]): string {
  return `# Vue Best Practices - Complete Reference

> This file is auto-generated. Do not edit directly.
> Edit individual rule files in the \`rules/\` directory and run \`bun run build\`.

${skillBody.trim()}

---

# Detailed Rules

${rules.join('\n\n---\n\n')}
`
}

async function build() {
  console.log('Building AGENTS.md for vue-best-practices...')

  const skillBody = await readSkillHeader()
  const rules = await readRuleFiles()
  const output = generateAgentsMd(skillBody, rules)

  await writeFile(OUTPUT_FILE, output)
  console.log(`✓ Generated AGENTS.md with ${rules.length} rules`)
}

build().catch(console.error)
