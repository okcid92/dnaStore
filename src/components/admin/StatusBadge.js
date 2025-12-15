export default function StatusBadge({ status }) {
  const colors = {
    'En Stock': 'bg-green-500/10 text-green-500',
    'Rupture': 'bg-red-500/10 text-red-500',
    'Livré': 'bg-green-500/10 text-green-500',
    'En cours': 'bg-blue-500/10 text-blue-500',
    'En attente': 'bg-yellow-500/10 text-yellow-500',
    'Annulé': 'bg-red-500/10 text-red-500'
  }

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${colors[status] || 'bg-gray-500/10 text-gray-500'}`}>
      {status}
    </span>
  )
}
