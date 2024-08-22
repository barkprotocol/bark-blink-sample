import {
  DEFAULT_STAKE_AMOUNT,
  DEFAULT_VALIDATOR_VOTE_PUBKEY,
} from "@/lib/constants";
import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createActionHeaders,
  createPostResponse,
} from "@solana/actions";
import {
  Authorized,
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  StakeProgram,
  Transaction,
} from "@solana/web3.js";

const headers = createActionHeaders();

// Handle OPTIONS requests
export const OPTIONS = async () => {
  return new Response(null, { headers });
};

// Handle GET requests
export const GET = async (req: Request) => {
  const { validator, amount } = validateQueryParams(new URL(req.url));
  const baseHref = new URL(
    `/api/actions/stake?validator=${validator.toBase58()}`,
    new URL(req.url).origin
  ).toString();
  
  try {
    const payload: ActionGetResponse = {
      title: "Stake SOL",
      icon: new URL("/send-image.png", new URL(req.url).origin).toString(),
      label: "Stake your SOL",
      description: `Stake your SOL to the validator: ${validator.toBase58()}`,
      links: {
        actions: [
          {
            label: "Stake 1 SOL",
            href: `${baseHref}&amount=${"1"}`,
          },
          {
            label: "Stake 5 SOL",
            href: `${baseHref}&amount=${"5"}`,
          },
          {
            label: "Stake 10 SOL",
            href: `${baseHref}&amount=${"10"}`,
          },
          {
            label: "Stake SOL",
            href: `${baseHref}&amount={amount}`,
            parameters: [
              {
                name: "amount",
                label: "Enter the amount in SOL",
                required: false,
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
    let message = "An unknown error occurred";
    if (typeof err === "string") message = err;
    return new Response(message, {
      status: 400,
      headers,
    });
  }
};

// Handle POST requests
export const POST = async (req: Request) => {
  try {
    const { validator, amount } = validateQueryParams(new URL(req.url));
    const body: ActionPostRequest = await req.json();

    // Validate the account provided in the body
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

    // Check if the amount is valid and meets the minimum stake requirement
    const minStake = await connection.getStakeMinimumDelegation();
    if (amount < minStake.value / LAMPORTS_PER_SOL) {
      return new Response(`Stake amount must be greater than ${minStake.value / LAMPORTS_PER_SOL} SOL`, {
        status: 400,
        headers,
      });
    }

    // Generate a new keypair for the stake account
    const stakeKeyPair = Keypair.generate();

    // Create a transaction for staking SOL
    const transaction = new Transaction().add(
      // Instruction to create a new stake account
      StakeProgram.createAccount({
        stakePubkey: stakeKeyPair.publicKey,
        authorized: new Authorized(account, account),
        fromPubkey: account,
        lamports: 1 * LAMPORTS_PER_SOL, // The minimum balance for a stake account
      }),
      // Instruction to delegate the stake to the specified validator
      StakeProgram.delegate({
        authorizedPubkey: account,
        stakePubkey: stakeKeyPair.publicKey,
        votePubkey: validator,
      })
    );

    // Set transaction details
    transaction.feePayer = account;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    // Create the action post response
    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Stake ${amount} SOL to validator ${validator.toBase58()}`,
      },
      signers: [stakeKeyPair],
    });

    return new Response(JSON.stringify(payload), {
      headers,
    });
  } catch (err) {
    console.error(err);
    let message = "An unknown error occurred";
    if (typeof err === "string") message = err;
    return new Response(message, {
      status: 400,
      headers,
    });
  }
};

// Function to validate query parameters
function validateQueryParams(url: URL) {
  let validator = DEFAULT_VALIDATOR_VOTE_PUBKEY;
  let amount = DEFAULT_STAKE_AMOUNT;

  try {
    const validatorParam = url.searchParams.get("validator");
    if (validatorParam) {
      validator = new PublicKey(validatorParam);
    }
  } catch (err) {
    throw new Error("Invalid input query parameter: validator");
  }

  try {
    const amountParam = url.searchParams.get("amount");
    if (amountParam) {
      amount = parseFloat(amountParam);
    }
    if (amount <= 0) throw new Error("Invalid input query parameter: amount");
  } catch (err) {
    throw new Error("Invalid input query parameter: amount");
  }

  return { amount, validator };
}
