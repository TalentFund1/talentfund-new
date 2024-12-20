import { Separator } from "@/components/ui/separator"

interface DescriptionSectionProps {
  description: string;
  onDescriptionChange: (value: string) => void;
}

export const DescriptionSection = ({
  description,
  onDescriptionChange
}: DescriptionSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-primary">1. Project Description</h2>
        <p className="text-sm text-primary/60">Describe what you're looking for in a sentence or two.</p>
      </div>
      <textarea 
        className="w-full min-h-[100px] p-3 rounded-md border border-border bg-background/40 focus:border-primary-accent focus:ring-1 focus:ring-primary-accent"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Enter project description..."
      />
      <Separator className="my-6" />
    </div>
  )
}