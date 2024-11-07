import { useState } from 'react';

interface GridProps {
  onSelect?: (index: number) => void;
  selectedItems?: number[];
  images?: string[];
  isCreating?: boolean;
}

export function Grid({ onSelect, selectedItems = [], images = [], isCreating = false }: GridProps) {
  const [selected, setSelected] = useState<number[]>(selectedItems);

  const handleClick = (index: number) => {
    if (isCreating) {
      const newSelected = selected.includes(index)
        ? selected.filter(i => i !== index)
        : [...selected, index];
      setSelected(newSelected);
      onSelect?.(index);
    } else {
      onSelect?.(index);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-1 w-fit mx-auto">
      {Array.from({ length: 9 }).map((_, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={`
            w-[100px] h-[100px] cursor-pointer
            transition-all duration-200
            ${selected.includes(index) ? 'bg-[#1abc9c]' : 'bg-[#bdc3c7]'}
            ${images[index] ? 'bg-cover bg-center' : ''}
          `}
          style={images[index] ? { backgroundImage: `url(${images[index]})` } : {}}
        />
      ))}
    </div>
  );
}