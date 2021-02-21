<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import Artist from './Artist.svelte';
  import { Artists } from '../api/artists.js'
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';

  onMount(async () => {
    Meteor.subscribe('artists');
    Meteor.subscribe('musicResults');
  });

  let newArtist = "";

  function handleCreateSubmit(event) {
    Artists.insert({
      name: newArtist,
      createdAt: new Date()
    });

    // Clear form
    newArtist = "";
  };

  $: artists = useTracker(() => Artists.find({}, {sort: {name: 1}}).fetch());
</script>


<div class="container pt-5">
  <header>
    <!-- <h1 class="display-4 font-weight-thin">Festivalr</h1> -->
  </header>

  {#each $artists as artist}
    <div class="mb-5">
      <Artist
        key={artist._id}
        artist={artist}
      />
    </div>
  {/each}

  <form on:submit|preventDefault={handleCreateSubmit}>
    <input
      type="text"
      placeholder="artist name"
      bind:value={newArtist}
    />

    <input type="submit" class="btn btn-secondary btn-sm"/>
  </form>

</div>
