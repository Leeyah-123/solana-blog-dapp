import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useState } from 'react';
import { Blog, IDL } from '../anchor/idl';

const CreatePostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!publicKey) {
      alert('Please connect wallet first');
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

      // Clear form and potentially refresh posts
      setTitle('');
      setContent('');
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Blog Post
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            maxLength={50}
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            maxLength={500}
          />
        </div>
        <button
          type="submit"
          disabled={!publicKey}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
        >
          {publicKey ? 'Publish Post' : 'Connect Wallet First'}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
