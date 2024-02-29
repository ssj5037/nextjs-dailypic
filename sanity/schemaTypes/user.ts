import { defineField, defineType } from 'sanity';

export default defineType({
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'string',
    }),
    defineField({
      name: 'following',
      title: 'Following',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'user' },
        },
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'followers',
      title: 'Followers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'user' },
        },
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'bookmarks',
      title: 'Bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'post' },
        },
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'post' },
        },
      ],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    select: {
      username: 'username',
      name: 'name',
      email: 'email',
      following: 'following',
      followers: 'followers',
    },
    prepare(selection) {
      const { username, name, email, following, followers } = selection;
      return {
        title: `${name}(${username}, ${email})`,
        subtitle: `팔로잉 ${following ? following.length : 0}명 / 
        팔로워 ${followers ? followers.length : 0}명`,
      };
    },
  },
});
