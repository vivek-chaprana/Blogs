<!-- PROJECT LOGO -->
<p align="center">
  <a href="https://nxtblogs.vercel.app">
   <img src="https://github.com/vivek-chaprana/Blogs/blob/main/public/cover.svg" alt="Logo">
  </a>

  <h3 align="center">NextBlogs</h3>

  <p align="center">
    Discover stories, thinking, and expertise from writers on any topic.
    <br />
    <a href="https://github.com/vivekchaprana/blogs"><strong>Learn more »</strong></a>
  </p>
</p>

## About the Project

NextBlogs is a platform where you can read and write blogs on any topic.
It is built using Next.js, Tailwind CSS, Prisma, and MongoDB, has a powerful rich text editor powered by TipTap and secured by next-auth.

### Features

- NextBlogs is a platform where you can read and write blogs on any topic, having basic feature likes creating, sharing, editing and reading blogs. It also supports features like follow, like, comment, share, and more.

- Progressive Web App :
  Next Blogs is a PWA, which means you can install it on your device and use it offline when you don't have an internet connection. It also supports push notifications even when offline using the service workers and provides native app-like experience.

- Rich Text Editor :
  NextBlogs uses TipTap, a headless editor for Vue.js and React. Using this we created a fast, easy to use and customizable rich text editor for writing blogs. Supporting features like : Embeding youtube videos, images, adding links, color, highlight, and many more.

- Authentication :
  NextBlogs uses next-auth for authentication. It supports multiple authentication providers like Google and GitHub. It also supports email and password authentication. Have functionality like forgot password, email verification, and more.

- SEO :
  Built with SEO in mind, NextBlogs supports meta tags, open graph tags, and twitter cards for better SEO. By default, it uses the title and description of the blog for meta tags. It also supports custom meta tags.

- Performance :
  NextBlogs is built with performance in mind. Having a score of near perfect in almost all performance metrics. It uses concepts like code splitting, lazy loading, and more to improve performance.

- Design :
  NextBlogs is designed with a minimalistic approach. It uses Tailwind CSS for styling and has a clean and minimalistic design.

### Built With

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [next-auth](https://next-auth.js.org/)
- [TipTap](https://www.tiptap.dev/)

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

Here is what you need to be able to run this project

- Node.js
- MongoDB
- Yarn (recommended)

### Setup

1. Clone the repository

```sh
git clone https://github.com/vivek-chaprana/Blogs.git
```

2. Go to the project directory

```sh
cd blogs
```

3. Install the dependencies using yarn or npm (recommended yarn)

```sh
yarn install
```

4. Setup the `.env` file:

   - Duplicate the `.env.example` to `.env`
   - Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the `.env` file.
   - Add the MongoDB connection string under `DATABASE_URL` in the `.env` file. You can use [MongoDB Atlas](https://www.mongodb.com/atlas/database) or a local MongoDB instance.
   - Use `npx web-push generate-vapid-keys` to generate VAPID keys and add them under `NEXT_PUBLIC_PUSH_NOTIFICATION_PUBLIC_KEY` and `PUSH_NOTIFICATION_PRIVATE_KEY` in the `.env` file.
   - Add the SMTP details under `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` in the `.env` file.
   - For auth providers follow the [next-auth](https://next-auth.js.org/providers) documentation.

5. Generate the Prisma client

```sh
    prisma generate
```

6. Push the Prisma schema to the database

```sh
    prisma db push
```

7. Run the project

   - Development

   ```sh
       yarn dev
   ```

   - Production

   ```sh
       yarn build && yarn start
   ```

8. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
