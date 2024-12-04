import * as anchor from '@coral-xyz/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Blog, IDL } from '../anchor/idl';

interface BlogPost {
  publicKey: anchor.web3.PublicKey;
  account: {
    title: string;
    content: string;
    author: anchor.web3.PublicKey;
    timestamp: anchor.BN;
  };
}

const SinglePostPage: React.FC = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingLoading, setIsEditingLoading] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const { postPubkey } = useParams<{ postPubkey: string }>();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!postPubkey) {
        setError('No post ID provided');
        setLoading(false);
        return;
      }

      try {
        const provider = new anchor.AnchorProvider(
          connection,
          { publicKey, signTransaction } as anchor.Wallet,
          { commitment: 'confirmed' }
        );
        const program = new anchor.Program<Blog>(IDL as Blog, provider);

        const postPublicKey = new anchor.web3.PublicKey(postPubkey);
        const fetchedPost = await program.account.post.fetch(postPublicKey);

        setPost({
          publicKey: postPublicKey,
          account: fetchedPost,
        });

        // Prepare edit state
        setEditTitle(fetchedPost.title);
        setEditContent(fetchedPost.content);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to fetch post details');
        setLoading(false);
      }
    };

    fetchPost();
  }, [postPubkey, connection, publicKey, signTransaction]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!post || !publicKey) return;

    try {
      setIsEditingLoading(true);
      const provider = new anchor.AnchorProvider(
        connection,
        { publicKey, signTransaction } as anchor.Wallet,
        { commitment: 'confirmed' }
      );
      const program = new anchor.Program<Blog>(IDL as Blog, provider);

      await program.methods
        .updatePost(editTitle, editContent)
        .accounts({
          post: post.publicKey,
        })
        .rpc();

      // Update local state
      setPost((prev) =>
        prev
          ? {
              ...prev,
              account: {
                ...prev.account,
                title: editTitle,
                content: editContent,
              },
            }
          : null
      );

      setIsEditing(false);
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post');
    } finally {
      setIsEditingLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post || !publicKey) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (!confirmDelete) return;

    try {
      const provider = new anchor.AnchorProvider(
        connection,
        { publicKey, signTransaction } as anchor.Wallet,
        { commitment: 'confirmed' }
      );
      const program = new anchor.Program<Blog>(IDL as Blog, provider);

      await program.methods
        .deletePost()
        .accounts({
          post: post.publicKey,
        })
        .rpc();

      // Redirect after deletion
      navigate('/');
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete post');
    }
  };

  const formatDate = (timestamp: anchor.BN) => {
    return new Date(timestamp.toNumber() * 1000).toLocaleDateString();
  };

  // Check if the current user is the author of the post
  const isAuthor = publicKey && post?.account.author.equals(publicKey);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 text-xl">Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 text-xl">Post not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {isEditing ? (
        <form
          onSubmit={handleUpdate}
          className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto"
        >
          <div className="mb-4">
            <label
              htmlFor="edit-title"
              className="block text-gray-700 font-bold mb-2"
            >
              Post Title
            </label>
            <input
              id="edit-title"
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              maxLength={50}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="edit-content"
              className="block text-gray-700 font-bold mb-2"
            >
              Post Content
            </label>
            <textarea
              id="edit-content"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full px-3 py-2 border rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              maxLength={500}
            />
            <p className="text-sm text-gray-500 mt-1">
              {editContent.length}/500 characters
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isEditingLoading || !publicKey}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
            >
              {isEditingLoading
                ? 'Editing...'
                : publicKey
                ? 'Save Changes'
                : 'Connect Wallet First'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">{post.account.title}</h2>
            <span className="text-sm text-gray-500">
              {formatDate(post.account.timestamp)}
            </span>
          </div>

          <p className="text-gray-700 mb-4">{post.account.content}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>By: {post.account.author.toString().slice(0, 6)}...</span>
          </div>

          {isAuthor && (
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Edit Post
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SinglePostPage;
