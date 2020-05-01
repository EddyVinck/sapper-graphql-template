<script context="module">
  import { client } from "../../utils/data.js";
  import gql from "graphql-tag";

  const POSTS = gql`
    query {
      posts {
        id
        title
        slug
      }
    }
  `;

  export async function preload({ params, query }) {
    return {
      cache: await client.query({
        query: POSTS
      })
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { setClient, restore, query } from "svelte-apollo";
  export let cache;
  restore(client, POSTS, cache.data);
  onMount(() => {
    setClient(client);
  });
  let posts = query(client, { query: POSTS });
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
  {#await $posts}
    <p>Loading posts</p>
  {:then res}
    {#each res.data.posts as post}
      <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
      <li>
        <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
      </li>
    {/each}
  {:catch}
    <p>Could not load posts...</p>
  {/await}
</ul>
