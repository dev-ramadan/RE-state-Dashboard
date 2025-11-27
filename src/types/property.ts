export type Comment = {
    commentId: string;
    commentText: string;
    dateComment: string;
    userID: string;
    isLiked: boolean;
    likesCount: number;
};

export type GalleryImage = {
    mediaId: string,
    propertyId: string,
    videoUrl: null,
    uploadedAt: string
    imageId: string;
    imageUrl: string;
};

export type Compound = {
    compoundId: string;
    name: string;
    city: string;
    address: string;
    description: string;
};

export type Amenities = {
    hasElectricityLine: boolean;
    hasWaterLine: boolean;
    hasGasLine: boolean;
};

export type CommercialProperties = {
    propertyId: string;
    title: string;
    description: string;
    address: string;
    city: string;

    amenity: Amenities;
    compound: Compound;

    galleries: GalleryImage[];

    comments: Comment[];

    businessType: string;
    propertyType: string;
    propertyPurpose: string;
    propertyStatus: string;

    floorNumber: number;
    square: number;
    price: number;

    dateListed: string;
    googleMapsUrl: string;

    hasStorage: boolean;

    isLiked: boolean;
    likesCount: number;

    userId: string;
};

export type ResidentialProperties = CommercialProperties & {
    bathrooms: number;
    bedrooms: number;
    kitchenType: string;
};

export type PropertyPropse = {
    commercialProperties: CommercialProperties;
    residentialProperties: ResidentialProperties;
};
