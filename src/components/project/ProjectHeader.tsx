import { Button } from "@/components/ui/button"

export const ProjectHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-primary">Create a Project</h1>
        <p className="text-sm text-primary/60">Define your project requirements and find the perfect team match.</p>
      </div>
      <Button 
        variant="outline" 
        className="bg-[#1F2144] hover:bg-[#1F2144]/90 text-white font-medium"
      >
        Save Project
      </Button>
    </div>
  )
}