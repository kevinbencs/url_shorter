import { useState, useTransition } from "react"
import { useUrls } from "./UrlContext"


const DeleteAcc = () => {
    const { setDellAcc } = useUrls();
    const [err, setErr] = useState<string>('');
    const [isPending, startTransition] = useTransition()

    const clickCancel = () => {
        setErr('')
        setDellAcc(false);
    }

    const clickDelete = () => {
        startTransition(async () => {
            try {
                setErr('')
                const res = await fetch('/api/delete/acc', {
                    method: 'DELETE',
                    headers: {
                        "Accept": "application/json, text/plain",
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                })

                if (!res.ok) {
                    const resJson = await res.json() as { error: string };

                    setErr(resJson.error)
                }

            } catch (error) {
                console.error(error)
                setErr('Something went wrong, please try again.')
            }
        })


    }

    return (
        <>
            <div className='w-screen h-screen bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-40 flex justify-center items-center'>
                <div className='dark:bg-black w-full max-w-[600px] h-44 dark:text-white rounded-2xl p-5 flex flex-col justify-between bg-gray-100 text-black mr-2 ml-2'>
                    <div>Would you really want to delete your account?</div>
                    <div className='flex justify-between'>
                        <button className="hover:bg-fuchsia-400 p-2 rounded-md cursor-pointer" onClick={clickCancel}>Cancel</button>
                        <button className="hover:bg-fuchsia-400 p-2 rounded-md cursor-pointer" onClick={clickDelete} disabled={isPending}>Delete</button>
                    </div>
                </div>
            </div>
            {err !== '' &&
                <div className="text-red-600 fixed top-10 left-0 text-center">{err}</div>
            }
        </>

    )
}

export default DeleteAcc