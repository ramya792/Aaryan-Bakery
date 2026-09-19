import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { LayoutDashboard, Package, Images, MessageSquare, Building2, HelpCircle, LogOut, Cake, UserCheck, Shield } from 'lucide-react';

export default function AdminLayout() {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard, end: true },
    { name: 'Products CRUD', path: '/admin/dashboard/products', icon: Package },
    { name: 'Order Enquiries', path: '/admin/dashboard/enquiries', icon: MessageSquare },
    { name: 'Photo Gallery', path: '/admin/dashboard/gallery', icon: Images },
    { name: 'Business Info', path: '/admin/dashboard/business', icon: Building2 },
    { name: 'Chatbot Knowledge', path: '/admin/dashboard/chatbot', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-200 flex flex-col shrink-0 border-r border-slate-800">
        
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <img
            src="/images/logo/aaryan-bakery-logo.png"
            alt="Aaryan Bakery"
            onError={(e) => { e.target.style.display = 'none'; }}
            className="h-11 w-11 rounded-full object-contain drop-shadow-sm"
          />
          <div>
            <h2 className="font-serif font-black text-sm text-white leading-none">Aaryan Bakery</h2>
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Admin Portal</span>
          </div>
        </div>

        {/* Admin User Info */}
        <div className="p-4 mx-3 my-3 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-center gap-3 text-xs">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
            <UserCheck className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <p className="font-semibold text-white truncate">{adminUser?.ownerName || 'K. Narendra'}</p>
            <p className="text-[10px] text-slate-400 truncate">{adminUser?.email || 'admin@aaryanbakery.com'}</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 space-y-1 py-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Public Site Quick Link & Logout */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <span>View Public Website</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-amber-400">Live ↗</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Bar Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Authorized Bakery Control Center
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Owner: <strong className="text-slate-900">K. Narendra</strong></span>
            <span>•</span>
            <span>Aaryan Bakery Mudinepalle</span>
          </div>
        </header>

        {/* Dynamic Admin View */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
