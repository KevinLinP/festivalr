import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { initCollection } from './common.js'

export const Festivals = initCollection('festivals')

if (Meteor.isServer) {
  Meteor.publish('festivals', () => Festivals.find())
}
