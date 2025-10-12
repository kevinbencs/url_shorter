import fetch from 'node-fetch';

interface failed{
  message: string
}

describe("Post api test, email error (/api/signup)", () => {
  test("Api test", async () => {
    const res = await fetch('http://localhost:80/api/signup',{
      method: 'POST',
      headers:"",
      body: JSON.stringify({
        email: "yvdgvd",
        password:"DgrQ23dsfgsdgsd",
        name: "Bel"
      })
    })
    const resJson = await res.json() as {failed: failed[]};
    const result = resJson.failed[0]
    expect(result.message).toStrictEqual( 'Email is required.')
  });
});

describe("Post api test, there is no uppercase character in password (/api/signup)", () => {
  test("Api test", async () => {
    const res = await fetch('http://localhost:80/api/signup',{
      method: 'POST',
      headers:"",
      body: JSON.stringify({
        email: "yvdgvd@ef.fe",
        password:"gr23dsfgsdgsd",
        name: "Bel"
      })
    })
    const resJson = await res.json() as {failed: failed[]};
    const result = resJson.failed[0]
    expect(result.message).toStrictEqual( 'Password must be at least 8 characters, and contain 1 uppercase, 1 lowercase and 1 number.')
  });
});

describe("Post api test, there is no lowercase character in password (/api/signup)", () => {
  test("Api test", async () => {
    const res = await fetch('http://localhost:80/api/signup',{
      method: 'POST',
      headers:"",
      body: JSON.stringify({
        email: "yvdgvd@ef.fe",
        password:"DFDQ23FDGD",
        name: "Bel"
      })
    })
    const resJson = await res.json() as {failed: failed[]};
    const result = resJson.failed[0]
    expect(result.message).toStrictEqual('Password must be at least 8 characters, and contain 1 uppercase, 1 lowercase and 1 number.')
  });
});

describe("Post api test, there is no number in password (/api/signup)", () => {
  test("Api test", async () => {
    const res = await fetch('http://localhost:80/api/signup',{
      method: 'POST',
      headers:"",
      body: JSON.stringify({
        email: "yvdgvd@fe.fe",
        password:"DgrQdsfgsdgsd",
        name: "Bel"
      })
    })
    const resJson = await res.json() as {failed: failed[]};
    const result = resJson.failed[0]
    expect(result.message).toStrictEqual('Password must be at least 8 characters, and contain 1 uppercase, 1 lowercase and 1 number.')
  });
});

describe("Post api test, password must be least at 8 character (/api/signup)", () => {
  test("Api test", async () => {
    const res = await fetch('http://localhost:80/api/signup',{
      method: 'POST',
      headers:"",
      body: JSON.stringify({
        email: "yvdgvd@fe.fe",
        password:"DgrQ23",
        name: "Bel"
      })
    })
    const resJson = await res.json() as {failed: failed[]};
    const result = resJson.failed[0]
    expect(result.message).toStrictEqual( 'Password must be at least 8 characters, and contain 1 uppercase, 1 lowercase and 1 number.')
  });
});

describe("Post api test, name error(/api/signup)", () => {
  test("Api test", async () => {
    const res = await fetch('http://localhost:80/api/signup',{
      method: 'POST',
      headers:"",
      body: JSON.stringify({
        email: "yvdgvd@efg.grt",
        password:"DgrQ23dsfgsdgsd",
        name: ""
      })
    })
    const resJson = await res.json() as {failed: failed[]};
    const result = resJson.failed[0]
    expect(result.message).toStrictEqual('Name is required')
  });
});



describe("Post api test, everything good (/api/signup)", () => {
  test("Api test", async () => {
    const res = await fetch('http://localhost:80/api/signup',{
      method: 'POST',
      headers:"",
      body: JSON.stringify({
        email: "yvdgvd@efg.grt",
        password:"DgrQ23dsfgsdgsd",
        name: "Bel"
      })
    })
    const resJson = await res.json() as {message: string};
    expect(resJson).toStrictEqual({ message: 'Signed up' })
  });
});



