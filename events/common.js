const NodeKakao = require("node-kakao");

const login = require("../login.js");
/**
 * @param {NodeKakao.TalkClient} client TalkClient
 */
module.exports = function register_events(client) {
    client.on('error', (err) => {
        console.log(`client error!! err: ${err}`);
    });

    client.on('switch_server', async () => {
        console.log('Server switching requested.');
        const login_data = await login();
        const res = await client.login(login_data);
        if (!res.success) throw new Error(`Login failed with status: ${res.status}`);

        console.log("Login success");
    });

    client.on('disconnected', (reason) => {
        console.log(`Disconnected!! reason: ${reason}`);
    });
}