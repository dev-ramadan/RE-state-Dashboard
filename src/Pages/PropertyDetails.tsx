import { motion } from "framer-motion";
import { Heart, MapPin } from "lucide-react";
import { Navigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import {
    useDeleteCommercialPropertyMutation,
    useDeleteResidentialPropertiesMutation,
    useGetCommercialByIdQuery,
    useGetResidentialByIdQuery,
    useUpdateCommercialPropertyMutation,
    useUpdateResidentialPropertiesMutation
} from "../Redux/api/Property";

const PropertyDetails = () => {
    const { id } = useParams();

    const { data: commercial } = useGetCommercialByIdQuery(id!);
    const { data: residential } = useGetResidentialByIdQuery(id!);

    const property = commercial || residential;

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const [updateCommercialProperty] = useUpdateCommercialPropertyMutation();
    const [updateResidentialProperties] = useUpdateResidentialPropertiesMutation();
    const [deleteCommercialProperty] = useDeleteCommercialPropertyMutation()
    const [deleteResidentialProperties] = useDeleteResidentialPropertiesMutation()


    useEffect(() => {
        if (property) setFormData(property);
    }, [property]);

    if (!property) return <p className="text-center mt-10">Loading...</p>;

    const handleChange = (path: string, value: any) => {
        const keys = path.split(".");
        setFormData((prev: any) => {
            let temp = { ...prev };
            let current = temp;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return temp;
        });
    };

    const renderField = (label: string, path: string, value: any) => {
        if (value === null || value === undefined) return null;

        // string
        if (typeof value === "string") {
            return isEditing ? (
                <p key={path} className="mb-2">
                    <span className="font-semibold">{label}:</span>{" "}
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(path, e.target.value)}
                        className="border rounded p-1 w-full"
                    />
                </p>
            ) : (
                <p key={path} className="mb-2">
                    <span className="font-semibold">{label}:</span> {value}
                </p>
            );
        }

        // number
        if (typeof value === "number") {
            return isEditing ? (
                <p key={path} className="mb-2">
                    <span className="font-semibold">{label}:</span>{" "}
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => handleChange(path, Number(e.target.value))}
                        className="border rounded p-1 w-32"
                    />
                </p>
            ) : (
                <p key={path} className="mb-2">
                    <span className="font-semibold">{label}:</span> {value}
                </p>
            );
        }

        // boolean
        if (typeof value === "boolean") {
            return isEditing ? (
                <p key={path} className="mb-2 flex items-center gap-2">
                    <span className="font-semibold">{label}:</span>
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleChange(path, e.target.checked)}
                    />
                </p>
            ) : (
                <p key={path} className="mb-2">
                    <span className="font-semibold">{label}:</span> {value ? "Yes" : "No"}
                </p>
            );
        }

        // object
        if (typeof value === "object" && !Array.isArray(value)) {
            return (
                <div key={path} className="pl-4 border-l border-gray-300 mb-4">
                    <p className="font-semibold mb-2">{label}:</p>
                    {Object.keys(value).map((key) =>
                        renderField(
                            key.charAt(0).toUpperCase() + key.slice(1),
                            `${path}.${key}`,
                            value[key]
                        )
                    )}
                </div>
            );
        }

        return null;
    };

    const handleSave = async () => {
        try {
            if (commercial) await updateCommercialProperty({ id: commercial.propertyId, body: formData });
            else if (residential) await updateResidentialProperties({ id: residential.propertyId, body: formData });
            setIsEditing(false);
            alert("Updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Update failed!");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            if (commercial) {
                await deleteCommercialProperty(id)
            }
            else if (residential) {
                await deleteResidentialProperties(id)
            }
            <Navigate to={'/property'} replace/>
        } catch (err) {
            console.log(err);

        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? "Cancel" : "Edit"}
                </button>
                {isEditing && (
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                )}
            </div>

            {/* Title & Location */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow rounded-xl p-6"
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {isEditing ? (
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="border rounded p-1 w-full text-2xl"
                        />
                    ) : (
                        formData.title
                    )}
                </h1>
                <p className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    {isEditing ? (
                        <>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => handleChange("city", e.target.value)}
                                className="border rounded p-1 w-32"
                            />,{" "}
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => handleChange("address", e.target.value)}
                                className="border rounded p-1 w-48"
                            />
                        </>
                    ) : (
                        `${formData.city}, ${formData.address}`
                    )}
                </p>
            </motion.div>

            {/* Details Card */}
            <div className="bg-white shadow rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(formData).map((key) => {
                    if (Array.isArray(formData[key])) return null;
                    if (key === "comments" || key === "likesCount" || key === "isLiked") return null;
                    return renderField(key.charAt(0).toUpperCase() + key.slice(1), key, formData[key]);
                })}
            </div>

            {/* Comments */}
            <div className="bg-white shadow rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                {property.comments?.length === 0 ? (
                    <p className="text-gray-500">No comments yet.</p>
                ) : (
                    property.comments.map((comment: any) => (
                        <div key={comment.commentId} className="border-b last:border-none pb-3 mb-3">
                            <p className="font-medium">{comment.commentText}</p>
                            <p className="text-sm text-gray-600">{comment.dateComment}</p>
                            <p className="text-sm font-semibold mt-1">Likes: {comment.likesCount}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Likes */}
            <div className="flex items-center gap-2 text-red-600 text-xl font-bold">
                <Heart className={property.isLiked ? "fill-red-600" : ""} />
                {property.likesCount} Likes
            </div>
            <button className="w-full bg-red-500 text-white p-2 rounded-md" onClick={()=>handleDelete(property.propertyId)}>Delete Property</button>
        </div>
    );
};

export default PropertyDetails;
