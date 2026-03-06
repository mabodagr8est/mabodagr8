import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Gamepad2, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const categoryColors = {
  action: "bg-red-500/20 text-red-400 border-red-500/30",
  puzzle: "bg-blue-400/20 text-blue-400 border-blue-400/30",
  arcade: "bg-yellow-400/20 text-yellow-400 border-yellow-400/30",
  racing: "bg-green-400/20 text-green-400 border-green-400/30",
  sports: "bg-orange-400/20 text-orange-400 border-orange-400/30",
  strategy: "bg-purple-400/20 text-purple-400 border-purple-400/30",
  adventure: "bg-teal-400/20 text-teal-400 border-teal-400/30",
  multiplayer: "bg-pink-400/20 text-pink-400 border-pink-400/30",
};

export default function GameCard({ game }) {
  return (
    <Link
      to={createPageUrl("PlayGame") + `?id=${game.id}`}
      className="group block"
    >
      <div className="relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-secondary overflow-hidden">
          {game.thumbnail_url ? (
            <img
              src={game.thumbnail_url}
              alt={game.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Gamepad2 className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
              <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
            </div>
          </div>
          {game.featured && (
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider">
              Featured
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-card-foreground text-sm truncate group-hover:text-primary transition-colors">
            {game.title}
          </h3>
          {game.description && (
            <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
              {game.description}
            </p>
          )}
          <div className="mt-3">
            <Badge
              variant="outline"
              className={`text-[10px] uppercase tracking-wider font-medium ${categoryColors[game.category] || "bg-muted text-muted-foreground"}`}
            >
              {game.category}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
