export interface Project {
  id: string
  name: string
  description: string
  technologies: readonly string[]
  detailsPending: boolean
  imagePath: string
  imageAvailable: boolean
  githubUrl?: string
  liveUrl?: string
}

