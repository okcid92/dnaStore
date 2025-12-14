import { updateQuantity, removeFromCart } from '@/lib/cart'

export default function CartItem({ item, onUpdate }) {
  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, item.size, item.color, newQuantity)
    onUpdate()
  }

  const handleRemove = () => {
    removeFromCart(item.id, item.size, item.color)
    onUpdate()
  }

  return (
    <div className="liquid-glass p-4 rounded-sm flex gap-6 items-center group">
      <div className="relative w-24 h-24 bg-black/20 rounded-sm overflow-hidden flex-shrink-0">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="flex items-center justify-center h-full text-brand-muted text-xs">
            No Image
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-sm text-brand-light uppercase tracking-wider">{item.name}</h3>
          <button onClick={handleRemove} className="text-brand-muted hover:text-brand-red transition-colors">
            <i className="fa-solid fa-trash-can text-sm"></i>
          </button>
        </div>
        
        <div className="flex gap-4 text-[10px] text-brand-muted uppercase tracking-widest mb-3">
          {item.size && <span>Taille: <span className="text-brand-light font-bold">{item.size}</span></span>}
          {item.color && <span>Couleur: <span className="text-brand-light font-bold">{item.color}</span></span>}
        </div>

        <div className="flex justify-between items-end">
          <span className="text-lg font-light text-brand-light">{item.price.toLocaleString()} FCFA</span>
          
          <div className="flex items-center border border-brand-border rounded-sm">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-light hover:bg-brand-light/5 transition-colors"
            >
              <i className="fa-solid fa-minus text-[10px]"></i>
            </button>
            <span className="w-8 text-center text-xs font-bold text-brand-light">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-brand-muted hover:text-brand-light hover:bg-brand-light/5 transition-colors"
            >
              <i className="fa-solid fa-plus text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
