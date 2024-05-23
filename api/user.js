const { getWeiboUserInfo } = require('../src/weibo');
const { renderError, renderUser } = require('../src/render');
const { IncomingMessage, ServerResponse } = require('http');

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
module.exports = async (req, res) => {
    const uid = req.query.uid;
    const userInfo = await getWeiboUserInfo(uid);
    if (userInfo.error) {
        renderError(res, 'api');
        return;
    }

    renderUser(res, userInfo);
};
