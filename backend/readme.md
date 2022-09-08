# Housekeeping Back End
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
Run `npm install` to install dependencies.

Edit the `.env` file to set the correct database details.

Upload `database.sql` into the relevant database.

No building is required, simply run `npm run serve`.

The default log in details for admin will be: `admin@admin.com` and `password`.

# Dependencies

###  Express
A standard web application framework used by many. It is industry proven and well documented. My familiarity with the framework also contributed in choosing it.

##### Why not *Fastify*?
Admittedly, Fastify beats Express handedly on their [first-party benchmarks](https://github.com/fastify/benchmarks/), which is a good thing. However, it is not as widely adopted as Express and the ecosystem is not as established.
Besides, for a low-traffic platform like a user management portal with more features for higher level management, it is not necessary to sacrifice proven processes.

### Argon2
Argon2 is the algorithm used to hash passwords. It is proven to be both computationally, memory, and (depending on the variant chosen) GPU-hard.

It is indeed slower than `Bcrypt` which is widely used right now, but the tradeoff is worth it in my opinion.

### Sequelize
An database ORM that I have chosen for familiarity.

### Passport, Passport-JWT and Passport-Local
An authentication middleware for Express. It allows for easy configuration of authenticating users along with an ecosystem of strategies that makes the application compatible with social log ins in the future.

##### Passport-JWT
Used to verify bearer tokens for the API.
##### Passport-Local
Used to authenticate users through email and password.

### Nodemon
Used to automatically restart the NodeJS application whenever a file change is detected. It is a time and life saver.