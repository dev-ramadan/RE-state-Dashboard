import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, LocateFixed, ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";
import Container from "../UI/Comtainer";
import EstateCard from "../UI/PropertyCard";
import { useProperty } from "../hooks/useProperty";
import type { CommercialProperties, ResidentialProperties } from "../types/property";

const Properties = () => {
  // Pagination & filters
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 3;

  const [filterProperty, setFilterProperty] = useState<"all" | "residential" | "commercial">("all");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const { residentialProperties = [], commercialProperties = [], isLoading, isError } = useProperty({
    pageNumber,
    pageSize,
    city,
    address,
    type: filterProperty === "all" ? "" : filterProperty
  });

  const allProperty: (CommercialProperties | ResidentialProperties)[] = [...residentialProperties, ...commercialProperties];

  useEffect(() => {
    setPageNumber(1);
  }, [ city, address, filterProperty]);

  if (isLoading) return <div className="text-center py-20 text-lg text-gray-600">Loading properties...</div>;
  if (isError) return <div className="text-center py-20 text-red-600 text-lg">Failed to load properties.</div>;

  return (
    <Container>
      {/* Type Filter */}
      <div className="flex justify-center space-x-4 mb-4">
        {["all", "residential", "commercial"].map(type => (
          <button
            key={type}
            onClick={() => setFilterProperty(type as "all" | "residential" | "commercial")}
            className={`px-4 py-2 rounded-xl font-medium ${filterProperty === type ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <Home className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Properties</h1>
          </div>
          <p className="text-gray-600">Manage & browse all properties in your dashboard easily.</p>
        </motion.div>

        {/* Search Filters */}
        <div className="w-full mb-6 flex flex-wrap gap-4 justify-between">
          <div className="flex gap-2 flex-1 min-w-[200px]">
            <Home />
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search by city"
              className="w-full px-4 py-2 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="flex gap-2 flex-1 min-w-[200px] items-center">
            <LocateFixed />
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Search by address"
              className="w-full px-4 py-2 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>

        {/* Properties Grid */}
        {allProperty.length === 0 ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-500 mt-16 text-lg">
            No properties found.
          </motion.p>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {allProperty.map(property => (
              <motion.div
                key={property.propertyId}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <EstateCard property={property} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mx-auto my-12">
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
            className="disabled:opacity-50 px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <ArrowBigLeftDash />
          </button>
          <span className="px-4 py-2 font-medium">{pageNumber}</span>
          <button
            onClick={() => setPageNumber(prev => prev + 1)}
            disabled={allProperty.length < pageSize}
            className="disabled:opacity-50 px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <ArrowBigRightDash />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Properties;
