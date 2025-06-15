import { useEffect, useState } from "react";
import { useSidebar } from "./SidebarContext"
import ThemeToggle from "./Themetoogle";

const Header = () => {
    const { setShowSidebar } = useSidebar();
    const [shadow, setShadow] = useState('')

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
            <header className={`sticky top-0 z-10  bg-gray-50 dark:bg-[#161616] dark:text-[#e2e2e2] ${shadow}`}>
                <div className="flex justify-between p-5">
                    <div className="lg:hidden">
                        <button onClick={() => setShowSidebar('left-0')}
                            className="w-12 h-12  cursor-pointer rounded-md  flex flex-col justify-center items-center"
                            tabIndex={0}>
                            <div className="w-8  h-1 bg-black dark:bg-[#a3a3a3]"></div>
                            <div className="w-8 m-1 h-1 bg-black dark:bg-[#a3a3a3]"></div>
                            <div className="w-8  h-1 bg-black dark:bg-[#a3a3a3]"></div>
                        </button>

                    </div>
                    <div className="hidden lg:block text-3xl italic font-[cursive] font-bold text-fuchsia-400">USr</div>
                    <div className="flex gap-4 items-center">
                        <ThemeToggle />
                        <div >Name</div>
                    </div>

                </div>

            </header>
        </>
    )
}

export default Header