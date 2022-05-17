require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },

    rinkeby: {
      url: "https://rinkeby.infura.io/v3/5e70cb666ad54606a38e8cc1bbcb9b9d",
      accounts: [`0x2f9b68b08784f058737e3976898c3fa6d57c34059b9d50f1423ab6d03360a9f4`]
    }
    
    
  }
};

