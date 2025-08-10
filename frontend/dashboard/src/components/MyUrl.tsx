import { useState, type ChangeEvent, type SyntheticEvent, useTransition, } from 'react'
import UrlOfMyUrls from './UrlOfMyUrls';
import useSWR from 'swr'

const fetcher = async (url: string): Promise<{ res: { code: string, url: string, id: string, data: number[], number: number, priv: boolean, once: boolean, min: number }[] }> => {
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



const MyUrl = () => {
    const [err, setErr] = useState<string>('')
    const [isPending, startTransition] = useTransition();
    const [min, setMin] = useState<string>('');
    const [once, setOnce] = useState<boolean>(false)
    const [url, setUrl] = useState<string>('')
    const [newUrl, setNewUrl] = useState<string>('')
    const { data, error, isLoading, mutate } = useSWR('api/link/private', fetcher, { revalidateOnFocus: false })

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        startTransition(async () => {
            try {
                const res = await fetch('', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json, text/plain",
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",

                    },
                    body: JSON.stringify({ min: Number(min), once, url, newUrl })
                })

                if (!res.ok) {
                    const error = await res.json();

                    if (error.error) {
                        console.log(error.error);
                        setErr(error.error);
                    }

                    if (error.failed) {
                        setErr(error.failed.join('$'))
                    }

                }
                else{
                   mutate() 
                }

            } catch (error) {
                console.error(error)
                setErr('Something went wrong, please try again.')
            }
        })


    }


    const handleMinute = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') setMin(e.target.value)
        else {
            if (typeof (Number(e.target.value)) === 'number') {
                if (String(Number(e.target.value)) === e.target.value && Number(e.target.value) < 7200 && Number(e.target.value) > 0) setMin(e.target.value)
            }
        }
    }

    return (
        <>
            <div className='flex justify-center mb-10'>
                <form action="" className="flex flex-col max-w-[800px] w-full" onSubmit={handleSubmit}>
                    {err !== '' &&
                        <div className="text-red-700 mb-4">{err}</div>
                    }
                    <label className="mb-4 ">
                        <div className="text-xl mb-2">Add new url</div>
                        <input type="url" name="url_text" className="w-full border border-gray-700 rounded-3xl p-1 pl-4 pr-4 mt-2" placeholder='https://example.com' disabled={isPending} value={url} onChange={(e) => setUrl(e.target.value)} />
                    </label>
                    <label className='flex gap-5 mb-4'>
                        <input type="checkbox" name='Once_use' disabled={isPending} checked={once} onChange={(e) => setOnce(e.target.checked)} />
                        Once use (optional)
                    </label>

                    <label className="mb-4 ">
                        <input type="text" name="new_url_text" className="w-full border border-gray-700 rounded-3xl p-1 pl-4 pr-4 mt-2" placeholder='New url parameter (optional)' disabled={isPending} value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
                    </label>

                    <input type='text' name="Minute" placeholder="Minute (optional, max 7200)" className='mb-4 w-full border border-gray-700 rounded-3xl p-1 pl-4 pr-4 mt-2' disabled={isPending} value={min} onChange={handleMinute} />

                    <input type="submit" value="Add" className="cursor-pointer text-md w-full border-fuchsia-400 border pt-1 pb-1 rounded-full  hover:bg-fuchsia-400 hover:text-white " disabled={isPending} />
                </form>
            </div>
            <div className='flex justify-center'>
                <section className='max-w-[800px] w-full'>
                    <h2 className="text-2xl mb-5">My urls</h2>
                    <ul >
                        {isLoading && <div>
                            <svg className="mr-3 size-5 animate-spin " viewBox="0 0 24 24"> </svg>
                            Loading...
                            </div> }
                        {error && <div className='text-red-700'>{error}</div> }
                        {(data && data.res) && data.res.map((item) => <UrlOfMyUrls data={item.data} id={item.id} url={item.url} key={item.id} number={item.number} />)}

                    </ul>
                </section>
            </div>

        </>



    )
}

export default MyUrl