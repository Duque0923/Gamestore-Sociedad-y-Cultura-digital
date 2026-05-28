import { Gamepad2, Sword, Trophy, Rocket, Users, Sparkles } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { id: 'all', name: 'Todos', icon: <Sparkles className="w-5 h-5" /> },
  { id: 'action', name: 'Acción', icon: <Sword className="w-5 h-5" /> },
  { id: 'adventure', name: 'Aventura', icon: <Rocket className="w-5 h-5" /> },
  { id: 'sports', name: 'Deportes', icon: <Trophy className="w-5 h-5" /> },
  { id: 'multiplayer', name: 'Multijugador', icon: <Users className="w-5 h-5" /> },
  { id: 'indie', name: 'Indie', icon: <Gamepad2 className="w-5 h-5" /> },
];

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="bg-[#1b2838] rounded-lg p-6 mb-8">
      <h2 className="text-white text-xl font-bold mb-4">Categorías</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-all ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-[#2a475e] text-gray-300 hover:bg-[#316282]'
            }`}
          >
            {category.icon}
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
