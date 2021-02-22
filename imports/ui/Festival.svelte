<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import Artist from './Artist.svelte';
  import CreateFestivalArtist from './CreateFestivalArtist.svelte';
  import { Festivals } from '../api/festivals.js'
  import { Artists } from '../api/artists.js'
  import { FestivalArtists } from '../api/festivalArtists.js'
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';

  export let location

  onMount(async () => {
    Meteor.subscribe('festivals');
    Meteor.subscribe('festivalArtists');
    Meteor.subscribe('artists');
    Meteor.subscribe('musicResults');
  });

  $: currentUser = useTracker(() => Meteor.user());
  $: festival = useTracker(() => Festivals.findOne({slug: 'movement-2019'}));
  $: artists = useTracker(() => {
    if (!$festival) { return [] }

    const festivalArtists = FestivalArtists.find({festivalId: $festival.id}).fetch()
    const artistIds = festivalArtists.map((a) => a.artistId)

    return Artists.find({_id: {$in: artistIds}}, {sort: {name: 1}}).fetch()
  });
</script>


<div class="container px-0">
  {#if $festival}
  <header class="pt-2 pb-4">
    <h1 class="display-4 font-weight-thin">{ $festival?.name }</h1>
  </header>
  {/if}

  {#each $artists as artist}
    <div class="mb-4">
      <Artist
        key={artist._id.toHexString()}
        artist={artist}
      />
    </div>
  {/each}

  {#if $currentUser}
    <CreateFestivalArtist festival={festival} />
  {/if}
</div>
