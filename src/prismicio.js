import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

import config from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const { repositoryName } = config;

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
    type: "event",
    path: "/events/:uid",
  },
  {
    type: "faqs",
    path: "/faqs/:uid",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */
export const createClient = ({ previewData, req, ...config } = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    ...config,
  });

  prismicNext.enableAutoPreviews({ client, previewData, req });

  return client;
};
