type Props = {
  title: string;
  value: number;
};

export default function StatCard({ title, value }: Props) {
  return (
    <div className="rounded-xl border p-6 shadow-sm bg-background">
      <h3 className="text-sm text-muted-foreground">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
