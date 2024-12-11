interface CardProps {
  icon: React.ReactNode;
  text: string;
  subtext?: string;
}

export default function Card({ icon, text, subtext }: CardProps) {
  return (
    <div className="flex items-center justify-start space-x-4 rounded-lg bg-white p-5 shadow-lg transition-all hover:shadow-xl">
      <div className="text-3xl text-blue-500">{icon}</div>
      <div className="flex flex-col items-start">
        <p className="text-lg font-semibold">{text}</p>
        {subtext && <p className="text-sm text-gray-600">{subtext}</p>}
      </div>
    </div>
  );
}
