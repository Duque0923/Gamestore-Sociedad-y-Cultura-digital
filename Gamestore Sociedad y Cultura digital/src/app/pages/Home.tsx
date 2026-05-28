import { useState } from 'react';
import { FeaturedCarousel } from '../components/FeaturedCarousel';
import { CategoryFilter } from '../components/CategoryFilter';
import { GameCard } from '../components/GameCard';
import { toast } from 'sonner';
import { useOutletContext, useNavigate } from 'react-router';
import { Star, Cpu, Globe, Users, BarChart2 } from 'lucide-react';

interface Game {
  id: number;
  title: string;
  price: string;
  discount?: number;
  image: string;
  description: string;
  tags: string[];
  category: string;
}

const popularGames = [
  {
    id: 101,
    title: 'God of War Ragnarök',
    cover: 'https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg',
    price: '39.99',
    originalPrice: '69.99',
    discount: 43,
    genre: 'Action RPG',
    rating: 4.9,
  },
  {
    id: 102,
    title: 'Red Dead Redemption 2',
    cover: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
    price: '29.99',
    originalPrice: '59.99',
    discount: 50,
    genre: 'Open World',
    rating: 4.9,
  },
  {
    id: 103,
    title: 'The Witcher 3',
    cover: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg',
    price: '9.99',
    originalPrice: '39.99',
    discount: 75,
    genre: 'RPG',
    rating: 5.0,
  },
  {
    id: 104,
    title: 'Cyberpunk 2077',
    cover: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg',
    price: '29.99',
    originalPrice: '59.99',
    discount: 50,
    genre: 'RPG',
    rating: 4.7,
  },
  {
    id: 105,
    title: 'Elden Ring',
    cover: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg',
    price: '44.99',
    originalPrice: '59.99',
    discount: 25,
    genre: 'Action RPG',
    rating: 4.9,
  },
  {
    id: 106,
    title: 'Grand Theft Auto V',
    cover: 'https://upload.wikimedia.org/wikipedia/en/a/a5/GTA_V.png',
    price: '19.99',
    originalPrice: '29.99',
    discount: 33,
    genre: 'Open World',
    rating: 4.8,
  },
  {
    id: 107,
    title: 'FIFA 24',
    cover: '',
    placeholder: 'fifa',
    price: '34.99',
    originalPrice: '69.99',
    discount: 50,
    genre: 'Sports',
    rating: 4.2,
  },
  {
    id: 108,
    title: 'Minecraft',
    cover: '',
    placeholder: 'minecraft',
    price: '26.99',
    genre: 'Sandbox',
    rating: 4.8,
  },
];

const featuredGames = [
  {
    id: 1,
    title: 'God of War Ragnarök',
    price: '69.99',
    salePrice: '39.99',
    discount: 43,
    image: 'https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg',
    badge: 'OFERTA ESPECIAL',
    description: 'Kratos y Atreus deben prepararse para el Ragnarök. Un épico RPG de acción que redefine los videojuegos.',
  },
  {
    id: 2,
    title: 'Red Dead Redemption 2',
    price: '59.99',
    salePrice: '29.99',
    discount: 50,
    image: 'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg',
    badge: 'MEJOR VALORADO',
    description: 'Una épica historia del salvaje oeste. Mundo abierto inmersivo con más de 60 horas de juego.',
  },
  {
    id: 3,
    title: 'Elden Ring',
    price: '59.99',
    salePrice: '44.99',
    discount: 25,
    image: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg',
    badge: 'JUEGO DEL AÑO',
    description: 'El aclamado RPG de FromSoftware y George R.R. Martin. Explora Las Tierras Intermedias.',
  },
];

