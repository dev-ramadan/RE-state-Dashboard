import { usePropertyAnalytics } from "../hooks/usePropertyAnalytics";
import PropertyTypeChart from "../components/PropertyTypeChart";
import CitiesChart from "../components/CitiesChart";
import MonthChart from "../components/PropertyByMonthChart";
import PurposeChart from "../components/PurposeChart";
import LikesChart from "../components/LIkesChart";

const Analytics = () => {
  const { typeData, cityData, likesData, monthData, purposeData } =
    usePropertyAnalytics();

  return (
    <div className="px-4 md:px-8 py-6 mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 tracking-tight">
        Property Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">

        <PropertyTypeChart data={typeData} />
        <PurposeChart data={purposeData} />

        <CitiesChart data={cityData} />
        <MonthChart data={monthData} />

        <div className="md:col-span-2">
          <LikesChart data={likesData} />
        </div>

      </div>
    </div>
  );
};

export default Analytics;
