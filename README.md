# TikTok Clone

This repository tries to replicate the functionality of TikTok. A user can view videos, like them, share them and upload them.
The backend heavily relies on Google Firebase (Authentication, Firestore Database, Storage).

## Table of Contents
- [Deployed links](#-globewithmeridians--deployed-links)
- [Features](#-sparkles--features)
- [Development](#-wrench--development)
- [Current limitations](#-warning--current-limitations)
- [Technology stack](#-bluebook--technology-stack)
- [License](#-scroll--license)

## :globe_with_meridians: Deployed links
The site is hosted with Google Firebase and can be reached through the following addresses:
- https://tiktok-clone-123456789.web.app/
- https://tiktok-clone-123456789.firebaseapp.com/

## :sparkles: Features
- user can upload/like videos after logged in
- currently viewed video is represented in link state
- user can edit his profile picture and username

## :wrench: Development
This section shows the steps to create a development environment for this application.

1. Clone the repository with `git clone git@github.com:martenmatrix/tiktok-clone.git`.
2. Install the dependencies with `npm install`.
3. Install the Firebase Command Line Interface Tools, if you haven't already.
4. Start emulating the backend with `firebase emulators:start`.
5. Run the application with `npm start`. It should open in your default browser.
6. Refresh the page.

> :bulb: If you want to change, how the start state of the application is emulated (videos uploaded, user logged in) change the code in ./src/firebase/createDevEnvironment.js

> :warning: When rules for Firebase were changed, they need to be deployed with `firebase deploy --only [service]:rules`

## :warning: Current limitations
- in createDevEnvironment.js videos are being imported for solely testing purposes, however they might also be imported in production
- the ID of **every** uploaded video is fetched, when the page is loaded, this could lead to serious performance issues
- the functions, which are interacting with the Firebase API are not being tested, however the Firebase Emulator is setup
- firebase rules are not being tested
- the firebase app object needs to be logged in the index file, otherwise auth, app, storage, db are undefined in my api functions, because initialization must be awaited (see usersettings page)
- blurring the site (opening login/register screen) while a video is playing, causes the site to lag because heavy calculations are required
- when updating the username or the profile picture race conditions could cause problems, maybe provide a signal to fetch requests (https://stackoverflow.com/questions/72431380/how-to-abort-a-batch-of-async-fetch-requests)
- project pictures, which are not used anymore, are not being deleted and stay in the database forever

## :blue_book: Technology Stack
- React with TypeScript, styled-components and React Router
- Testing Library for React
- Google Firebase

## :scroll: License
[MIT](https://github.com/martenmatrix/tiktok-clone/blob/main/LICENSE)