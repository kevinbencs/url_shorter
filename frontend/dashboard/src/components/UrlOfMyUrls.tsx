import { useState } from "react"
import Graph from "./Graph"
import { IoSettings } from "react-icons/io5";

interface graphData{
    month: string,
    year: string,
    viewer: number
}

const UrlOfMyUrls = (props: {id: string, viewer: number,data: graphData[],  real_url: string, new_url:string, once:boolean, time:number}) => {
    const [show, setShow] = useState<boolean>(false)
    return (
        <li>
            <div className="flex gap-3 border-b-2 border-t-2">
                <button className="cursor-pointer" >&#9940;</button>
                <div className="ml-2 mr-2 w-full">{props.new_url}</div>
                <button className={`cursor-pointer ${show === true ? 'rotate-180' : 'rotate-0'}`} onClick={() => setShow(!show)}> &#128314;</button>
            </div>
            {show &&
                <div className="mt-2">
                    <div className="flex justify-between">
                        <div>number: {props.viewer}</div>
                        <IoSettings />
                        <div>url: {props.real_url}</div>
                        <div>{props.once}</div>
                        <div>{props.time}</div>
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