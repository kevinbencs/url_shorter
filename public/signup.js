const Pass = document.getElementById('Password');
const Email = document.getElementById('Email');
const Name = document.getElementById('Name');

const Form = document.getElementById('Form');

const ErrorDiv = document.getElementById('Error');




let canSubmit = true;

Form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();

        if (Pass.value !== '' && Email.value !== '' && Name !== '') {
            if (canSubmit) {

                canSubmit = false;
                const res = await fetch('/api/signup', {
                    method: 'POST',
                    header: {
                        "Accept": "application/json, text/plain",
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({password: Pass.value, email: Email.value, name: Name.value})
                })



                if (res.status < 300 || res.status >= 400) {
                    const resJSON = await res.json();

                    console.log(resJSON.failed)
                    if (resJSON.error) {
                        ErrorDiv.innerHTML = `
                    <div>${resJSON.error}</div>
                    `
                    }
                    if (resJSON.failed.length > 0) { 
                        ErrorDiv.innerHTML = `${resJSON.failed.map(item => `<div>${item.message}</div>`).join('')}`
                    }
                }


                canSubmit = true;
            }

        }





    } catch (error) {
        console.log(error);
        canSubmit = true;
    }

})
