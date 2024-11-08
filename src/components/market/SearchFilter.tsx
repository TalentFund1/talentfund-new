import React from 'react';
import { X } from 'lucide-react';

interface SearchFilterProps {
  label: string;
  placeholder: string;
  items: string[];
  selectedItems: string[];
  onItemsChange: (items: string[]) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  label,
  placeholder,
  items,
  selectedItems,
  onItemsChange,
}) => {
  const handleRemoveItem = (item: string) => {
    onItemsChange(selectedItems.filter((i) => i !== item));
  };

  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm text-[#1F2144]">{label}</label>}
      <div className="min-h-[40px] w-full">
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedItems.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-primary/10 text-primary rounded"
            >
              {item}
              <button
                onClick={() => handleRemoveItem(item)}
                className="hover:text-primary-accent"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-input rounded bg-white focus:outline-none focus:ring-1 focus:ring-ring"
        onChange={(e) => {
          const value = e.target.value.toLowerCase();
          if (value && items.some((item) => item.toLowerCase() === value)) {
            const newItem = items.find((item) => item.toLowerCase() === value);
            if (newItem && !selectedItems.includes(newItem)) {
              onItemsChange([...selectedItems, newItem]);
              e.target.value = '';
            }
          }
        }}
      />
    </div>
  );
};