const { Card } = require('./card');
const { icons } = require('./icons');
const { makeBadge } = require('badge-maker');
const { downloadAvatar } = require('./weibo');

/**
 * 
 * @param {ServerResponse} res
 * @param {*} format
 */
function renderBadge(res, format) {
    const svg = makeBadge(format)
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
}

/**
 * @param {ServerResponse} res
 */
function renderError(res, message) {
    if (!message) {
        message = 'unknown';
    }

    renderBadge(res, {
        label: 'error',
        message: message,
        color: 'red'
    });
}

// 从 https://h5.sinaimg.cn/m/weibo-pro/js/app.330184fa.js 中找到的代码
// 太过分了，居然和接口返回的数据不一致
// 那只能对比了
// 金：1249819153
// 橘：1088413295
// 黄：1722883092
// 蓝：1750070171
function getVipSymbol(t) {
    if (!t.verified) {
        return "";
    }

    if (t.verified_type == 2) {
        return "vblue";
    }

    if (t.verified_level == 3) {
        if (t.verified_type_ext == 2) {
            return t.vvip ? "vgold" : "vorange";
        }

        return "vyellow";
    }

    return "";
}

async function renderUser(res, user) {
    const { id, screen_name, statuses_count, followers_count, avatar_large, verified_detail, friends_count, status_total_counter } = user;
    const card = new Card();
    card.setTitle(screen_name);
    card.setLink(`https://weibo.com/u/${id}`);

    const avatar_base64 = await downloadAvatar(avatar_large);
    card.setAvatar(avatar_base64);

    let verified_reason = '';
    if (verified_detail?.data) {
        verified_reason = verified_detail.data.map((v) => v.desc).join(' ');
    }
    card.setSubTitle(verified_reason);

    let vipSymbol = getVipSymbol(user);
    if (vipSymbol && icons.hasOwnProperty(vipSymbol)) {
        card.setIcon(icons[vipSymbol]);
    }

    card.addStat('粉丝', followers_count, `https://weibo.com/u/page/follow/${id}?relate=fans`);
    card.addStat('关注', friends_count, `https://weibo.com/u/page/follow/${id}?relate=`);
    card.addStat('转评赞', status_total_counter.total_cnt);
    card.addStat('微博数', statuses_count, `https://weibo.com/u/${id}?tabtype=feed`);

    let svg = card.render();
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
}

module.exports = { renderBadge, renderError, renderUser };