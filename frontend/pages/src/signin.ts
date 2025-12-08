(() => {
    const Pass = document.getElementById('Password') as HTMLInputElement | null;
    const Email = document.getElementById('Email') as HTMLInputElement | null;
    const PassChanger = document.getElementById('pass_changer') as HTMLButtonElement | null;
    const Display = document.getElementsByClassName('js-display');
    const Hide = document.getElementsByClassName('js-hide');
    const Form = document.getElementById('Form');

    const ErrorDiv = document.getElementById('Error');

    let passType = 'password';

    PassChanger?.addEventListener('click', async (e) => {
        if (passType === 'password') {
            passType = 'text';
            Display[0]?.classList.add('hidden');
            Hide[0]?.classList.remove('hidden');

        }
        else {
            passType = 'password';
            Hide[0]?.classList.add('hidden');
            Display[0]?.classList.remove('hidden');
        }

        if (Pass) {
            Pass.type = passType;
        }
    })

    let canSubmit = true;

    Form?.addEventListener('submit', async (e) => {
        try {
            e.preventDefault();

            if   (Pass && Email && Pass.value !== '' && Email.value !== '') {
                if (canSubmit) {

                    canSubmit = false;
                    const res = await fetch('/api/signin', {
                        method: 'POST',
                        headers: {
                            "Accept": "application/json, text/plain",
                            "Content-type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                        body: JSON.stringify({ password: Pass.value, email: Email.value }),
                    })

                    const resJSON = await res.json();

                    if(res.status === 200){
                        window.location.href = resJSON.redirect
                    }

                    

                    if (resJSON.error) {
                        console.log(resJSON.error)
                        if (ErrorDiv) {
                            ErrorDiv.innerHTML = `
                                    <div>${resJSON.error}</div>
                                `
                        }
                    }
                    if (resJSON.failed && resJSON.failed.length > 0) {
                        console.log(resJSON.failed)
                        if (ErrorDiv) {
                            ErrorDiv.innerHTML = `${resJSON.failed.map((item: { message: string }) => `<div>${item.message}</div>`).join('')}`
                        }
                    }


                    canSubmit = true;
                }

            }

        } catch (error) {
            console.log(error);
            if (ErrorDiv) {
                ErrorDiv.innerHTML = `Something went wrong with network connect. Please try again.`
            }
            canSubmit = true;
        }

    })
})()
