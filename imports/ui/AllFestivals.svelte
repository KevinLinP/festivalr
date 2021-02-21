<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Festivals } from '../api/festivals.js'
  import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import _ from 'lodash'

  export let location

  onMount(async () => {
    Meteor.subscribe('festivals');
  });

  let name = "";
  let slug = "";

  async function handleCreate(event) {
    name = _.trim(name)
    lowercaseName = _.lowerCase(name)

    try {
      await Festivals.insert({
        name,
        lowercaseName,
        slug,
        createdAt: new Date()
      });

      // Clear form
      name = "";
      slug = "";
    } catch (error) {
      console.log(error)
    }
  };

  $: festivals = useTracker(() => Festivals.find({}, {sort: {name: 1}}).fetch());
</script>

<div class="container pt-5">
  <table class="mb-4">
    <thead>
      <tr>
        <th>_id</th>
        <th>name</th>
        <th>lowercaseName</th>
        <th>slug</th>
        <th>createdAt</th>
      </tr>
    </thead>
  {#each $festivals as festival }
    <tr>
      <td class="pe-4">{ festival._id.toHexString() }</td>
      <td class="pe-4">{ festival.name }</td>
      <td class="pe-4">{ festival.lowercaseName }</td>
      <td class="pe-4">{ festival.slug }</td>
      <td class="pe-4">{ festival.createdAt }</td>
    </tr>
  {/each}
  </table>

  <form on:submit|preventDefault={handleCreate}>
    <input
      type="text"
      placeholder="festival name"
      bind:value={name}
    />

    <input
      type="text"
      placeholder="url slug"
      bind:value={slug}
    />

    <input type="submit" class="btn btn-secondary btn-sm"/>
  </form>

</div>
