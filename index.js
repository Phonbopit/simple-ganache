const { Wallet, providers, utils } = require("ethers");

require("dotenv").config();

async function main() {
  // Ganache RPC URL
  const url = "http://127.0.0.1:7545";

  const provider = new providers.JsonRpcProvider(url);

  const privateKey = process.env.PRIVATE_KEY;

  // Connect wallet instance to a provider.
  const wallet = new Wallet(privateKey, provider);

  const first = provider.getSigner(0);
  const firstAddress = await first.getAddress();

  const signer1 = provider.getSigner(1);
  const signerAddress = await signer1.getAddress();
  const walletBalance = await wallet.getBalance();

  console.log("walletBalance : ", walletBalance);
  console.log("signer address", signerAddress);

  console.log("balance", utils.formatEther(walletBalance));

  const tx = await wallet.sendTransaction({
    to: signerAddress,
    value: utils.parseEther("0.1"),
  });

  const response = await tx.wait();

  console.log("hash", response.transactionHash);

  // provider.on("pending", (tx) => {
  //   console.log("tx", tx);
  // });
}

main()
  .then(() => {})
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
