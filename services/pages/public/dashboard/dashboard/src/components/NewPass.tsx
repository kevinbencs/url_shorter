import { type SyntheticEvent, useState, useEffect, useTransition } from "react"

const NewPass = () => {
  const [passMatch, setPassMatch] = useState<boolean>(true);
  const [pass1, setPass1] = useState<string>('');
  const [pass2, setPass2] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (pass1 !== pass2) {
      setPassMatch(false);
    }
    else {
      setPassMatch(true);
    }
    setErr('')
  }, [pass1, pass2])

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
          body: JSON.stringify({ pass1, pass2 })
        });

        if(!res.ok){
          
        }

      } catch (error) {
        console.error(error)
        setErr('Something went wrong, please try again.')
      }
    })



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

        <label className="mb-4 ">
          <div className="text-base">New password</div>
          <input type="password" name="pass1" className="w-full border border-gray-700 rounded-3xl p-1 pl-4 pr-4 mt-2 mb-2" value={pass1} onChange={(e) => setPass1(e.target.value)} disabled={isPending}/>
        </label>
        <label>
          <div className="text-base">Mew password again</div>
          <input type="password" name="pass2" className="w-full border border-gray-700 rounded-3xl p-1 pl-4 pr-4 mt-2 mb-6" value={pass2} onChange={(e) => setPass2(e.target.value)} disabled={isPending} />
        </label>
        <input type="submit" value="Change" className="cursor-pointer text-md w-full border-fuchsia-400 border pt-1 pb-1 rounded-full  hover:bg-fuchsia-400 hover:text-white "  disabled={isPending}/>
      </form>
    </div>
  )
}

export default NewPass