<script>
  import { festivalArtists } from '../api/festivalArtists.js'
  import { Artists } from '../api/artists.js'

  export let festival
  let name = "";

  function handleCreate(event) {
    Meteor.call('festivalArtists.create', {name, festivalId: festival._id})
    name = "";
  };
</script>

<form on:submit|preventDefault={handleCreate}>
  <input
    type="text"
    placeholder="artist name"
    bind:value={name}
  />

  <input type="submit" class="btn btn-secondary btn-sm"/>
</form>
