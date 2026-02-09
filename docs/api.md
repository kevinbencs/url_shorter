## API requests (REST API)

- Post /api/signup

Body:

``` 
password: string,
email: string,
name: string
```
Response:
```
Code Description
201  message: 'Signed up'
```

Error:
```
Code Description
500  error: 'Internal server error.
400  failed: string[],
422  error: 'Email is used in another account.'
```

- Post /api/signin

Body:

``` 
password: string,
email: string,
```
Response:
```
Code Description
200  redirect: '/dashboard'
```

Error:
```
Code Description
500  error: 'Internal server error.
400  failed: string[],
401  error: 'Invalid email or password. Please try again with the correct credentials'
429  error: 'Too many login attempts'
```


- Get /api/logout

Response:
```
Code Description
200  redirect: '/'
```

Error:
```
Code Description
500  error: 'Internal server error.
```

- Get /api/links
```
graphData {
    date: string,
    viewer: number,
}
```

```
linkDescription {
    real_url: string,
    id: string,
    new_url: string,
    viewer: number,
    once: boolean,
    time: number,
    email: string,
    data: graphData[]
}
```

Response:
```
Code Description
200  res: linkDescription[]
```

Error:
```
Code Description
500  error: 'Internal server error.
401  error: string
```


- Post /api/links

Body:

``` 
url: string (link)
newUrl: string || undefined
once: boolean
min: number (between 0 and 7200)
```

Response:
```
Code Description
201  message: 'Link added' 
```

Error:
```
Code Description
500  error: 'Internal server error.
400  failed: string[],
401  error: string
```

- Patch /api/link/:id

Body:

``` 
url: string || undefined
once: boolean
min: number (between 0 and 7200)
```

Response:
```
Code Description
200  message: 'Link updated' 
```

Error:
```
Code Description
500  error: 'Internal server error.
400  failed: string[],
401  error: string,
404  error: 'Link not found'
403  error: 'Cannot update the link'
```

- Delete /api/link/:id


Response:
```
Code Description
200  message: 'Link deleted'
```

Error:
```
Code Description
500  error: 'Internal server error.
401  error: string
404  error: 'Link not found'
400  error: string,
403  error: 'Cannot delete the link'
```

- Delete /api/delete/acc


Response:
```
Code Description
200  redirect: '/'
```

Error:
```
Code Description
500  error: 'Internal server error.
401  error: string
```

- Patch /api/update/password

Body:

``` 
password: string,
```

Response:
```
Code Description
200  message: 'Password changed'
```
Error:
```
Code Description
500  error: 'Internal server error.
400  failed: string[],
401  error: string
```

- Get /api/search/:url

Response:
```
Code Description
200  message: string
```

Error:
```
Code Description
500  error: 'Internal server error.
404  message: 'This URL is not available.'
```

- Get /api/name

Response:
```
Code Description
200  name: string
```

Error:
```
Code Description
500  error: 'Internal server error.
401  error: string
```
