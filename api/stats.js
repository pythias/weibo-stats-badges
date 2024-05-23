const { getWeiboUserInfo } = require('../src/weibo');
const { renderError, renderBadge } = require('../src/render');
const { IncomingMessage, ServerResponse } = require('http');

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
module.exports = async (req, res) => {
    const stats = req.query.stats;
    const uid = req.query.uid;
    const label = req.query.label ? req.query.label : stats;
    const userInfo = await getWeiboUserInfo(uid);
    if (userInfo.error) {
        renderError(res, 'api');
        return;
    }

    let message = "";
    let color = "";
    switch (stats) {
        case 'statuses':
            message = String(userInfo.statuses_count);
            color = 'green';
            break;
        case 'followers':
            message = String(userInfo.followers_count);
            color = 'blue';
            break;
        case 'friends':
            message = String(userInfo.friends_count);
            color = 'orange';
            break;
        case 'counts':
            message = String(userInfo.status_total_counter.total_cnt);
            color = 'yellow';
            break;
        default:
            message = 'unknown key';
            color = 'red';
            break;
    }

    renderBadge(res, {
        label: label,
        message: message,
        color: color,
    })
};
