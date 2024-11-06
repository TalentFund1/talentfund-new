import { LayoutDashboard, Users, LineChart, BookOpen, Store, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

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
      className={`fixed top-0 left-0 h-screen border-r border-border bg-white shadow-sm flex flex-col transition-all duration-300 z-50 ${
        isCollapsed ? "w-16" : "w-72"
      }`}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold text-foreground">TalentFund</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              {item.icon}
              {!isCollapsed && (
                <span className="font-medium text-foreground">{item.name}</span>
              )}
            </Link>
          ))}
        </div>

        <div className="space-y-1">
          <Separator className="my-8" />
          {secondaryMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              {item.icon}
              {!isCollapsed && (
                <span className="font-medium text-foreground">{item.name}</span>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};