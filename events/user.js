const NodeKakao = require("node-kakao");

const unix = () => Math.floor(new Date().getTime() / 1000);

/**
 * @param {NodeKakao.TalkClient} client TalkClient
 * @param {Array} shouldkickarr Array
 */
module.exports = function register_events(client, shouldkickarr) {

    client.on('user_join', (joinLog, channel, user, feed) => {
        const clientInfo = channel.getUserInfo(channel.clientUser);
        if (clientInfo != null && (clientInfo.perm == 1 || clientInfo.perm == 4 || clientInfo.perm == 8)) {

            console.log(`[JOIN] ${user.nickname} (${user.userId})님이 ${channel.getDisplayName()} (${channel.channelId})에 입장하셨습니다.`)

            shouldkickarr.push({
                channelId: channel.channelId,
                userId: user.userId,
                joinDate: unix()
            })

        }
    });

    client.on('user_left', (leftLog, channel, user, feed) => {

        const clientInfo = channel.getUserInfo(channel.clientUser);
        if (clientInfo != null && (clientInfo.perm == 1 || clientInfo.perm == 4 || clientInfo.perm == 8)) {

            console.log(`[QUIT] ${user.nickname} (${user.userId})님이 ${channel.getDisplayName()} (${channel.linkId})에 퇴장하셨습니다.`)

            const arrayindex = shouldkickarr.findIndex(a => a.channelId.eq(channel.channelId) && a.userId.eq(user.userId));
            if (arrayindex != -1) shouldkickarr.splice(arrayindex, 1);
            
        }

    });

    client.on('chat', (data, channel) => {

        const clientInfo = channel.getUserInfo(channel.clientUser);

        if (clientInfo != null && (clientInfo.perm == 1 || clientInfo.perm == 4 || clientInfo.perm == 8)) {
            const arrayindex = shouldkickarr.findIndex(a => a.channelId.eq(channel.channelId) && a.userId.eq(data.chat.sender.userId));
            if (arrayindex != -1) {
                shouldkickarr.splice(arrayindex, 1);
            }
            
        }

    });


    const TIME_TO_KICK = 60 * 10; // 초 단위

    setInterval(() => {

        console.log(`[TIME] ${unix()} ${new Date()}`);
        shouldkickarr.forEach(a =>
            console.log(`[LIST] ${a.userId} : ${a.joinDate} (${a.joinDate - unix() + TIME_TO_KICK})`)
        )
        /*if (shouldkickarr.length > 0)
            console.log(`[CONT] 10분 지난 사람들: ${shouldkickarr.filter(a => a.joinDate + TIME_TO_KICK < unix()).length}`);
        */

        const shouldkick = shouldkickarr.filter(a => a.joinDate + TIME_TO_KICK < unix());
        for (const a of shouldkick) {
            shouldkickarr.splice(shouldkickarr.indexOf(a), 1);

            var channel = client.channelList.get(a.channelId);
            if (channel == null) {
                console.log(`[WARN] ${a.userId}를 강퇴할수 없었습니다: ${a.channelId} 채널을 못 찾았습니다.`);
                continue;
            }

            channel.kickUser({
                userId: a.userId
            });

            console.log(`[BAN!] ${a.userId}를 ${channel.getDisplayName()} (${a.channelId}) 채널에서 강퇴하였습니다.`);
        }

    }, 1000 * 10)
}