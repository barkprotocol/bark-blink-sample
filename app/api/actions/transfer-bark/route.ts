import { DEFAULT_BARK_ADDRESS, DEFAULT_BARK_AMOUNT } from "@/lib/constants";
import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const headers = createActionHeaders();

// Handle GET requests
export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { toPubkey } = validatedQueryParams(requestUrl);

    const baseHref = new URL(
      `/api/transfer-bark?to=${toPubkey.toBase58()}`,
      requestUrl.origin
    ).toString();

    const payload: ActionGetResponse = {
      title: "Transfer BARK",
      icon: new URL("/send-image.png", requestUrl.origin).toString(),
      description: `Transfer BARK to ${DEFAULT_BARK_ADDRESS.toBase58()}`,
      label: "Transfer",
      links: {
        actions: [
          {
            label: "Send 1 BARK",
            href: `${baseHref}&amount=${"1"}`,
          },
          {
            label: "Send 10 BARK",
            href: `${baseHref}&amount=${"10"}`,
          },
          {
            label: "Send 100 BARK",
            href: `${baseHref}&amount=${"100"}`,
          },
          {
            label: "Send BARK",
            href: `${baseHref}&amount={amount}`,
            parameters: [
              {
                name: "amount",
                label: "Enter the amount of BARK to send",
                required: true,
              },
            ],
          },
        ],
      },
    };

    return new Response(JSON.stringify(payload), {
      headers,
    });
  } catch (err) {
    console.error(err);
    const message = typeof err === "string" ? err : "An unknown error occurred";
    return new Response(message, {
      status: 400,
      headers,
    });
  }
};

// Handle OPTIONS requests
export const OPTIONS = async (req: Request) => {
  return new Response(null, { headers });
};

// Handle POST requests
export const POST = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { amount, toPubkey } = validatedQueryParams(requestUrl);

    const body: ActionPostRequest = await req.json();
    let account: PublicKey;

    try {
      account = new PublicKey(body.account);
    } catch (err) {
      return new Response('Invalid "account" provided', {
        status: 400,
        headers,
      });
    }

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Ensure the account has sufficient balance and is rent exempt
    const minimumBalance = await connection.getMinimumBalanceForRentExemption(0);
    const accountBalance = await connection.getBalance(account);

    if (accountBalance < minimumBalance) {
      throw new Error(`Account may not be rent exempt: ${account.toBase58()}`);
    }

    // Create the transaction instruction for transferring BARK
    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: toPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    });

    // Get the latest blockhash and create a transaction
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    const transaction = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight,
    }).add(transferSolInstruction);

    // Sign the transaction (requires private key in a real implementation)
    // transaction.sign(account);

    // Create and return the action post response
    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Send ${amount} BARK to ${toPubkey.toBase58()}`,
      },
    });

    return new Response(JSON.stringify(payload), {
      headers,
    });
  } catch (err) {
    console.error(err);
    const message = typeof err === "string" ? err : "An unknown error occurred";
    return new Response(message, {
      status: 400,
      headers,
    });
  }
};

// Validate and parse query parameters
function validatedQueryParams(requestUrl: URL) {
  let toPubkey: PublicKey = DEFAULT_BARK_ADDRESS;
  let amount: number = DEFAULT_BARK_AMOUNT;

  try {
    const toParam = requestUrl.searchParams.get("to");
    if (toParam) {
      toPubkey = new PublicKey(toParam);
    } else {
      throw new Error("Missing 'to' parameter");
    }
  } catch (err) {
    throw new Error("Invalid input query parameter: to");
  }

  try {
    const amountParam = requestUrl.searchParams.get("amount");
    if (amountParam) {
      amount = parseFloat(amountParam);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Invalid or negative amount");
      }
    } else {
      throw new Error("Missing 'amount' parameter");
    }
  } catch (err) {
    throw new Error("Invalid input query parameter: amount");
  }

  return {
    amount,
    toPubkey,
  };
}
