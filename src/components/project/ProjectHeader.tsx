import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export const ProjectHeader = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary">Create a Project</h1>
        <Button className="bg-[#F7F9FF] hover:bg-[#F7F9FF]/90 text-primary font-semibold border border-border">
          Export Data
        </Button>
      </div>
      <Separator className="bg-[#CCDBFF]" />
    </div>
  )
}