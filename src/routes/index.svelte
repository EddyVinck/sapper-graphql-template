<script context="module">
  // A context="module" script only runs on the server
  import { client } from "../utils/data.js";
  import gql from "graphql-tag";

  const ME = gql`
    query {
      me {
        email
        avatar
      }
    }
  `;

  export async function preload() {
    return {
      cache: await client.query({
        query: ME
      })
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { setClient, restore, query } from "svelte-apollo";
  export let cache; // this matches the return value of `preload` above
  restore(client, ME, cache.data);

  let meQuery = query(client, { query: ME });

  // You have access to the query result in the script like this (with the $):
  // console.log("<script> $meQuery:", $meQuery);
  onMount(() => {
    setClient(client);
    console.log("onMount $meQuery:", $meQuery);
  });

  $: image =
    meQuery && meQuery.data && meQuery.data.me && meQuery.data.me.avatar;
  $: loading = meQuery.loading;
  $: text = loading ? "Loading..." : "Great success!";
  $: altText = loading ? "Loading Borat..." : "Borat";
</script>

<style>
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 1em 0 0 0;
  }

  p {
    margin: 1em auto;
  }
  .pre-wrapper {
    display: flex;
    justify-content: center;
  }
  pre {
    display: inline-block;
    padding: 0.5rem 0 0.5rem 1rem;
    border-left: 4px solid #d64292;
    font-size: 11px;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
    pre {
      font-size: 14px;
    }
  }
</style>

<svelte:head>
  <title>Sapper GraphQL template</title>
</svelte:head>

<h1>{text}</h1>

<!-- Take note of the "$" here, it's important! -->
{#await $meQuery}
  <figure>
    <figcaption>Loading...</figcaption>
    <img alt="Loading Borat..." src="graphql.png" />
    <p>this should not appear if everything goes right</p>
  </figure>
{:then result}
  <figure>
    <figcaption>HIGH FIVE!</figcaption>
    <img alt="Borat!" src={result.data.me.avatar} />
  </figure>
  <p>GraphQL response:</p>
  <div class="pre-wrapper">
    <pre>{JSON.stringify(result, 0, 2)}</pre>
  </div>
  <p>
    You can also see the GraphQL in action on the
    <a href="/graphql" target="_blank" rel="noopener">GraphQL Playground</a>
    .
  </p>
{:catch error}
  <pre>{error}</pre>
{/await}

<p>
  <strong>
    Try editing this file (src/routes/index.svelte) to test live reloading.
  </strong>
</p>
<p>
  <strong>
    To verify that server-side rendering works view the source of this page
    (CTRL+U or CMD+U). If the &lt;figcaption&gt; shows "loading..." instead of
    "HIGH FIVE!" it did not work.
  </strong>
</p>
