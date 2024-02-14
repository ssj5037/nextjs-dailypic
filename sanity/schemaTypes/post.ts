import { defineField, defineType } from "sanity";

const commentType = {
  name: "comments",
  title: "Comments",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "user" },
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "string",
    }),
  ],
};

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "user" },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "like",
      title: "Like",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "user" },
        },
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "comments",
      title: "Comments",
      type: "array",
      of: [commentType],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: `${new Date()}`,
      options: {
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm:ss",
      },
    }),
  ],

  preview: {
    select: {
      author: "author.name",
      media: "image",
      content: "comments.0.comment",
      date: "publishedAt",
    },
    prepare(selection) {
      const { author, content, date, media } = selection;
      return {
        media,
        title: content,
        subtitle:
          author &&
          `by ${author} (${new Date(date).toLocaleDateString("ko", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })})`,
      };
    },
  },
});
