export interface Project {
  id: string
  name: string
  category: string
  status: 'Completed' | 'In Development' | 'In Progress'
  period?: string
  description: string
  technologies: readonly string[]
  note?: string
  githubUrl?: string
  externalLink?: { label: string; url: string }
}
