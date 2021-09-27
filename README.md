# Chat client implementation build on top of React

This project provides a simple interface that allows user to authenticate and exchange messages through chat servers build with Socket IO.

The application doesn't offer a proper authentication against a remote authority and for the moment is using hard coded credentials validated in the UI side:

- `Client #1`: **chatclient#1/somesecretcode#1**
- `Client #2`: **chatclient#2/somesecretcode#2**

## Structure

The application uses React and Redux and the project structure shows it clearly were we have separate folders for `actions`, `reducers`, and `selectors`. Reusable business logic is added under `services` folder (functionality related with authentication and Socket IO) and all React based components are created in `components` folder. 

Project uses SASS and the main entry point for importing all stylesheets is `styles/main.scss`.

## Install instructions

Project uses `yarn` as a package manager and before working in the project make sure you have it installed.

To start with local setup we need initially to install project dependencies:

```
yarn install
```

After that we just need to start the local development server:

```
yarn start
```

Now we are ready to work and test application locally.

To create minified assets and prepare build for production deployment we need to run (which creates `build` folder):

```
yarn build
```

## Google API Key

To implement Map Widget we are using Google Map API and for the service to work properly we need to define a valid key so the map is rendered correctly. For this to work you can create `.env` file in the root folder and define `REACT_APP_GOOGLE_API_KEY` environment variable with the key that will be provided to map service.
