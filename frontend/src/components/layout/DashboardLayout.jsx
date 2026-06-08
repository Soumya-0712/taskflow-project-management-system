import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-col flex-1 min-w-0">
        <Navbar setIsOpen={setIsOpen} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
