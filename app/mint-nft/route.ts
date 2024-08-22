import { NextResponse } from 'next/server';
import { Connection, Keypair, PublicKey, Transaction, TransactionSignature } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, createMint, mintTo } from '@solana/spl-token';

// Environment variable for Solana network URL
const SOLANA_NETWORK_URL = process.env.SOLANA_NETWORK_URL || 'https://api.mainnet-beta.solana.com';
const connection = new Connection(SOLANA_NETWORK_URL, 'confirmed');

// Function to generate a new wallet (payer)
const generateWallet = (): Keypair => {
  return Keypair.generate();
};

// Function to create a new mint token
const createNewMint = async (payer: Keypair, decimals: number = 0): Promise<Token> => {
  const mint = Keypair.generate();
  const token = await Token.createMint(
    connection,
    payer,
    payer.publicKey,
    null, // Freeze authority (optional)
    decimals,
    TOKEN_PROGRAM_ID
  );
  return token;
};

// Function to create an associated token account for a wallet
const createAssociatedTokenAccount = async (
  payer: Keypair,
  mint: PublicKey,
  owner: PublicKey
) => {
  const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    owner,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  return associatedTokenAccount;
};

// Function to mint tokens to an associated token account
const mintTokens = async (
  payer: Keypair,
  mint: PublicKey,
  destination: PublicKey,
  amount: number
): Promise<TransactionSignature> => {
  const token = new Token(connection, mint, TOKEN_PROGRAM_ID, payer);
  const destinationTokenAccount = await token.getOrCreateAssociatedAccountInfo(destination);

  const transaction = new Transaction().add(
    token.createMintToInstruction(
      mint,
      destinationTokenAccount.address,
      payer.publicKey, // Mint authority
      amount
    )
  );

  const signature = await connection.sendTransaction(transaction, [payer], { skipPreflight: false, preflightCommitment: 'confirmed' });
  await connection.confirmTransaction(signature);
  return signature;
};

// API route handler
export async function POST(request: Request) {
  try {
    // Generate payer wallet
    const payer = generateWallet();

    // Create the mint token
    const token = await createNewMint(payer);

    // Create an associated token account for the payer
    const payerTokenAccount = await createAssociatedTokenAccount(payer, token.publicKey, payer.publicKey);

    // Mint 1 token to the payer's associated token account
    const signature = await mintTokens(payer, token.publicKey, payer.publicKey, 1e9); // 1 token (adjust amount as needed)

    return NextResponse.json({
      success: true,
      mintPublicKey: token.publicKey.toBase58(),
      signature
    });
  } catch (error) {
    console.error('Error minting NFT:', error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message || 'An error occurred while minting the NFT.'
    });
  }
}
