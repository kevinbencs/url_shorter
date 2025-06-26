import { useSidebar } from "./SidebarContext"
import { useUrls } from "./UrlContext";
import { ImExit } from "react-icons/im";
import { IoSearchSharp } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { GrDashboard } from "react-icons/gr";
import { CgPassword } from "react-icons/cg";


const Sidebar = () => {
    const { showSidebar, setShowSidebar } = useSidebar();
    const { setMyOtherUrls, myOtherUrl, delAcc, setDellAcc } = useUrls();

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

    const clickPassword = () => {
        setMyOtherUrls('password');
        clickExit();
    }

    const clickDell = () => {
        setDellAcc(true);
    }

    return (
        <div className={`w-60 fixed ${showSidebar} top-0 z-20 p-5 flex flex-col justify-between  h-screen  duration-500 ease-in-out shadow-md lg:left-0  dark:bg-[#424242]  dark:text-[#e2e2e2] bg-gray-100 `}>

            <div>

                <div className="flex justify-between">
                    <div className=" text-3xl italic font-[cursive] font-bold text-fuchsia-400">USr</div>

                    <div className="flex justify-end lg:hidden">
                        <button onClick={clickExit}
                            className="w-12 h-12 cursor-pointer rounded-md  flex flex-col justify-center items-center">
                            <div className="w-10  h-1 rotate-135 relative   bg-black dark:bg-[#a3a3a3]"></div>
                            <div className="w-10  h-1  rotate-45 relative -top-1 bg-black dark:bg-[#a3a3a3]"></div>
                        </button>
                    </div>
                </div>




                <section className="list-none mt-14 text-md flex flex-col  ">
                    <li><button className={`cursor-pointer flex gap-2 items-center hover:pl-4 duration-200 p-3 pl-1 w-44 ${(myOtherUrl === 'myUrls' && !delAcc) ? 'bg-fuchsia-400': ''}`} onClick={clickMyUrls}> <RiDashboardFill /> <span>My urls</span></button></li>
                    <li><button className={`cursor-pointer flex gap-2 items-center hover:pl-4 duration-200 p-3 pl-1 w-44 ${(myOtherUrl === 'otherUrls'  && !delAcc) ? 'bg-fuchsia-400': ''}`} onClick={clickOtherUrls}> <GrDashboard /> <span>Other urls</span></button> </li>
                    <li><a href="/search" className="cursor-pointer flex gap-2 items-center hover:pl-4 duration-200 p-3 pl-1 w-44"><IoSearchSharp /> <span>Search</span></a></li>
                    <li><button className={`cursor-pointer flex gap-2 items-center hover:pl-4 duration-200 p-3 pl-1 w-44 ${(myOtherUrl === 'password'  && !delAcc) ? 'bg-fuchsia-400': ''}`} onClick={clickPassword}> <CgPassword /> <span>New password</span></button></li>
                    <li><button className={`cursor-pointer flex gap-2 items-center hover:pl-4 duration-200 p-3 pl-1 w-44  ${delAcc === true ? 'bg-fuchsia-400': ''}`} onClick={clickDell}> <MdDeleteForever /><span>Delete account</span></button></li>
                </section>

            </div>



            <button className="cursor-pointer flex gap-2 items-center hover:pl-4 p-3 pl-1 duration-200 w-44" > <ImExit /> <span>Log out</span></button>
        </div>
    )
}

export default Sidebar