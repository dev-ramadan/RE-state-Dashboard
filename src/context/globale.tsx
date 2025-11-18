import { createContext, useState, type ReactNode } from "react";
interface ContextType {
    openSidebare: boolean
    setOpenSidebare: (e: boolean) => void
    isLogin:boolean,
    setIslogin:(e:boolean) => void,
    userId : string;
    setUserId: (e:string) => void,
}

interface OureProviderProps {
    children: ReactNode;
}
export const OureContext = createContext<ContextType | undefined>(undefined);


export const OureProvider = ({ children }: OureProviderProps) => {
    const [openSidebare, setOpenSidebare] = useState(false);
    const [isLogin, setIslogin] = useState(false);
    const [userId , setUserId] = useState("")


    return (
        <OureContext.Provider value={{
            openSidebare,
            setOpenSidebare,
            isLogin,
            setIslogin,
            userId,
            setUserId
        }}>
            {children}
        </OureContext.Provider>
    )
}
