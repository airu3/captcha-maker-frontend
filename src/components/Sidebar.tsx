import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, PenLine, User, Heart, Clock } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'あそぶ', icon: Gamepad2 },
    { path: '/create', label: 'つくる', icon: PenLine },
    { path: '/my-stages', label: '自分のステージ', icon: User },
    { path: '/popular', label: '人気のステージ', icon: Heart },
    { path: '/new', label: '新しいステージ', icon: Clock },
  ];

  return (
    <div className="w-64 bg-[#2c3e50] p-5 fixed h-full">
      <div className="flex flex-col space-y-4">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`
              flex items-center space-x-2 px-4 py-3 rounded-lg
              transition-colors duration-200
              ${location.pathname === path 
                ? 'bg-[#1abc9c] text-white' 
                : 'bg-[#34495e] text-white hover:bg-[#1abc9c]'}
              ${['/create', '/'].includes(path) ? 'text-xl py-4' : 'text-base'}
            `}
          >
            <Icon size={24} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}