import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { assert } from 'chai';
import { Blog } from '../target/types/blog';

describe('blog', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Blog as Program<Blog>;
  const author = provider.wallet.publicKey;

  it('can create a post', async () => {
    const post = anchor.web3.Keypair.generate();

    await program.methods
      .createPost('First Post', 'Hello Solana!')
      .accounts({
        post: post.publicKey,
        author,
      })
      .signers([post])
      .rpc();

    const postAccount = await program.account.post.fetch(post.publicKey);

    assert.equal(postAccount.title, 'First Post');
    assert.equal(postAccount.content, 'Hello Solana!');
    assert.isTrue(postAccount.author.equals(author));
  });

  it('cannot update post by unauthorized user', async () => {
    const post = anchor.web3.Keypair.generate();
    const randomUser = anchor.web3.Keypair.generate();

    await program.methods
      .createPost('Initial Post', 'Initial Content')
      .accounts({
        post: post.publicKey,
        author,
      })
      .signers([post])
      .rpc();

    try {
      await program.methods
        .updatePost('Updated Title', 'Updated Content')
        .accounts({
          post: post.publicKey,
        })
        .signers([randomUser])
        .rpc();

      assert.fail('Should have thrown an error');
    } catch (error) {
      assert.isTrue(error.message.includes('unknown signer'));
    }
  });

  it('can delete own post', async () => {
    const post = anchor.web3.Keypair.generate();

    await program.methods
      .createPost('Delete Test', 'Will be deleted')
      .accounts({
        post: post.publicKey,
        author,
      })
      .signers([post])
      .rpc();

    await program.methods
      .deletePost()
      .accounts({
        post: post.publicKey,
      })
      .rpc();

    try {
      await program.account.post.fetch(post.publicKey);
      assert.fail('Post should have been deleted');
    } catch (error) {
      assert.isTrue(error.message.includes('Account does not exist'));
    }
  });
});
