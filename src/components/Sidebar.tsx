import { LayoutDashboard, Users, LineChart, BookOpen, Store, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const primaryMenuItems = [
    { 
      name: "Dashboard", 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      path: "/",
      growth: "+12.37%",
      description: "Dashboard analytics show increased usage trends over the past month."
    },
    { 
      name: "Skill Profiles", 
      icon: <BookOpen className="w-5 h-5" />, 
      path: "/skills",
      growth: "+8.5%",
      description: "Skill profile completions have improved significantly."
    },
    { 
      name: "Employees", 
      icon: <Users className="w-5 h-5" />, 
      path: "/employees",
      growth: "+15.2%",
      description: "Employee engagement metrics show positive growth."
    },
    { 
      name: "Market Data", 
      icon: <LineChart className="w-5 h-5" />, 
      path: "/market",
      growth: "+5.8%",
      description: "Market data accuracy has increased this quarter."
    },
  ];

  const secondaryMenuItems = [
    { 
      name: "Talent Marketplace",
      icon: <Store className="w-5 h-5" />,
      path: "/marketplace",
      stats: [
        { label: "3M", value: "$145,000" },
        { label: "6M", value: "$155,000" },
        { label: "1Y", value: "$165,000" },
      ]
    },
    { 
      name: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/settings",
      stats: [
        { label: "Active Users", value: "2,177" },
        { label: "Total Users", value: "1,946" },
      ]
    },
  ];

  return (
    <div 
      className={`fixed top-0 left-0 h-screen border-r border-border bg-[#F7F9FF] flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-72"
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
              className={`block rounded-md transition-colors ${
                isCollapsed ? "p-2" : "p-3"
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
                <div className="flex items-center gap-3">
                  {item.icon}
                  {!isCollapsed && (
                    <span className="font-medium text-foreground">{item.name}</span>
                  )}
                </div>
                {!isCollapsed && (
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-0">
                    {item.growth}
                  </Badge>
                )}
              </div>
              {!isCollapsed && (
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              )}
            </Link>
          ))}
        </div>

        <div className="space-y-4">
          <Separator className="my-4" />
          {secondaryMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block rounded-md transition-colors ${
                isCollapsed ? "p-2" : "p-3"
              }`}
            >
              <div className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
                {item.icon}
                {!isCollapsed && (
                  <span className="font-medium text-foreground">{item.name}</span>
                )}
              </div>
              {!isCollapsed && item.stats && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {item.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                      <div className="text-sm font-medium">{stat.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};