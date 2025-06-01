
const search = document.getElementById('Search');
const urlInput = document.querySelector('input');

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
    .then(res => { })
    .catch(err => {
        console.error(err);
    })