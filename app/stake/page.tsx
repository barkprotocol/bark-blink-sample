"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { stakeTokens } from '@/lib/solana'; // Adjust the import based on your actual path

type FormData = {
  amount: number;
};

const StakePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [staking, setStaking] = useState(false);
  const [stakeResult, setStakeResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setStaking(true);
    setError(null);
    try {
      const result = await stakeTokens(data.amount);
      if (result.success) {
        setStakeResult(result.transactionId); // Assuming the result contains a transaction ID
      } else {
        throw new Error(result.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError((err as Error).message || 'An error occurred while staking tokens.');
      console.error('Stake Error:', err); // Log error for debugging
    } finally {
      setStaking(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Stake Tokens</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount to Stake</label>
          <input
            id="amount"
            type="number"
            {...register('amount', { 
              required: 'Amount is required', 
              min: { value: 0.01, message: 'Minimum amount is 0.01' }
            })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
          />
          {errors.amount && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.amount.message}</p>}
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 rounded-md shadow-sm text-white dark:text-gray-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors ${staking ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary'}`}
          disabled={staking}
        >
          {staking ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4h4a8 8 0 01-8 8v-4z"></path>
              </svg>
              Staking...
            </span>
          ) : 'Stake Tokens'}
        </button>
      </form>
      {stakeResult && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-green-700 dark:text-green-300">Tokens Staked Successfully!</p>
          <p>
            Transaction ID: 
            <a 
              href={`https://solscan.io/tx/${stakeResult}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              {stakeResult}
            </a>
          </p>
        </div>
      )}
      {error && (
        <div className="mt-6 text-center text-red-600 dark:text-red-400">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default StakePage;
