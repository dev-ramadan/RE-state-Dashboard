import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Home, LocateFixed, ArrowBigRightDash, ArrowBigLeftDash } from "lucide-react";
import Container from "../UI/Comtainer";
import EstateCard from "../UI/PropertyCard"; // make sure this is the memoized version provided earlier
import { useProperty } from "../hooks/useProperty";
import type { CommercialProperties, ResidentialProperties } from "../types/property";



const pageSize = 3;

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function useDebouncedValue<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const Properties = () => {
  // Pagination & filters
  const [pageNumber, setPageNumber] = useState(1);

  const [filterProperty, setFilterProperty] = useState<"all" | "residential" | "commercial">("all");

  // controlled inputs + debounced values
  const [cityInput, setCityInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const debouncedCity = useDebouncedValue(cityInput, 400);
  const debouncedAddress = useDebouncedValue(addressInput, 400);

  // Data fetching hook
  const { residentialProperties = [], commercialProperties = [], isLoading, isError } = useProperty({
    pageNumber,
    pageSize,
    city: debouncedCity,
    address: debouncedAddress,
    type: filterProperty === "all" ? "" : filterProperty
  });

  // Reset page when filter/search changes
  useEffect(() => {
    setPageNumber(1);
  }, [debouncedCity, debouncedAddress, filterProperty]);

  const combinedProperties = useMemo(() => {
    return [...residentialProperties, ...commercialProperties];
  }, [residentialProperties, commercialProperties]);

  const hasMore = combinedProperties.length >= pageSize;

  const goPrev = useCallback(() => {
    setPageNumber((p) => Math.max(p - 1, 1));
  }, []);

  const goNext = useCallback(() => {
    if (!hasMore) return;
    setPageNumber((p) => p + 1);
  }, [hasMore]);

  if (isLoading) return <div className="text-center py-20 text-lg text-gray-600">Loading properties...</div>;
  if (isError) return <div className="text-center py-20 text-red-600 text-lg">Failed to load properties.</div>;

  return (
    <Container>
      {/* Type Filter */}
      <div className="flex justify-center space-x-4 mb-4">
        {["all", "residential", "commercial"].map((type) => (
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
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mb-6">
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
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              placeholder="Search by city"
              className="w-full px-4 py-2 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
              aria-label="Search by city"
            />
          </div>

          <div className="flex gap-2 flex-1 min-w-[200px] items-center">
            <LocateFixed />
            <input
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Search by address"
              className="w-full px-4 py-2 rounded-2xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
              aria-label="Search by address"
            />
          </div>
        </div>

        {/* Properties Grid */}
        {combinedProperties.length === 0 ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-500 mt-16 text-lg">
            No properties found.
          </motion.p>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={parentVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {combinedProperties.map((property) => (
              <motion.div
                key={property.propertyId}
                variants={itemVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.18 } }}
              >
                <EstateCard property={property as (CommercialProperties | ResidentialProperties)} images={property.galleries ?? []} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-3 mx-auto my-12">
          <button
            onClick={goPrev}
            disabled={pageNumber === 1}
            className="disabled:opacity-50 px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            aria-label="Previous page"
          >
            <ArrowBigLeftDash />
          </button>

          <span className="px-4 py-2 font-medium">{pageNumber}</span>

          <button
            onClick={goNext}
            disabled={!hasMore}
            className="disabled:opacity-50 px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            aria-label="Next page"
          >
            <ArrowBigRightDash />
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Properties;
