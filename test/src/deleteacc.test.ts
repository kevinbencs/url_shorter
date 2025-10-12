import fetch from "node-fetch";

describe("Delete api without login (/delete/acc)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/delete/acc', {
            method: "Delete"
        })

        const resJson = await res.json() as { error: string };

        expect(resJson.error).toStrictEqual('Please log in');
    })
})

describe("Delete api with login", () => {
    let cookie: string[];
    beforeAll(async () => {

        const regiRes = await fetch('http://localhost:80/api/signup', {
            method: 'POST',
            headers: "",
            body: JSON.stringify({
                email: "sdyvdgvd@efg.grt",
                password: "DgrQ23dsfgsdgsd",
                name: "Bel"
            })
        })



        const regResJson = await regiRes.json() as { message: string };
        expect(regResJson).toStrictEqual({ message: 'Signed up' })


        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "sdyvdgvd@efg.grt", password: "DgrQ23dsfgsdgsd" }),
            redirect: "manual"
        })

        expect(res.status).toBe(302)

        cookie = res.headers.raw()["set-cookie"]
        expect(cookie).toBeTruthy();
    })

    it("Delete api (/delete/acc)", async () => {
        const res = await fetch('http://localhost:80/api/delete/acc', {
            method: "Delete",
            headers: {
                cookie: cookie.join(';')
            },
            redirect: "manual"

        })

        expect(res.status).toBe(302)
        expect(res.headers.get('location')).toBe('/')

        cookie = res.headers.raw()["set-cookie"]
        const ind = cookie[0].indexOf('user=;')
        
        expect(ind).not.toBe(-1);
    })

    it("Post api, login (/api/signin)", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "sdyvdgvd@efg.grt", password: "DgrQ23dsfgsdgsd" })
        })

        const resJson = await res.json() as { error: string };
        expect(resJson.error).toStrictEqual('Invalid email or password. Please try again with the correct credentials');
    })


})

