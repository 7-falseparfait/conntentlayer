import {
  defineDocumentType,
  makeSource,
  defineNestedType,
} from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code"; // Add this import

const Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    name: { type: "string", required: true },
    image: { type: "string", required: true },
  },
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    image: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "nested", of: Author, required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      [
        rehypePrettyCode as any,
        {
          theme: "github-dark",
          keepBackground: true,
        },
      ],
    ],
  },
});
