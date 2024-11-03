import { LayoutDashboard, Users, LineChart, BookOpen, Store, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const primaryMenuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/" },
    { name: "Skill Profiles", icon: <BookOpen className="w-5 h-5" />, path: "/skills" },
    { name: "Employees", icon: <Users className="w-5 h-5" />, path: "/employees" },
    { name: "Market Data", icon: <LineChart className="w-5 h-5" />, path: "/market" },
  ];

  const secondaryMenuItems = [
    { name: "Talent Marketplace", icon: <Store className="w-5 h-5" />, path: "/marketplace" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 border-r border-border bg-[#F7F9FF] flex flex-col">
      <div className="p-6 border-b border-border">
        <img src="/TalentFund.png" alt="TalentFund" className="h-8" />
      </div>
      <nav className="flex-1 px-3 py-4 flex flex-col justify-between">
        <div className="space-y-1">
          {primaryMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-4 py-2.5 text-sm font-medium text-foreground hover:bg-gray-200 rounded-md transition-colors"
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="space-y-1">
          <div className="h-px bg-border mx-4 mb-2"></div>
          {secondaryMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center px-4 py-2.5 text-sm font-medium text-foreground hover:bg-gray-200 rounded-md transition-colors"
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};