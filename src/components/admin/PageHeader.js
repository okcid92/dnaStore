export default function PageHeader({ title, action }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-xl font-bold text-brand-light uppercase tracking-widest">{title}</h2>
      {action && action}
    </div>
  )
}
