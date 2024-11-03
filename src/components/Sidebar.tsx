import { LayoutDashboard, Users, LineChart, BookOpen, Store, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div 
      className={`fixed top-0 left-0 h-screen border-r border-border bg-[#F7F9FF] flex flex-col transition-all duration-300 backdrop-blur-none ${
        isCollapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold text-foreground">TalentFund</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
      <nav className="flex-1 px-2 py-4 flex flex-col justify-between">
        <div className="space-y-1">
          {primaryMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-2.5 text-sm font-medium text-foreground hover:bg-gray-200 rounded-md transition-colors ${
                isCollapsed ? "justify-center" : ""
              }`}
              title={isCollapsed ? item.name : ""}
            >
              {item.icon}
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </div>
        <div className="space-y-1">
          <div className="h-px bg-border mx-2 mb-2"></div>
          {secondaryMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-3 py-2.5 text-sm font-medium text-foreground hover:bg-gray-200 rounded-md transition-colors ${
                isCollapsed ? "justify-center" : ""
              }`}
              title={isCollapsed ? item.name : ""}
            >
              {item.icon}
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};