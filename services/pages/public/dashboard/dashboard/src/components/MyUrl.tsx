import { useState, type SyntheticEvent, useTransition } from 'react'
import UrlOfMyUrls from './UrlOfMyUrls';
import useSWR from 'swr'

const fetcher = async (url: string): Promise<{ res: { code: string, url: string, id: string }[] }> => {
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
    const [min, setMin] = useState<number>(0);
    const [priv, setPrivate] = useState<boolean>(false)
    const [once, setOnce] = useState<boolean>(false)
    const [url, setUrl] = useState<string>('')
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
                    body: JSON.stringify({ min, priv, once, url })
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
            } catch (error) {
                console.error(error)
                setErr('Something went wrong, please try again.')
            }
        })

        /*const Min = e.currentTarget.elements.Minute.value === '' ? '' : Number(e.currentTarget.elements.Minute.value);
        if (Min !== '' && (Min < 0 || Min > 7200)) alert("Minute should be between 0 and 7200 or empty.")
        const url = e.currentTarget.elements.url_text.value;
        const once = e.currentTarget.elements.Once_use.checked;*/

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
                        <input type="url" name="url_text" className="w-full border border-gray-700 rounded-3xl p-1 pl-4 pr-4 mt-2" placeholder='https://example.com' disabled={isPending} value={url} onChange={(e) => setUrl(e.target.value)}/>
                    </label>
                    <label className='flex gap-5 mb-4'>
                        <input type="checkbox" name='Once_use' disabled={isPending} checked={once} onChange={(e) => setOnce(e.target.checked)}/>
                        Once use
                    </label>

                    <label className='flex gap-5 mb-4'>
                        <input type="checkbox" name='Private' disabled={isPending} checked={priv} onChange={(e) => setPrivate(e.target.checked)}/>
                        Private
                    </label>

                    <input inputMode="numeric" type='text' pattern="[0-9]*" name="Minute" placeholder="Minute" min={0} max={7200} className='mb-4 w-full border border-gray-700 rounded-3xl p-1 pl-4 pr-4 mt-2' disabled={isPending} value={min} onChange={(e) => setMin(Number(e.target.value))}/>

                    <input type="submit" value="Add" className="cursor-pointer text-md w-full border-fuchsia-400 border pt-1 pb-1 rounded-full  hover:bg-fuchsia-400 hover:text-white " disabled={isPending} />
                </form>
            </div>
            <div className='flex justify-center'>
                <section className='max-w-[800px] w-full'>
                    <h2 className="text-2xl mb-5">My urls</h2>
                    <ul >
                        {(data && data.res) && data.res.map((item) => <UrlOfMyUrls />)}
                        
                    </ul>
                </section>
            </div>

        </>



    )
}

export default MyUrl