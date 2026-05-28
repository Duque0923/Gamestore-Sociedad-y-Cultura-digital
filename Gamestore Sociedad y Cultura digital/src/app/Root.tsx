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
    title: 'Cyberpunk Nocturne',
    price: '59.99',
    discount: 25,
    image: 'https://images.unsplash.com/photo-1672872476232-da16b45c9001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Urban Chronicles',
    price: '49.99',
    discount: 15,
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 3,
    title: 'Neon Speed',
    price: '39.99',
    discount: 30,
    image: 'https://images.unsplash.com/photo-1586968272237-a3d597214887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 4,
    title: 'Night Racer',
    price: '44.99',
    image: 'https://images.unsplash.com/photo-1573456170607-b885fdc78985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 5,
    title: 'Street Legends',
    price: '54.99',
    discount: 20,
    image: 'https://images.unsplash.com/photo-1600998837340-4887228e311f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 6,
    title: 'Future City',
    price: '34.99',
    image: 'https://images.unsplash.com/photo-1668211834355-2cdf073f2351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 7,
    title: 'Cyber Rider',
    price: '29.99',
    discount: 40,
    image: 'https://images.unsplash.com/photo-1642345843526-6279c8880a49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 8,
    title: 'Metropolis Online',
    price: '0.00',
    image: 'https://images.unsplash.com/photo-1609860850812-86de933acace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 9,
    title: 'Alleyway Tales',
    price: '19.99',
    image: 'https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    id: 10,
    title: 'Neon Warriors',
    price: '64.99',
    discount: 10,
    image: 'https://images.unsplash.com/photo-1556106975-5afd0ac279ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
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
    title: 'Cyberpunk 2077',
    price: '29.99',
    discount: 50,
    image: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
  },
  {
    id: 105,
    title: 'Elden Ring',
    price: '44.99',
    discount: 25,
    image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg',
  },
  {
    id: 106,
    title: 'Grand Theft Auto V',
    price: '19.99',
    discount: 33,
    image: 'https://upload.wikimedia.org/wikipedia/en/a/a5/GTA_V.png',
  },
  {
    id: 107,
    title: 'FIFA 24',
    price: '34.99',
    discount: 50,
    image: 'https://upload.wikimedia.org/wikipedia/en/1/13/EA_Sports_FC_24_Cover.jpg',
  },
  {
    id: 108,
    title: 'Minecraft',
    price: '26.99',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png',
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
