import { motion } from "framer-motion";
import type { CommercialProperties, GalleryImage, ResidentialProperties } from "../types/property";
import { Link } from "react-router";
type EstateCardProps = {
    property: CommercialProperties | ResidentialProperties;
    images:GalleryImage[]
};
export default function EstateCard({ property , images }: EstateCardProps) {   
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl cursor-pointer duration-300"
        >
            <Link to={`/propertyDetails/${property.propertyId}`}>
                <div className="relative h-48 bg-gray-200">
                    {property?.galleries?.length > 0 ? (
                        <img
                            src={import.meta.env.VITE_IMAGE_URL + images[0].imageUrl}
                            alt={property.title}
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                        </div>
                    )}
                </div>
            </Link>


            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    <span className="text-sm text-gray-400 font-semibold">name : </span> {property.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-1">
                    <span className="text-sm text-gray-400 font-semibold">address : </span> {property.address}
                </p>


                <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-blue-600">
                        <span className="text-sm text-gray-400 font-semibold">price : </span>
                        ${property.price?.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-sm">{property.square} m²</span>
                </div>
            </div>
        </motion.div>
    );
}