const allGames: Game[] = [
  {
    id: 1,
    title: 'Cyberpunk Nocturne',
    price: '59.99',
    discount: 25,
    image: 'https://images.unsplash.com/photo-1672872476232-da16b45c9001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Explora una ciudad futurista',
    tags: ['RPG', 'Acción', 'Mundo Abierto'],
    category: 'action',
  },
  {
    id: 2,
    title: 'Urban Chronicles',
    price: '49.99',
    discount: 15,
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Aventuras urbanas',
    tags: ['Aventura', 'Historia', 'Exploración'],
    category: 'adventure',
  },
  {
    id: 3,
    title: 'Neon Speed',
    price: '39.99',
    discount: 30,
    image: 'https://images.unsplash.com/photo-1586968272237-a3d597214887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Carreras futuristas',
    tags: ['Carreras', 'Multijugador', 'Competitivo'],
    category: 'sports',
  },
  {
    id: 4,
    title: 'Night Racer',
    price: '44.99',
    image: 'https://images.unsplash.com/photo-1573456170607-b885fdc78985?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Carreras nocturnas',
    tags: ['Carreras', 'Arcade', 'Velocidad'],
    category: 'sports',
  },
  {
    id: 5,
    title: 'Street Legends',
    price: '54.99',
    discount: 20,
    image: 'https://images.unsplash.com/photo-1600998837340-4887228e311f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Domina las calles',
    tags: ['Acción', 'Conducción', 'Mundo Abierto'],
    category: 'action',
  },
  {
    id: 6,
    title: 'Future City',
    price: '34.99',
    image: 'https://images.unsplash.com/photo-1668211834355-2cdf073f2351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Construye tu ciudad',
    tags: ['Estrategia', 'Gestión', 'Construcción'],
    category: 'indie',
  },
  {
    id: 7,
    title: 'Cyber Rider',
    price: '29.99',
    discount: 40,
    image: 'https://images.unsplash.com/photo-1642345843526-6279c8880a49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Motociclismo extremo',
    tags: ['Deportes', 'Simulación', 'Realista'],
    category: 'sports',
  },
  {
    id: 8,
    title: 'Metropolis Online',
    price: '0.00',
    image: 'https://images.unsplash.com/photo-1609860850812-86de933acace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'MMO futurista',
    tags: ['MMO', 'Gratuito', 'PvP'],
    category: 'multiplayer',
  },
  {
    id: 9,
    title: 'Alleyway Tales',
    price: '19.99',
    image: 'https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Historia indie',
    tags: ['Indie', 'Narrativa', 'Atmosférico'],
    category: 'indie',
  },
  {
    id: 10,
    title: 'Neon Warriors',
    price: '64.99',
    discount: 10,
    image: 'https://images.unsplash.com/photo-1556106975-5afd0ac279ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Combate cooperativo',
    tags: ['Multijugador', 'Acción', 'Co-op'],
    category: 'multiplayer',
  },
];

