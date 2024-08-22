import { DEFAULT_SOL_ADDRESS, DEFAULT_SOL_AMOUNT } from "@/lib/constants";
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

// Define headers for the response
const headers = createActionHeaders();

// Handle GET requests
export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { toPubkey } = validatedQueryParams(requestUrl);

    const baseHref = new URL(
      `/api/actions/transfer-sol?to=${toPubkey.toBase58()}`,
      requestUrl.origin
    ).toString();

    const payload: ActionGetResponse = {
      title: "Actions Example - Transfer Native SOL",
      icon: new URL("/send-image.png", requestUrl.origin).toString(),
      description: `Transfer SOL to ${DEFAULT_SOL_ADDRESS.toBase58()}`,
      label: "Transfer",
      links: {
        actions: [
          {
            label: "Send 1 SOL",
            href: `${baseHref}&amount=${"1"}`,
          },
          {
            label: "Send 5 SOL",
            href: `${baseHref}&amount=${"5"}`,
          },
          {
            label: "Send 10 SOL",
            href: `${baseHref}&amount=${"10"}`,
          },
          {
            label: "Send SOL",
            href: `${baseHref}&amount={amount}`,
            parameters: [
              {
                name: "amount",
                label: "Enter the amount of SOL to send",
                required: false,
              },
            ],
          },
        ],
      },
    };

    return new Response(JSON.stringify(payload), { headers });
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

    const connection = new Connection(clusterApiUrl("devnet"));

    const minimumBalance = await connection.getMinimumBalanceForRentExemption(0);
    if (amount * LAMPORTS_PER_SOL < minimumBalance) {
      throw new Error(`Account may not be rent exempt: ${toPubkey.toBase58()}`);
    }

    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: toPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    });

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    const transaction = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight,
    }).add(transferSolInstruction);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Send ${amount} SOL to ${toPubkey.toBase58()}`,
      },
    });

    return new Response(JSON.stringify(payload), { headers });
  } catch (err) {
    console.error(err);
    const message = typeof err === "string" ? err : "An unknown error occurred";
    return new Response(message, {
      status: 400,
      headers,
    });
  }
};

// Validate and extract query parameters
function validatedQueryParams(requestUrl: URL) {
  let toPubkey: PublicKey = DEFAULT_SOL_ADDRESS;
  let amount: number = DEFAULT_SOL_AMOUNT;

  try {
    if (requestUrl.searchParams.has("to")) {
      toPubkey = new PublicKey(requestUrl.searchParams.get("to")!);
    }
  } catch {
    throw "Invalid input query parameter: to";
  }

  try {
    if (requestUrl.searchParams.has("amount")) {
      amount = parseFloat(requestUrl.searchParams.get("amount")!);
    }

    if (isNaN(amount) || amount <= 0) throw "Amount is invalid";
  } catch {
    throw "Invalid input query parameter: amount";
  }

  return {
    amount,
    toPubkey,
  };
}
