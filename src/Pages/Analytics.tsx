import { ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { usePropertyAnalytics } from "../hooks/usePropertyAnalytics";
import PropertyTypeChart from "../components/PropertyTypeChart";
import CitiesChart from "../components/CitiesChart";
import MonthChart from "../components/PropertyByMonthChart";
import PurposeChart from "../components/PurposeChart";
import LikesChart from "../components/LIkesChart";

const Analytics = () => {
  const { typeData, cityData, likesData, monthData, purposeData } = usePropertyAnalytics();

  return (
    <div className="p-6  mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Property Analytics Chart
      </h1>

      {/* Grid */}
      <div className="flex flex-wrap gap-8 space-y-20">

        {/* Property Types */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-indigo-50 w-[90%] md:w-[45%] mx-auto to-indigo-100 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">Property Types</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PropertyTypeChart data={typeData}/>
          </ResponsiveContainer>
        </motion.div>

        {/* Properties by City */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 w-[90%] md:w-[45%] mx-auto p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-4 text-green-700">Properties by City</h2>
          <ResponsiveContainer width="100%" height={250}>
            <CitiesChart data={cityData}/>
          </ResponsiveContainer>
        </motion.div>

        {/* Properties by Month */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 w-[90%] md:w-[45%] mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-4 text-pink-700">Properties by Month</h2>
          <ResponsiveContainer width="100%" height={250}>
            <MonthChart data={monthData}/>
          </ResponsiveContainer>
        </motion.div>

        {/* Property Purpose */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 w-[90%] md:w-[45%] mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-4 text-yellow-700">Property Purpose</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PurposeChart data={purposeData}/>
          </ResponsiveContainer>
        </motion.div>

        {/* Likes Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 w-[90%] md:w-[45%] mx-auto p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-3"
        >
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Property Likes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LikesChart data={likesData}/>
          </ResponsiveContainer>
        </motion.div>

      </div>
    </div>
  );
};

export default Analytics;
