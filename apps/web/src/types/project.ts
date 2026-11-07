export interface Project {
  id: string
  name: string
  status: 'Completed' | 'In Development' | 'In Progress'
  period?: string
  technologies: readonly string[]
  noteKey?: string
  githubUrl?: string
  externalLink?: { labelKey: string; url: string }
}
