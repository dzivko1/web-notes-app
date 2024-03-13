## Web development training project

### A simple note taking app

Frontend - Vite React TS

Backend - Node.js, Express

### 2 UI variants

#### Main branch

<img width="1776" alt="Screenshot 2024-02-21 at 13 36 40" src="https://github.com/dzivko1/web-notes-app/assets/24875568/63e1bc13-3698-49a3-ac5b-6de587d1f5aa">

#### Branch `UI_v1` (outdated)

<img width="1776" alt="Screenshot 2024-02-19 at 16 34 01" src="https://github.com/dzivko1/web-notes-app/assets/24875568/45f28a37-3074-4d75-8f0c-fced2e82cb8a">

## Running

The server needs a mongodb database available at `mongodb://localhost:27017`. Below is an example start command for a database located in the git-ignored `data` directory of the server project.

```
mongod --dbpath=note-app-server/data
```

To run the dev build locally, both server and client projects need to run their `dev` scripts.

```
npm run dev
```
