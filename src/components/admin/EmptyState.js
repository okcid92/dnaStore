export default function EmptyState({ icon, title, description }) {
  return (
    <div className="flex justify-center items-center h-[60vh] text-brand-muted">
      <div className="text-center">
        <i className={`fa-solid fa-${icon} text-4xl mb-4 opacity-50`}></i>
        <h2 className="text-xl font-bold uppercase tracking-widest">{title}</h2>
        {description && <p className="mt-2 text-sm">{description}</p>}
      </div>
    </div>
  )
}
