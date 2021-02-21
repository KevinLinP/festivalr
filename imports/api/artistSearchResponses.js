import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { initCollection } from './common.js'

export const ArtistSearchResponses = initCollection('artistSearchResponses')
