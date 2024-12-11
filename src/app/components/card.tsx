interface CardProps {
    icon: string;
    text: string; 
    subtext?: string; 
  }
  
  export default function Card({ icon, text, subtext }: CardProps) {
    return (
      <div className="flex w-full max-w-sm items-center justify-between rounded bg-white p-4 shadow-md">
        <i className={`fas ${icon} text-blue-500 text-3xl`}></i>
        <div className="text-right">
          <p className="text-lg font-semibold">{text}</p>
          {subtext && <p className="text-sm text-gray-600">{subtext}</p>}
        </div>
      </div>
    );
  } 