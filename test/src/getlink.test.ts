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

describe("Get link without login (/api/links)", () => {
    test('', async () => {
        const res = await fetch('http:localhost:80/api/links')

        const resJson = await res.json() as { error: string }
        expect(resJson.error).toStrictEqual('Please log in')
    })
})


describe("Test get link api with login", () => {
    let cookie: string[];

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

    it('Get links (/api/links), no data', async () => {
        const res = await fetch('http:localhost:80/api/links', {
            method: "GET",
            headers: {
                cookie: cookie.join(';')
            }
        })

        const resJson = await res.json() as { res: linkDescription[] }

        expect(res.status).toBe(200)
        expect(resJson.res).toStrictEqual([])

    })


    it("Post api, link added (/api/links)", async () => {
        const res = await fetch('http://localhost:80/api/links', {
            method: "POST",
            headers: { cookie: cookie.join(';') },
            body: JSON.stringify({
                url: 'https://www.instagram.com/',
                newUrl: "",
                min: 0,
                once: false
            })
        })

        const resJson = await res.json() as { message: string };
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

    })

    it('GET api, logout (/api/logout)', async () => {
        const res = await fetch('http://localhost:80/api/logout', {
            method: "GET",
            headers: {
                cookie: cookie.join(';')
            },
            redirect:"manual"
        })

        expect(res.status).toBe(302)
    })

})