import fetch from "node-fetch";

interface graphData {
    date: string,
    viewer: number,
}

interface linkDescription {
    real_url: string,
    id: string,
    new_url: string,
    viewer: number,
    once: boolean,
    time: number,
    email: string,
    data: graphData[]
}



describe("Test get link api with login", () => {
    let cookie: string[];
    let id: string;

    beforeAll(async () => {

        const regiRes = await fetch('http://localhost:80/api/signup', {
            method: 'POST',
            headers: "",
            body: JSON.stringify({
                email: "dayvdgvd@efg.grt",
                password: "DgrQ23dsfgsdgsd",
                name: "Bel"
            })
        })



        const regResJson = await regiRes.json() as { message: string };
        expect(regResJson).toStrictEqual({ message: 'Signed up' })


        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "dayvdgvd@efg.grt", password: "DgrQ23dsfgsdgsd" }),
            redirect: "manual"
        })

        expect(res.status).toBe(302)

        cookie = res.headers.raw()["set-cookie"]

        expect(cookie).toBeTruthy();
    })


    it("Post api, link added (/api/links)", async () => {
        const res = await fetch('http://localhost:80/api/links', {
            method: "POST",
            headers: { cookie: cookie.join(';') },
            body: JSON.stringify({
                url: 'https://www.instagram.com/',
                newUrl: "hello1",
                min: 0,
                once: false
            })
        })

        const resJson = await res.json() as { message: string };
        expect(resJson.message).toStrictEqual('Link added')
    })



    it('Get links (/api/links)', async () => {
        const res = await fetch('http://localhost:80/api/links', {
            method: 'GET',
            headers: {
                cookie: cookie.join(';')
            }
        })

        const resJson = await res.json() as { res: linkDescription[] }

        expect(res.status).toBe(200)
        expect(resJson.res.length).toStrictEqual(1)

        id = resJson.res[0].id

    })


    it('Delete link without login (/api/link:id)', async () => {
        const res = await fetch(`http://localhost:80/api/link/${id}`, {
            method: 'DELETE',
        })

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toBe('Please log in');
    })

    it('Delete link, id not uuid (/api/link:id)', async () => {
        const res = await fetch(`http://localhost:80/api/link/sfe`, {
            method: 'DELETE',
            headers: {
                cookie: cookie.join(';')
            }
        })

        expect(res.status).toBe(400)

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toBe('Invalid ID format.');
    })

    it('Delete link, bad id (/api/link:id)', async () => {
        const res = await fetch(`http://localhost:80/api/link/550e8400-e29b-41d4-a716-446655440000`, {
            method: 'DELETE',
            headers: {
                cookie: cookie.join(';')
            }
        })

        expect(res.status).toBe(404)

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toBe('Link not found.');
    })


    it('Delete link (/api/link/:id)', async () => {
        const res = await fetch(`http://localhost:80/api/link/${id}`, {
            method: 'DELETE',
            headers: {
                cookie: cookie.join(';')
            }
        })

        const resJson = await res.json() as {message: string};
        expect(resJson.message).toBe('Link deleted');
    })


    it('Get api, no url (api/search)',async () => {
        const res = await fetch('http://localhost:80/api/search?url=hello1');
        const resJson = await res.json() as {message: string}

        expect(resJson.message).toBe('This url is not available.');
    })

    it('GET api (/api/logout)', async () => {
        const res = await fetch('http://localhost:80/api/logout', {
            method: "GET",
            headers: {
                cookie: cookie.join(';')
            },
            redirect: "manual"
        })

        expect(res.status).toBe(302)
    })

})