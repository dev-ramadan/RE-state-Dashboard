import { useProperty } from "./useProperty";
export const usePropertyAnalytics = () => {
    const { residentialProperties = [], commercialProperties = [] } = useProperty({
        pageNumber: 1,
        pageSize: 1000,
    });


    // 1️⃣ Residential vs Commercial
    const residential = residentialProperties?.length;
    const commercial = commercialProperties?.length;

    const typeData:any = [
        { name: "Residential", value: residential },
        { name: "Commercial", value: commercial },
    ];

    // 2️⃣ Count by City
    const cityMap: any = {};
    [...residentialProperties, ...commercialProperties].forEach((p) => {
        cityMap[p.city] = (cityMap[p.city] || 0) + 1;
    });

    const cityData = Object.entries(cityMap).map(
        ([city, count]) => ({ city, count })
    );

    // 3️⃣ Count by Month (dateListed)
    const monthMap: any = {};
    [...residentialProperties, ...commercialProperties].forEach((p) => {
        const month = new Date(p.dateListed).toLocaleString("en", { month: "short" });
        monthMap[month] = (monthMap[month] || 0) + 1;
    });

    const monthData = Object.entries(monthMap).map(
        ([month, count]) => ({ month, count })
    );

    // 4️⃣ Purpose (Sale vs Rent)
    const purposeMap: any = {};
    [...residentialProperties, ...commercialProperties].forEach((p) => {
        purposeMap[p.propertyPurpose] = (purposeMap[p.propertyPurpose] || 0) + 1;
    });

    const purposeData = Object.entries(purposeMap).map(
        ([purpose, count]) => ({ name: purpose, value: count })
    );

    // 5️⃣ Likes Chart
    const likesData = [...residentialProperties, ...commercialProperties].map((p) => ({
        title: p.title.slice(0, 10) + "...",
        likes: p.likesCount,
    }));

    return {
        typeData,
        cityData,
        monthData,
        purposeData,
        likesData,
    };
};
