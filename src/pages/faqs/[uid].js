import Head from "next/head";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";

/** @param {import("next").InferGetStaticPropsType<typeof getStaticProps>} */
export default function Page({ faqs }) {
  /** @type {import('schema-dts').FAQPage} */
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.data.questions.map((question) => ({
      "@type": "Question",
      name: prismic.asText(question.question),
      acceptedAnswer: prismic.asHTML(question.answer),
    })),
  };

  return (
    <div>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>
      <main>
        <p>
          The following schema has been added to the <code>&lt;head&gt;</code>{" "}
          of this page:
        </p>
        <pre>
          <code>{JSON.stringify(schema, null, 4)}</code>
        </pre>
      </main>
    </div>
  );
}

/** @param {import("next").GetStaticPropsContext<{ uid: string }>} */
export async function getStaticProps({ previewData, params }) {
  const client = createClient({ previewData });

  const faqs = await client.getByUID("faqs", params.uid);

  return {
    props: { faqs },
  };
}

/** @type {import("next").GetStaticPaths} */
export async function getStaticPaths() {
  const client = createClient();

  const faqs = await client.getAllByType("faqs");

  return {
    paths: faqs.map((faq) => prismic.asLink(faq)),
    fallback: false,
  };
}
