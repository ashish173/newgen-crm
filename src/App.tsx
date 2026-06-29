import React from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  DoorClosed,
  Settings,
  LayoutDashboard,
  Briefcase,
  Search,
  Bell,
  Menu,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Leads from './pages/Leads';
import Quotations from './pages/Quotations';
import SiteVisits from './pages/SiteVisits';
import Production from './pages/Production';
import Installation from './pages/Installation';
import Payments from './pages/Payments';

// --- Dummy Data ---
const MOCK_PROJECTS = [
  {
    id: 'PRJ-1024',
    name: 'Oceanside Villa Reno',
    client: 'Sarah Jenkins',
    status: 'in-progress',
    progress: 65,
    items: { windows: 14, doors: 3 },
    dueDate: '2024-11-15'
  },
  {
    id: 'PRJ-1025',
    name: 'Downtown Commercial Hub',
    client: 'Apex Developments',
    status: 'planning',
    progress: 15,
    items: { windows: 120, doors: 45 },
    dueDate: '2025-02-28'
  },
  {
    id: 'PRJ-1026',
    name: 'Maple Street Residence',
    client: 'Tom & Lisa Smith',
    status: 'completed',
    progress: 100,
    items: { windows: 8, doors: 2 },
    dueDate: '2024-09-01'
  },
  {
    id: 'PRJ-1027',
    name: 'Sunset Highrise',
    client: 'Skyline Build',
    status: 'delayed',
    progress: 40,
    items: { windows: 400, doors: 120 },
    dueDate: '2025-06-30'
  }
];

const MOCK_INSTALLATIONS = [
  {
    id: 'INST-441',
    project: 'Oceanside Villa Reno',
    team: 'Team Alpha',
    date: 'Today, 08:00 AM',
    status: 'active'
  },
  {
    id: 'INST-442',
    project: 'Sunset Highrise',
    team: 'Team Delta',
    date: 'Tomorrow, 09:30 AM',
    status: 'scheduled'
  }
];

// --- Components ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'in-progress': 'bg-blue-100 text-blue-700',
    'planning': 'bg-purple-100 text-purple-700',
    'completed': 'bg-emerald-100 text-emerald-700',
    'delayed': 'bg-rose-100 text-rose-700',
    'active': 'bg-emerald-100 text-emerald-700',
    'scheduled': 'bg-amber-100 text-amber-700'
  };

  const icons: Record<string, React.ReactNode> = {
    'in-progress': <Clock className="w-3 h-3 mr-1" />,
    'planning': <Settings className="w-3 h-3 mr-1" />,
    'completed': <CheckCircle2 className="w-3 h-3 mr-1" />,
    'delayed': <AlertCircle className="w-3 h-3 mr-1" />,
    'active': <CheckCircle2 className="w-3 h-3 mr-1" />,
    'scheduled': <Clock className="w-3 h-3 mr-1" />
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {icons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
    </span>
  );
};

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/' },
    { icon: <Building2 className="w-5 h-5" />, label: 'Leads', path: '/leads' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Quotations', path: '/quotations' },
    { icon: <Clock className="w-5 h-5" />, label: 'Site Visits', path: '/site-visits' },
    { icon: <DoorClosed className="w-5 h-5" />, label: 'Production', path: '/production' },
    { icon: <Settings className="w-5 h-5" />, label: 'Installation', path: '/installation' },
    { icon: <AlertCircle className="w-5 h-5" />, label: 'Payments', path: '/payments' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 h-screen fixed left-0 top-0 hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          NewGen CRM
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gray-50 text-black font-medium'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`${isActive ? 'text-black' : 'text-gray-400'}`}>
                {item.icon}
              </div>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white shadow-sm"></div>
          <div>
            <p className="text-sm font-medium text-gray-900">Alex Walker</p>
            <p className="text-xs text-gray-500">Project Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => (
  <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 flex items-center justify-between px-6">
    <div className="flex items-center gap-4">
      <button className="md:hidden text-gray-500 hover:text-gray-900">
        <Menu className="w-5 h-5" />
      </button>
      <div className="relative hidden sm:block">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search projects, clients..."
          className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-black/5 w-64 transition-all"
        />
      </div>
    </div>

    <div className="flex items-center gap-4">
      <button className="relative p-2 text-gray-400 hover:text-gray-900 transition-colors">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
      </button>
      <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
        New Project
      </button>
    </div>
  </header>
);

const Dashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h2>
        <p className="text-gray-500 mt-1">Welcome back. Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Projects', value: '12', trend: '+2 this month' },
          { label: 'Upcoming Installations', value: '8', trend: 'Next 7 days' },
          { label: 'Pending Quotes', value: '24', trend: 'Needs review' }
        ].map((kpi, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{kpi.label}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-4xl font-bold text-gray-900 tracking-tight">{kpi.value}</p>
            </div>
            <p className="text-sm text-gray-400 mt-2">{kpi.trend}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projects List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recent Projects</h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</button>
          </div>

          <div className="grid gap-4">
            {MOCK_PROJECTS.map((project, i) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                key={project.id}
                className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">{project.id}</span>
                      <StatusBadge status={project.status} />
                    </div>
                    <h4 className="font-semibold text-gray-900">{project.name}</h4>
                    <p className="text-sm text-gray-500">{project.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{project.items.windows} Windows</p>
                    <p className="text-sm text-gray-500">{project.items.doors} Doors</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-black h-1.5 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Schedule Sidebar */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Schedule</h3>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-50 bg-gray-50/50">
              <h4 className="font-semibold text-gray-900">Installations</h4>
            </div>
            <div className="divide-y divide-gray-50">
              {MOCK_INSTALLATIONS.map((inst, i) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  key={inst.id}
                  className="p-5 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-sm text-gray-900">{inst.project}</h5>
                    <StatusBadge status={inst.status} />
                  </div>
                  <div className="flex items-center text-xs text-gray-500 gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {inst.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      {inst.team}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-50 bg-gray-50/50 text-center">
               <button className="text-sm font-medium text-gray-600 hover:text-gray-900">View Full Calendar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-black selection:text-white flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/quotations" element={<Quotations />} />
            <Route path="/site-visits" element={<SiteVisits />} />
            <Route path="/production" element={<Production />} />
            <Route path="/installation" element={<Installation />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
