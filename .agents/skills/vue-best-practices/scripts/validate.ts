import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

const RULES_DIR = join(import.meta.dir, '..', 'rules')
const SKILL_FILE = join(import.meta.dir, '..', 'SKILL.md')

interface ValidationError {
  file: string
  error: string
}

function validateFrontmatter(content: string, filename: string): ValidationError[] {
  const errors: ValidationError[] = []

  if (!content.startsWith('---\n')) {
    errors.push({ file: filename, error: 'Missing frontmatter (must start with ---)' })
    return errors
  }

  const endIndex = content.indexOf('\n---\n', 4)
  if (endIndex === -1) {
    errors.push({ file: filename, error: 'Invalid frontmatter (missing closing ---)' })
    return errors
  }

  const frontmatter = content.slice(4, endIndex)
  const lines = frontmatter.split('\n')

  const requiredFields = ['title', 'impact', 'impactDescription', 'tags']
  const foundFields = new Set<string>()

  for (const line of lines) {
    const [key] = line.split(':')
    if (key) foundFields.add(key.trim())
  }

  for (const field of requiredFields) {
    if (!foundFields.has(field)) {
      errors.push({ file: filename, error: `Missing required field: ${field}` })
    }
  }

  return errors
}

async function validateSkillFile(): Promise<ValidationError[]> {
  const errors: ValidationError[] = []
  try {
    const skillContent = await readFile(SKILL_FILE, 'utf-8')
    if (!skillContent.includes('name: vue-best-practices')) {
      errors.push({ file: 'SKILL.md', error: 'Invalid or missing skill name in frontmatter' })
    }
  } catch {
    errors.push({ file: 'SKILL.md', error: 'File not found' })
  }
  return errors
}

async function validateRuleFiles(): Promise<ValidationError[]> {
  const errors: ValidationError[] = []
  const files = await readdir(RULES_DIR)
  const ruleFiles = files.filter(f => f.endsWith('.md') && !f.startsWith('_'))

  for (const file of ruleFiles) {
    const content = await readFile(join(RULES_DIR, file), 'utf-8')
    const fileErrors = validateFrontmatter(content, file)
    errors.push(...fileErrors)
  }
  return errors
}

async function validate() {
  console.log('Validating vue-best-practices...')

  const skillErrors = await validateSkillFile()
  const ruleErrors = await validateRuleFiles()
  const errors = [...skillErrors, ...ruleErrors]

  if (errors.length > 0) {
    console.error('\n❌ Validation failed:\n')
    for (const { file, error } of errors) {
      console.error(`  ${file}: ${error}`)
    }
    process.exit(1)
  }

  const files = await readdir(RULES_DIR)
  const ruleCount = files.filter(f => f.endsWith('.md') && !f.startsWith('_')).length
  console.log(`✓ Validated ${ruleCount} rules`)
}

validate().catch(console.error)
