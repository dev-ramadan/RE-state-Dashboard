import { lazy, Suspense } from "react";
import { usePropertyAnalytics } from "../hooks/usePropertyAnalytics";

// Lazy imports for charts
const PropertyTypeChart = lazy(() => import("../components/PropertyTypeChart"));
const CitiesChart = lazy(() => import("../components/CitiesChart"));
const MonthChart = lazy(() => import("../components/PropertyByMonthChart"));
const PurposeChart = lazy(() => import("../components/PurposeChart"));
const LikesChart = lazy(() => import("../components/LIkesChart"));

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
          <MonthChart data={monthData} />
        </Suspense>

        <div className="col-span-1 sm:col-span-2">
          <Suspense fallback={<Spinner />}>
            <LikesChart data={likesData} />
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
