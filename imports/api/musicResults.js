import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const MusicResults = new Mongo.Collection('musicResults')

if (Meteor.isServer) {
  Meteor.publish('musicResults', () => MusicResults.find())
}
