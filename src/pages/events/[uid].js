import Head from "next/head";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";

/** @param {import("next").InferGetStaticPropsType<typeof getStaticProps>} */
export default function Page({ event }) {
  /** @type {import('schema-dts').Event} */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: prismic.asText(event.data.name),
    description: event.data.description,
    startDate: event.data.start_date,
    endDate: event.data.end_date,
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

  const event = await client.getByUID("event", params.uid);

  return {
    props: { event },
  };
}

/** @type {import("next").GetStaticPaths} */
export async function getStaticPaths() {
  const client = createClient();

  const events = await client.getAllByType("event");

  return {
    paths: events.map((event) => prismic.asLink(event)),
    fallback: false,
  };
}
