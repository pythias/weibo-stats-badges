const axios = require('axios');

async function getWeiboUserInfo(uid) {
    const source = process.env.WEIBO_APP_KEY;
    const access_token = process.env.WEIBO_ACCESS_TOKEN;
    const response = await axios.get(`https://api.weibo.com/2/users/show.json?uid=${uid}&source=${source}&access_token=${access_token}`);
    return response.data;
}

async function getLastWeibo(uid) {
    const source = process.env.WEIBO_APP_KEY;
    const access_token = process.env.WEIBO_ACCESS_TOKEN;
    const response = await axios.get(`https://api.weibo.com/2/statuses/user_timeline.json?uid=${uid}&source=${source}&access_token=${access_token}`);
    return response.data;
}

async function downloadAvatar(url) {
    const base64 = await axios.get(url, {responseType: 'arraybuffer'}).then(response => Buffer.from(response.data, 'binary').toString('base64'));
    return "data:image/png;base64," + base64;
}

module.exports = { getWeiboUserInfo, getLastWeibo, downloadAvatar };