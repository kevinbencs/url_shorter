import {createContext, useContext, type ReactElement, useState, type Dispatch, type SetStateAction} from 'react'

const ShowSideBarContext = createContext<{showSidebar: string, setShowSidebar: Dispatch<SetStateAction<string>>} | undefined>(undefined)


export const SidebarProvider= ({children}: {children: ReactElement}) => {

    const [showSidebar, setShowSidebar] = useState<string>('-left-96');

  return (
    <ShowSideBarContext.Provider value={{showSidebar, setShowSidebar}}>
        {children}
    </ShowSideBarContext.Provider>
  )
}

export const useSidebar = () => {
    const context = useContext(ShowSideBarContext);
    if(context === undefined){
        throw new Error('useSidebar must be used within the SidebarProvider');
    }

    return context
}