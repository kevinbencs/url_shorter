
const search = document.getElementById('Search');
const urlInput = document.querySelector('input');
const hedSec = document.getElementsByClassName('js-hed-sec');
const result = document.getElementById('result')

fetch('/api/name')
    .then(data => data.json())
    .then(res => {
        if (res.ok) {
            hedSec[0].innerHTML = `
                <a href="/dashboard" class="m-1 ml-2 pl-2">${res.name}</a>
            `
        }
        else{
            console.error(res.error)
        }
    })
    .catch(err => {
        console.error(err);
    })

const submitFunction = (e) => {
    e.preventDefault();
    const urlIndex = urlInput.value.indexOf('/', 8);
    const url = urlInput.value.slice(urlIndex + 1);
    window.location.href = `${window.location.origin}/search?url=${url}`
}

search.addEventListener('submit', submitFunction)

const urlParams = new URLSearchParams(window.location.search)

fetch(`/api/search/${urlParams.get('url')}`)
    .then(data => data.json())
    .then(res => {
        if(res.ok){
            result.innerHTML=`
                ${res.message}
            `
        }
        else{
            result.innerHTML=`
                ${res.error}
            `
        }
    })
    .catch(err => {
        console.error(err);
    })