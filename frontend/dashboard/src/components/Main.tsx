import DeleteAcc from './DeleteAcc'
import MyUrl from './MyUrl'
import NewPass from './NewPass'
import { useUrls } from './UrlContext'

const Main = () => {
    const { myOtherUrl, delAcc } = useUrls()

    return (
        <main className=" p-5  dark:bg-[#242424] dark:text-[#e2e2e2] bg-gray-50 min-h-[calc(100vh-72px)]">

            <div className='w-full lg:left-60 lg:relative lg:top-0 lg:w-[calc(100%-240px)]'>
                <h1 className="text-4xl mb-10">Dashboard</h1>


                {myOtherUrl === 'myUrls' && <MyUrl />}

                {myOtherUrl === 'password' && <NewPass />}

                {delAcc === true && <DeleteAcc />}


            </div>
        </main>
    )
}

export default Main