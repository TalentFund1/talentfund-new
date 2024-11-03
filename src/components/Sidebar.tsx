import { LayoutDashboard, Users, Scale, Users2, Banknote, PenSquare, Gift, Settings, MessageSquare, PanelLeftClose } from "lucide-react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/" },
    { name: "Market Data", icon: <Scale className="w-5 h-5" />, path: "/market" },
    { name: "Team", icon: <Users2 className="w-5 h-5" />, path: "/team" },
    { name: "Market Pricing", icon: <Banknote className="w-5 h-5" />, path: "/pricing" },
    { name: "Compensation Planning", icon: <PenSquare className="w-5 h-5" />, path: "/compensation" },
    { name: "Total Rewards", icon: <Gift className="w-5 h-5" />, path: "/rewards" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
  ];

  const bottomMenuItems = [
    { name: "Chat with us", icon: <MessageSquare className="w-5 h-5" />, path: "/chat" },
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