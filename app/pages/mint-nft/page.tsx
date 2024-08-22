"use client";

import { useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { mintNFT } from '@/lib/solana'; // Adjust the import based on your actual path

type FormData = {
  metadataUri: string;
  name: string;
  symbol: string;
};

const MintNFTPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [minting, setMinting] = useState(false);
  const [mintResult, setMintResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = useCallback(async (data) => {
    setMinting(true);
    setError(null); // Reset previous errors

    try {
      const result = await mintNFT(data.metadataUri, data.name, data.symbol);

      if (result.success) {
        setMintResult(result.mintPublicKey); // Assuming the result contains a mintPublicKey
      } else {
        throw new Error(result.error || 'Unknown error occurred');
      }
    } catch (err) {
      setError((err as Error).message || 'An error occurred while minting the NFT.');
      console.error('Minting Error:', err); // Log error for debugging
    } finally {
      setMinting(false);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Mint an NFT</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div>
          <label htmlFor="metadataUri" className="block text-sm font-medium text-gray-300 dark:text-gray-200">Metadata URI</label>
          <input
            id="metadataUri"
            type="text"
            {...register('metadataUri', { required: 'Metadata URI is required' })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:ring-2 focus:ring-primary dark:border-gray-500"
            aria-invalid={!!errors.metadataUri}
            aria-describedby="metadataUri-error"
          />
          {errors.metadataUri && (
            <p id="metadataUri-error" className="mt-2 text-sm text-red-400 dark:text-red-300">{errors.metadataUri.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 dark:text-gray-200">Name</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:ring-2 focus:ring-primary dark:border-gray-500"
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm text-red-400 dark:text-red-300">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="symbol" className="block text-sm font-medium text-gray-300 dark:text-gray-200">Symbol</label>
          <input
            id="symbol"
            type="text"
            {...register('symbol', { required: 'Symbol is required' })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:ring-2 focus:ring-primary dark:border-gray-500"
            aria-invalid={!!errors.symbol}
            aria-describedby="symbol-error"
          />
          {errors.symbol && (
            <p id="symbol-error" className="mt-2 text-sm text-red-400 dark:text-red-300">{errors.symbol.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${minting ? 'bg-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
          disabled={minting}
        >
          {minting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4h4a8 8 0 01-8 8v-4z"></path>
              </svg>
              Minting...
            </span>
          ) : 'Mint NFT'}
        </button>
      </form>
      {mintResult && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-green-300">NFT Minted Successfully!</p>
          <p>
            Mint Public Key: 
            <a 
              href={`https://solscan.io/account/${mintResult}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              {mintResult}
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

export default MintNFTPage;
