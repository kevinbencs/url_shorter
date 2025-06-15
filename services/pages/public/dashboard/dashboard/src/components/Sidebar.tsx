import { useSidebar } from "./SidebarContext"
import { useUrls } from "./UrlContext";


const Sidebar = () => {
    const {showSidebar, setShowSidebar} = useSidebar();
    const {setMyOtherUrls} = useUrls();

    const clickExit = () => {
        setShowSidebar('-left-96');
    }

    const clickMyUrls = () => {
        setMyOtherUrls('myUrls');
        clickExit();
    }

    const clickOtherUrls = () => {
        setMyOtherUrls('otherUrls');
        clickExit();
    }
    
    return (
        <div className={`w-60 fixed ${showSidebar} top-0 z-20 p-5  min-h-screen  duration-500 ease-in-out shadow-md  lg:static lg:z-0 lg:block dark:bg-[#424242] lg:dark:bg-[#242424] dark:text-[#e2e2e2] bg-gray-100 lg:bg-gray-50 lg:shadow-none`}>
            <div className="flex justify-end lg:hidden">
                <button onClick={clickExit}
                    className="w-12 h-12 cursor-pointer rounded-md  flex flex-col justify-center items-center">
                    <div className="w-10  h-1 rotate-135 relative   bg-black"></div>
                    <div className="w-10  h-1  rotate-45 relative -top-1 bg-black"></div>
                </button>
            </div>

            <section>
                <li><a href="/search" className="cursor-pointer">Search</a></li>
                <li><button className="cursor-pointer" onClick={clickMyUrls}>My urls</button></li>
                <li><button className="cursor-pointer" onClick={clickOtherUrls}>Other urls</button> </li>
                <li><button className="cursor-pointer" >Log out</button></li>
            </section>


        </div>
    )
}

export default Sidebar