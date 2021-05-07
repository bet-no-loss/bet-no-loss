// Load config variables from .env file
require('dotenv').config()

const path             = require("path");
const fs               = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');

/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */


module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
  // Where to store the contracts' ABI
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    ganache: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "5777",       // Any network (default: none)
    },
    ropsten: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase:      `${process.env.MNEMONIC}`
        },
        providerOrUrl: `https://ropsten.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        chainId: 3
      }),
      network_id:    3,       // Ropsten's id
      gas:           5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2,       // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,     // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun:    true     // Skip dry run before migrations? (default: false for public nets )
    },
    rinkeby: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase:      `${process.env.MNEMONIC}`
        },
        providerOrUrl: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        chainId: 4
      }),
      network_id:    4,       // Rinkeby's id
      gas:           5500000, // Q) Does Rinkeby has a lower block limit than mainnet?
      confirmations: 2,       // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,     // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun:    true     // Skip dry run before migrations? (default: false for public nets )
    }
  },
  plugins: [
    'solidity-coverage'
  ],
  api_keys: {
    etherscan: `${process.env.ETHERSCAN_API_KEY}`
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      currency: 'USD',
      enabled: process.env.GAS_REPORT ? true: false,
      coinmarketcap: `${process.env.COINMARKETCAP_API_KEY}`,
      excludeContracts: [
        'Migrations'
      ],
      src: "contracts"
    }
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
      // evmVersion: "instambul"  // default is "istambul"
      }
    }
  }
};
