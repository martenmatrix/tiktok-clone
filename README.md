# TikTok Clone

This repository tries to replicate the functionality of TikTok. A user can view videos, like them, share them and upload them.
The backend heavily relies on Google Firebase (Authentication, Firestore Database, Storage).

### Development
This section shows the steps to create a development environment for this application.

1. Clone the repository with `git clone git@github.com:martenmatrix/tiktok-clone.git`.
2. Install the dependencies with `npm install`.
3. Install the Firebase Command Line Interface Tools, if you haven't already.
4. Start emulating the backend with `firebase emulators:start`.
5. Run the application with `npm start`. It should open in your default browser.
6. Refresh the page.

### Current limitations
- the ID of **every** uploaded video is fetched, when the page is loaded, this could lead to serious performance issues
- the functions, which are interacting with the Firebase API are not being tested, however the Firebase Emulator is setup
- firebase rules are not being tested
- the firebase app object needs to be logged in the index file, otherwise auth, app, storage, db are undefined in my api functions, because initialization must be awaited (see usersettings page)