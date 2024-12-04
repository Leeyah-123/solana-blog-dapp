/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/blog.json`.
 */
export type Blog = {
  address: '8ouoyWWRuMmzGcJ64kpbQ8DCERKPX1k1JqDKbPJNN9ra';
  metadata: {
    name: 'blog';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Blog smart contract built with Anchor';
  };
  instructions: [
    {
      name: 'createPost';
      discriminator: [123, 92, 184, 29, 231, 24, 15, 202];
      accounts: [
        {
          name: 'post';
          writable: true;
          signer: true;
        },
        {
          name: 'author';
          writable: true;
          signer: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'title';
          type: 'string';
        },
        {
          name: 'content';
          type: 'string';
        }
      ];
    },
    {
      name: 'deletePost';
      discriminator: [208, 39, 67, 161, 55, 13, 153, 42];
      accounts: [
        {
          name: 'post';
          writable: true;
        },
        {
          name: 'author';
          signer: true;
          relations: ['post'];
        }
      ];
      args: [];
    },
    {
      name: 'updatePost';
      discriminator: [151, 128, 207, 107, 169, 246, 241, 107];
      accounts: [
        {
          name: 'post';
          writable: true;
        },
        {
          name: 'author';
          signer: true;
          relations: ['post'];
        }
      ];
      args: [
        {
          name: 'title';
          type: 'string';
        },
        {
          name: 'content';
          type: 'string';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'post';
      discriminator: [8, 147, 90, 186, 185, 56, 192, 150];
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'unauthorizedPostUpdate';
      msg: 'You are not authorized to update this post';
    },
    {
      code: 6001;
      name: 'unauthorizedPostDeletion';
      msg: 'You are not authorized to delete this post';
    }
  ];
  types: [
    {
      name: 'post';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'title';
            type: 'string';
          },
          {
            name: 'content';
            type: 'string';
          },
          {
            name: 'author';
            type: 'pubkey';
          },
          {
            name: 'timestamp';
            type: 'i64';
          }
        ];
      };
    }
  ];
};

export const IDL = {
  address: '8ouoyWWRuMmzGcJ64kpbQ8DCERKPX1k1JqDKbPJNN9ra',
  metadata: {
    name: 'blog',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Blog smart contract built with Anchor',
  },
  instructions: [
    {
      name: 'create_post',
      discriminator: [123, 92, 184, 29, 231, 24, 15, 202],
      accounts: [
        {
          name: 'post',
          writable: true,
          signer: true,
        },
        {
          name: 'author',
          writable: true,
          signer: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'content',
          type: 'string',
        },
      ],
    },
    {
      name: 'delete_post',
      discriminator: [208, 39, 67, 161, 55, 13, 153, 42],
      accounts: [
        {
          name: 'post',
          writable: true,
        },
        {
          name: 'author',
          signer: true,
          relations: ['post'],
        },
      ],
      args: [],
    },
    {
      name: 'update_post',
      discriminator: [151, 128, 207, 107, 169, 246, 241, 107],
      accounts: [
        {
          name: 'post',
          writable: true,
        },
        {
          name: 'author',
          signer: true,
          relations: ['post'],
        },
      ],
      args: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'content',
          type: 'string',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'Post',
      discriminator: [8, 147, 90, 186, 185, 56, 192, 150],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'UnauthorizedPostUpdate',
      msg: 'You are not authorized to update this post',
    },
    {
      code: 6001,
      name: 'UnauthorizedPostDeletion',
      msg: 'You are not authorized to delete this post',
    },
  ],
  types: [
    {
      name: 'Post',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'title',
            type: 'string',
          },
          {
            name: 'content',
            type: 'string',
          },
          {
            name: 'author',
            type: 'pubkey',
          },
          {
            name: 'timestamp',
            type: 'i64',
          },
        ],
      },
    },
  ],
};
