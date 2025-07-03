# Errors

PagerTree uses conventional HTTP response code to indicate the success or failure of an API request. In general: codes in the `2xx` range indicate success. Codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a wrongly formatted object, etc.). Codes in the `5xx` range indicate an error with PagerTree's servers (these are rare).

Most `4xx` errors that could be handled programmatically (e.g. a bad format) include and error response that briefly explains the error.

| Error Code | Meaning               | Description                                                                    |
| ---------- | --------------------- | ------------------------------------------------------------------------------ |
| 400        | Bad Request           | The request was unacceptable, often due to a syntax error.                     |
| 401        | Unauthorized          | A valid API key not provided.                                                  |
| 403        | Forbidden             | You don't have access to the resource requested.                               |
| 404        | Not Found             | The resource does not exist.                                                   |
| 409        | Conflict              | The request conflicts with another request (perhaps using the same id or key). |
| 422        | Unprocessable Entity  | The request was unacceptable, often due to a missing required parameter.       |
| 429        | Too Many Requests     | Too many request hit the API too quickly. We recommend an exponential backoff. |
| 500        | Internal Server Error | Something went wrong on PagerTree's servers. (These are rare.)                 |

## Handling Errors <a href="#handling-errors" id="handling-errors"></a>

When there is an error, PagerTree will respond with errors body to help you diagnose why the request failed. The errors body has the following format:

```json
{
  "errors": [
    {
        "message": "title can't be blank"
    },
  ],
  "code": 422
}
```
