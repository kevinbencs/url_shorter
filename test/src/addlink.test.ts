import fetch from "node-fetch";

interface failed {
    message: string
}


describe("POST api, without login (/api/links)", () => {
    test("",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: "",
            body: JSON.stringify({
                    url: 'https://www.instagram.com/',
            })
        })

        const resJson = await res.json() as {error: string};

        expect(resJson.error).toStrictEqual('Please log in')
    })
})


describe("POST api, with login (/api/links)", () => {
    let cookie: string[];
    beforeAll(async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "yvdgvd@efg.grt", password: "DgrQ23dsfgsdgsd" }),
            redirect: "manual"
        })

        expect(res.status).toBe(302)

        cookie = res.headers.raw()["set-cookie"]

        expect(cookie).toBeTruthy();
    })


    it("Bad url",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: 'hesfsefaefsef/',
                    once:false,
                    min:0
            })
        })

        const resJson = await res.json() as {failed: failed[]};
        const result = resJson.failed[0];
        expect(result.message).toStrictEqual('Url is required')
    })


    it("Bad new url tag",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: 'https://www.instagram.com/',
                    newUrl: 14233,
                    once:false,
                    min:0
            })
        })

        const resJson = await res.json() as {failed: failed[]};
        const result = resJson.failed[0];
        expect(result.message).toStrictEqual('New url tag must be string or undefined')
    })



    it("Bad once",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: 'https://www.instagram.com/',
                    newUrl: "",
                    once: 1,
                    min:0
            })
        })

        const resJson = await res.json() as {failed: failed[]};
        const result = resJson.failed[0];
        expect(result.message).toStrictEqual('Once must be boolean')
    })



    it("Minute not number",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: 'https://www.instagram.com/',
                    newUrl: "",
                    min: 'efsw',
                    once:false
            })
        })

        const resJson = await res.json() as {failed: failed[]};
        const result = resJson.failed[0];
        expect(result.message).toStrictEqual('Minute must be number')
    })

    it("Minute not integer",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: 'https://www.instagram.com/',
                    newUrl: "",
                    min: 1.5,
                    once:false
            })
        })

        const resJson = await res.json() as {failed: failed[]};
        const result = resJson.failed[0];
        expect(result.message).toStrictEqual('Minute must be integer')
    })


    

    it("Minute lesser than 0",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: 'https://www.instagram.com/',
                    newUrl: "",
                    min: -1,
                    once:false
            })
        })

        const resJson = await res.json() as {failed: failed[]};
        const result = resJson.failed[0];
        expect(result.message).toStrictEqual('Minute must be between 0 and 7200')
    })

    it("Minute larger than 7200",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: 'https://www.instagram.com/',
                    newUrl: "",
                    min: 100000,
                    once:false
            })
        })

        const resJson = await res.json() as {failed: failed[]};
        const result = resJson.failed[0];
        expect(result.message).toStrictEqual('Minute must be between 0 and 7200')
    })


    it("Link added",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: 'https://www.instagram.com/',
                    newUrl: "",
                    min: 0,
                    once:false
            })
        })

        const resJson = await res.json() as {message: string};
        expect(resJson.message).toStrictEqual('Link added')
    })



    it("Link added with url tag",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: 'https://www.instagram.com/',
                    newUrl: "insta3",
                    min: 0,
                    once:false
            })
        })

        const resJson = await res.json() as {message: string};
        expect(resJson.message).toStrictEqual('Link added')
    })

    it("Url tag used",async () => {
        const res = await fetch('http://localhost:80/api/links',{
            method: "POST",
            headers: {cookie: cookie.join(';')},
            body: JSON.stringify({
                    url: 'https://www.instagram.com/',
                    newUrl: "insta3",
                    min: 0,
                    once:false
            })
        })

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toStrictEqual('insta3 is used. Please select another url parameter or leave the input field blank.')
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
        cookie = res.headers.raw()["set-cookie"]
        const ind = cookie[0].indexOf('user=;')
        
        expect(ind).not.toBe(-1);
    })
})