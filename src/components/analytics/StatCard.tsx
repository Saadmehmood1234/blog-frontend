type Props = {
  title: string;
  value: number;
  description?: string;
  icon?: React.ReactNode;
};

export default function StatCard({
  title,
  value,
  description,
  icon,
}: Props) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">
            {new Intl.NumberFormat().format(value)}
          </p>
        </div>
        {icon && (
          <div className="rounded-xl bg-primary/5 p-3 text-primary">{icon}</div>
        )}
      </div>
      {description && (
        <p className="mt-3 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
