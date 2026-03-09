import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Gamepad2, Loader2 } from "lucide-react";
import GameCard from "@/components/games/GameCard";
import CategoryFilter from "@/components/games/CategoryFilter";
import SearchBar from "@/components/games/SearchBar";

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { data: games = [], isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: () => base44.entities.Game.list("-created_date", 200),
  });

  const filtered = games.filter((game) => {
    const matchesSearch =
      !search ||
      game.title?.toLowerCase().includes(search.toLowerCase()) ||
      game.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "all" || game.category === category;
    return matchesSearch && matchesCategory;
  });

  const featured = games.filter((g) => g.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Play <span className="text-primary">Unblocked</span> Games
        </h1>
        <p className="text-muted-foreground mt-3 text-lg max-w-xl mx-auto">
          Your favorite games, ready to play instantly. No downloads, no
          restrictions.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col items-center gap-5 mb-8">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>

      {/* Featured Section */}
      {category === "all" && !search && featured.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-accent rounded-full" />
            Featured Games
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      )}

      {/* All Games Grid */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full" />
          {category === "all" ? "All Games" : `${category.charAt(0).toUpperCase() + category.slice(1)} Games`}
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ({filtered.length})
          </span>
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Gamepad2 className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground text-lg">No games found</p>
            <p className="text-muted-foreground/60 text-sm mt-1">
              Try a different search or category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
