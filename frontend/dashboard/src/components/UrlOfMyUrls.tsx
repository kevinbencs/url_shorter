import { useState } from "react"
import Graph from "./Graph"
import { IoSettings } from "react-icons/io5";


const UrlOfMyUrls = (props: {id: string, priv: boolean, number: number, code: string, data: number[], url:string}) => {
    const [show, setShow] = useState<boolean>(false)
    return (
        <li>
            <div className="flex gap-3 border-b-2 border-t-2">
                <button className="cursor-pointer" >&#9940;</button>
                <div className="ml-2 mr-2 w-full">{props.url}</div>
                <button className={`cursor-pointer ${show === true ? 'rotate-180' : 'rotate-0'}`} onClick={() => setShow(!show)}> &#128314;</button>
            </div>
            {show &&
                <div className="mt-2">
                    <div className="flex justify-between">
                        <div>Private: {props.priv}</div>
                        <div>number: {props.number}</div>
                        <div>code: {props.code}</div>
                        <IoSettings />
                    </div>

                    <div className="hidden lg:flex lg:justify-between max-w-[1000px]">
                        <Graph data={props.data}/>
                    </div>

                </div>
            }

        </li>
    )
}

export default UrlOfMyUrls