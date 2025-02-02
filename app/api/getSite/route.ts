import { LemmyHttp} from "lemmy-js-client"

export async function GET(req: Request) {
    try {

        // get params from Resuest
        let params = new URL(req.url).searchParams;
        
        let auth = params.get("auth");

        if(!auth) throw new Error("auth is required");

        let client: LemmyHttp = new LemmyHttp("https://lemmy.world");

        let site = await client.getSite({ 
            auth: auth as string, 
        });

        return new Response(JSON.stringify(site), { status: 200, headers: { 'Content-Type': 'application/json' } })

    } catch (e: any) {
        console.error(e);
        return new Response(JSON.stringify({ error: e }), { status: 500, headers: { 'Content-Type': 'application/json' } })
    }
}