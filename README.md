## Configure Environment

The file from where the project will retrieve its environment variables should be called `.env` in root directory
The content for the .env config is the following:
```
REACT_APP_PLAYER_DATA_INTERVAL=10
REACT_APP_GAMES_DATA_INTERVAL=10
REACT_APP_LIVE_GAMES_GROUP_ORDER=["Roulette", "Blackjack","UnlimitedBlackjackSP","UnlimitedBlackjackMP", "AndarBahar", "TeenPatti", "TeenPattiFaceOff", "Baccarat", "DragonTiger"]
```
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Serving React Build Locally

If you want to serve build locally you could use `serve`(to do so first use build script).
In your terminal, run the following command:

```
yarn global add serve
```

Then assuming you're inside your project directory. You'd run a command like this:

```
serve build
```