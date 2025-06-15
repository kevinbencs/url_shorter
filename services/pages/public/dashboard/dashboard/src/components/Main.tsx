import type { SyntheticEvent } from 'react'
import MyUrl from './MyUrl'
import OtherUrls from './OtherUrls'
import Sidebar from './Sidebar'
import { useUrls } from './UrlContext'

const Main = () => {
    const { myOtherUrl } = useUrls()


    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        /*const Min = e.currentTarget.elements.Minute.value === '' ? '' : Number(e.currentTarget.elements.Minute.value);
        if (Min !== '' && (Min < 0 || Min > 7200)) alert("Minute should be between 0 and 7200 or empty.")
        const url = e.currentTarget.elements.url_text.value;
        const once = e.currentTarget.elements.Once_use.checked;*/

    }

    return (
        <main className=" p-5 lg:flex dark:bg-[#242424] dark:text-[#e2e2e2] bg-gray-50 min-h-screen">
            <Sidebar />
            <div>
                <h1 className="text-4xl mb-10">Dashboard</h1>

                <form action="" className="flex flex-col" onSubmit={handleSubmit}>
                    <label className="mb-4 ">
                        <div className="text-xl">Add new url</div>
                        <input type="url" name="url_text" className="w-full border border-gray-700 rounded-3xl p-1 pl-4 pr-4 mt-2" />
                    </label>
                    <label className='flex gap-5 mb-4'>
                        <input type="checkbox" name='Once_use'/>
                        Once use
                    </label>
                    
                    <input inputMode="numeric" type='text' pattern="[0-9]*" name="Minute" placeholder="Minute" min={0} max={7200} className='mb-4 w-full border border-gray-700 rounded-3xl p-1 pl-4 pr-4 mt-2'/>

                    <input type="submit" value="Add" className="cursor-pointer text-md w-full border-fuchsia-400 border pt-1 pb-1 rounded-full  hover:bg-fuchsia-400 hover:text-white " />
                </form>
                {myOtherUrl === 'myUrls' && <MyUrl />}


                {myOtherUrl === 'otherUrls' && <OtherUrls />}


            </div>
            <div></div>
        </main>
    )
}

export default Main