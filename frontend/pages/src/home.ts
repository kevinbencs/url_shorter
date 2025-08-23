(() => {
    const queryString = window.location.search;
    const info = document.getElementsByClassName('js-info')

    const urlParams = new URLSearchParams(queryString);

    const info_text = urlParams.get('info')

    if (info_text === 'no_url') {
        if (info[0]) {
            info[0].classList.add('p-20')

            info[0].innerHTML = 'Your link is not available.';
            setTimeout(() => {
                if (info[0]) {
                    info[0].innerHTML = '';
                    info[0].classList.remove('p-20')
                }
            }, 5000);
        }

    }


    const search = document.getElementById('Search');
    const urlInput = document.querySelector<HTMLInputElement>('input[name="Url"]');

    const submitFunction = (e: SubmitEvent) => {
        e.preventDefault();
        if( urlInput!== null && urlInput.value !== '')
        window.location.href = `${window.location.origin}/search?url=${urlInput.value}`
    }

    search?.addEventListener('submit', submitFunction)
})()