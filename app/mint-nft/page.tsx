"use client";

import { useState } from 'react';
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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setMinting(true);
    setError(null); // Reset previous errors

    try {
      const result = await mintNFT(data.metadataUri, data.name, data.symbol);
      setMintResult(result.mintPublicKey); // Assuming the result contains a mintPublicKey
    } catch (err) {
      setError((err as Error).message || 'An error occurred while minting the NFT.');
      console.error('Minting Error:', err); // Log error for debugging
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Mint an NFT</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <div>
          <label htmlFor="metadataUri" className="block text-sm font-medium">Metadata URI</label>
          <input
            id="metadataUri"
            type="text"
            {...register('metadataUri', { required: 'Metadata URI is required' })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:ring-primary focus:border-primary"
            aria-invalid={!!errors.metadataUri}
            aria-describedby="metadataUri-error"
          />
          {errors.metadataUri && (
            <p id="metadataUri-error" className="mt-2 text-sm text-red-400">{errors.metadataUri.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:ring-primary focus:border-primary"
            aria-invalid={!!errors.name}
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="symbol" className="block text-sm font-medium">Symbol</label>
          <input
            id="symbol"
            type="text"
            {...register('symbol', { required: 'Symbol is required' })}
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:ring-primary focus:border-primary"
            aria-invalid={!!errors.symbol}
            aria-describedby="symbol-error"
          />
          {errors.symbol && (
            <p id="symbol-error" className="mt-2 text-sm text-red-400">{errors.symbol.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors ${minting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'}`}
          disabled={minting}
        >
          {minting ? (
            <>
              Minting...
              {/* Optionally, you can add a spinner here */}
            </>
          ) : (
            'Mint NFT'
          )}
        </button>
      </form>
      {mintResult && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">NFT Minted Successfully!</p>
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
