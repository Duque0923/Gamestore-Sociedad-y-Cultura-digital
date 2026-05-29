import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface GameCardProps {
  id: number;
  title: string;
  price: string;
  discount?: number;
  image: string;
  tags: string[];
  onAddToCart: (id: number) => void;
}

export function GameCard({ id, title, price, discount, image, tags, onAddToCart }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const finalPrice = discount
    ? (parseFloat(price) * (1 - discount / 100)).toFixed(2)
    : price;

  return (
    <motion.div
      className="bg-[#1b2838] rounded-lg overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {discount && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded font-bold">
            -{discount}%
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-2 left-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
          />
        </button>

        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-4"
          >
            <div className="w-full">
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/30 text-blue-200 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold mb-3 line-clamp-1">{title}</h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {discount ? (
              <>
                <span className="bg-green-500 text-white text-sm px-2 py-1 rounded">
                  -{discount}%
                </span>
                <div className="flex flex-col">
                  <span className="line-through text-gray-500 text-sm">${price}</span>
                  <span className="text-green-400 font-bold">${finalPrice}</span>
                </div>
              </>
            ) : (
              <span className="text-white font-bold">${price}</span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(id);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
