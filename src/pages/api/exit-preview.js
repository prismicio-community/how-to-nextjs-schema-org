import * as prismicNext from "@prismicio/next";

/** @type {import("next").NextApiHandler} */
export default async function handler(req, res) {
  prismicNext.exitPreview({ res, req });
}
