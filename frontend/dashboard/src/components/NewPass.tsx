import { type SyntheticEvent, useState, useTransition } from "react"

const NewPass = () => {
  const [passMatch, setPassMatch] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [Res, setRes] = useState<string>('');
  const [show, setShow] = useState<boolean>(false)
  const [typePas, setTypePass] = useState<string>('password');



  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const res = await fetch('/api/update/password', {
          method: 'PATCH',
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ password })
        });

        setPassMatch(false);

        if (!res.ok) {
          const Err = await res.json() as { error: string }
          setErr(Err.error)
        }
        else {
          setPassword('');
          const resJson = await res.json() as { res: string };
          setRes(resJson.res)
        }

      } catch (error) {
        setPassMatch(false);
        console.error(error)
        setErr('Something went wrong, please try again.')
      }
    })

  }

  const showPass = () => {
    if(!show){
      setTypePass('text')
    }
    else{
      setTypePass('password')
    }
    setShow(!show)
  }

  return (
    <div className="flex justify-center">
      <form action="" onSubmit={handleSubmit} className="flex flex-col max-w-[800px] w-full">
        <h2 className={`text-2xl ${(passMatch === true && err === '') ? 'mb-8' : 'mb-4'}`}>Change password</h2>
        {passMatch === false && <div className="text-red-700 mb-4">
          The passwords do not match
        </div>
        }
        {err !== '' &&
          <div className="text-red-700 mb-4">{err}</div>
        }

        {Res !== '' &&
          <div className="text-green-700 mb-4">{Res}</div>
        }

        <label className="mb-4 relative">
          <div className="text-base">New password</div>
          <input type={typePas} name="password" className="w-full border border-gray-700 rounded-3xl p-1 pl-4 pr-4 mt-2 mb-2" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isPending} />
          <button  className="absolute z-10 right-3 bottom-2" onClick={showPass}>
            {!show &&
            <div >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                <path
                  d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
              </svg>
            </div>
            }
            {show &&
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-eye-off">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                <path
                  d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                <path d="M3 3l18 18" />
              </svg>
            </div>
            }
            
          </button>
        </label>
        <input type="submit" value="Change" className="cursor-pointer text-md w-full border-fuchsia-400 border pt-1 pb-1 rounded-full  hover:bg-fuchsia-400 hover:text-white " disabled={isPending} />
      </form>
    </div>
  )
}

export default NewPass