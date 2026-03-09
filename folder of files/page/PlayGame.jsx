import React, { useState, useRef, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Maximize, Loader2, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PlayGame() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get("id");
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const iframeContainerRef = React.useRef(null);

  const { data: game, isLoading } = useQuery({
    queryKey: ["game", gameId],
    queryFn: async () => {
      const games = await base44.entities.Game.filter({ id: gameId });
      return games[0];
    },
    enabled: !!gameId,
  });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  React.useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <Gamepad2 className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <p className="text-xl font-semibold text-foreground">Game not found</p>
        <Link to={createPageUrl("Home")} className="mt-4">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Link to={createPageUrl("Home")}>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold text-foreground">{game.title}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge
                variant="outline"
                className="text-[10px] uppercase tracking-wider font-medium bg-primary/10 text-primary border-primary/20"
              >
                {game.category}
              </Badge>
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFullscreen}
          className="hidden sm:flex gap-2 border-border text-muted-foreground hover:text-foreground"
        >
          <Maximize className="w-4 h-4" />
          Fullscreen
        </Button>
      </div>

      {/* Game iframe */}
      <div
        ref={iframeContainerRef}
        className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-border shadow-2xl shadow-primary/5"
      >
        <iframe
          src={game.iframe_url}
          title={game.title}
          className="w-full h-full border-0"
          allowFullScreen
          allow="autoplay; fullscreen; gamepad"
        />
      </div>

      {/* Description */}
      {game.description && (
        <div className="mt-6 p-5 bg-card rounded-xl border border-border">
          <h2 className="text-sm font-semibold text-foreground mb-2">
            About this game
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {game.description}
          </p>
        </div>
      )}
    </div>
  );
}
