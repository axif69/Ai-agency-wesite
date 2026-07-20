export default function ScoreRing({ score, label }: { score: number; label: string }) {
  const value = Math.max(0, Math.min(100, Math.round(score)));
  const color = value >= 80 ? "#4ade80" : value >= 55 ? "#facc15" : "#fb7185";
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative grid h-36 w-36 place-items-center rounded-full" style={{ background: `conic-gradient(${color} ${value * 3.6}deg, rgba(255,255,255,.08) 0deg)` }}>
        <div className="grid h-28 w-28 place-items-center rounded-full bg-[#0a0a0a]"><div><div className="text-4xl font-serif font-bold">{value}</div><div className="text-[9px] uppercase tracking-widest text-white/35">out of 100</div></div></div>
      </div>
      <p className="mt-4 text-sm font-semibold text-white/75">{label}</p>
    </div>
  );
}

