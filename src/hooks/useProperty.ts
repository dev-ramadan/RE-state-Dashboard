import { useGetPropertyQuery, type GetPropertiesArgs } from "../Redux/api/Property"
import type { ResidentialProperties } from "../types/property"

export const useProperty = ({pageNumber,pageSize,city,address,type}:GetPropertiesArgs) => {
    const { data: property = [], isError, isLoading } = useGetPropertyQuery({
        pageNumber,
        pageSize,
        city,
        address,
        type
    })
    const residentialProperties: ResidentialProperties | any = property[0]?.residentialProperties;
    const commercialProperties: ResidentialProperties | any = property[0]?.commercialProperties

    return { residentialProperties, commercialProperties , isError, isLoading }
} 