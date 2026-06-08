import { LayoutDashboard, FolderKanban, User, X } from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Projects",
      path: "/projects",
      icon: <FolderKanban size={20} />,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <>
      <aside
        className={`
          fixed lg:static top-0 left-0
          h-screen w-64
          bg-slate-950 text-white
          z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <h1 className="text-xl font-bold">TaskFlow</h1>

          <button className="lg:hidden" onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="mt-4 px-3">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.title}
                to={item.path}
                className={`
                  flex items-center gap-3
                  px-4 py-3 rounded-lg mb-2
                  transition-all
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-900 text-slate-300"
                  }
                `}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
