import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/blog",
        fields: [
          {
            name: "title",
            label: "Title",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            name: "subtitle",
            label: "Subtitle",
            type: "string",
          },
          {
            name: "pubDate",
            label: "Publication Date",
            type: "datetime",
            required: true,
            ui: {
              dateFormat: "YYYY-MM-DD",
              // timeFormat: "HH:mm",
            },
          },
          {
            name: "author",
            label: "Author",
            type: "string",
          },
          {
            name: "description",
            label: "Description",
            type: "string",
          },
          {
            name: "image",
            label: "Image",
            type: "object",
            fields: [
              {
                name: "url",
                label: "URL",
                type: "string",
              },
              {
                name: "alt",
                label: "Alt Text",
                type: "string",
              },
            ],
          },
          {
            name: "tags",
            label: "Tags",
            type: "string",
            list: true,
          },
          {
            name: "body",
            label: "Body",
            type: "rich-text",
            isBody: true,
          },
        ],
      },
    ],
  },
});
