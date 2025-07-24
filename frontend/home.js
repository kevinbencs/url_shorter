const queryString = window.location.search;
const info = document.getElementsByClassName('js-info')

const urlParams = new URLSearchParams(queryString);

const info_text = urlParams.get('info')

if (info_text === 'no_url' || info_text === 'private') {
    info[0].classList.add('p-20')
    
    if (info_text === 'no_url') {
        info[0].innerHTML = 'Your link is not available.';
        setTimeout(() => {
            info[0].innerHTML = '';
            info[0].classList.remove('p-20')
        }, 5000);
    }

    if (info_text === 'private') {
        info[0].innerHTML = 'Your link is private. Please log in and add the private link to your account.';
        setTimeout(() => {
            info[0].innerHTML = '';
            info[0].classList.remove('p-20')
        }, 7000);
    }
}


const search = document.getElementById('Search');
const urlInput = document.querySelector('input');

const submitFunction = (e) => {
    e.preventDefault();
    const urlIndex = urlInput.value.indexOf('/', 8);
    const url = urlInput.value.slice(urlIndex + 1);
    window.location.href = `${window.location.origin}/search?url=${url}`
}

search.addEventListener('submit', submitFunction)