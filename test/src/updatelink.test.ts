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

describe("Patch api without login (/api/link/:id)", () => {
    test('Error response', async () => {
        const res = await fetch('http:localhost:80/api/link/sefgsdgrdgrthdfhdtrh',{
            method: "PATCH",
            headers: "",
            body: JSON.stringify({
                url: 'https://www.instagram.com/',
                newUrl: "ifsefsdfgsegse",
                min: 0,
                once: false
            })
        })

        const resJson = await res.json() as { error: string }
        expect(resJson.error).toStrictEqual('Please log in')
    })
})



describe("", () => {
    let cookie: string[];
    let id: string;

    beforeAll(async () => {
        const regiRes = await fetch('http://localhost:80/api/signup', {
            method: 'POST',
            headers: "",
            body: JSON.stringify({
                email: "aaayvdgvd@efg.grt",
                password: "DgrQ23dsfgsdgsd",
                name: "Bel"
            })
        })



        const regResJson = await regiRes.json() as { message: string };
        expect(regResJson).toStrictEqual({ message: 'Signed up' })


        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "aaayvdgvd@efg.grt", password: "DgrQ23dsfgsdgsd" }),
            redirect: "manual"
        })

        expect(res.status).toBe(302)

        cookie = res.headers.raw()["set-cookie"]

        expect(cookie).toBeTruthy();
    })


    it("Post api (/api/links)",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: 'https://www.instagram.com/',
                    newUrl: "insta30",
                    min: 0,
                    once:false
            })
        })

        const resJson = await res.json() as {message: string};
        expect(resJson.message).toStrictEqual('Link added')
    })

    it('Get links (/api/links)', async () => {
        const res = await fetch('http:localhost:80/api/links', {
            method: "GET",
            headers: {
                cookie: cookie.join(';')
            }
        })

        const resJson = await res.json() as { res: linkDescription[] }

        expect(res.status).toBe(200)
        expect(resJson.res.length).toStrictEqual(1)
        id = resJson.res[0].id;

    })


    it("Patch api (/api/link/:id)",async () => {
        const res = await fetch(`http://localhost:80/api/link/${id}`,{
            method: "PATCH",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: "insta300",
                    min: 1,
                    once:false
            })
        })

        const resJson = await res.json() as {message: string};
        expect(resJson.message).toStrictEqual('Link updated')
    })

    it('Get links (/api/links)', async () => {
        const res = await fetch('http:localhost:80/api/links', {
            method: "GET",
            headers: {
                cookie: cookie.join(';')
            }
        })

        const resJson = await res.json() as { res: linkDescription[] }

        expect(res.status).toBe(200)
        expect(resJson.res[0].time).toStrictEqual(1)

    })

    it("Patch api, bad id (/api/link/:id)",async () => {
        const res = await fetch(`http://localhost:80/api/link/awdsafwew`,{
            method: "PATCH",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: "insta300",
                    min: 1,
                    once:false
            })
        })

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toStrictEqual('Invalid ID format.')
    })


    it('GET api (/api/logout)',async () => {
        const res = await fetch('http://localhost:80/api/logout',{
            method: "GET",
            headers: {
                cookie: cookie.join(';')
            },
            redirect: "manual"
        })
        
        expect(res.status).toBe(302)
    })
})