import { GraduationCap, Code2 } from 'lucide-react'

export function EducationCards() {
  return <div className="education-cards">
    <article className="panel education-card">
      <GraduationCap className="tile-icon" size={38} aria-hidden="true" />
      <span className="eyebrow">University education</span>
      <h3>Universidad Mondragón México</h3>
      <p>Software Engineering and Embedded Systems</p>
    </article>
    <article className="panel education-card">
      <Code2 className="tile-icon accent" size={38} aria-hidden="true" />
      <span className="eyebrow">Specialized training</span>
      <h3>TripleTen</h3>
      <p>Full Stack Development <span aria-hidden="true">·</span> UX/UI Design</p>
    </article>
  </div>
}

