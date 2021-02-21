<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import Artist from './Artist.svelte';
  import { Artists } from '../api/artists.js'

  $: artists = useTracker(() => Artists.find({}).fetch());

</script>


<div class="container">
  <header>
    <h1>Artists</h1>
  </header>

  {#each $artists as artist}
    <Artist
      key={artist._id}
      artist={artist}
    />
  {/each}

</div>
