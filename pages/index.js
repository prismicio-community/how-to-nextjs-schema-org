import { PrismicLink, PrismicText } from "@prismicio/react";

import { createClient } from "../prismicio";

/** @param {import("next").InferGetStaticPropsType<typeof getStaticProps>} */
export default function Page({ articles, events, restaurants }) {
  return (
    <div>
      <p>See the following pages for examples:</p>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.id}>
              Article:{" "}
              <PrismicLink document={article}>
                <PrismicText field={article.data.title} />
              </PrismicLink>
            </li>
          );
        })}
        {events.map((event) => {
          return (
            <li key={event.id}>
              Event:{" "}
              <PrismicLink document={event}>
                <PrismicText field={event.data.name} />
              </PrismicLink>
            </li>
          );
        })}
        {restaurants.map((restaurant) => {
          return (
            <li key={restaurant.id}>
              Restaurant:{" "}
              <PrismicLink document={restaurant}>
                <PrismicText field={restaurant.data.name} />
              </PrismicLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** @param {import("next").GetStaticPropsContext} */
export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const [articles, events, restaurants] = await Promise.all([
    client.getAllByType("article"),
    client.getAllByType("event"),
    client.getAllByType("restaurant"),
  ]);

  return {
    props: { articles, events, restaurants },
  };
}
