import cron from 'node-cron';
import * as postmark from 'postmark'
import { heartbeat, triggerHeartbeat } from './requests/heartbeat';

import { requestAlgoliaSync } from './requests/algolia-sync'
import { requestLinnworksSync } from './requests/linnworks-sync'

const stradaUrl = 'strada.thetechout.com';

let failure = {
  linnOrderSync: false,
  algoliaOrderSync: false,
};

cron.schedule(`*/1 7-19 * * *`, async () => {
  const time = (new Date()).toISOString().slice(11,19);
  await triggerHeartbeat(heartbeat.nodeCron);
  const linnOrderSync = await requestLinnworksSync(stradaUrl, time);
  if(linnOrderSync.success && !failure.linnOrderSync) {
    failure.linnOrderSync = true;
    emailError('Failed to Sync with Algolia', String(linnOrderSync.err));
  }
});

cron.schedule(`*/10 * * * *`, async () => {
  const time = (new Date()).toISOString().slice(11,19);
  const algoliaSync = await requestAlgoliaSync(stradaUrl, time);
  if(algoliaSync.success && !failure.algoliaOrderSync) {
    failure.algoliaOrderSync = true;
    emailError('Failed to Sync with Algolia', String(algoliaSync.err));
  }
});

const emailError = async (error_string: string, error: string) => {
  let pmclient = new postmark.ServerClient("dc8a33e9-8c4c-4d7d-bca9-60aac0a0241c");
  pmclient.sendEmail({
    "From":"info@thetechout.com",
    "To": "owen.keary@thetechout.com",
    "Subject": "NodeCron Sync Failure",
    "TextBody": `${error_string} \n\n ${error}`
  })
  return true;
}