import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import axios from 'axios'
import { ArtistSearchResponses } from './artistSearchResponses.js'
import { MusicResults } from './musicResults.js'
import { initCollection } from './common.js'
import _ from 'lodash'

export const Artists = initCollection('artists')

if (Meteor.isServer) {
  Meteor.publish('artists', () => Artists.find())
}

Meteor.methods({
  async 'artists.search'(key) {
    const artist = Artists.findOne(key)
    if (artist.searchedAt) { return }

    try {
      const response = await axios.get('https://api.mixcloud.com/search/', {
        params: {
          q: `"${artist.name}" ${artist.additionalSearchTerms || ''}`,
          type: 'cloudcast'
        }
      })

      const searchResult = response.data

      ArtistSearchResponses.upsert(
        {artistId: key, type: 'mixcloud'},
        {$set: {response: searchResult, fetchedAt: new Date()}}
      )

      Artists.update(key, {$set: {searchedAt: new Date()}})

      searchResult.data.forEach((result, i) => {
        const data = _.pick(result, ['slug', 'name', 'url'])
        data.postedAt = new Date(result.created_time)

        MusicResults.upsert(
          {artistId: key, type: 'mixcloud', key: result.key},
          {$set: data}
        )
      })
    } catch (error) {
      console.error(error)
    }
  }
});

