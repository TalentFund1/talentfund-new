import { Button } from "@/components/ui/button"

export const ProjectHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-primary">Create a Project</h1>
        <p className="text-sm text-primary/60">Define your project requirements and find the perfect team match.</p>
      </div>
      <Button className="bg-[#F7F9FF] hover:bg-[#F7F9FF]/90 text-primary font-semibold border border-border">
        Export Data
      </Button>
    </div>
  )
}