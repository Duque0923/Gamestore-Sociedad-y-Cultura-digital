import { useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Header } from './components/Header';
import { Toaster } from 'sonner';
import { toast } from 'sonner';

interface CartItem {
  id: number;
  title: string;
  price: string;
  discount?: number;
  image: string;
}

const allGames = [
  {
    id: 1,
    title: 'Hollow Knight',
    price: '59.99',
    discount: 25,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.jpg',
  },
  {
    id: 2,
    title: 'Celeste',
    price: '49.99',
    discount: 15,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rsw.jpg',
  },
  {
    id: 3,
    title: 'Elden Ring',
    price: '39.99',
    discount: 30,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.jpg',
  },
  {
    id: 4,
    title: 'Cyberpunk 2077',
    price: '44.99',
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg',
  },
  {
    id: 5,
    title: 'Stardew Valley',
    price: '54.99',
    discount: 20,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg',
  },
  {
    id: 6,
    title: 'Dark Souls III',
    price: '34.99',
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1nd8.jpg',
  },
  {
    id: 7,
    title: 'Geometry Dash',
    price: '29.99',
    discount: 40,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6cl7.jpg',
  },
  {
    id: 8,
    title: 'Terraria',
    price: '0.00',
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rba.jpg',
  },
  {
    id: 9,
    title: 'Left 4 Dead 2',
    price: '19.99',
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2mjs.jpg',
  },
  {
    id: 10,
    title: 'Lethal Company',
    price: '64.99',
    discount: 10,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg',
  },
  {
    id: 101,
    title: 'God of War Ragnarök',
    price: '39.99',
    discount: 43,
    image: 'https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg',
  },
  {
    id: 102,
    title: 'Red Dead Redemption 2',
    price: '29.99',
    discount: 50,
    image: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
  },
  {
    id: 103,
    title: 'The Witcher 3',
    price: '9.99',
    discount: 75,
    image: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg',
  },
  {
    id: 104,
    title: 'The Binding of Isaac: Afterbirth+',
    price: '29.99',
    discount: 50,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6s7m.jpg',
  },
  {
    id: 105,
    title: 'ULTRAKILL',
    price: '44.99',
    discount: 25,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4x2e.jpg',
  },
  {
    id: 106,
    title: 'Lies of P',
    price: '19.99',
    discount: 33,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6p0e.jpg',
  },
  {
    id: 107,
    title: 'Vampire Survivors',
    price: '34.99',
    discount: 50,
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmf.jpg',
  },
  {
    id: 108,
    title: 'The Forest',
    price: '26.99',
    image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rb9.jpg',
  },
];

export function Root() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isGameDetailPage = location.pathname.startsWith('/game/');
  const isCartPage = location.pathname === '/cart';

  const handleAddToCart = (gameId: number) => {
    const game = allGames.find((g) => g.id === gameId);
    if (game) {
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.id === gameId);
        if (existingItem) {
          toast.info('Este juego ya está en tu carrito', {
            position: 'bottom-right',
          });
          return prev;
        }
        toast.success(`${game.title} agregado al carrito`, {
          position: 'bottom-right',
        });
        return [...prev, game];
      });
    }
  };

  const handleRemoveFromCart = (gameId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== gameId));
    toast.success('Juego eliminado del carrito', {
      position: 'bottom-right',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#1b2838]">
      <Toaster />
      {!isAuthPage && <Header cartCount={cartItems.length} />}

      <main>
        {isAuthPage || isGameDetailPage || isCartPage ? (
          <Outlet context={{ cartItems, onRemoveFromCart: handleRemoveFromCart }} />
        ) : (
          <Outlet context={{ cartCount: cartItems.length, onAddToCart: handleAddToCart }} />
        )}
      </main>

      {!isAuthPage && !isGameDetailPage && !isCartPage && (
        <footer className="bg-[#1b2838] text-gray-400 py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2026 GameStore. Todos los derechos reservados.</p>
          </div>
        </footer>
      )}
    </div>
  );
}
