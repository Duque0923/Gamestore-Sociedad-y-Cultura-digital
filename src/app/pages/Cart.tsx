import { Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router';

interface CartItem {
  id: number;
  title: string;
  price: string;
  discount?: number;
  image: string;
}

export function Cart() {
  const navigate = useNavigate();
  const { cartItems, onRemoveFromCart } = useOutletContext<{
    cartItems: CartItem[];
    onRemoveFromCart: (id: number) => void;
  }>();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + price;
    }, 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => {
      if (item.discount) {
        const price = parseFloat(item.price);
        const discountAmount = price * (item.discount / 100);
        return total + discountAmount;
      }
      return total;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const total = subtotal - discount;

  const getFinalPrice = (item: CartItem) => {
    const price = parseFloat(item.price);
    if (item.discount) {
      return (price * (1 - item.discount / 100)).toFixed(2);
    }
    return price.toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-4" />
          <h1 className="text-white text-3xl font-bold mb-2">
            Tu carrito está vacío
          </h1>
          <p className="text-gray-400 mb-6">
            Agrega algunos juegos para comenzar
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Explorar Juegos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-white text-3xl font-bold mb-8">Carrito de Compras</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-700">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 flex items-center gap-4 hover:bg-[#1f2937] transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-32 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-2">
                      {item.discount ? (
                        <>
                          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                            -{item.discount}%
                          </span>
                          <span className="text-gray-500 line-through text-sm">
                            ${item.price}
                          </span>
                          <span className="text-cyan-400 font-bold text-xl">
                            ${getFinalPrice(item)}
                          </span>
                        </>
                      ) : (
                        <span className="text-cyan-400 font-bold text-xl">
                          ${item.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-400 hover:text-red-300 p-2 transition-colors"
                    title="Eliminar del carrito"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-lg p-6 sticky top-20">
            <h2 className="text-white text-xl font-bold mb-6">
              Resumen del Pedido
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-gray-400">
                  <span>Descuento</span>
                  <span className="text-green-400">-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t border-gray-700 pt-4 flex justify-between text-lg font-bold">
                <span className="text-white">Total</span>
                <span className="text-cyan-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-lg transition-colors mb-3">
              Proceder al Pago
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Continuar Comprando
            </button>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <svg
                  className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p>
                  Compra segura. Todos los pagos son encriptados y seguros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
