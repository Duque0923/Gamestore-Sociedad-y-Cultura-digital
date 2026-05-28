import { useParams, useNavigate } from 'react-router';
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

interface GameData {
  id: number;
  title: string;
  price: string;
  discount?: number;
  image: string;
  description: string;
  tags: string[];
  rating: number;
  screenshots: string[];
  fullDescription: string;
  reviews: {
    id: number;
    user: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

const gamesData: Record<string, GameData> = {
  '1': {
    id: 1,
    title: 'Cyberpunk Nocturne',
    price: '59.99',
    discount: 25,
    image: 'https://images.unsplash.com/photo-1672872476232-da16b45c9001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Explora una ciudad futurista llena de neón',
    tags: ['RPG', 'Acción', 'Mundo Abierto', 'Cyberpunk'],
    rating: 4.5,
    screenshots: [
      'https://images.unsplash.com/photo-1672872476232-da16b45c9001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1668211834355-2cdf073f2351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1642345843526-6279c8880a49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    ],
    fullDescription: 'Sumérgete en una metrópolis futurista donde la tecnología y la humanidad chocan en las calles iluminadas por neón. Como un mercenario mejorado cibernéticamente, navegarás por una red de corporaciones corruptas, hackers renegados y facciones en guerra. Cada decisión que tomes dará forma al destino de la ciudad y su pueblo. Con un sistema de combate innovador, personalización profunda de personajes y una narrativa ramificada, Cyberpunk Nocturne ofrece una experiencia de juego de rol verdaderamente inmersiva.',
    reviews: [
      {
        id: 1,
        user: 'CyberGamer99',
        rating: 5,
        date: '2026-05-10',
        comment: 'Absolutamente increíble. Los gráficos son impresionantes y la historia te mantiene enganchado durante horas. El mundo abierto es masivo y está lleno de detalles.',
      },
      {
        id: 2,
        user: 'RPGMaster',
        rating: 4,
        date: '2026-05-08',
        comment: 'Gran juego con mecánicas profundas. El sistema de combate necesita un poco de pulido, pero en general es una experiencia fantástica.',
      },
      {
        id: 3,
        user: 'NeonRunner',
        rating: 5,
        date: '2026-05-05',
        comment: 'Mejor juego cyberpunk que he jugado. La ambientación es perfecta y las misiones secundarias son tan buenas como la historia principal.',
      },
    ],
  },
  '2': {
    id: 2,
    title: 'Urban Chronicles',
    price: '49.99',
    discount: 15,
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    description: 'Aventuras urbanas',
    tags: ['Aventura', 'Historia', 'Exploración'],
    rating: 4.2,
    screenshots: [
      'https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1563863251222-11d3e3bd3b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'https://images.unsplash.com/photo-1609860850812-86de933acace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    ],
    fullDescription: 'Vive aventuras épicas en las calles de una metrópolis moderna. Urban Chronicles te lleva a través de una narrativa cinematográfica llena de giros inesperados, personajes memorables y decisiones que importan.',
    reviews: [
      {
        id: 1,
        user: 'AdventureSeeker',
        rating: 4,
        date: '2026-05-12',
        comment: 'Historia sólida con buenos personajes. La exploración urbana es divertida.',
      },
    ],
  },
};

export function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);

  const game = id ? gamesData[id] : null;

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-4">Juego no encontrado</h1>
          <button
            onClick={() => navigate('/')}
            className="text-cyan-400 hover:text-cyan-300"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  const finalPrice = game.discount
    ? (parseFloat(game.price) * (1 - game.discount / 100)).toFixed(2)
    : game.price;

  const handleAddToCart = () => {
    toast.success(`${game.title} agregado al carrito`, {
      position: 'bottom-right',
    });
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : index < rating
            ? 'fill-yellow-400/50 text-yellow-400'
            : 'fill-none text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen pb-16">
      <button
        onClick={() => navigate('/')}
        className="container mx-auto px-4 pt-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a la tienda
      </button>

      <div
        className="relative h-[400px] md:h-[500px] bg-cover bg-center mt-4"
        style={{ backgroundImage: `url(${game.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
              {game.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {renderStars(game.rating)}
                <span className="text-gray-300 ml-2">
                  {game.rating} / 5
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {game.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-600/30 text-blue-200 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-lg p-6 mb-8">
              <h2 className="text-white text-2xl font-bold mb-4">
                Acerca de este juego
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {game.fullDescription}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-white text-2xl font-bold mb-4">Capturas de pantalla</h2>
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={game.screenshots[selectedScreenshot]}
                  alt={`Screenshot ${selectedScreenshot + 1}`}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {game.screenshots.map((screenshot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedScreenshot(index)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      selectedScreenshot === index
                        ? 'border-cyan-400'
                        : 'border-transparent hover:border-gray-600'
                    }`}
                  >
                    <img
                      src={screenshot}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-lg p-6">
              <h2 className="text-white text-2xl font-bold mb-6">
                Reseñas de usuarios
              </h2>
              <div className="space-y-6">
                {game.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-700 pb-6 last:border-0">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{review.user}</h3>
                        <p className="text-gray-500 text-sm">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#1a1f2e] border border-gray-700/50 rounded-lg p-6 sticky top-20">
              <div className="mb-6">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full rounded-lg"
                />
              </div>

              <div className="mb-6">
                {game.discount ? (
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-red-600 text-white px-3 py-1 rounded font-bold">
                        -{game.discount}%
                      </span>
                      <span className="text-gray-500 line-through text-lg">
                        ${game.price}
                      </span>
                    </div>
                    <div className="text-cyan-400 text-4xl font-bold">
                      ${finalPrice}
                    </div>
                  </div>
                ) : (
                  <div className="text-cyan-400 text-4xl font-bold">
                    ${game.price}
                  </div>
                )}
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </button>

              <div className="border-t border-gray-700 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Desarrollador:</span>
                  <span className="text-white">Neon Studios</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Editor:</span>
                  <span className="text-white">Digital Games Corp</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Fecha de lanzamiento:</span>
                  <span className="text-white">Mayo 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