export function Home() {
  const { onAddToCart } = useOutletContext<{ cartCount: number; onAddToCart: (id: number) => void }>();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const filteredGames =
    selectedCategory === 'all'
      ? allGames
      : allGames.filter((game) => game.category === selectedCategory);

  return (
    <>
      <FeaturedCarousel games={featuredGames} />

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-white text-3xl font-bold mb-8">Ofertas Especiales</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {popularGames.map((game) => (
            <div
              key={game.id}
              className="bg-[#0a1525] rounded-lg overflow-hidden border border-gray-800 hover:border-[#00c8ff] transition-all cursor-pointer group relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {game.placeholder === 'fifa' ? (
                  <div className="w-full h-full bg-[#0d1a2d] flex flex-col items-center justify-center gap-3 select-none">
                    <div className="text-[#00c8ff] text-xs font-bold tracking-widest uppercase">EA Sports</div>
                    <div
                      className="text-white text-center leading-tight px-2"
                      style={{ fontFamily: "'Rajdhani', 'Arial Narrow', sans-serif", fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 700, letterSpacing: '0.05em' }}
                    >
                      EA Sports<br />FC 24
                    </div>
                    <div className="w-10 h-px bg-[#00c8ff]/60 mt-1" />
                    <div className="text-[#00c8ff]/70 text-[0.6rem] tracking-widest uppercase">Official Game</div>
                  </div>
                ) : game.placeholder === 'minecraft' ? (
                  <div className="w-full h-full bg-[#1a3a1a] flex flex-col items-center justify-center gap-4 select-none">
                    <div className="w-12 h-12 bg-[#5a8a3a] border-4 border-[#3a5a1a] shadow-[inset_-3px_-3px_0_#2a4a0a,inset_3px_3px_0_#7aaa4a]" />
                    <div
                      className="text-[#5a8a3a] text-center px-2"
                      style={{ fontFamily: "'Courier New', 'Lucida Console', monospace", fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 900, letterSpacing: '0.08em', textShadow: '2px 2px 0 #1a3a1a, -1px -1px 0 #2a5a1a' }}
                    >
                      MINECRAFT
                    </div>
                    <div className="text-[#4a7a2a]/70 text-[0.6rem] tracking-widest uppercase font-mono">Mojang Studios</div>
                  </div>
                ) : (
                  <img
                    src={game.cover}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                )}
                {game.discount && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                    -{game.discount}%
                  </div>
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(game.id);
                    }}
                    className="bg-[#00c8ff] hover:bg-[#00b8ef] text-white px-6 py-2 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-white font-semibold mb-2 line-clamp-1 text-sm">
                  {game.title}
                </h3>

                <div className="mb-2">
                  <span className="inline-block bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded">
                    {game.genre}
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(game.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : i < game.rating
                          ? 'fill-yellow-400/50 text-yellow-400'
                          : 'fill-none text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-gray-400 text-xs ml-1">{game.rating}</span>
                </div>

                <div className="flex items-baseline gap-2">
                  {game.originalPrice ? (
                    <>
                      <span className="text-gray-500 line-through text-xs">
                        ${game.originalPrice}
                      </span>
                      <span className="text-[#00c8ff] font-bold text-lg">
                        ${game.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-[#00c8ff] font-bold text-lg">
                      ${game.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl font-bold mb-4">
            El Gaming como Fenómeno Social y Digital
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Los videojuegos son uno de los fenómenos digitales más influyentes del siglo XXI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#0a1525] border-l-4 border-cyan-400 rounded-lg p-6 hover:bg-[#0f1a2e] transition-all">
            <div className="mb-4"><Cpu className="w-9 h-9 text-cyan-400" /></div>
            <h3 className="text-white text-xl font-bold mb-3 text-cyan-400">
              Inteligencia Artificial en el Gaming
            </h3>
            <p className="text-gray-300 leading-relaxed">
              La IA ya genera mundos, personajes y narrativas dinámicas. Juegos como Cyberpunk 2077 usan IA para NPCs más realistas. Tendencia clave para 2030.
            </p>
          </div>

          <div className="bg-[#0a1525] border-l-4 border-purple-400 rounded-lg p-6 hover:bg-[#0f1a2e] transition-all">
            <div className="mb-4"><Globe className="w-9 h-9 text-purple-400" /></div>
            <h3 className="text-white text-xl font-bold mb-3 text-purple-400">
              Industria 4.0 y Videojuegos
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Los videojuegos son parte de la Cuarta Revolución Industrial. Cloud gaming, realidad virtual y metaverso transforman cómo jugamos y nos relacionamos digitalmente.
            </p>
          </div>

          <div className="bg-[#0a1525] border-l-4 border-green-400 rounded-lg p-6 hover:bg-[#0f1a2e] transition-all">
            <div className="mb-4"><Users className="w-9 h-9 text-green-400" /></div>
            <h3 className="text-white text-xl font-bold mb-3 text-green-400">
              Ciudadanía Digital
            </h3>
            <p className="text-gray-300 leading-relaxed">
              El gaming online requiere responsabilidad digital: identidad en línea, seguridad, respeto y ética. Más de 3 mil millones de gamers forman una comunidad digital global.
            </p>
          </div>

          <div className="bg-[#0a1525] border-l-4 border-orange-400 rounded-lg p-6 hover:bg-[#0f1a2e] transition-all">
            <div className="mb-4"><BarChart2 className="w-9 h-9 text-orange-400" /></div>
            <h3 className="text-white text-xl font-bold mb-3 text-orange-400">
              Big Data y Experiencia Gamer
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Las plataformas analizan millones de datos para personalizar recomendaciones, ajustar dificultad y predecir tendencias. El comercio electrónico de juegos mueve $200B anuales.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-blue-900/20 border border-gray-700/50 rounded-lg p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
                3.2B
              </div>
              <div className="text-gray-300 text-sm">
                Gamers en el mundo
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
                $200B
              </div>
              <div className="text-gray-300 text-sm">
                Mercado global 2024
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
                67%
              </div>
              <div className="text-gray-300 text-sm">
                Juegan en móvil
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-2">
                2030
              </div>
              <div className="text-gray-300 text-sm">
                La mayor industria del entretenimiento
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="mb-6">
          <h2 className="text-white text-2xl font-bold mb-2">
            {selectedCategory === 'all' ? 'Todos los Juegos' : 'Juegos Filtrados'}
          </h2>
          <p className="text-gray-400">
            Descubre {filteredGames.length} juegos increíbles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              price={game.price}
              discount={game.discount}
              image={game.image}
              tags={game.tags}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </>
  );
}
