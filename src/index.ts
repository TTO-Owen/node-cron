import cron from 'node-cron';
import { heartbeat, triggerHeartbeat } from './requests/heartbeat';

import { requestAlgoliaSync } from './requests/algolia-sync'
import { requestLinnworksSync } from './requests/linnworks-sync'

const stradaUrl = 'strada.thetechout.com';

cron.schedule(`*/1 7-19 * * *`, async () => {
  const time = (new Date()).toISOString().slice(11,19);
  await triggerHeartbeat(heartbeat.nodeCron);
  const linnOrderSync = await requestLinnworksSync(stradaUrl, time);
});

cron.schedule(`*/10 * * * *`, async () => {
  const time = (new Date()).toISOString().slice(11,19);
  const algoliaSync = await requestAlgoliaSync(stradaUrl, time);
});