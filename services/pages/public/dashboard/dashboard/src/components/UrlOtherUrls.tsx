import { useState } from "react"


const UrlOtherUrls = () => {
    const [show, setShow] = useState<boolean>(false)
    return (
        <li>
            <div className="flex gap-3 border-b-2 border-t-2">
                <button className="cursor-pointer" >&#9940;</button>
                <div className="ml-2 mr-2 w-full">wfeew</div>
                <button className={`cursor-pointer ${show === true ? 'rotate-180' : 'rotate-0'}`} onClick={() => setShow(!show)}> &#128314;</button>
            </div>
            {show &&
                <div className="mt-2 flex justify-between">
                    <div>code</div>
                    <div>delete</div>
                </div>
                
            }
        </li>
    )
}

export default UrlOtherUrls