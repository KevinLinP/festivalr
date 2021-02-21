<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';

  let email = ''
  let password = ''
  const userId = useTracker(() => Meteor.userId())

  function handleLogin(event) {
    console.log('login')
    Meteor.loginWithPassword({email}, password, (error) => console.log(error))
    /* Accounts.createUser({email, password}, (error) => console.log(error)) */
  }

  function handleLogout(event) {
    console.log('logout')
    Meteor.logout((error) => console.log(error))
  }
</script>


<div class="container pt-5">
  {#if $userId}
    logged in
    <button on:click={handleLogout}>logout</button>
  {:else}
    logged out

    <form on:submit|preventDefault={handleLogin}>
      <input
        type="text"
        placeholder="email"
        bind:value={email}
      />
      <input
        type="password"
        placeholder="password"
        bind:value={password}
      />
      <input type="submit" class="btn btn-secondary btn-sm"/>
    </form>
  {/if}
</div>
