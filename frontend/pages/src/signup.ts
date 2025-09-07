(() => {
    const Pass = document.getElementById('Password') as HTMLInputElement | null;
    const Email = document.getElementById('Email') as HTMLInputElement | null;
    const Name = document.getElementById('Name') as HTMLInputElement | null;
    const PassChanger = document.getElementById('pass_changer') as HTMLButtonElement | null;
    const Display = document.getElementsByClassName('js-display');
    const Hide = document.getElementsByClassName('js-hide');
    const Form = document.getElementById('Form');

    const ErrorDiv = document.getElementById('Error');
    const MessageDiv = document.getElementById('Message');

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

        if(Pass) {
            Pass.type = passType;
        }
    })


    let canSubmit = true;

    Form?.addEventListener('submit', async (e) => {
        try {
            e.preventDefault();
            if(ErrorDiv) ErrorDiv.innerHTML = ``;
            if(MessageDiv) MessageDiv.innerHTML = ``;


            if (Pass !== null && Email !== null && Name !== null) {

                if (Pass.value !== '' && Email.value !== '' && Name.value !== '') {
                    if (canSubmit) {

                        canSubmit = false;
                        const res = await fetch('/api/signup', {
                            method: 'POST',
                            headers: {
                                "Accept": "application/json, text/plain",
                                "Content-type": "application/json",
                                "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify({ password: Pass.value, email: Email.value, name: Name.value })
                        })



                        if (res.status < 300 || res.status >= 400) {
                            const resJSON = await res.json();


                            if (resJSON.error) {
                                console.log(resJSON.error)
                                if (ErrorDiv) {
                                    ErrorDiv.innerHTML = `<div>${resJSON.error}</div>`
                                }
                            }
                            if (resJSON.failed && resJSON.failed.length > 0) {
                                console.log(resJSON.failed)
                                if (ErrorDiv) {
                                    ErrorDiv.innerHTML = `${resJSON.failed.map((item: { message: string }) => `<div>${item.message}</div>`).join('')}`
                                }
                            }
                            if(resJSON.message){
                                if(MessageDiv){
                                    MessageDiv.innerHTML = `<div>${resJSON.message}</div>`
                                }
                                Pass.value = '';
                                Email.value = '';
                                Name.value = '';
                            }
                        }


                        canSubmit = true;
                    }

                }
            }

        } catch (error) {
            console.log(error);
            canSubmit = true;
        }

    })
})()
