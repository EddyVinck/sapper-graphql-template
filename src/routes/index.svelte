<script context="module">
  // this only runs on the server
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
    console.log("trying to preload");
    return {
      // cache: await client.query({
      //   query: ME
      // })
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { setClient, restore, query } from "svelte-apollo";
  // export let cache;

  let response = {
    data: { me: { name: "undefined", avatar: "graphql.png" } },
    loading: true
  };

  $: image = response.data.me.avatar;
  $: text = response.loading ? "Loading..." : "Great success!";

  // console.log(cache);
  // restore(client, ME, cache.data);
  onMount(async () => {
    setClient(client);

    try {
      const data = await client.query({ query: ME });
      response = data;
      console.log(data);
    } catch (error) {
      console.error("oh no", error);
    }
  });
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
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
  }
  pre {
    padding-left: 1rem;
    border-left: 2px solid #d64292;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sapper GraphQL template</title>
</svelte:head>

<h1>{text}</h1>

<p>GraphQL response:</p>
<pre>{JSON.stringify(response, 0, 2)}</pre>

<figure>
  <img alt="Borat" src={image} />
  <figcaption>HIGH FIVE!</figcaption>
</figure>

<p>
  <strong>
    Try editing this file (src/routes/index.svelte) to test live reloading.
  </strong>
</p>
