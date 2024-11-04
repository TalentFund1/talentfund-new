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
    { name: "Dashboard", path: "/" },
    { name: "Skill Profiles", path: "/skills" },
    { name: "Employees", path: "/employees" },
    { name: "Market Data", path: "/market" },
  ];

  const secondaryMenuItems = [
    { name: "Talent Marketplace", path: "/marketplace" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div 
      className={`fixed top-0 left-0 h-screen border-r border-border bg-white shadow-sm flex flex-col transition-all duration-300 z-50 ${
        isCollapsed ? "w-16" : "w-72"
      }`}
      style={{ backgroundColor: 'white' }}
    >
      <div className="p-4 border-b border-border flex items-center justify-between" style={{ backgroundColor: 'white' }}>
        {!isCollapsed && <h1 className="text-xl font-bold text-foreground">TalentFund</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span className="text-sm">
            {isCollapsed ? "→" : "←"}
          </span>
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 flex flex-col justify-between" style={{ backgroundColor: 'white' }}>
        <div className="space-y-1">
          {primaryMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-foreground">{item.name}</span>
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
              <span className="font-medium text-foreground">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};