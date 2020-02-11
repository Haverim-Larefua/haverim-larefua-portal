import React, { FC, useState, createContext, Context } from "react";

interface IAdminContextProps {
    children: any;
}

export interface IAdminContext {
    token: string;
}

export const AdminContext: Context<IAdminContext> = createContext<IAdminContext>({ token: '' });

const AdminContextProvider: FC<IAdminContextProps> = (props: IAdminContextProps) => {
    const [ token, setToken ] = useState<string>('');

    return (
        <AdminContext.Provider value={{ token }}>
            {props.children}
        </AdminContext.Provider>
    )

};
export default AdminContextProvider;
