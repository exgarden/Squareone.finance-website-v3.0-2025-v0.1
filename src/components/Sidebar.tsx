import { ChartPie, Clock, CreditCard, House, Info, LogOut, Phone, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const menuItems = [
    { id: '/', icon: House, label: 'Home' },
    { id: '/dashboard', icon: ChartPie, label: 'Dashboard' },
    { id: '/budget', icon: ChartPie, label: 'Budget' },
    { id: '/accounts', icon: CreditCard, label: 'Accounts' },
    { id: '/history', icon: Clock, label: 'History' },
    { id: '/about', icon: Info, label: 'About' },
    { id: '/contact', icon: Phone, label: 'Contact' },
    { id: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold text-blue-600 flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <span className="bg-blue-600 text-white rounded-md p-1 mr-2">SQ</span>
          SquareOne
        </h1>
      </div>

      <nav className="flex-1 px-4 py-2">
        <ul className="space-y-1">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => navigate(item.id)}
                className={`
                  w-full flex items-center px-4 py-3 rounded-lg text-left
                  ${currentPath === item.id 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-slate-600 hover:bg-slate-100'}
                  transition-colors
                `}
              >
                <item.icon size={18} className="mr-3" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center px-4 py-3 rounded-lg text-left text-slate-600 hover:bg-slate-100"
        >
          <LogOut size={18} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
