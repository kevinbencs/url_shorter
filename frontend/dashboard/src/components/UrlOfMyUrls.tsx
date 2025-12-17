import { useState } from "react"
import Graph from "./Graph"
import { IoSettings } from "react-icons/io5";
import type { KeyedMutator } from "swr";
import UpdateUrl from "./UpdateUrl";

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

interface mut{
    res: linkDescription[] | []
}


const UrlOfMyUrls = (props: { id: string, viewer: number, data: graphData[], real_url: string, new_url: string, once: boolean, time: number, mutate: KeyedMutator<mut>, dataArray: linkDescription[] }) => {
    const [show, setShow] = useState<boolean>(false);
    const [err, setErr] = useState<string>('')
    const [showUpdate, setShowUpdate] = useState<boolean>(false);

    const delUrl = async () => {
        try {
            setErr('')
            const res = await fetch(`/api/link/${props.id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json, text/plain",
                    "Content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            })

            if (res.ok) {
                props.mutate({res:[...props.dataArray.filter(item => item.id !== props.id)]})
            }
            else {
                const resJson = await res.json();

                if (resJson.error) {
                    setErr(resJson.error)
                    console.error(resJson.error)
                }

            }
        } catch (error) {
            console.error(error);
            setErr('Something went wrong. Please try again.')
        }

    }

    const handleShowUpdate = () => {
        setShowUpdate(!showUpdate)
    }


    return (
        <li>
            {err !== '' &&
                <div>{err}</div>
            }
            <div className="flex gap-3 border-b-2 border-t-2">
                <button className="cursor-pointer" onClick={delUrl}>&#9940;</button>
                <div className="ml-2 mr-2 w-full">{props.new_url}</div>
                <button className={`cursor-pointer ${show === true ? 'rotate-180' : 'rotate-0'}`} onClick={() => {setShow(!show); setShowUpdate(false)}}> &#128314;</button>
            </div>
            {show &&
                <div className="mt-2 relative">
                    <div className="flex justify-between">
                        <div>viewer: {props.viewer}</div>
                        <button onClick={handleShowUpdate} className="cursor-pointer">
                            <IoSettings />
                        </button>
                        <div>url: https://redirect123.duckdns.org/{props.real_url}</div>
                        <div>once: {String(props.once)}</div>
                        <div>time: {props.time}</div>
                    </div>
                    {showUpdate &&
                        <UpdateUrl id={props.id} real_url={props.real_url} new_url={props.new_url} once={props.once} time={props.time} mutate={props.mutate}/>
                    }

                    <div className="hidden lg:flex lg:justify-between max-w-[1000px]">
                        <Graph data={props.data} />
                    </div>

                </div>
            }

        </li>
    )
}

export default UrlOfMyUrls