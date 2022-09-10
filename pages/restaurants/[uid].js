import Head from "next/head";
import * as prismicH from "@prismicio/helpers";
import { createClient } from "../../prismicio";

/** @param {import("next").InferGetStaticPropsType<typeof getStaticProps>} */
export default function Page({ restaurant }) {
  /** @type {import('schema-dts').Restaurant} */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: prismicH.asText(restaurant.data.name),
    image: prismicH.asImageSrc(restaurant.data.featured_image),
    menu: prismicH.asLink(restaurant.data.menu),
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.data.address_street,
      addressLocality: restaurant.data.address_locality,
      addressRegion: restaurant.data.address_region,
      postalCode: restaurant.data.address_postal_code,
      addressCountry: restaurant.data.address_country,
    },
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

  const restaurant = await client.getByUID("restaurant", params.uid);

  return {
    props: { restaurant },
  };
}

/** @type {import("next").GetStaticPaths} */
export async function getStaticPaths() {
  const client = createClient();

  const restaurants = await client.getAllByType("restaurant");

  return {
    paths: restaurants.map((restaurant) => prismicH.asLink(restaurant)),
    fallback: true,
  };
}
