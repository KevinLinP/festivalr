import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import axios from 'axios'
import { ArtistSearchResponses } from './artistSearchResponses.js'
import { MusicResults } from './musicResults.js'
import _ from 'lodash'

export const Artists = new Mongo.Collection('artists')

if (Meteor.isServer) {
  Meteor.publish('artists', () => Artists.find())
}

Meteor.methods({
  async 'artists.search'(key) {
    let searchResult = null

    const mixcloudSearchResponse = ArtistSearchResponses.findOne({
      artistId: key,
      type: 'mixcloud'
    })

    if (mixcloudSearchResponse) {
      searchResult = mixcloudSearchResponse.response
    } else {
      const artist = Artists.findOne(key)

      try {
        const response = await axios.get('https://api.mixcloud.com/search/', {
          params: {
            q: `${artist.name} ${artist.additionalSearchTerms || ''}`,
            type: 'cloudcast'
          }
        })

        ArtistSearchResponses.upsert(
          {artistId: key, type: 'mixcloud'},
          {$set: {response: response.data, fetchedAt: new Date()}}
        )

        searchResult = response.data
      } catch (error) {
        console.error(error)
      }
    }

    searchResult.data.forEach((result, i) => {
      const data = _.pick(result, ['slug', 'name', 'url'])
      data.postedAt = new Date(result.created_time)

      MusicResults.upsert(
        {artistId: key, type: 'mixcloud', key: result.key},
        {$set: data}
      )
    })
  }
});

