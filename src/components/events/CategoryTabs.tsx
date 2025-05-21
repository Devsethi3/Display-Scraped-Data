"use client";

import { EventCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { 
  MusicIcon, 
  PaletteIcon, 
  DumbbellIcon, 
  UtensilsIcon, 
  WineIcon, 
  HeartIcon, 
  SmileIcon, 
  LayersIcon 
} from "lucide-react";

interface CategoryTabsProps {
  activeCategory: EventCategory;
  setCategory: (category: EventCategory) => void;
}

export function CategoryTabs({ activeCategory, setCategory }: CategoryTabsProps) {
  const categories: { 
    id: EventCategory; 
    name: string; 
    icon: React.ReactNode;
  }[] = [
    { id: "All", name: "All Events", icon: <LayersIcon className="h-4 w-4 mr-2" /> },
    { id: "Music", name: "Music", icon: <MusicIcon className="h-4 w-4 mr-2" /> },
    { id: "Arts", name: "Arts", icon: <PaletteIcon className="h-4 w-4 mr-2" /> },
    { id: "Sports", name: "Sports", icon: <DumbbellIcon className="h-4 w-4 mr-2" /> },
    { id: "Food", name: "Food", icon: <UtensilsIcon className="h-4 w-4 mr-2" /> },
    { id: "Nightlife", name: "Nightlife", icon: <WineIcon className="h-4 w-4 mr-2" /> },
    { id: "Family", name: "Family", icon: <HeartIcon className="h-4 w-4 mr-2" /> },
    { id: "Comedy", name: "Comedy", icon: <SmileIcon className="h-4 w-4 mr-2" /> },
  ];
  
  return (
    <div className="border-b">
      <div className="container">
        <div className="flex overflow-x-auto scrollbar-hide py-2">
          <div className="flex space-x-2 pb-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCategory(category.id)}
                className={cn(
                  "flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
                )}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}