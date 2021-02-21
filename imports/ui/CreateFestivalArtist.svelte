<script>
  import { festivalArtists } from '../api/festivalArtists.js'
  import { Artists } from '../api/artists.js'

  export let festival
  let names = ""

  function handleCreate(event) {
    Meteor.call('festivalArtists.create', {names, festivalId: festival._id})
    name = "";
  };
</script>

<form on:submit|preventDefault={handleCreate}>
  <textarea rows="17" cols="50" bind:value={names}></textarea>

  <input type="submit" class="btn btn-secondary btn-sm" value="Add/Create"/>
</form>
