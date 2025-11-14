import { Eye, ShoppingCart, DollarSign } from "lucide-react";
import type { ReactNode } from "react";

interface CardProps {
  numbers: string;
  cardName: string;
  icon: ReactNode;
}

const Card = ({ numbers, cardName, icon }: CardProps) => {
  return (
    <div className="bg-white rounded-xl p-4 flex justify-between items-center shadow">
      <div>
        <div className="text-2xl font-bold">{numbers}</div>
        <div className="text-gray-500">{cardName}</div>
      </div>
      <div className="text-3xl text-gray-400">{icon}</div>
    </div>
  );
};

export default Card;
