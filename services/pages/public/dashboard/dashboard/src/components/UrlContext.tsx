import {type ReactElement, useContext, createContext, useState, type SetStateAction, type Dispatch} from 'react'

const urlContext = createContext<undefined | {myOtherUrl: string, setMyOtherUrls: Dispatch<SetStateAction<string>> }>(undefined)

export const UrlProvider = ({children}: {children: ReactElement}) => {
    const [myOtherUrl, setMyOtherUrls] = useState<string>('myUrls')
  return (
    <urlContext.Provider value={{myOtherUrl, setMyOtherUrls}}>
        {children}
    </urlContext.Provider>
  )
}


export const useUrls = () => {
    const context = useContext(urlContext);

    if(context === undefined){
        throw new Error('useUrls must be used within the UrlProvider')
    }

    return context
}
