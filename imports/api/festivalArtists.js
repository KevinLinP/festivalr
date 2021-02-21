import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Artists } from './artists.js'
import { initCollection } from './common.js'
import makeSlug from 'slug'
import _ from 'lodash'

export const FestivalArtists = initCollection('festivalArtists')

if (Meteor.isServer) {
  Meteor.publish('festivalArtists', () => FestivalArtists.find())

  Meteor.methods({
    async 'festivalArtists.create' ({name, festivalId}) {
      if (!this.userId) { return 'not logged in' }

      const lowercaseName = _.lowerCase(name)
      const createdAt = new Date()

      let artistId = Artists.findOne({lowercaseName})?._id

      if (!artistId) {
        const slug = makeSlug(name)

        artistId = await Artists.insert({
          name,
          lowercaseName,
          slug,
          mixcloudSearchedAt: null,
          createdAt,
        })
      }

      if (!artistId) { return }

      FestivalArtists.insert({
        festivalId,
        artistId,
        createdAt
      })
    }
  });
}
