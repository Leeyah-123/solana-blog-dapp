import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Blog, IDL } from '../anchor/idl';
import { BlogPost } from '../types';

const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!publicKey) {
        setPosts([]);
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

        // Fetch all posts
        const fetchedPosts = await program.account.post.all();
        setPosts(fetchedPosts as BlogPost[]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [publicKey, connection, signTransaction]);

  const formatDate = (timestamp: anchor.BN) => {
    return new Date(timestamp.toNumber() * 1000).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Blog Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500">
          No posts yet. Connect wallet and create one!
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              to={`/post/${post.publicKey.toString()}`}
              key={post.publicKey.toString()}
              className="block"
            >
              <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold truncate pr-2">
                    {post.account.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(post.account.timestamp)}
                  </span>
                </div>
                <p className="text-gray-700 line-clamp-3">
                  {post.account.content}
                </p>
                <div className="text-sm text-gray-500 mt-2">
                  By: {post.account.author.toString().slice(0, 6)}...
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogListPage;
