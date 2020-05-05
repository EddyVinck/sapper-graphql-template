<script>
  async function handleSubmit(e) {
    console.log(e);
  }
</script>

<style>
  form {
    border: 1px solid rgb(255, 62, 0);
    padding: 1rem 1rem 2rem;
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
  <h1>Log in to Sapper</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="input-field">

      <label for="username">Username</label>
      <input type="text" id="username" />
    </div>
    <div class="input-field">
      <label for="password">Password</label>
      <input type="password" id="password" />
    </div>
    <div class="button-group">
      <button type="submit">Submit</button>
    </div>
  </form>
</section>
