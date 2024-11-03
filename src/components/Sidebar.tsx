import { LayoutDashboard, Users, LineChart, BookOpen, Store, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, path: "/" },
    { name: "Skill Profiles", icon: <BookOpen className="w-4 h-4" />, path: "/skills" },
    { name: "Employees", icon: <Users className="w-4 h-4" />, path: "/employees" },
    { name: "Market Data", icon: <LineChart className="w-4 h-4" />, path: "/market" },
    { name: "Talent Marketplace", icon: <Store className="w-4 h-4" />, path: "/marketplace" },
    { name: "Settings", icon: <Settings className="w-4 h-4" />, path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 border-r border-border bg-white">
      <div className="p-4">
        <img src="/logo.svg" alt="Logo" className="h-8" />
      </div>
      <nav className="space-y-1 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center px-4 py-2 text-sm font-medium text-foreground hover:bg-background rounded-md"
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};