<script>
  import { onMount } from "svelte";
  import { getClient, query } from "svelte-apollo";
  import gql from "graphql-tag";

  // 2. Get the Apollo client from context
  // const client = getClient();

  // const GET_ME = gql`
  //   query {
  //     me {
  //       email
  //     }
  //   }
  // `;

  // 3. Execute the graphql query using the Apollo client
  //    -> Returns a svelte store of promises that resolve as values come in
  // onMount(() => {
  //   query(client, { query: GET_ME }).then(data => {
  //     console.log(data);
  //   });
  // });
  // const books = query(client, { query: GET_USERS });
</script>

<p>All our wonderful users</p>
