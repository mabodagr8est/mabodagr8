import React from "react";
import { cn } from "@/lib/utils";
import {
  Crosshair, Puzzle, Joystick, Car, Trophy,
  Brain, Compass, Users
} from "lucide-react";

const categories = [
  { value: "all", label: "All Games", icon: Joystick },
  { value: "action", label: "Action", icon: Crosshair },
  { value: "puzzle", label: "Puzzle", icon: Puzzle },
  { value: "arcade", label: "Arcade", icon: Joystick },
  { value: "racing", label: "Racing", icon: Car },
  { value: "sports", label: "Sports", icon: Trophy },
  { value: "strategy", label: "Strategy", icon: Brain },
  { value: "adventure", label: "Adventure", icon: Compass },
  { value: "multiplayer", label: "Multiplayer", icon: Users },
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = selected === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border",
              isActive
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                : "bg-secondary text-secondary-foreground border-border hover:bg-muted hover:border-muted-foreground/20"
            )}
          >
            <Icon className="w-4 h-4" />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
