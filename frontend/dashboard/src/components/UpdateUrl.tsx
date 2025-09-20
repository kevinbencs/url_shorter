import { useState, type ChangeEvent, type SyntheticEvent, useTransition, } from 'react'
import type { KeyedMutator } from "swr";

interface graphData {
    date: string,
    viewer: number
}

interface linkDescription {
    real_url: string,
    id: string,
    new_url: string,
    viewer: number,
    once: boolean,
    time: number,
    email: string,
    data: graphData[]
}

interface mut {
    res: linkDescription[] | []
}

const UpdateUrl = (props: { id: string, real_url: string, new_url: string, once: boolean, time: number, mutate: KeyedMutator<mut> }) => {

    const [err, setErr] = useState<string>('')
    const [isPending, startTransition] = useTransition();
    const [min, setMin] = useState<string>(String(props.time));
    const [once, setOnce] = useState<boolean>(props.once)
    const [newUrl, setNewUrl] = useState<string>(props.new_url)

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setErr('')
        startTransition(async () => {
            try {
                const res = await fetch(`/api/link/${props.id}`, {
                    method: 'PATCH',
                    headers: {
                        "Accept": "application/json, text/plain",
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({ min: Number(min), once, url: newUrl })
                });

                const resJson = await res.json();

                if (res.ok) {
                    props.mutate()
                }
                else {
                    if (resJson.error) {
                        console.error(resJson.error)
                        setErr(resJson.error)
                    }
                    if (resJson.failed) {
                        console.error(resJson.failed)
                        setErr(resJson.failed.map((item: { message: string }) => item.message).join(' '))
                    }

                }

            } catch (error) {
                console.error(error)
                setErr('Something went wrong, please try again')
            }
        })

    }

    const handleMinute = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') setMin(e.target.value)
        else {
            if (typeof (Number(e.target.value)) === 'number') {
                if (String(Number(e.target.value)) === e.target.value && Number(e.target.value) < 7200 && Number(e.target.value) >= 0) setMin(e.target.value)
            }
        }
    }

    return (
        <form action="" className="flex flex-col max-w-[800px] w-full absolute left-0 dark:bg-gray-700 bg-gray-300 shadow-2xl p-2 rounded-xl" onSubmit={handleSubmit}>
            {err !== '' &&
                <div className="text-red-700 mb-4">{err}</div>
            }
            <label className='flex gap-5 mb-4'>
                <input type="checkbox" name='Once_use' disabled={isPending} checked={once} onChange={(e) => setOnce(e.target.checked)} />
                Once use (optional)
            </label>

            <label className="mb-4 ">
                <input type="text" name="new_url_text" className="w-full border border-gray-700 dark:border-gray-200 rounded-3xl p-1 pl-4 pr-4 mt-2" placeholder='New url parameter (optional)' disabled={isPending} value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
            </label>

            <input type='text' name="Minute" placeholder="Minute (optional, max 7200)" className='mb-4 w-full border border-gray-700 dark:border-gray-200 rounded-3xl p-1 pl-4 pr-4 mt-2' disabled={isPending} value={min} onChange={handleMinute} />

            <input type="submit" value="Add" className="cursor-pointer text-md w-full border-fuchsia-400 border pt-1 pb-1 rounded-full  hover:bg-fuchsia-400 hover:text-white " disabled={isPending} />

        </form>
    )
}

export default UpdateUrl