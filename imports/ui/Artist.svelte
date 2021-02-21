<script>
  import { MusicResults } from '../api/musicResults.js'
  import { useTracker, useSession } from 'meteor/rdb:svelte-meteor-data';
  import { Session } from 'meteor/session'

  import ArtistMusic from './ArtistMusic.svelte'

  export let key
  export let artist

  const currentArtistId = useSession('currentArtistId')

  $: isCurrentArtist = ($currentArtistId == key)

  function handleArtistNameClick() {
    if (isCurrentArtist) {
      Session.set('currentArtistId', '')
    } else {
      Session.set('currentArtistId', key)
      if (!artist.mixcloudSearchedAt) {
        Meteor.call("artists.search", artist._id);
      }
    }
  }
</script>

<style>
  .artist-name {
    text-decoration: none;
  }

  .artist-name.active {
    color: inherit;
  }
</style>

<div>
  <div class="d-flex align-items-end mb-3">
    <a
      on:click={handleArtistNameClick}
      class="artist-name display-3"
      style="width: 100%; line-height: 1.0;"
      class:active={isCurrentArtist}
      href="javascript:void(0);"
    >
      { artist.name }
    </a>
  </div>

  {#if isCurrentArtist}
    <div class="ms-4">
      <ArtistMusic artist={artist} />
    </div>
  {/if}
</div>
