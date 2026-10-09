import React, { useState } from 'react';
import { CartItem } from '../../types';
import { formatPriceETB } from '../../data/pharmacyData';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  Truck
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.medication.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    setIsCheckedOut(true);
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#1a2f3a]/65 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#f7f3eb] h-full shadow-2xl flex flex-col border-l border-[#0d7377]/20">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1a2f3a] to-[#095456] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#e8d48b]" />
            <h2 className="font-display text-xl font-bold">Shopping Cart</h2>
            <span className="text-xs bg-[#c9a227] text-white px-2 py-0.5 rounded-full font-bold">
              {items.reduce((a, b) => a + b.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {isCheckedOut ? (
            <div className="bg-white p-8 rounded-3xl text-center space-y-4 my-auto animate-fadeIn border border-[#0d7377]/15">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1a2f3a]">
                Order Confirmed!
              </h3>
              <p className="text-xs text-[#5a6f7a] leading-relaxed">
                Thank you for your order. Our team at Tsehaye Unique Pharmacy will prepare your items for same-day delivery.
              </p>
              <button
                onClick={() => { setIsCheckedOut(false); onClose(); }}
                className="px-6 py-2.5 rounded-full bg-[#0d7377] text-white text-xs font-bold hover:bg-[#095456] transition-colors cursor-pointer"
              >
                Close Cart
              </button>
            </div>
          ) : items.length > 0 ? (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.medication.id} className="bg-white p-4 rounded-2xl border border-[#0d7377]/10 flex gap-3.5 items-center shadow-xs">
                  {item.medication.emoji ? (
                    <div className="w-14 h-14 rounded-xl bg-[#f7f3eb] flex items-center justify-center text-3xl shrink-0">
                      {item.medication.emoji}
                    </div>
                  ) : (
                    <img
                      src={item.medication.image}
                      alt={item.medication.name}
                      className="w-14 h-14 rounded-xl object-cover border border-[#0d7377]/15 shrink-0"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-[#1a2f3a] truncate">
                      {item.medication.name}
                    </h4>
                    <span className="text-[10px] text-[#5a6f7a] block font-medium">
                      {formatPriceETB(item.medication.price)} each
                    </span>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#ebe4d6] rounded-lg bg-[#f7f3eb]">
                        <button
                          onClick={() => onUpdateQuantity(item.medication.id, -1)}
                          className="px-2 py-0.5 text-xs text-[#1a2f3a] hover:bg-[#ebe4d6] rounded-l-lg cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono-spec font-bold text-[#1a2f3a]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.medication.id, 1)}
                          className="px-2 py-0.5 text-xs text-[#1a2f3a] hover:bg-[#ebe4d6] rounded-r-lg cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.medication.id)}
                        className="text-xs text-[#5a6f7a] hover:text-red-700 p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-sm text-[#0d7377]">
                      {formatPriceETB(item.medication.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-right">
                <button
                  onClick={onClearCart}
                  className="text-[11px] text-[#5a6f7a] hover:text-red-700 underline cursor-pointer"
                >
                  Clear cart
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-3xl text-center space-y-3 my-12 border border-[#0d7377]/10">
              <ShoppingBag className="w-10 h-10 text-[#0d7377] mx-auto opacity-40" />
              <h3 className="font-display text-lg font-bold text-[#1a2f3a]">
                Your cart is empty
              </h3>
              <p className="text-xs text-[#5a6f7a]">
                Browse our product collection to add items to your cart.
              </p>
            </div>
          )}

        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && !isCheckedOut && (
          <div className="bg-white border-t border-[#0d7377]/10 p-5 space-y-3 text-xs">
            <div className="space-y-1.5 text-[#5a6f7a]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#1a2f3a]">{formatPriceETB(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#0d7377]" /> Same-Day Delivery
                </span>
                <span className="font-bold text-[#1a2f3a]">
                  {deliveryFee === 0 ? 'FREE' : formatPriceETB(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#1a2f3a] pt-2 border-t border-[#ebe4d6]">
                <span>Total</span>
                <span className="font-display text-base text-[#0d7377]">{formatPriceETB(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#0d7377] to-[#14919b] hover:brightness-110 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-[#0d7377]/30 transition-all cursor-pointer"
            >
              <span>Confirm Order ({formatPriceETB(total)})</span>
              <ArrowRight className="w-4 h-4 text-[#e8d48b]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
