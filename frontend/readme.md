
# Housekeeping Front End
Design and build a web application that has these requirements and functionalities:
1. Web Application with back-end in REST API (any language) + front-end in any Javascript framework.
2. Database back-end.
3. 3 main kinds of use types: User, Manager and Admin.
4. Admin can view all users, all, modify and delete users.
5. Manager can view users under their departments only.
6. Managers can only modify user's mobile number under their department.
7. Users can update their mobile number only.
8. All users are able to log in to the web app and see their relevant pages.
9. All actions of users should be logged for auditing purposes.

# Set Up
Edit `.env` to make sure that the API URL for the back end is correct. And make sure it ends with `/api`.

##### Running a Preview
Open a console and `cd` to the front end directory.
Run the `npm run preview` command.

##### Building the App
Open a console and `cd` to the front end directory.
Run the `npm run build` command.
The compiled codebase will be in the `build` folder.

The default log in details for admin will be: `admin@admin.com` and `password`.

# Dependencies

### React + Vite
During the first interview, there was a mention that most of the applications done at the company was jQuery, React and VueJS. With that in mind, I have decided to use the React framework along with the Vite build tool for easier setup.

To be frank, this is my very first time using React as I am a regular Svelte and VueJS user. The reason that I have avoided React to this point is ironically the dated way it handled reactivity as well as, of course JSX.

### TailwindCSS + DaisyUI
TailwindCSS for the flexibility of shipping a small CSS bundle to end-user as well as using DaisyUI for the pre-made UI components for rapid prototyping.

### Formik
As the documentation said: `Build forms in React, without the tears.`

### Axios
For the ability to finely tune requests that are sent to the back end API as well as familiarity with the library.
Also, it is more sensible than `fetch()`.