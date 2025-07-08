# Broadcasts

## What is a Broadcast?

Broadcasts can notify many [account users](users.md) and/or [teams](teams.md) at once without triggering the [alert workflow](architecture-guide.md#alert-workflow).

To create a broadcast you must have the [admin or broadcaster role](users.md#roles).

### Tutorial Video

::video-youtube[PagerTree Broadcasts Tutorial Video (v4)]{#fxeJHh8_OeE}

## Response Options

You can request that account users respond to the broadcast.

From the broadcast form:

1. Check the **Response Requested checkbox**.
2. Select a time account users must respond by (give enough time to respond, but not too much time, 15m-3h).
3. Under the Response Options label:
   1. Click the **Add** button.
   2. Provide the text of the response option.
   3. Repeat for as many options as there needs to be.

:::info
Response options must be unique (case insensitive). You can reorder them by drag-n-drop (move up and down).
:::

<figure>![broadcast response options](<.gitbook/assets/broadcast-response-requested.png>)<figcaption><p>Broadcast Response Options</p></figcaption></figure>
