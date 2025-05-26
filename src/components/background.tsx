import { Tiles } from "./ui/tiles";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent dark:from-zinc-950/50 dark:to-transparent" />
      <Tiles
        className="absolute inset-0 opacity-90 dark:opacity-90"
        rows={10}
        cols={10}
        tileSize="lg"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 dark:to-black/50" />
    </div>
  );
}
