type StatCardProps = {
  title: string;
  value: number;
};

const StatCard = ({ title, value }: StatCardProps) => (
  <div className="rounded-xl border border-neutral-800 p-6 shadow-amber-200 shadow-inner">
    <p className="text-lg text-neutral-500 mb-4">{title}</p>
    <p className="text-5xl font-semibold">{value}</p>
  </div>
);

export default StatCard