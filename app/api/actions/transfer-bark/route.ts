import { NextRequest, NextResponse } from 'next/server';
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { z } from 'zod';

// Define the connection to the Solana network
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// Schema validation for request data
const transferBarkSchema = z.object({
  recipientAddress: z.string().nonempty().refine(val => {
    try {
      new PublicKey(val);
      return true;
    } catch {
      return false;
    }
  }, 'Invalid recipient address'),
  amount: z.number().positive().min(0.01).max(1e6, 'Amount too large'), // Adjust max based on requirements
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request data
    const data = await request.json();
    const parsedData = transferBarkSchema.parse(data);

    const { recipientAddress, amount } = parsedData;
    const recipientPublicKey = new PublicKey(recipientAddress);

    // Replace with your actual payer keypair management
    const payer = Keypair.fromSecretKey(new Uint8Array(process.env.PAYER_SECRET_KEY)); 

    // Define the mint address for BARK tokens
    const mintAddress = new PublicKey("2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg");
    const token = new Token(connection, mintAddress, TOKEN_PROGRAM_ID, payer);

    // Create or get associated token accounts for payer and recipient
    const payerTokenAccount = await token.getOrCreateAssociatedAccountInfo(payer.publicKey);
    const recipientTokenAccount = await token.getOrCreateAssociatedAccountInfo(recipientPublicKey);

    // Create the transfer transaction
    const transaction = new Transaction().add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        payerTokenAccount.address,
        recipientTokenAccount.address,
        payer.publicKey,
        [],
        amount * Math.pow(10, await token.getMintInfo()).decimals // Convert to base units based on token decimals
      )
    );

    // Sign and send the transaction
    const signature = await connection.sendTransaction(transaction, [payer], { skipPreflight: false, preflightCommitment: "confirmed" });
    await connection.confirmTransaction(signature);

    return NextResponse.json({ success: true, transactionId: signature });
  } catch (error) {
    console.error("Error transferring BARK tokens:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
