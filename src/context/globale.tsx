import { createContext, useState, type ReactNode } from "react";
interface ContextType {
    openSidebare: boolean
    setOpenSidebare: (e: boolean) => void
    isLogin: boolean,
    setIslogin: (e: boolean) => void,
    userId: string;
    setUserId: (e: string) => void,
    roleForm: boolean;
    setRoleForm: (e: boolean) => void,
    addRole: boolean;
    setAddRole: (e: boolean) => void,
    edit: boolean;
    setEdit: (e: boolean) => void,
}

interface OureProviderProps {
    children: ReactNode;
}
export const OureContext = createContext<ContextType | undefined>(undefined);


export const OureProvider = ({ children }: OureProviderProps) => {
    const [openSidebare, setOpenSidebare] = useState(false);
    const [isLogin, setIslogin] = useState(false);
    const [userId, setUserId] = useState("");
    const [roleForm, setRoleForm] = useState(false)
    const [addRole, setAddRole] = useState(false)
    const [edit, setEdit] = useState(false)



    return (
        <OureContext.Provider value={{
            openSidebare,
            setOpenSidebare,
            isLogin,
            setIslogin,
            userId,
            setUserId,
            roleForm,
            setRoleForm,
            addRole,
            setAddRole,
            edit,
            setEdit
        }}>
            {children}
        </OureContext.Provider>
    )
}
