import RecentOrders from "../components/RecentUsers";
import RecentProperty from "../components/RecentProperty";
import PropertyTypeChart from "../components/PropertyTypeChart";
import { usePropertyAnalytics } from "../hooks/usePropertyAnalytics";
import CitiesChart from "../components/CitiesChart";

const Home = () => {
  const { typeData, cityData} = usePropertyAnalytics()
  
  return (
    <div className="flex h-fit bg-gray-100">
      <div className="flex-1 flex flex-col ">
        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PropertyTypeChart data={typeData} />
          <CitiesChart data={cityData} />
        </div>
        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RecentOrders />
          <RecentProperty />
        </div>
      </div>
    </div>
  );
};

export default Home;
