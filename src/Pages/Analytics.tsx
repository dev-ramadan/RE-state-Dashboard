import {  Suspense } from "react";
import { usePropertyAnalytics } from "../hooks/usePropertyAnalytics";
import PropertyTypeChart from "../components/PropertyTypeChart";
import PurposeChart from "../components/PurposeChart";
import CitiesChart from "../components/CitiesChart";
import PropertyByMonthChart from "../components/PropertyByMonthChart";
import LIkesChart from "../components/LIkesChart";


// Simple Spinner component
const Spinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

const Analytics = () => {
  const { typeData, cityData, likesData, monthData, purposeData } =
    usePropertyAnalytics();

  return (
    <div className="px-4 md:px-8 py-6 mx-auto max-w-[1440px]">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 tracking-tight">
        Property Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

        <Suspense fallback={<Spinner />}>
          <PropertyTypeChart data={typeData} />
        </Suspense>

        <Suspense fallback={<Spinner />}>
          <PurposeChart data={purposeData} />
        </Suspense>

        <Suspense fallback={<Spinner />}>
          <CitiesChart data={cityData} />
        </Suspense>

        <Suspense fallback={<Spinner />}>
          <PropertyByMonthChart data={monthData} />
        </Suspense>

        <div className="col-span-1 sm:col-span-2">
          <Suspense fallback={<Spinner />}>
            <LIkesChart data={likesData} />
          </Suspense>
        </div>

      </div>

    </div>
  );
};

export default Analytics;











































// import { usePropertyAnalytics } from "../hooks/usePropertyAnalytics";
// import PropertyTypeChart from "../components/PropertyTypeChart";
// import CitiesChart from "../components/CitiesChart";
// import MonthChart from "../components/PropertyByMonthChart";
// import PurposeChart from "../components/PurposeChart";
// import LikesChart from "../components/LIkesChart";

// const Analytics = () => {
//   const { typeData, cityData, likesData, monthData, purposeData } =
//     usePropertyAnalytics();

//   return (
//     <div className="px-4 md:px-8 py-6 mx-auto">
//       <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800 tracking-tight">
//         Property Analytics Dashboard
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">

//         <PropertyTypeChart data={typeData} />
//         <PurposeChart data={purposeData} />

//         <CitiesChart data={cityData} />
//         <MonthChart data={monthData} />

//         <div className="md:col-span-2">
//           <LikesChart data={likesData} />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Analytics;
