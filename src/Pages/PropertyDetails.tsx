import { motion } from "framer-motion";
import { Heart, MapPin, Trash2, Edit3, Save, X } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";

import {
    useDeleteCommercialPropertyMutation,
    useDeleteResidentialPropertiesMutation,
    useGetCommercialByIdQuery,
    useGetResidentialByIdQuery,
    useUpdateCommercialPropertyMutation,
    useUpdateResidentialPropertiesMutation
} from "../Redux/api/Property";
import PropertyImageSlider from "../UI/PropertyImageSlider";
import toast from "react-hot-toast";

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { data: commercial } = useGetCommercialByIdQuery(id!);
    const { data: residential } = useGetResidentialByIdQuery(id!);

    const property = commercial || residential;

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>({});

    const [updateCommercialProperty] = useUpdateCommercialPropertyMutation();
    const [updateResidentialProperties] = useUpdateResidentialPropertiesMutation();
    const [deleteCommercialProperty] = useDeleteCommercialPropertyMutation();
    const [deleteResidentialProperties] = useDeleteResidentialPropertiesMutation();



    useEffect(() => {
        if (property) setFormData(JSON.parse(JSON.stringify(property)));
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
        if (value == null) return null;

        const FieldWrapper = ({ children }: any) => (
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
                <p className="text-gray-700 font-semibold mb-1">{label}</p>
                {children}
            </div>
        );

        if (typeof value === "string") {
            return (
                <FieldWrapper key={path}>
                    {isEditing ? (
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(path, e.target.value)}
                            className="rounded-md p-2 w-full"
                        />
                    ) : (
                        <p className="text-gray-800">{value}</p>
                    )}
                </FieldWrapper>
            );
        }

        if (typeof value === "number") {
            return (
                <FieldWrapper key={path}>
                    {isEditing ? (
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => handleChange(path, Number(e.target.value))}
                            className="border rounded-md p-2 w-full"
                        />
                    ) : (
                        <p className="text-gray-800">{value}</p>
                    )}
                </FieldWrapper>
            );
        }

        if (typeof value === "boolean") {
            return (
                <FieldWrapper key={path}>
                    {isEditing ? (
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleChange(path, e.target.checked)}
                        />
                    ) : (
                        <p>{value ? "Yes" : "No"}</p>
                    )}
                </FieldWrapper>
            );
        }

        if (typeof value === "object" && !Array.isArray(value)) {
            return (
                <div key={path} className="col-span-1 md:col-span-2 bg-white p-5 rounded-xl shadow border">
                    <p className="font-bold text-gray-700 mb-3 text-lg">{label}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.keys(value).map((key) =>
                            renderField(
                                key.charAt(0).toUpperCase() + key.slice(1),
                                `${path}.${key}`,
                                value[key]
                            )
                        )}
                    </div>
                </div>
            );
        }
    };

    const handleSave = async () => {
        try {
            if (commercial)
                await updateCommercialProperty({ id: commercial.propertyId, body: formData });
            else if (residential)
                await updateResidentialProperties({ id: residential.propertyId, body: formData });

            setIsEditing(false);
            toast.success('Property Updated successfully!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        } catch {
            toast.error("Update failed!");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            if (commercial) await deleteCommercialProperty(id);
            else if (residential) await deleteResidentialProperties(id);
            toast.success('Deleted successfully!',
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            navigate("/property")
        } catch { }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 ">

            {/* IMAGE SLIDER */}
            <div className="mx-auto w-full max-w-[295px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-full  rounded-xl overflow-hidden shadow-lg">
                <PropertyImageSlider images={property.galleries || []} />
            </div>


            {/* HEADER */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-xl rounded-2xl p-8 border"
            >
                <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
                    <div>
                        <h1 className="text-3xl font-bold">{formData.title}</h1>
                        <p className="text-gray-600 flex gap-2 items-center mt-2">
                            <MapPin className="w-5 h-5 text-red-500" />
                            {formData.city}, {formData.address}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
                            >
                                <Edit3 size={18} /> Edit
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleSave}
                                    className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition"
                                >
                                    <Save size={18} /> Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="flex items-center gap-2 bg-gray-500 text-white px-5 py-3 rounded-xl hover:bg-gray-600 transition"
                                >
                                    <X size={18} /> Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* DETAILS */}
            <div className="bg-gray-50 shadow-lg rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border">
                {Object.keys(formData).map((key) => {
                    if (Array.isArray(formData[key])) return null;
                    if (key === "comments" || key === "likesCount" || key === "isLiked") return null;

                    return renderField(
                        key.charAt(0).toUpperCase() + key.slice(1),
                        key,
                        formData[key]
                    );
                })}
            </div>

            {/* COMMENTS */}
            <div className="bg-white shadow-lg rounded-2xl p-8 border">
                <h2 className="text-2xl font-semibold mb-6">Comments</h2>

                {property.comments?.length === 0 ? (
                    <p className="text-gray-500">No comments yet.</p>
                ) : (
                    <div className="space-y-4">
                        {property.comments.map((comment: any) => (
                            <div
                                key={comment.commentId}
                                className="bg-gray-50 p-4 rounded-xl shadow border hover:shadow-md transition"
                            >
                                <p className="font-medium text-gray-800">{comment.commentText}</p>
                                <p className="text-sm text-gray-600 mt-1">{comment.dateComment}</p>
                                <p className="text-sm text-gray-700 mt-1">
                                    Likes: {comment.likesCount}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* FOOTER */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-lg border">
                <div className="flex items-center gap-2 text-red-600 text-xl font-bold">
                    <Heart className={property.isLiked ? "fill-red-600" : ""} size={28} />
                    {property.likesCount} Likes
                </div>

                <button
                    onClick={() => handleDelete(property.propertyId)}
                    className="flex items-center gap-2 bg-red-600 text-white px-5 py-3 rounded-xl hover:bg-red-700 transition"
                >
                    <Trash2 size={20} /> Delete Property
                </button>
            </div>
        </div>
    );
};

export default PropertyDetails;
