# TikTok Clone

This repository tries to replicate the functionality of TikTok. A user can view videos, like them, share them and upload them.
The backend heavily relies on Google Firebase (Authentication, Firestore Database, Storage).

### Current limitations
- the ID of **every** uploaded video is fetched, when the page is loaded, this could lead to serious performance issues
- the functions, which are interacting with the Firebase API are not being tested, however the Firebase Emulator is setup