# React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Prerequisites

You will need to have the Truffle CLI installed. To do so run `npm install -g truffle`.

## Steps to run the project

1. Install the node modules under each folder; `truffle` and `client` by running the command `npm install`

2. Start the react dev server.

```sh
$ cd client
$ npm start
```

The Truffle framework is currently configured to port number `8545` in `truffle-config.js`.

3. Please run `ganache` in the CLI to start the local blockchain on that port number.

4. Once the local blockchain has started, be sure to run `truffle migrate --network development` to deploy the smart contracts under `contracts` folder. The `development` network will point to Ganache.

## Video Demo of the application
https://github.com/waitingonalice/Blockchain-signature-pad/assets/85215147/c7d03028-2e1c-4e2b-b1d4-c3ff6fbfc367

