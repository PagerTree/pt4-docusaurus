# Authentication

The PagerTree API uses API keys to authenticate requests. You can view and manage your API keys on your [User Settings](https://app.pagertree.com/user/settings) page.

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

Use your API key by assigning it to the `Authorization` header. The format should be `Authorization: Bearer abc123`

All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.

```
curl https://api.pagertree.com/api/v4/alerts
-H "Accept: application/json"
-H "Authorization: Bearer abc123"
```

