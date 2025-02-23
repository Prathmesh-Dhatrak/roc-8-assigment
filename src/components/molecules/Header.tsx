import { Bell, UserCircle } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#1A1D29]">
      <div className="flex items-center gap-8">
        <h1 className="text-cyan-400 text-xl font-bold">HOURS</h1>
        <nav className="flex gap-6">
          <a href="#" className="text-white hover:text-cyan-400">Dashboard</a>
          <a href="#" className="text-gray-400 hover:text-cyan-400">Projects</a>
          <a href="#" className="text-gray-400 hover:text-cyan-400">Team</a>
          <a href="#" className="text-gray-400 hover:text-cyan-400">Clients</a>
          <a href="#" className="text-gray-400 hover:text-cyan-400">Time</a>
          <a href="#" className="text-gray-400 hover:text-cyan-400">Reports</a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white">
          <Bell className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <UserCircle className="w-8 h-8 text-gray-400" />
          <span className="text-white">Mario</span>
        </div>
      </div>
    </header>
  );
};