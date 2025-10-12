import fetch from "node-fetch";

interface failed {
    message: string
}


describe("Post api test, email error (/api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "ezge", password: "Hgwefi9hefdsy" }),
            redirect: "manual"
        })

        const resJson = await res.json() as { failed: failed[] };
        const result = resJson.failed[0];
        expect(result.message).toStrictEqual('Email is required.')
    })
})


describe("Post api test, there is no uppercase character in password (/api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "dfds@gr.gr", password: "sefdsfgsrd5fds" }),
            redirect: "manual"
        })

        const resJson = await res.json() as { failed: failed[] };
        const result = resJson.failed[0]
        expect(result.message).toStrictEqual('Password must be at least 8 characters, and contain 1 uppercase, 1 lowercase and 1 number.')
    })
})


describe("Post api test, there is no lowercase character in password (/api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "dfds@gr.gr", password: "DWEFERF752TGE" }),
            redirect: "manual"
        })

        const resJson = await res.json() as { failed: failed[] };
        const result = resJson.failed[0]
        expect(result.message).toStrictEqual('Password must be at least 8 characters, and contain 1 uppercase, 1 lowercase and 1 number.')
    })
})


describe("Post api test, there is no number in password (/api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "dfds@gr.gr", password: "FGVSGFdsvgsdfgvbrfg" }),
            redirect: "manual"
        })

        const resJson = await res.json() as { failed: failed[] };
        const result = resJson.failed[0]
        expect(result.message).toStrictEqual('Password must be at least 8 characters, and contain 1 uppercase, 1 lowercase and 1 number.')
    })
})


describe("Post api test, password must be least at 8 character (/api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "dfds@gr.gr", password: "dsaS9" }),
            redirect: "manual"
        })

        const resJson = await res.json() as { failed: failed[] };
        const result = resJson.failed[0]
        expect(result.message).toStrictEqual('Password must be at least 8 characters, and contain 1 uppercase, 1 lowercase and 1 number.')
    })
})


describe("Post api test, wrong password (/api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "yvdgvd@efg.grt", password: "DgrQ23dsfgs" }),
            redirect: "manual"
        })

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toStrictEqual('Invalid email or password. Please try again with the correct credentials');
    })
})


describe("Post api test, wrong email (/api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "gvd@efg.grt", password: "DgrQ23dsfgsdgsd" }),
            redirect: "manual"
        })

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toStrictEqual('Invalid email or password. Please try again with the correct credentials');
    })
})

//Good login

describe("Log in, log out test", () => {
    let cookie: string[];
    it( 'POTS login (/api/singin)',async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "yvdgvd@efg.grt", password: "DgrQ23dsfgsdgsd" }),
            redirect: "manual"
        })

        expect(res.status).toBe(302)

        cookie = res.headers.raw()["set-cookie"]
    })

    it('Get name (/api/name)',async () => {
        const res = await fetch('http://localhost:80/api/name',{
            method: "GET",
            headers: {
                cookie: cookie.join(';')
            }
        })

        expect(res.status).toBe(200)

        const resJson = await res.json() as {name: string};
        console.log(resJson)
    })


    it('GET api (/api/logout)',async () => {
        const res = await fetch('http://localhost:80/api/logout',{
            method: "GET",
            headers: {
                cookie: cookie.join(';')
            }
        })

        expect(res.status).toBe(302)
        const ind = cookie[0].indexOf('user=;')
        
        expect(ind).not.toBe(-1);
    })

    it('Get name with wrong token (/api/name)',async () => {
        const res = await fetch('http://localhost:80/api/name',{
            method: "GET",
            headers: {
                cookie: cookie.join(';')
            }
        })

        expect(res.status).toBe(401)


        const resJson = await res.json() as {error: string};
        expect(resJson.error).toStrictEqual('Please log in')
    })
})


//Limiter test

describe("POST api test, wrong password (api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "yvdgvd@efg.grt", password: "DgrQ23dsfgs" })
        })

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toStrictEqual('Invalid email or password. Please try again with the correct credentials');
    })
})

describe("POST api test, wrong password (api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "yvdgvd@efg.grt", password: "DgrQ23dsfgs" })
        })

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toStrictEqual('Invalid email or password. Please try again with the correct credentials');
    })
})

describe("POST api test, wrong password (api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "yvdgvd@efg.grt", password: "DgrQ23dsfgs" })
        })

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toStrictEqual('Invalid email or password. Please try again with the correct credentials');
    })
})

describe("POST api test, wrong password (api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "yvdgvd@efg.grt", password: "DgrQ23dsfgs" })
        })

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toStrictEqual('Invalid email or password. Please try again with the correct credentials');
    })
})

describe("POST api test, wrong password (api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "yvdgvd@efg.grt", password: "DgrQ23dsfgs" })
        })

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toStrictEqual('Invalid email or password. Please try again with the correct credentials');
    })
})


describe("POST api test, wrong password, limit (api/signin)", () => {
    test("", async () => {
        const res = await fetch('http://localhost:80/api/signin', {
            method: "POST",
            headers: "",
            body: JSON.stringify({ email: "yvdgvd@efg.grt", password: "DgrQ23dsfgs" })
        })

        const resJson = await res.json() as {error: string};
        expect(resJson.error).toStrictEqual('Too many login attempts');
    })
})
