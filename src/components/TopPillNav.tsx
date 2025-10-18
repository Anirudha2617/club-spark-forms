import { NavLink } from 'react-router-dom';
import { Compass, MessageSquare, Calendar, User } from 'lucide-react';

const TopPillNav = () => {
  const navItems = [
    { to: '/discover', label: 'Discover', icon: Compass },
    { to: '/clubs', label: 'Clubs', icon: MessageSquare },
    { to: '/events', label: 'Events', icon: Calendar },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="glass-elevated rounded-2xl px-2 py-2 shadow-lg glow-primary">
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105 glow-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface/50 hover:scale-102'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TopPillNav;
