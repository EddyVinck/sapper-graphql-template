<script context="module">
  import gql from "graphql-tag";
  import { client } from "../utils/data.js";
  const IS_AUTHENTICATED = gql`
    query {
      me {
        id
        avatar
        email
      }
    }
  `;

  export async function preload() {
    let me = null;
    try {
      const result = await client.query({
        query: IS_AUTHENTICATED,
        errorPolicy: "all",
        fetchPolicy: "no-cache"
      });
      me = result;
    } catch (error) {
      console.log("preload catch:");
      console.log(error);
    }

    console.log("preload done!");
    return {
      preload: me
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { setClient, restore, query } from "svelte-apollo";
  export let preload;
  if (!preload.errors) {
    restore(client, IS_AUTHENTICATED, preload.data);
  }

  // console.log("<script> $meQuery:", $meQuery);
  let meQuery = query(client, { query: IS_AUTHENTICATED });
  onMount(() => {
    setClient(client);
    meQuery.refetch();
    console.log({ meQuery });
    // console.log("onMount $meQuery:", $meQuery);
  });
  $: console.log({ meq: $meQuery });

  let email = "user@svelte.dev";
  let password = "password";
  let errorMessage = "";

  const SIGN_IN = gql`
    mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
      signIn(input: { email: $email, password: $password }) {
        token
        user {
          id
          email
        }
      }
    }
  `;

  function resetInputs() {
    email = "";
    password = "";
  }

  async function handleSubmit(e) {
    try {
      const response = await client.mutate({
        mutation: SIGN_IN,
        variables: {
          email,
          password
        }
      });
      console.log(response);
      meQuery.refetch();
    } catch (error) {
      console.dir(error.message);
      errorMessage = error.message;
      return;
    }
    resetInputs();
    errorMessage = "";
  }
</script>

<style>
  .form-wrapper {
    border: 2px solid rgb(255, 62, 0);
    padding: 1rem 1rem 2rem;
    border-radius: 4px;
  }
  .form-wrapper.error {
    border-color: red;
  }
  .form-wrapper.error input {
    background: rgb(255, 168, 168);
  }
  label,
  button {
    font-weight: 500;
  }
  label,
  input {
    width: 100%;
  }
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input {
    display: block;
    line-height: 1.4;
    padding: 0.5rem;
    border: 1px solid gray;
  }
  /* using a class because fieldsets don't support flexbox well */
  .input-field,
  .button-group {
    margin: 1rem 0;
    font-size: 1rem;
  }
  button {
    border: none;
    border-radius: 2px;
    display: inline-block;
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    text-transform: uppercase;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
    transition: 0.1s ease-out;
    cursor: pointer;
  }
  button:hover {
    background: rgb(255, 62, 0);
    color: white;
  }
</style>

<section>
  <button on:click={() => meQuery.refetch()}>check logged in</button>
  {#if !preload || preload.errors || !preload.data || !preload.data.me}
    <div class="form-wrapper" class:error={errorMessage.length}>
      <h1>Log in to Sapper</h1>
      {#if errorMessage}
        <div class="error">{errorMessage}</div>
      {/if}
      <form on:submit|preventDefault={handleSubmit}>
        <div class="input-field">
          <label type="email" for="email">Email address</label>
          <input bind:value={email} type="text" id="email" />
        </div>
        <div class="input-field">
          <label for="password">Password</label>
          <input bind:value={password} type="password" id="password" />
        </div>
        <div class="button-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  {:else}
    {console.log(preload.data.me)}
    <p>You are logged in!</p>
  {/if}
  {#await $meQuery}
    <p>loading...</p>
  {:then res}
    <p>Response:</p>
    <pre>{JSON.stringify(res, 0, 2)}</pre>
  {/await}

</section>
