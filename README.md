# weibo-stats-badges

A Weibo stats badge for your GitHub profile.

## 发布

需要在 vercel 中配置环境变量 `WEIBO_APP_KEY` 和 `WEIBO_ACCESS_TOKEN`

## 使用

粉丝数

```markdown
![Weibo Followers Count](https://xyz.vercel.app/api/stats?uid=用户ID&stats=followers)
```

关注数

```markdown
![Weibo Followings Count](https://xyz.vercel.app/api/stats?uid=用户ID&stats=friends)
```

转评赞数

```markdown
![Weibo Counts](https://xyz.vercel.app/api/stats?uid=用户ID&stats=counts)
```

微博数

```markdown
![Weibo Statuses Count](https://xyz.vercel.app/api/stats?uid=用户ID&stats=statuses)
```

用户信息

```markdown
![Weibo](https://xyz.vercel.app/api/user??uid=用户ID)
```
