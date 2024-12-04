import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Import pages
import BlogListPage from './pages/BlogListPage';
import CreatePostPage from './pages/CreatePostPage';
import SinglePostPage from './pages/SinglePostPage';

// Import components
import Navbar from './components/Navbar';

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
              <Navbar />

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
