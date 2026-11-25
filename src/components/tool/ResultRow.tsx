export function ResultRow({
  label,
  value,
  emphasis = false,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border py-3 last:border-0">
      <span className="text-sm text-muted">{label}</span>
      <span className={emphasis ? "text-xl font-bold text-primary" : "text-sm font-semibold"}>
        {value}
      </span>
    </div>
  );
}
