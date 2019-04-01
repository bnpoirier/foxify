# Foxify
Download and makes Chrome Web Store extensions compatible with Mozilla Firefox.

🚩 ***This project is still in developement.** The latest version is currently not online on [https://www.foxify.org](https://www.foxify.org).*

🚨 *This tool needs Firefox to allow installation of unsigned extension. Only **Firefox Nigthly** and **Firefox Developer Edition** accept this, but you need to go to **about:config** and change the **xpinstall.signatures.required** to **False***

## How to install it

- Clone the repository
- Copy/Paste the `env.example` and rename it to `.env`
- Install all the packages by doing an ``npm install``
- Run the server : `npm start`
- Open your browser and type `localhost:3000`

## Commands

| Command          | Description |
|------------------|-------------|
| `npm run watch`  | Build assets in development mode.
| `npm watch`      | Runs the server in development mode.
