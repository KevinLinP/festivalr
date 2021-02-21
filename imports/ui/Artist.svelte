<script>
  export let key;
  export let artist;

  function handleSearch() {
    Meteor.call("artists.search", key);
  }
</script>

<div>
  { artist.name }
  <!-- <iframe width="100%" height="60" src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FCarlCox%2Fcarl-cox-global-447-live-from-ibiza-week-14%2F" frameborder="0" ></iframe> -->

  <button on:click={handleSearch}>search</button>
</div>

