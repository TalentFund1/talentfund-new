import { LayoutDashboard, Users, LineChart, BookOpen, Store, Settings, PanelLeftClose } from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/" },
    { name: "Skill Profiles", icon: <BookOpen className="w-5 h-5" />, path: "/skills" },
    { name: "Employees", icon: <Users className="w-5 h-5" />, path: "/employees" },
    { name: "Market Data", icon: <LineChart className="w-5 h-5" />, path: "/market" },
  ];

  const bottomMenuItems = [
    { name: "Talent Marketplace", icon: <Store className="w-5 h-5" />, path: "/marketplace" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
    { name: "Collapse Menu", icon: <PanelLeftClose className="w-5 h-5" />, path: "#" },
  ];

  return (
    <div className="h-screen w-64 border-r border-border bg-[#F7F9FF] flex flex-col">
      <div className="p-4">
        <img src="/logo.svg" alt="Logo" className="h-8" />
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center px-4 py-2.5 text-sm font-medium text-foreground hover:bg-white/80 rounded-md transition-colors"
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="px-3 pb-4 mt-auto border-t border-border pt-4">
        {bottomMenuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center px-4 py-2.5 text-sm font-medium text-foreground hover:bg-white/80 rounded-md mb-1 transition-colors"
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};