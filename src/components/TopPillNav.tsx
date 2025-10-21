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
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center animate-fade-in pointer-events-none">
      <div className="glass-elevated rounded-2xl p-1.5 shadow-lg glow-primary pointer-events-auto">
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center justify-center gap-2 min-w-[100px] px-4 py-2.5 rounded-xl transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg glow-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`
              }
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TopPillNav;
