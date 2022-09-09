import Head from "next/head";
import * as prismicH from "@prismicio/helpers";
import { createClient } from "../../prismicio";

/** @param {import("next").InferGetStaticPropsType<typeof getStaticProps>} */
export default function Page({ article, author }) {
  /** @type {import('schema-dts').Article} */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: {
      "@type": "Person",
      name: prismicH.asText(author.data.name),
      url: new URL(prismicH.asLink(author), "https://example.com"),
    },
    image: prismicH.asImageSrc(article.data.featured_image),
    datePublished: article.data.publication_date,
    dateModified: article.last_publication_date,
  };

  return (
    <div>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <article>{/* The article's contents... */}</article>
    </div>
  );
}

/** @param {import("next").GetStaticPropsContext<{ uid: string }>} */
export async function getStaticProps({ previewData, params }) {
  const client = createClient({ previewData });

  const article = await client.getByUID("article", params.uid);
  const author = await client.getByUID("author", article.data.author.uid);

  return {
    props: { article, author },
  };
}

/** @type {import("next").GetStaticPaths} */
export async function getStaticPaths() {
  const client = createClient();

  const articles = await client.getAllByType("article");

  return {
    paths: articles.map((article) => prismicH.asLink(article)),
    fallback: true,
  };
}
