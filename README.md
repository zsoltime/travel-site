# Travel Site

> Simple HTML/CSS/Javascript travel site (with somewhat dated design) built using Babel, Gulp, PostCSS and Webpack

This is a travel site of Brad Shiff's ["Git a Web Developer Job: Mastering the Modern Workflow" Course](https://www.udemy.com/git-a-web-developer-job-mastering-the-modern-workflow/).

It was a nice refresher on Gulp, git, mobile first and responsive design. 😊

![Travel site](/preview.gif?raw=true&sanitize=true)

## Install and Build

You need to have either [`yarn`](https://yarnpkg.com/lang/en/docs/install/) or [`npm`](https://www.npmjs.com/) installed on your computer.

#### Clone this repo

```bash
git clone https://github.com/zsoltime/udemy-travel-site.git <new-folder-name>
cd <new-folder-name>
```

#### Install dependencies

```bash
yarn
# OR
npm install
```

#### Build production bundle

It builds the app to the `dist` folder. It creates the JavaScript bundle, uglifies JS, creates and minifies CSS, copies/optimizes images - ready to deploy.

```bash
yarn build
# OR
npm run build
```

#### Start dev server

It starts a BrowserSync server and refreshes page on changes. Open [http://localhost:3000](http://localhost:3000) to view it in browser.

```bash
yarn start
# OR
npm start
```
