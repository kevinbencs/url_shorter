/*fetch('/api/links')
    .then(data => data.json())
    .then()
    .catch((err) => {
        console.error(err);
    })
*/

const show_menu = document.getElementById('show_menu_label');
const hide_menu = document.getElementById('hide_menu_label');
const header = document.querySelector('header');
const log_out = document.getElementById('log_out')

const sideBar = document.getElementById('sideBar')


window.addEventListener('scroll', (event) => {
    if (window.scrollY > 0) {
        header.classList.add('shadow-md');
    }
    else {
        header.classList.remove('shadow-md');
    }

})

let menuShow = false;

show_menu.addEventListener('click', (event) => {
    if(!menuShow){
    sideBar.classList.remove('hidden');
    setTimeout(() => {
        sideBar.classList.remove('-left-96');
        sideBar.classList.add('left-0');
        menuShow = true;
    }, 100)
    }

})

hide_menu.addEventListener('click', (event) => {
    if(menuShow){
    sideBar.classList.remove('left-0');
    sideBar.classList.add('-left-96');
    setTimeout(() => {
        sideBar.classList.add('hidden');
        menuShow = false;
    }, 500);}
})

log_out.addEventListener('click', async () => {
    try {
        const fetchRes = await fetch('/api/logout');

        if (fetchRes.status >= 400) {
            const jsonData = await fetchRes.json();
        }


    } catch (error) {
        console.error(error)
    }
})