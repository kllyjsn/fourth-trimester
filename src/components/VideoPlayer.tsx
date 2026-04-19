import { useEffect, useRef, useState } from "react";
import { Exercise } from "../data/exercises";
import { cn } from "../lib/cn";

interface Props {
  exercise: Exercise;
  className?: string;
  /** Autoplay on mount (muted for browser autoplay rules). */
  autoPlay?: boolean;
  /** Show on-screen form cues cycling through. */
  showCues?: boolean;
  /** Optional rounded corners toggle. */
  rounded?: boolean;
}

export function VideoPlayer({
  exercise,
  className,
  autoPlay = true,
  showCues = true,
  rounded = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [failed, setFailed] = useState(false);
  const [cueIdx, setCueIdx] = useState(0);

  useEffect(() => {
    setFailed(false);
    setCueIdx(0);
  }, [exercise.id]);

  useEffect(() => {
    if (!showCues || exercise.cues.length <= 1) return;
    const id = window.setInterval(() => {
      setCueIdx((i) => (i + 1) % exercise.cues.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [exercise.cues.length, showCues, exercise.id]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-sage-900/90",
        rounded && "rounded-3xl",
        className,
      )}
    >
      {!failed ? (
        <video
          ref={videoRef}
          key={exercise.id}
          className="h-full w-full object-cover"
          src={exercise.videoSrc}
          autoPlay={autoPlay}
          muted
          playsInline
          loop
          onError={() => setFailed(true)}
        />
      ) : (
        <Placeholder exercise={exercise} />
      )}
      {showCues && exercise.cues.length > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-5">
          <p className="font-display text-xl leading-snug text-white drop-shadow">
            {exercise.cues[cueIdx]}
          </p>
        </div>
      )}
    </div>
  );
}

function Placeholder({ exercise }: { exercise: Exercise }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-sage-700 to-sage-900 p-6 text-center text-white">
      <div className="text-xs uppercase tracking-widest text-sage-200">
        Demo video rendering…
      </div>
      <div className="font-display text-3xl">{exercise.name}</div>
      <div className="max-w-md text-sm text-sage-100/90">
        {exercise.summary}
      </div>
    </div>
  );
}
