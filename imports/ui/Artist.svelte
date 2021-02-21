<script>
  export let key;
  export let artist;
  import { MusicResults } from '../api/musicResults.js'
  import { useTracker, useSession } from 'meteor/rdb:svelte-meteor-data';
  import { Session } from 'meteor/session'

  const currentArtistId = useSession('currentArtistId')

  $: isCurrentArtist = ($currentArtistId == key)
  $: musicResults = useTracker(() => MusicResults.find({artistId: artist._id}, {sort: {postedAt: -1}, limit: 5}).fetch());

  function handleArtistNameClick() {
    Session.set('currentArtistId', key)
    if (!artist.mixcloudSearchedAt) {
      Meteor.call("artists.search", artist._id);
    }
  }

  function handleArtistNameClearClick() {
    Session.set('currentArtistId', '')
  }

    /* <div class="ms-auto"> */
    /*   <button class="btn btn-dark btn-sm" on:click={handleSearch}>search</button> */
    /* </div> */
</script>

<style>
  a {
    text-decoration: none;
  }
</style>

<div>
  <div class="d-flex align-items-end mb-4">
  {#if isCurrentArtist}
    <div class="display-3" style="line-height: 1.0;" on:click={handleArtistNameClearClick}>
      { artist.name }
    </div>
  {:else}
    <a on:click={handleArtistNameClick} href="javascript:void(0);">
      <div class="display-3" style="line-height: 1.0;">
        { artist.name }
      </div>
    </a>
  {/if}
  </div>


  {#if isCurrentArtist}

  {#if !artist.mixcloudSearchedAt}
    <h1 class="my-5">searching Mixcloud...</h1>
  {/if}

  {#each $musicResults as musicResult}
    <div>
      <iframe width="100%" height="60" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed={musicResult.key}" frameborder="0" ></iframe>
      { musicResult.postedAt }

    </div>
  {/each}
  {/if}

</div>

