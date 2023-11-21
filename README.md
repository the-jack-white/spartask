# SPARTASK

This project is part of a coding assessment

## Exercise

We need a new website to register our day-to-day TO DO Tasks accessing the website through a simple Login page.

When we aren’t signed in, we need to sign in using a user/password and create a fake request, you don’t need to do any network request. The fake request always returns a valid token, anything could be a token. After the sign-in, if the user closes the webpage and open it again the login should be persisted, this is important, save it in the best way you could.

Once the user is signed in, the website displays a text label with a button to add tasks, update tasks, mark as done, and remove tasks. If the user signs out and signs in again there aren’t going to be any tasks.

This project can be viewed at: [`https://spartask.vercel.app/`](https://spartask.vercel.app/)

## How the web app works.
1. A user is faced with a login screen, where they only need to provide their email and password (NOTE: there is no validation taking place, so feel free to enter anything you like).
2. Once the user has entered their details and clicked the login button, a `simulateFakeRequest` function will be called, so simulate an API response with an authToken. That token is then passed into a `simulateFakeRequestValidation` function, that will simulate an API request to validate that authToken, and will either return `true` or `false`. Depending on the validation, that will determine whether a user is then logged in or not.
3. A new User object is then created and the currentUser state is then updated. The validation is stored as an `isAuthenticated` cookie, and the User object is also stored in the localStorage. There is then a `useEffect` that first detects whether or not there is a user object in the localStorage and an `isAuthenticated` cookie to determine if the login state can be persisted.
4. Once logged in, a user can then go ahead and create new Tasks. All the tasks are pushed to an `allTasks` array, which is also stored in the localStorage. That way, tasks will also be persisted as long as the user logs in with the same credentials.
5. The userId is stored with each Task object. That way, only the tasks will render for the correct user. To test this, create a new user and add a few tasks, log out, log back in as a new user, create a few new tasks, log back in using the previous user's credentials and you will see the tasks specific to that user.
6. A user also has the ability to edit, delete and mark a task as done.

## NOTES:
- All the components and functions are unit tested with a coverage of no less than 85%.
- I've also used vanilla CSS instead of a framework or UI library.
- This project is of course not a production ready project and still, many improvements can be made. This project is just to demonstrate a working ReactJS project.
