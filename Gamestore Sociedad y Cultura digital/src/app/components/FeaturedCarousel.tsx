import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedGame {
  id: number;
  title: string;
  price: string;
  salePrice?: string;
  discount?: number;
  image: string;
  badge?: string;
  description: string;
}

export function FeaturedCarousel({ games }: { games: FeaturedGame[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % games.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [games.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % games.length);
  };

  const currentGame = games[currentIndex];

  return (
    <div className="w-full relative">
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${currentGame.image})`,
                filter: 'blur(8px) brightness(0.4)',
                transform: 'scale(1.1)',
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />

            <div className="absolute inset-0 z-20 flex items-center">
              <div className="container mx-auto px-8 md:px-16">
                <div className="max-w-2xl">
                  {currentGame.badge && (
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="mb-4"
                    >
                      <span className="bg-cyan-500/20 border border-cyan-400 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold">
                        {currentGame.badge}
                      </span>
                    </motion.div>
                  )}

                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold mb-6 text-white"
                  >
                    {currentGame.title}
                  </motion.h2>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl mb-8 text-gray-300 leading-relaxed"
                  >
                    {currentGame.description}
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-6 flex-wrap"
                  >
                    {currentGame.discount && currentGame.salePrice ? (
                      <div className="flex items-center gap-4">
                        <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                          -{currentGame.discount}%
                        </span>
                        <div className="flex flex-col">
                          <span className="line-through text-gray-500 text-lg">${currentGame.price}</span>
                          <span className="text-4xl font-bold text-cyan-400">
                            ${currentGame.salePrice}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-4xl font-bold text-cyan-400">${currentGame.price}</span>
                    )}

                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                      Comprar Ahora
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={goToPrevious}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {games.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex ? 'bg-cyan-400 w-12' : 'bg-white/50 w-8 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
