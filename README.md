# kakaotalk-antispam-bot
Archived: [node-kakao가 지원 중단되었으며](https://github.com/storycraft/node-kakao/issues/812), 게시판에서 스팸이 올라오는 경우가 생각보다 적어져서 아카이브화합니다.

오픈챗방 스팸질때문에 만든 봇입니다.
`config_example.js`를 `config.js`로 이름 바꾸어서 사용하심 됩니다.

```
원리:
입장/퇴장시 유저들 list에 추가함 제거함
10초 간격으로 체크해서 10분 이상이면 강퇴함
아무거나 채팅 입력시 본인이 list에 있으면 list에서 제거됨
```

## 라이선스
MIT

## 팁
- device property 예시: `y/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
