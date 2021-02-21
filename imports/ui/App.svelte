<script>
  import { Router, Link, Route } from "svelte-routing";
  import Festival from './Festival.svelte'
  import User from './User.svelte'

  export let url = "";
</script>

<Router url="{url}">
  <div>
    <Route path="/user"><User /></Route>
    <Route path="/"><Festival /></Route>
  </div>
</Router>
