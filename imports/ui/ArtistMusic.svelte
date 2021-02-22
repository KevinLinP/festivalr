<script>
  import { MusicResults } from '../api/musicResults.js'
  import { useTracker, useSession } from 'meteor/rdb:svelte-meteor-data';

  export let artist;

  $: musicResults = useTracker(() => MusicResults.find({artistId: artist._id}, {sort: {postedAt: -1}, limit: 5}).fetch());

  function formatDate(date) {
    return date.toLocaleDateString(undefined, {month: 'short', year: 'numeric'})
  }
</script>

<div>
  {#if !artist.mixcloudSearchedAt}
    <h1 class="display-1 my-5">searching Mixcloud...</h1>
  {/if}

  {#each $musicResults as musicResult}
    <div class="d-flex flex-column mb-3">
      <div class="align-self-end mb-1 me-2 text-muted" style="line-height: 1.0;">{ formatDate(musicResult.postedAt) }</div>

      <iframe width="100%" height="60" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed={musicResult.key}" frameborder="0"></iframe>
    </div>
  {/each}
</div>

