import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { Artists } from './artists.js'
import { initCollection } from './common.js'
import makeSlug from 'slug'
import _ from 'lodash'

export const FestivalArtists = initCollection('festivalArtists')

const createOrAddArtist = async function (rawName, festivalId) {
  const name = _.trim(rawName)
  if (name.length == 0) { return }
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

if (Meteor.isServer) {
  Meteor.publish('festivalArtists', () => FestivalArtists.find())

  Meteor.methods({
    async 'festivalArtists.create' ({names, festivalId}) {
      if (!this.userId) { return 'not logged in' }

      names.split("\n").forEach((name) => {
        createOrAddArtist(name, festivalId)
      })
    }
  });
}
