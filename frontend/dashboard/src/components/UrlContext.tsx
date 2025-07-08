import {type ReactElement, useContext, createContext, useState, type SetStateAction, type Dispatch} from 'react'

const urlContext = createContext<undefined | {myOtherUrl: string, setMyOtherUrls: Dispatch<SetStateAction<string>>, delAcc: boolean, setDellAcc:Dispatch<SetStateAction<boolean>> }>(undefined)

export const UrlProvider = ({children}: {children: ReactElement}) => {
    const [myOtherUrl, setMyOtherUrls] = useState<string>('myUrls')
    const [delAcc, setDellAcc] = useState<boolean>(false)
  return (
    <urlContext.Provider value={{myOtherUrl, setMyOtherUrls, delAcc, setDellAcc}}>
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
