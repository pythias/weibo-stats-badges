import { getWeiboUserInfo } from '../src/weibo.js';
import { renderError, renderUser } from '../src/render.js';
import { IncomingMessage, ServerResponse } from 'http';

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
export default async (req, res) => {
    const uid = req.query.uid;
    const userInfo = await getWeiboUserInfo(uid);
    if (userInfo.error) {
        renderError(res, 'api');
        return;
    }

    renderUser(res, userInfo);
};
