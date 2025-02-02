import { LemmyHttp, Login} from "lemmy-js-client"
import { setCookie } from "cookies-next";

async function userLogin(username: string, password: string, baseUrl: string) {
    let client: LemmyHttp = new LemmyHttp(baseUrl);
    let loginForm: Login = {
        username_or_email: username,
        password: password
    }
    let jwt = (await client.login(loginForm)).jwt;
    if(!jwt) throw new Error("Login failed");
    return jwt;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const jwt = await userLogin(body.username, body.password, "https://lemmy.world");
        
        // TODO encrypt jwt
        const encryptedJwt = jwt;

        return new Response(JSON.stringify({ jwt: encryptedJwt }), { status: 200, headers: { 'Content-Type': 'application/json' } })


    } catch (e: any) {
        console.error(e);
        return new Response(JSON.stringify({ error: e }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}