import { Meteor } from 'meteor/meteor';
import { Festivals } from '../imports/api/festivals.js';
import { Artists } from '../imports/api/artists.js';
import { FestivalArtists } from '../imports/api/festivalArtists.js';
import { ArtistSearchResponses } from '../imports/api/artistSearchResponses.js';
import { MusicResults } from '../imports/api/musicResults.js';
import { Accounts } from 'meteor/accounts-base'
import { Migrations } from 'meteor/percolate:migrations'

Migrations.add({
  version: 1,
  up: function() {
    Festivals.rawCollection().createIndex(
      {slug: 1},
      {unique: true}
    )
    Festivals.rawCollection().createIndex(
      {lowercaseName: 1},
      {unique: true}
    )

    Artists.rawCollection().createIndex(
      {slug: 1},
      {unique: true}
    )
    Artists.rawCollection().createIndex(
      {lowercaseName: 1},
      {unique: true}
    )

    FestivalArtists.rawCollection().createIndex(
      {festivalId: 1, artistId: 1},
      {unique: true}
    )

    ArtistSearchResponses.rawCollection().createIndex(
      {artistId: 1, type: 1},
      {unique: true}
    )

    MusicResults.rawCollection().createIndex(
      {artistId: 1, type: 1, key: 1},
      {unique: true}
    )
  }
});

Meteor.startup(() => {
  Accounts.config({forbidClientAccountCreation: true})
  Migrations.migrateTo('latest');
});
