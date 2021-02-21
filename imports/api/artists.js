import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import axios from 'axios'
import { ArtistSearchResponses } from './artistSearchResponses.js'

export const Artists = new Mongo.Collection('artists')

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
      //const artist = Artists.findOne(key)

      //try {
        //const response = await axios.get('https://api.mixcloud.com/search/', {
          //params: {
            //q: artist.name,
            //type: 'cloudcast'
          //}
        //})

      //} catch (error) {
        //console.error(error)
      //}

      //ArtistSearchResponses.upsert(
        //{artistId: key, type: 'mixcloud'},
        //{$set: {response: response.data, fetchedAt: new Date()}}
      //)

      //searchResult = response.data
    }

    console.log(searchResult)
  }
});

