# Social Media App - Express Node Server

This repository contains the backend code for a social media application built using Node.js and Express. The server handles various functionalities required for the social media app "Qui."

Check out the React Native App - [Qui React Native App](https://github.com/ElSierra/Social-app-React-Native)

## Stack Used

- **Node.js**: A runtime environment that allows you to execute JavaScript code on the server side.
- **AWS S3**: Amazon S3 is cloud object storage with industry-leading scalability, data availability, security, and performance.
- **Express**: A fast and minimalist web application framework for Node.js, used to build robust APIs and web applications.
- **MongoDB**: A NoSQL database used to store user data, posts, and other relevant information.
- **Prisma**: An ORM library for the Database.
- **jsonwebtoken**: Used for creating and validating JSON Web Tokens (JWT) to handle user authentication and authorization.
- **bcrypt**: A library used for hashing passwords before storing them in the database to enhance security.
- **Multer**: Middleware for handling multipart/form-data, enabling file uploads.
- **cors**: Middleware to enable CORS (Cross-Origin Resource Sharing) and manage API access from different domains.
- **helmet**: Middleware to enhance the app's security by setting various HTTP headers.
- **morgan**: HTTP request logger middleware for Node.js, useful for debugging and monitoring incoming requests.
- **socket.io**: Socket.IO is an event-driven library for real-time web applications.
- **dotenv**: A zero-dependency module used to load environment variables from a .env file.
- **Nodemon**: A utility that monitors changes in your source code and automatically restarts the server.
- **Redis**: Redis is an open-source (BSD licensed), in-memory data structure store, used as a database, cache, and message broker.

## Getting Started

**NOTE**: `ffmpeg` must be installed on your machine.

1. Clone this repository: `git clone https://github.com/ElSierra/SocialApp-NodeJS`
2. Navigate to the project directory: `cd SocialApp-NodeJS`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory and set up your environment variables, such as database connection SECRET and DATABASE_URL (MongoDB Uri).
5. Run `npx prisma generate`
6. Run the server:
   - Running in Development - `npm run dev:prod`
   - Running in Production - `npm run start`, for production, a couple of environment variables need to be set up: "SPACES_NAME, SPACES_SECRET, SPACES_ENDPOINT, SPACES_KEY" which are required for "AWS S3," REDIS_PASSWORD, REDIS_HOST, REDIS_PORT.
7. The server will be running on `http://localhost:80` by default.

## API Endpoints

### Auth

- `/api/auth/login`: Endpoint for user login.
- `/api/auth/signup`: Endpoint for user signup.

### Services

- `/api/services/post`: Endpoint for creating a new post.
- `/api/services/all-posts`: Endpoint for retrieving all posts based on specific criteria.
- `/api/services/random-posts`: Endpoint for retrieving random posts.
- `/api/services/random-people`: Endpoint for retrieving random followers or users.
- `/api/services/search-posts`: Endpoint for searching posts based on certain criteria.
- `/api/services/search-people`: Endpoint for searching users based on certain criteria.
- `/api/services/upload-photos`: Endpoint for uploading photos as part of a post.
- `/api/services/upload-video`: Endpoint for uploading videos as part of a post.
- `/api/services/upload-audio`: Endpoint for uploading audio files as part of a post.
- `/api/services/follow`: Endpoint for following a user.
- `/api/services/unfollow`: Endpoint for unfollowing a user.
- `/api/services/like-post`: Endpoint for liking a post.
- `/api/services/post-comment`: Endpoint for posting a comment on a post.
- `/api/services/get-postComment`: Endpoint for retrieving comments on a post.
- `/api/services/followed-posts`: Endpoint for retrieving posts from users who are being followed.
- `/api/user/get-user`: Endpoint for retrieving user data.
- `/api/user/update-data`: Endpoint for updating user data.
- +++More

## Contributing

Contributions are welcome! If you find any bugs or want to add new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE)
