const search = document.getElementById('Search');
const urlInput = document.querySelector('input');

const submitFunction = (e) => {
    e.preventDefault();
    const urlIndex = urlInput.value.indexOf('/',8);
    const url = urlInput.value.slice(urlIndex+1);
    window.location.href = `${window.location.origin}/search?url=${url}`
}

search.addEventListener('submit', submitFunction)