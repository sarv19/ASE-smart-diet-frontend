import algoliasearch from "algoliasearch";

export async function get(args?: { filters?: string }) {
  const client = algoliasearch(
    "QEA00UB5J9",
    "b1bd7630e55ba1152ad1e57433a4e4e3"
  );
  const index = client.initIndex("ase-project");
  return (await index.search("", { filters: args?.filters, hitsPerPage: 3 }))
    .hits;
}

get.key = "/modules/recipe/actions/get";
