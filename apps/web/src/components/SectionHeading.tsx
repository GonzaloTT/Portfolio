export function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return <div className="section-heading"><span className="eyebrow">{label}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>
}

