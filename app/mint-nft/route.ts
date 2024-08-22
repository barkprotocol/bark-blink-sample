import { NextResponse } from "next/server";
import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { createMint, mintTo, createAssociatedTokenAccount, getOrCreateAssociatedTokenAccount, Token } from "@solana/spl-token";

// Define the network you are connecting to
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// Example minting function
async function mintNFT() {
  // Generate a new keypair for the mint account and the payer
  const mint = Keypair.generate();
  const payer = Keypair.generate();

  // Define the NFT metadata (for demonstration purposes only)
  const metadata = {
    uri: "https://example.com/metadata.json",
    name: "Example NFT",
    symbol: "",
    seller_fee_basis_points: 500, // 5% fee
    creators: [
      {
        address: "YourPublicKeyHere", // Replace with your public key
        share: 100, // 100% ownership
      },
    ],
  };

  // Create the mint account
  const mintToken = await Token.createMint(
    connection,
    payer, // Payer keypair
    payer.publicKey, // Mint authority
    null, // Freeze authority (optional)
    0, // Number of decimal places for the token
    "Token Program ID" // Replace with the SPL Token Program ID
  );

  // Create an associated token account for the payer
  const payerTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(payer.publicKey);

  // Mint 1 token to the payer's associated token account
  const transaction = new Transaction().add(
    mintToken.createMintToInstruction(
      mint.publicKey,
      payerTokenAccount.address,
      payer.publicKey, // Mint authority
      1e9 // Amount to mint (in base units, e.g., 1 token)
    )
  );

  // Sign and send the transaction
  const signature = await connection.sendTransaction(transaction, [payer], { skipPreflight: false, preflightCommitment: "confirmed" });
  await connection.confirmTransaction(signature);

  return { success: true, mintPublicKey: mint.publicKey.toBase58() };
}

export async function GET(request: Request) {
  try {
    const result = await mintNFT();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error minting NFT:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
