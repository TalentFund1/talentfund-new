import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-border z-50 flex items-center px-6">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold text-foreground">SkillStream Optimizer</h1>
        <Button variant="ghost">Sign Out</Button>
      </div>
    </header>
  );
};