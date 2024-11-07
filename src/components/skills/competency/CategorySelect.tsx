import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategorySelectProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export const CategorySelect = ({ selectedCategory, onCategoryChange }: CategorySelectProps) => {
  return (
    <Select value={selectedCategory} onValueChange={onCategoryChange}>
      <SelectTrigger className="w-[200px] bg-white">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        <SelectItem value="specialized">Specialized Skills</SelectItem>
        <SelectItem value="common">Common Skills</SelectItem>
        <SelectItem value="certification">Certification</SelectItem>
      </SelectContent>
    </Select>
  );
};
