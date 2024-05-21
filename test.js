const assert = require('assert');
const { renderUser, renderBadge } = require('./src/render');

// 测试数据
const user = {
    screen_name: '测试用户',
    statuses_count: 1012430,
    followers_count: "21412",
    friends_count: 300,
    status_total_counter: {
        total_cnt: 300
    },
    verified_detail: {
        data: [
            { desc: '2020-2022十大影响力互联网科技大V' },
            { desc: '微博2019十大电影大V评委' }
        ]
    },
    verified: true,
    verified_state: 0,
    verified_level: 3,
    verified_type: 0,
    verified_type_ext: 1,
    profile_image_url: 'https://tvax2.sinaimg.cn/crop.0.0.512.512.180/6923c793ly8gyan1lr4yxj20e80e8mzb.jpg?KID=imgbed,tva&Expires=1716212215&ssig=%2BDeYSD5xyp'
};

// 模拟响应对象
const userHandler = {
    setHeader: (name, value) => { },
    send: (body) => {
        console.log(body);

        // 验证SVG代码
        assert(body.includes('<svg'));
        assert(body.includes('转评赞'));
        assert(body.includes('微博数'));
        assert(body.includes('粉丝'));
        assert(body.includes('data:image/png;base64'));
    }
};

// 调用函数
renderUser(userHandler, user);

const badgeHandler = {
    setHeader: (name, value) => { },
    send: (body) => {
        console.log(body);

        // 验证SVG代码
        assert(body.includes('<svg'));
        assert(body.includes('测试'));
    }
};
renderBadge(badgeHandler, {
    label: "测试",
    message: String(user.followers_count),
    color: 'blue',
});

