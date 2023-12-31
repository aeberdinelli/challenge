# Take Home Engineering Challenge
## Setup
1. Install NodeJS and MongoDB
2. Update `.env.dev` with your desired settings and rename it to `.env`
3. Run `npm run build` and `npm start`
4. You can also run `npm run dev` to listen for changes and re-starting the app

## DB Setup
1. If you haven't already, create a database in your MongoDB server. If you wish to use the provided `.env.dev` file, you can call it `challenge` and rename the file to `.env`.
2. If you need to fill the DB with sample data (recommended), run `npm run import`.

## Stack
- **MongoDB** data was already a huge json so that helped importing everything more easily, also this allows me to add features on the go without having to change database structure
- **Mongoose** as ORM, because it is simple and provides built-in validation for input data
- **Typescript** because ❤️
- **Expressjs** again, simplicity and being flexible. The project didn't ask for that much of functionality so I just used the one I know the most

## Notes
- I tried to type absolutely everything, taking advantage of some useful TS stuff such as `keyof`, `Omit`, `Partial` and generics.
- I took the cities from the results and created a collection and endpoint to get them in order to use it in the frontend filters.

## About me
Check my other repos, I have some interesting stuff 🤓

https://github.com/aeberdinelli
