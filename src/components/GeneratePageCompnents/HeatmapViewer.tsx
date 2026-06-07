"use client";

import { useEffect, useState } from "react";
import { studyHeatmapUrl, studyImageUrl } from "@/lib/studies";

type ViewMode = "original" | "overlay" | "side-by-side";

type Props = {
  studyId: string;
};

const MODES: { id: ViewMode; label: string }[] = [
  { id: "original", label: "Original" },
  { id: "overlay", label: "Overlay" },
  { id: "side-by-side", label: "Side-by-side" },
];

export default function HeatmapViewer({ studyId }: Props) {
  const [mode, setMode] = useState<ViewMode>("overlay");
  const [opacity, setOpacity] = useState(65);
  const [originalLoaded, setOriginalLoaded] = useState(false);
  const [heatmapAvailable, setHeatmapAvailable] = useState<boolean | null>(null);

  const originalSrc = studyImageUrl(studyId);
  const heatmapSrc = studyHeatmapUrl(studyId);

  useEffect(() => {
    let cancelled = false;

    async function checkHeatmap() {
      try {
        const res = await fetch(heatmapSrc, { credentials: "include" });
        if (!cancelled) {
          setHeatmapAvailable(res.ok);
          if (!res.ok) setMode("original");
        }
      } catch {
        if (!cancelled) {
          setHeatmapAvailable(false);
          setMode("original");
        }
      }
    }

    setOriginalLoaded(false);
    setHeatmapAvailable(null);
    checkHeatmap();

    return () => {
      cancelled = true;
    };
  }, [heatmapSrc, studyId]);

  const showSkeleton = !originalLoaded || heatmapAvailable === null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-primary font-semibold">
            AI Attention Map
          </p>
          <p className="text-sm text-muted-foreground">
            Review where the model focused during analysis
          </p>
        </div>

        {heatmapAvailable && (
          <div className="flex flex-wrap gap-1 rounded-full border border-slate-200 bg-white p-1">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  mode === m.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative mt-4 flex min-h-[200px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
        {showSkeleton && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
            <p className="text-sm text-muted-foreground">Loading images...</p>
          </div>
        )}

        {heatmapAvailable && mode === "original" && (
          <img
            src={originalSrc}
            alt="Original chest X-ray"
            onLoad={() => setOriginalLoaded(true)}
            className="max-h-80 w-full object-contain"
          />
        )}

        {mode === "overlay" && heatmapAvailable && (
          <div className="relative flex w-full items-center justify-center">
            <img
              src={originalSrc}
              alt="Original chest X-ray"
              onLoad={() => setOriginalLoaded(true)}
              className="max-h-80 w-full object-contain"
            />
            <img
              src={heatmapSrc}
              alt="Model attention overlay"
              style={{ opacity: opacity / 100 }}
              className="absolute inset-0 m-auto max-h-80 w-full object-contain"
            />
          </div>
        )}

        {mode === "side-by-side" && heatmapAvailable && (
          <div className="grid w-full gap-3 p-3 sm:grid-cols-2">
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-semibold text-slate-600">Original</p>
              <img
                src={originalSrc}
                alt="Original chest X-ray"
                onLoad={() => setOriginalLoaded(true)}
                className="max-h-72 w-full object-contain"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-semibold text-slate-600">Model attention</p>
              <img
                src={heatmapSrc}
                alt="Model attention overlay"
                className="max-h-72 w-full object-contain"
              />
            </div>
          </div>
        )}

        {heatmapAvailable === false && (
          <>
            <img
              src={originalSrc}
              alt="Original chest X-ray"
              onLoad={() => setOriginalLoaded(true)}
              className="max-h-80 w-full object-contain"
            />
            {!showSkeleton && (
              <p className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-800 ring-1 ring-amber-200">
                Attention map unavailable
              </p>
            )}
          </>
        )}
      </div>

      {mode === "overlay" && heatmapAvailable && (
        <div className="mt-4 flex items-center gap-3">
          <label htmlFor="heatmap-opacity" className="shrink-0 text-xs font-medium text-slate-600">
            Opacity
          </label>
          <input
            id="heatmap-opacity"
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="h-1.5 flex-1 cursor-pointer accent-primary"
          />
          <span className="w-10 text-right text-xs tabular-nums text-slate-600">
            {opacity}%
          </span>
        </div>
      )}

      {heatmapAvailable && (
        <div className="mt-3 flex items-center gap-2">
          <div
            className="h-2 flex-1 rounded-full"
            style={{
              background: "linear-gradient(to right, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000)",
            }}
            aria-hidden
          />
          <div className="flex shrink-0 gap-3 text-[10px] text-muted-foreground">
            <span>Low attention</span>
            <span>High attention</span>
          </div>
        </div>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        Model attention map (Grad-CAM). Shows where the image encoder focused during
        analysis. Not pathology-specific. For review support only.
      </p>
    </div>
  );
}
