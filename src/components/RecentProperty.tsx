import { Link } from "react-router";
import { useGetCompoundQuery } from "../Redux/api/Property";
import { DesktopTable, type Column } from "../UI/DesktopTable";
import type { Compound } from "../types/propertyTypes";
import { MobileTable } from "../UI/MobileTable";
const columns:Column<Compound>[] | any = [
  { key: "compoundId", header: "ID" },
  { key: "name", header: "Name" },
  { key: "city", header: "City" },
];

const RecentProperty = () => {
  const { data: property = [], isError, isLoading } = useGetCompoundQuery()
    
  if (isLoading)
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md flex justify-center items-center h-48">
        <span className="text-gray-500 animate-pulse">Loading property...</span>
      </div>
    );

  if (isError)
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md text-center text-red-600 font-semibold">
        Failed to load property 
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <h2 className="text-xl font-bold text-gray-800">Recent property</h2>
        <Link to={'/customer'}>
        <button className="text-blue-600 text-sm font-medium hover:underline transition">
          View All
        </button>
        </Link>
      </div>

      {/*  TABLE - Visible on md and larger */}
      <DesktopTable  data={property||[]} columns={columns} sliceCount={4}/>


      {/*  MOBILE CARDS - Visible only on small screens */}
      <MobileTable columns={columns} data={property} maxItems={4}/>
    </div>
  );
};

export default RecentProperty;
