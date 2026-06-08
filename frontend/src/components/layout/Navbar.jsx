import { Menu, Bell } from "lucide-react";

const Navbar = ({ setIsOpen }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="font-semibold text-lg text-slate-800">
            Project Management System
          </h2>

          <p className="text-xs text-slate-500">
            Manage projects, tasks and teams
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition">
          <Bell size={20} />

          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <p className="font-medium text-slate-800">Soumyadeep Paul</p>

            <p className="text-xs text-slate-500">Admin</p>
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to- r  from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
            T
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
