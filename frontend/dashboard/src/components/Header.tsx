import { useEffect, useState } from "react";
import { useSidebar } from "./SidebarContext"
import ThemeToggle from "./Themetoogle";
import useSWR from 'swr'

const fetcher = async (url: string): Promise<{  name: string  }> => {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            const errorMessage = await res.json().then(data => data.error || "unknown error");
            console.error(errorMessage)

            throw new Error(errorMessage);
        }

        return res.json()

    } catch (error) {
        console.error(error)
        throw new Error('Server error');
    }
}


const Header = () => {
    const { setShowSidebar } = useSidebar();
    const [shadow, setShadow] = useState('');
    const { data, error, isLoading, } = useSWR('api/name', fetcher, { revalidateOnFocus: false })

    useEffect(() => {
        function getShadow() {
            if (window.scrollY > 0) {
                setShadow('shadow-md')
            }
            else{
                setShadow('')
            }
        }


        window.addEventListener('scroll', getShadow);

        return () => window.removeEventListener('scroll', getShadow)
    }, [])

    return (
        <>
            <header className={`sticky top-0 z-10  bg-gray-50 dark:bg-[#161616] dark:text-[#e2e2e2] ${shadow} lg:dark:bg-[#242424]`}>
                <div className="flex justify-between p-5 lg:justify-end">
                    <div className="lg:hidden">
                        <button onClick={() => setShowSidebar('left-0')}
                            className="w-12 h-12  cursor-pointer rounded-md  flex flex-col justify-center items-center"
                            tabIndex={0}>
                            <div className="w-8  h-1 bg-black dark:bg-[#a3a3a3]"></div>
                            <div className="w-8 m-1 h-1 bg-black dark:bg-[#a3a3a3]"></div>
                            <div className="w-8  h-1 bg-black dark:bg-[#a3a3a3]"></div>
                        </button>

                    </div>
                    
                    <div className="flex gap-4 items-center">
                        <ThemeToggle />
                        {isLoading && 
                            <div></div>
                        }
                        {error && 
                            <div>Server error</div>
                        }
                        {data && 
                            <div> {data.name}</div>
                        }
                        
                    </div>

                </div>

            </header>
        </>
    )
}

export default Header