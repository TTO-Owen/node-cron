import cron from 'node-cron';
import axios from 'axios';

const requestLinnworksSync = async () => {
  try {
    const request = await axios
      .post(
        'https://strada.thetechout.com/api/linnworks/sync/cled7kdse0000deq0ymdgv7au'
      )
      .then((response) => {
        return response.data;
      });
    console.log('cled7kdse0000deq0ymdgv7au Order Sync. ' + request.message);
  } catch (error) {
    console.log(error);
    console.log('Failed to request Linnworks Sync');
  }
};

cron.schedule(`*/1 7-19 * * *`, async () => {
  console.log(`Runtime: Every Minute`);
  requestLinnworksSync();
});
