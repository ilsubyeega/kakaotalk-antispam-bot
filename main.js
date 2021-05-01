const NodeKakao = require('node-kakao');
const login = require("./login.js");

const register_user = require("./events/user.js");
const register_common = require("./events/common.js");

const config = require("./config.js");

async function main(){
    const client = new NodeKakao.TalkClient();
    const logindata = await login();
    
    const shouldkickarr = new Array();

    register_user(client, shouldkickarr);
    register_common(client);

    const res = await client.login(logindata);
    if (!res.success) throw new Error(`Login failed with status: ${res.status}`);

    console.log(`Login success, ID: ${client.clientUser.userId}`);
}
main().then();