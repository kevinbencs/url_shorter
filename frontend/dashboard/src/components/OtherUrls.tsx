import { useState, type SyntheticEvent, useTransition } from 'react'
import UrlOtherUrls from './UrlOtherUrls';
import useSWR from 'swr';


const fetcher = async (url: string): Promise<{ res: { code: string, url: string, id: string }[]  }> => {
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

const OtherUrls = () => {
    const [err, setErr] = useState<string>('')
    const [code, setCode] = useState<string>('');
    const [isPending, startTransition] = useTransition();

    const { data, error, isLoading, mutate } = useSWR('api/link/private', fetcher, { revalidateOnFocus: false })


    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        startTransition(async () => {
            try {
                const res = await fetch('/api/link/private', {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json, text/plain",
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",

                    },
                    body: JSON.stringify({ code, })
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

                mutate();
            } catch (error) {
                console.error(error)
                setErr('Something went wrong, please try again.')
            }
        })

    }
    return (
        <>
            <div className='flex justify-center mb-10'>
                <form action="" className="flex flex-col max-w-[800px] w-full" onSubmit={handleSubmit}>
                    {err !== '' &&
                        <div className="text-red-700 mb-4">{err}</div>
                    }
                    <label className="mb-4 ">
                        <div className="text-xl mb-2">Add new private url</div>
                        <input type="url" name="url_text" className="w-full border border-gray-700 rounded-3xl p-1 pl-4 pr-4 mt-2" placeholder="Code" disabled={isPending} value={code} onChange={(e) => { setCode(e.target.value) }} />
                    </label>


                    <input type="submit" value="Add" className="cursor-pointer text-md w-full border-fuchsia-400 border pt-1 pb-1 rounded-full  hover:bg-fuchsia-400 hover:text-white " disabled={isPending} />
                </form>
            </div>
            <div className='flex justify-center'>
                <section className='max-w-[800px] w-full'>
                    <h2 className="text-2xl mb-5">Other urls</h2>
                    <ul>
                        {isLoading && <div>
                            <svg className="mr-3 size-5 animate-spin " viewBox="0 0 24 24"> </svg>
                            Loading...
                            </div> }
                        {error && <div className='text-red-700'>{error}</div> }
                        {(data && data.res) && data.res.map((item) => <UrlOtherUrls key={item.id} code={item.code} id={item.id}/>)}
                    </ul>
                </section>
            </div>
        </>
    )
}

export default OtherUrls