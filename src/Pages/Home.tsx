
import { Eye, ShoppingCart, DollarSign, Text } from "lucide-react";
import Card from "../UI/Card";
import RecentOrders from "../components/RecentUsers";
import RecentProperty from "../components/RecentProperty";

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card numbers="1,504" cardName="Daily Views" icon={<Eye />} />
          <Card numbers="80" cardName="Sales" icon={<ShoppingCart />} />
          <Card numbers="284" cardName="Comments" icon={<Text />} />
          <Card numbers="$7,842" cardName="Earning" icon={<DollarSign />} />
        </div>
        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto bg-red-600 w-[90%]">
          
          <RecentOrders />
          <RecentProperty/>
        </div>
      </div>
    </div>
  );
};

export default Home;
