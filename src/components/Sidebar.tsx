import { LayoutDashboard, Users, LineChart, BookOpen, Store, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/" },
    { name: "Skill Profiles", icon: <BookOpen className="w-5 h-5" />, path: "/skills" },
    { name: "Employees", icon: <Users className="w-5 h-5" />, path: "/employees" },
    { name: "Market Data", icon: <LineChart className="w-5 h-5" />, path: "/market" },
    { name: "Talent Marketplace", icon: <Store className="w-5 h-5" />, path: "/marketplace" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 border-r border-border bg-[#F7F9FF] flex flex-col">
      <div className="p-6 border-b border-border">
        <img src="/TalentFund.png" alt="TalentFund" className="h-8" />
      </div>
      <nav className="flex-1 space-y-1 px-3 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center px-4 py-2.5 text-sm font-medium text-foreground hover:bg-background rounded-md transition-colors"
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};