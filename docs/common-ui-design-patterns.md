# Common UI Design Patterns

Basic actions in PagerTree follow the same user interface patterns. For the sake of keeping documentation clear and concise below you will find instructions on how to create, update, and delete objects. When we say objects, we are referring to object in PagerTree such as [Alerts](alerts.md), [Teams](teams.md), [Integrations](integrations.md), ect.

If you do not see the buttons to perform any action it can be because any of the following:

* You do not have sufficient [permissions](users.md#roles) (role) to perform this action.
* Your [subscription](billing.md) does not support creating these types of objects.

### Creating an Object

To create objects:

1. Navigate to the Object collection page found in the navigation bar.
2.  In the upper right hand corner, click the **New Object** button.&#x20;

    <figure>![Create new object button](<.gitbook/assets/create-user-button.png>)<figcaption><p>Create New Object Button</p></figcaption></figure>
3. Enter the requested information, then click the **Create** button.
4. If the object was successfully created, you will be directed to the object page with a notice stating the "Record was successfully created". If there were errors, they will be displayed in red.

### Update an Object

To update objects:

1. Navigate to the Object collection page found in the navigation bar.
2.  From the table, find the object you are interested in updating. At the very end of the row (far right side), click **Actions -> Edit**.&#x20;

    <figure>![edit object button](<.gitbook/assets/edit-button.png>)<figcaption><p>Edit Object Button</p></figcaption></figure>
3. Change the information you would like to update, then click the **Update** button.
4. If the object was successfully updated, you will be directed to the object page with a notice stating the "Record was successfully updated". If there were errors, they will be displayed in red.

### Deleting Objects

To delete an object:

1. Navigate to the Object collection page found in the navigation bar.
2.  From the table, find the object you are interested in updating. At the very end of the row (far right side), click **Actions -> Delete**.&#x20;

    <figure>![delete object button](<.gitbook/assets/delete-button.png>)<figcaption><p>Delete Object Button</p></figcaption></figure>
3. If you are sure you would like to delete the object, click **Confirm**.
4. If the object was successfully deleted, you will be directed to the Object collection page with a notice stating the "Record was successfully destroyed". If there were errors, they will be displayed in red.

### Mass Actions on Objects

To perform mass actions on objects (ex: delete many objects at a time):

1. Navigate to the Object collection page found in the navigation bar.
2.  From the table, find the object(s) you are interested in performing actions on. Check the checkbox next to the object (left side of the ID).&#x20;

    <figure>![mass action checkbox](<.gitbook/assets/mass-action-checkbox.png>)<figcaption><p>Mass Action Checkbox</p></figcaption></figure>
3.  An action button will appear in the top-left corner of the table. Click **Action->\[Mass Action]**.&#x20;

    <figure>![mass action options](<.gitbook/assets/mass-action-options.png>)<figcaption><p>Mass Action Options</p></figcaption></figure>
4. If you are sure you would like to perform the mass action on the selected objects, click **Confirm**.
5. After the action, you will be directed to the object collection page with a notice stating of any success or errors.

### Form Hints

PagerTree is meant to be self documented. In most places, hover over the field in a form, and a hint will display with more details.

<figure>![self documenting form hints](<.gitbook/assets/form-hint.png>)<figcaption><p>Self documenting form hints.</p></figcaption></figure>
