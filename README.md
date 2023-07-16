# React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Installation

First ensure you are in an empty directory.

Run the `unbox` command using 1 of 2 ways.

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
$ truffle unbox react
```

```sh
# Alternatively, run `truffle unbox` via npx
$ npx truffle unbox react
```

Start the react dev server.

```sh
$ cd client
$ npm start
```

The Truffle framework is currently configured to port number `8545` in `truffle-config.js`.
Please run `ganache` in the CLI to start the local blockchain on that port number.

Once the local blockchain has started, be sure to run `truffle migrate --network development` to deploy the smart contracts under `contracts` folder. The `development` network will point to Ganache.
