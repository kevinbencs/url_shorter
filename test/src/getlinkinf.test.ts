import fetch from "node-fetch";

describe("Test search api", () => {
    let cookie: string[];

    beforeAll(async () => {

        const regiRes = await fetch('http://localhost:80/api/signup', {
            method: 'POST',
            headers: "",
            body: JSON.stringify({
                email: "sayvdgvsd@efg.grt",
                password: "DgrQ23dsfgsdgsd",
                name: "Bel"
            })
        })



        const regResJson = await regiRes.json() as { message: string };
        expect(regResJson).toStrictEqual({ message: 'Signed up' })


        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "sayvdgvsd@efg.grt", password: "DgrQ23dsfgsdgsd" }),
            redirect: "manual"
        })

        expect(res.status).toBe(302)

        cookie = res.headers.raw()["set-cookie"]

        expect(cookie).toBeTruthy();
    })


    it("Post api, link added (/api/links)",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: 'https://www.instagram.com/',
                    newUrl: "kell1",
                    min: 0,
                    once:false
            })
        })

        const resJson = await res.json() as {message: string};
        expect(resJson.message).toStrictEqual('Link added')
    })


    it('Get api (api/search)',async () => {
        const res = await fetch('http://localhost:80/api/search?url=kell1');

        expect(res.status).toBe(200)
        const resJson = await res.json() as {message: string}

        expect(resJson.message).toBe('https://www.instagram.com/');
    })

    it('Get api, no url (api/search',async () => {
        const res = await fetch('http://localhost:80/api/search?url=kell2');
        expect(res.status).toBe(404)
        const resJson = await res.json() as {message: string}

        expect(resJson.message).toBe('This url is not available.');
    })



    it('GET api (/api/logout)',async () => {
        const res = await fetch('http://localhost:80/api/logout',{
            method: "GET",
            headers: {
                cookie: cookie.join(';')
            }
        })

        expect(res.status).toBe(200)
    })
})