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

describe("", () => {
    let cookie: string[];
    beforeAll(async () => {

        const regiRes = await fetch('http://localhost:80/api/signup', {
            method: 'POST',
            headers: "",
            body: JSON.stringify({
                email: "sfdyvdgvd@efg.grt",
                password: "DgrQ23dsfgsdgsd",
                name: "Bel"
            })
        })



        const regResJson = await regiRes.json() as { message: string };
        expect(regResJson).toStrictEqual({ message: 'Signed up' })


        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "sfdyvdgvd@efg.grt", password: "DgrQ23dsfgsdgsd" }),
            redirect: "manual"
        })

        expect(res.status).toBe(302)

        cookie = res.headers.raw()["set-cookie"]
        expect(cookie).toBeTruthy();
    })








    it("Patch api (api/update/password", async () => {
        const res = await fetch('http://localhost:80/api/update/password', {
            method: "PATCH",
            headers: { cookie: cookie.join(';') },
            body: JSON.stringify({
                password: "hdwWADaw1233"
            })
        })

        const resJson = await res.json() as { message: string };
        expect(resJson.message).toStrictEqual('Password changed')
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

    it("Post api (/api/signin", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "sfdyvdgvd@efg.grt", password: "hdwWADaw1233" }),
            redirect: "manual"
        })

        expect(res.status).toBe(302)

        cookie = res.headers.raw()["set-cookie"]
        expect(cookie).toBeTruthy();
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