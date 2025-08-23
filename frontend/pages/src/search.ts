(() => {
    const search = document.getElementById('Search');
    const urlInput = document.querySelector<HTMLInputElement>('input[name="Url"]');
    const hedSec = document.getElementsByClassName('js-hed-sec');
    const result = document.getElementById('result')

    fetch('/api/name')
        .then(data => data.json())
        .then(res => {
            if (res.ok && hedSec[0]) {
                hedSec[0].innerHTML = `
                <a href="/dashboard" class="m-1 ml-2 pl-2">${res.name}</a>
            `
            }
            else {
                if (res.code !== 404) console.error(res.error)
            }
        })
        .catch(err => {
            console.error(err);
        })

    const submitFunction = (e: SubmitEvent) => {
        e.preventDefault();
        if (urlInput !== null && urlInput.value !== '')
            window.location.href = `${window.location.origin}/search?url=${urlInput.value}`
    }

    search?.addEventListener('submit', submitFunction)

    const urlParams = new URLSearchParams(window.location.search)

    fetch(`/api/search/${urlParams.get('url')}`)
        .then(data => data.json())
        .then(res => {
            if (result) {
                if (res.ok) {
                    result.innerHTML = `
                ${res.message}
            `
                }
                else {
                    result.innerHTML = `
                ${res.error}
            `
                }
            }
        })
        .catch(err => {
            console.error(err);
        })

})()