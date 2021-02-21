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
    const now = new Date()
    const artist = Artists.findOne(key)
    if (artist.mixcloudSearchedAt) { return }

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
        {$set: {response: searchResult, fetchedAt: now}}
      )

      Artists.update(key, {$set: {mixcloudSearchedAt: now}})

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

