<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import Artist from './Artist.svelte';
  import CreateFestivalArtist from './CreateFestivalArtist.svelte';
  import { Artists } from '../api/artists.js'
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';

  export let location

  onMount(async () => {
    Meteor.subscribe('festivals');
    Meteor.subscribe('festivalArtists');
    Meteor.subscribe('artists');
    Meteor.subscribe('musicResults');
  });

  $: festival = useTracker(() => Festivals.findOne({slug: 'movement-2019'}).fetch());
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

  <CreateFestivalArtist festival={festival} />
</div>
