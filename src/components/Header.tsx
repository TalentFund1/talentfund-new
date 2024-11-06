import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { UserCircle, LogOut, Key } from "lucide-react";

export const Header = () => {
  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleResetPassword = () => {
    console.log("Resetting password...");
  };

  return (
    <header className="fixed top-0 right-0 left-16 h-16 bg-primary text-white z-40">
      <div className="h-full flex items-center justify-end px-6">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-primary-accent/10 rounded-md px-3 py-2 transition-colors">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <img src="https://github.com/shadcn.png" alt="Profile" />
              </Avatar>
              <span className="font-medium">Nadia Pulcova</span>
            </div>
            <UserCircle className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleResetPassword} className="cursor-pointer">
              <Key className="mr-2 h-4 w-4" />
              <span>Reset Password</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};