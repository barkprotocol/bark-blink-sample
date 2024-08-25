"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PublicKey } from '@solana/web3.js'; // Import PublicKey for address validation
import { transferBark } from '@/lib/solana'; // Adjust the import based on your actual path

type FormData = {
  recipientAddress: string;
  amount: number;
};

const TransferBarkPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [transferring, setTransferring] = useState(false);
  const [transferResult, setTransferResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setTransferring(true);
    setError(null); // Reset previous errors

    try {
      const result = await transferBark(data.recipientAddress, data.amount);

      if (result.success) {
        setTransferResult(result.transactionId); // Assuming the result contains a transaction ID
      } else {
        throw new Error(result.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError((err as Error).message || 'An error occurred while transferring BARK tokens.');
      console.error('Transfer Error:', err); // Log error for debugging
    } finally {
      setTransferring(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Transfer BARK Tokens
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div>
          <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Recipient Address
          </label>
          <input
            id="recipientAddress"
            type="text"
            {...register('recipientAddress', { 
              required: 'Recipient address is required', 
              validate: (value) => {
                try {
                  new PublicKey(value); // Validate if address is a valid Solana PublicKey
                  return true;
                } catch {
                  return 'Invalid recipient address';
                }
              }
            })}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
            aria-invalid={!!errors.recipientAddress}
            aria-describedby="recipientAddress-error"
          />
          {errors.recipientAddress && (
            <p id="recipientAddress-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.recipientAddress.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Amount to Transfer
          </label>
          <input
            id="amount"
            type="number"
            {...register('amount', { 
              required: 'Amount is required', 
              min: { value: 0.01, message: 'Minimum amount is 0.01' }
            })}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
            aria-invalid={!!errors.amount}
            aria-describedby="amount-error"
          />
          {errors.amount && (
            <p id="amount-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.amount.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 rounded-md shadow-sm text-gray focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors ${
            transferring
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary'
          }`}
          disabled={transferring}
          aria-busy={transferring}
        >
          {transferring ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4h4a8 8 0 01-8 8v-4z"></path>
              </svg>
              Transferring...
            </span>
          ) : 'Transfer Tokens'}
        </button>
      </form>
      {transferResult && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-green-800 dark:text-green-100">
            Tokens Transferred Successfully!
          </p>
          <p>
            Transaction ID: 
            <a 
              href={`https://solscan.io/tx/${transferResult}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
              aria-label={`View transaction ${transferResult} on Solscan`}
            >
              {transferResult}
            </a>
          </p>
        </div>
      )}
      {error && (
        <div className="mt-6 text-center bg-red-900 border border-red-700 p-4 rounded-md text-red-100">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TransferBarkPage;
