# Programming assignment 2: Im website

## Introduction

**Im** is an image sharing website that allows user to upload/download images. Below technologies are used in this project.

- Client side: jQuery + Bootstrap + Fetch API
- Server side: Express

## Project Structural

```
.
├── apidoc										# Server APIs documentation
│   ├── css
│   ├── fonts
│   ├── img
│   ├── locales
│   ├── utils
│   └── vendor
│       ├── path-to-regexp
│       └── prettify
├── client										# Client side code
│   └── dist
│       ├── css
│       └── javascripts
│           ├── client_code						# Client side javascript codes
│           └── dependencies
└── server										# Server side code
    ├── entities								# business logic code
    ├── fake_data								# demonstration data
    ├── routers									# page routers
    └── uploads									# image upload folder
        ├── avatars
        └── publishes
```

## Setup

To start the server, navigate to the project root directory and run the following code in your terminal:

```
npm install # first time only
npm run start
```

Then open [localhost: 3000](http://localhost:3000) in the browser.

Two demo user accouts are:

> Username: DemoUser1
>
> Password: 123456
>
> Username: DemoUser2
>
> Password: 123

Other commands:

- Pretest: `npm run pretest` use eslint to evaluate code quality.
- Test: `npm run test` use jest to test server APIs.

