<p align="center">
<img src="https://socialify.git.ci/jkchisolm/twt-backend/image?language=1&name=1&owner=1&pattern=Signal&stargazers=1&theme=Auto" alt="twt-backend" width="640" height="320" />
</p>

<p align="center">
  A backend powering a Twitter clone.
</p>
<p align="center">
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/jkchisolm/twt-backend/main.yml">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/jkchisolm/twt-backend">
<img alt="Website" src="https://img.shields.io/website?label=API&url=https%3A%2F%2Ftwt-api.server.joshuachisolmserver.com">
</p>

# 🌐 Website - Currently in progress

## API Info

### Host

- [https://twt-api.server.joshuachisolmserver.com](https://twt-api.server.joshuachisolmserver.com) **[Primary]**

This is the repo containing the server for my Twitter clone.
To view the frontend code, check out the [frontend repo](https://www.github.com/frozenal/twt-frontend)

## Tech Stack

- **Server:** NestJS with Express
- **Database:** PostgreSQL
- **Web Server:** Hetzner Cloud VPS

## Setup

### 1. Docker Compose Setup **(Recommended)**

1. Open your CLI and clone the repo
   ```
    git clone https://github.com/jkchisolm/twt-backend.git
    cd twt-backend
   ```
2. Create a `.env` file following the example in `.env.example`
3. Run Docker Compose
   ```
    docker-compose up --build
   ```

### 2. Manual Setup

1. Install PostgreSQL if you do not already have it installed.
2. Open your CLI and clone the repo

   ```
    git clone https://github.com/jkchisolm/twt-backend.git
    cd twt-backend
   ```

3. Create a `.env` file following the format in `.env.example`
4. Install the required modules with `npm install`
5. Run the server with `npm run start`

## Contact Me

If you have any questions or concerns, contact me

- [My Website](https://www.joshauchisolm.com)
- [Twitter](https://www.twitter.com/frozenal)
