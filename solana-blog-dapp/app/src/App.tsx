import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Import pages
import BlogListPage from './pages/BlogListPage';
import CreatePostPage from './pages/CreatePostPage';
import SinglePostPage from './pages/SinglePostPage';

// Styles
import '@solana/wallet-adapter-react-ui/styles.css';

const App: React.FC = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);

  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <nav className="bg-white shadow-md py-4">
                <div className="container mx-auto flex justify-between items-center px-4">
                  <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-blue-600">
                      Solana Blog
                    </h1>
                    <Link
                      to="/"
                      className="text-gray-700 hover:text-blue-600 transition duration-300"
                    >
                      All Posts
                    </Link>
                    <Link
                      to="/create"
                      className="text-gray-700 hover:text-blue-600 transition duration-300"
                    >
                      Create Post
                    </Link>
                  </div>
                  <WalletMultiButton />
                </div>
              </nav>

              <Routes>
                <Route path="/" element={<BlogListPage />} />
                <Route path="/create" element={<CreatePostPage />} />
                <Route path="/post/:postPubkey" element={<SinglePostPage />} />
              </Routes>
            </div>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
