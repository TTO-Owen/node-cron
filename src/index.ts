import cron from 'node-cron';
import axios from 'axios';

const requestLinnworksSync = async () => {
  try {
    const request = await axios.post('https://strada.thetechout.com/api/linnworks/sync').then((response) => { return response });

    console.log(request);
  } catch (error) {
    console.log(error);
    console.log("Failed to request Linnworks Sync");
  }
}


cron.schedule(`*/1 * * * *`, async () => {
  console.log(`Runtime: Every Minute`);
  requestLinnworksSync();
});
