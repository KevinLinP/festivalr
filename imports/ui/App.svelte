<script>
  import { Router, Link, Route } from "svelte-routing";
  import AllFestivals from './AllFestivals.svelte'
  import Festival from './Festival.svelte'
  import User from './User.svelte'

  export let url = "";
</script>

<Router url="{url}">
  <div>
    <Route path="/user" component="{User}" />
    <Route path="/festivals" component="{AllFestivals}" />
    <Route path="/" component="{Festival}" />
  </div>
</Router>
