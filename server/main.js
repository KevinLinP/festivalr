import { Meteor } from 'meteor/meteor';
import '../imports/api/artists.js';
import '../imports/api/artistSearchResponses.js';
import '../imports/api/musicResults.js';
import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
  Accounts.config({forbidClientAccountCreation: true})
});
