# weibo-stats-badges

A Weibo stats badge for your GitHub profile.

## Usage

> 将 `uid` 替换为你的微博用户ID

### 微博

```markdown
![Weibo](https://weibo-stats-badges.vercel.app/api/user?uid=1763952531)
```

<details>
<summary>点击查看</summary>

![Weibo](https://weibo-stats-badges.vercel.app/api/user?uid=1763952531)

</details>

### 粉丝数

```markdown
![Weibo Followers Count](https://weibo-stats-badges.vercel.app/api/stats?uid=1763952531&stats=followers)
```

<details>
<summary>点击查看</summary>

![Weibo Followers Count](https://weibo-stats-badges.vercel.app/api/stats?uid=1763952531&stats=followers)

</details>

### 关注数

```markdown
![Weibo Followings Count](https://weibo-stats-badges.vercel.app/api/stats?uid=1763952531&stats=friends)
```

<details>
<summary>点击查看</summary>

![Weibo Followings Count](https://weibo-stats-badges.vercel.app/api/stats?uid=1763952531&stats=friends)

</details>

### 转评赞

```markdown
![Weibo Counts](https://weibo-stats-badges.vercel.app/api/stats?uid=1763952531&stats=counts)
```

<details>
<summary>点击查看</summary>

![Weibo Counts](https://weibo-stats-badges.vercel.app/api/stats?uid=1763952531&stats=counts)

</details>

### 发博数

```markdown
![Weibo Statuses Count](https://weibo-stats-badges.vercel.app/api/stats?uid=1763952531&stats=statuses)
```

<details>
<summary>点击查看</summary>

![Weibo Statuses Count](https://weibo-stats-badges.vercel.app/api/stats?uid=1763952531&stats=statuses)

</details>

## 发布

> [!IMPORTANT]
> 由于 Weibo OpenAPI 和 Vercel 都有限流，你需要自行申请Weibo开发者账号，并在Vercel中配置环境变量 `WEIBO_APP_KEY` 和 `WEIBO_ACCESS_TOKEN`，具体配置方法请参考[Weibo OpenAPI](https://open.weibo.com/)和[Vercel](https://vercel.com/docs/environment-variables)的官方文档。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/pythias/weibo-stats-badges)
