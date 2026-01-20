import { LucideProps } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  value: number;
  icon: React.ComponentType<LucideProps>;
  iconBgColor?: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconBgColor = "bg-gray-200",
}: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-full ${iconBgColor}`}>
          <Icon className="w-5 h-5 text-gray-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

