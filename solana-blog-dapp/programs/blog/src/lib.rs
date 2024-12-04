
use anchor_lang::prelude::*;

declare_id!("8ouoyWWRuMmzGcJ64kpbQ8DCERKPX1k1JqDKbPJNN9ra");

#[program]
pub mod blog {
    use super::*;

    pub fn create_post(ctx: Context<CreatePost>, title: String, content: String) -> Result<()> {
        let post = &mut ctx.accounts.post;
        let author = &ctx.accounts.author;

        post.title = title;
        post.content = content;
        post.author = *author.key;
        post.timestamp = Clock::get()?.unix_timestamp;

        Ok(())
    }

    pub fn update_post(ctx: Context<UpdatePost>, title: String, content: String) -> Result<()> {
        let post = &mut ctx.accounts.post;

        require!(
            post.author == *ctx.accounts.author.key,
            BlogError::UnauthorizedPostUpdate
        );

        post.title = title;
        post.content = content;

        Ok(())
    }

    pub fn delete_post(ctx: Context<DeletePost>) -> Result<()> {
        let post = &mut ctx.accounts.post;

        require!(
            post.author == *ctx.accounts.author.key,
            BlogError::UnauthorizedPostDeletion
        );

        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(
        init, 
        payer = author, 
        space = 8 + 32 + 256 + 256 + 8,
    )]
    pub post: Account<'info, Post>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatePost<'info> {
    #[account(mut, has_one = author)]
    pub post: Account<'info, Post>,
    pub author: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeletePost<'info> {
    #[account(
        mut, 
        has_one = author, 
        close = author
    )]
    pub post: Account<'info, Post>,
    pub author: Signer<'info>,
}

#[account]
#[derive(Default)]
pub struct Post {
    pub title: String,
    pub content: String,
    pub author: Pubkey,
    pub timestamp: i64,
}

#[error_code]
pub enum BlogError {
    #[msg("You are not authorized to update this post")]
    UnauthorizedPostUpdate,
    #[msg("You are not authorized to delete this post")]
    UnauthorizedPostDeletion,
}
