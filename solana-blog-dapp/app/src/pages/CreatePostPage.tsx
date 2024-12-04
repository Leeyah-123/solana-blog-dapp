import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blog, IDL } from '../anchor/idl';

const CreatePostPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!publicKey) {
      setError('Please connect your wallet first');
      setLoading(false);
      return;
    }

    try {
      const provider = new anchor.AnchorProvider(
        connection,
        { publicKey, signTransaction } as anchor.Wallet,
        {
          commitment: 'confirmed',
        }
      );
      const program = new anchor.Program<Blog>(IDL as Blog, provider);

      // Generate a new keypair for the post
      const post = anchor.web3.Keypair.generate();

      // Call the create_post method
      await program.methods
        .createPost(title, content)
        .accounts({
          post: post.publicKey,
          author: publicKey,
        })
        .signers([post])
        .rpc();

      // Redirect to the blog list or the newly created post
      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Blog Post
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Post Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            maxLength={50}
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-700 font-bold mb-2"
          >
            Post Content
          </label>
          <textarea
            id="content"
            placeholder="Write your blog post content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            maxLength={500}
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-1">
            {content.length}/500 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !publicKey}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
        >
          {loading
            ? 'Publishing...'
            : publicKey
            ? 'Publish Post'
            : 'Connect Wallet First'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
