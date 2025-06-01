fetch('/api/links')
    .then(data => data.json())
    .then()
    .catch((err) => {
        console.error(err);
    })