import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';
import { Blog, IDL } from '../anchor/idl';
import { BlogPost } from '../types';

const BlogPostList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!publicKey) return;

      try {
        const provider = new anchor.AnchorProvider(
          connection,
          { publicKey, signTransaction } as anchor.Wallet,
          {
            commitment: 'confirmed',
          }
        );
        const program = new anchor.Program<Blog>(IDL as Blog, provider);

        // Fetch all posts
        const fetchedPosts = await program.account.post.all();
        setPosts(fetchedPosts as BlogPost[]);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [publicKey, connection, signTransaction]);

  const formatDate = (timestamp: anchor.BN) => {
    return new Date(timestamp.toNumber() * 1000).toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Blog Posts</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500">
          No posts yet. Connect wallet to create one!
        </p>
      ) : (
        posts.map((post) => (
          <div
            key={post.publicKey.toString()}
            className="bg-white shadow-md rounded-lg p-6 mb-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">{post.account.title}</h3>
              <span className="text-sm text-gray-500">
                {formatDate(post.account.timestamp)}
              </span>
            </div>
            <p className="text-gray-700">{post.account.content}</p>
            <div className="text-sm text-gray-500 mt-2">
              By: {post.account.author.toString().slice(0, 6)}...
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogPostList;
