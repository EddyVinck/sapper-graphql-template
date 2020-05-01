<script context="module">
  import { client } from "../../utils/data.js";
  import gql from "graphql-tag";

  const POST = gql`
    query GET_POST($input: PostInput!) {
      post(input: $input) {
        id
        title
        slug
        html
      }
    }
  `;

  export async function preload({ params, query }) {
    console.log("preloading post");
    return {
      cache: await client.query({
        query: POST,
        variables: {
          input: {
            slug: params.slug
          }
        }
      })
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { setClient, restore, query } from "svelte-apollo";
  export let cache;
  restore(client, POST, cache.data);
  onMount(() => {
    setClient(client);
  });
  let post = query(client, { query: POST });

  // This is necessary to use the data outside an #await block
  // You cannot use svelte:head inside an #await block, so this is a workaround.
  let postResponse = $post;
</script>

<style>
  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    background-color: #f9f9f9;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    padding: 0.5em;
    border-radius: 2px;
    overflow-x: auto;
  }

  .content :global(pre) :global(code) {
    background-color: transparent;
    padding: 0;
  }

  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
</style>

<svelte:head>
  <title>{postResponse.data.post.title}</title>
</svelte:head>

{#await $post}
  <p>Loading...</p>
{:then response}
  <h1>{response.data.post.title}</h1>
  <div class="content">
    {@html response.data.post.html}
  </div>
{:catch}
  <p>Could not load post right now. Try again later.</p>
{/await}
