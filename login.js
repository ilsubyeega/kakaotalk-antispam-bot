// 이 코드 개같은건데 작동은 하니까 걍 두셈; 그냥 초반에 로그인할때 필요함

const NodeKakao = require("node-kakao");
const { AuthApiClient, KnownAuthStatusCode } = NodeKakao;
const config = require("./config.js");
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
const question = (str) => new Promise(resolve => rl.question(str, resolve));
module.exports = async function login() {
    const api = await AuthApiClient.create("KT-ANTISPAM", config.device);
    const login_request = await api.login(config.login);

    if (login_request.success) {
        return login_request.result;
    } else if (login_request.status === KnownAuthStatusCode.DEVICE_NOT_REGISTERED){
        // request request passcode
        const passcode_req = await api.requestPasscode(config.login);
        if (!passcode_req.success) throw new Error(`Requesting passcord from kakaotalk failed with this status: ${passcode_req.status}`);
        
        console.log("We requested passcord to kakaotalk, Please enter it");
        let pw = await question("Enter the passcord: ");
        
        
        console.log(pw);
        const registeration_req = await api.registerDevice(config.login, pw, true);
        if (!registeration_req.success) throw new Error(`Device registration failed with status: ${registeration_req.status}`);
        console.log("Registered this Device!");
        
       return await login();

    } else {
        throw new Error(`Kakaotalk login failed with this code: ${login_request.status}`);
    }
}
