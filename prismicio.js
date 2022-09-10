import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

import sm from "./sm.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

/** @type {import("@prismicio/client").Route[]} */
const routes = [
  {
    type: "article",
    path: "/articles/:uid",
  },
  {
    type: "author",
    path: "/authors/:uid",
  },
  {
    type: "restaurant",
    path: "/restaurants/:uid",
  },
  {
    type: "event",
    path: "/events/:uid",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */
export const createClient = ({ previewData, req, ...config } = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, {
    routes,
    ...config,
  });

  prismicNext.enableAutoPreviews({ client, previewData, req });

  return client;
};
