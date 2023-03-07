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
    console.log('Linnworks Order Sync. ' + request.message);
  } catch (error) {
    console.log(error);
    console.log('Failed to request Linnworks Sync');
  }
};

// const requestSquareRepairSync = async () => {
//   try {
//     const request = await axios
//       .post('http://localhost:3000/api/square/sync/repairs')
//       .then((response) => {
//         return response.data;
//       });
//     console.log('Square Repair Sync Order Sync. ' + request.message);
//   } catch (error) {
//     console.log(error);
//     console.log('Failed to request Square Repair Sync');
//   }
// };

cron.schedule(`*/1 7-19 * * *`, async () => {
  console.log(`Runtime: Every Minute`);
  requestLinnworksSync();
});

// cron.schedule(`*/5 * * * *`, async () => {
//   console.log(`Runtime: Every 5 Minutes`);
//   requestSquareRepairSync();
// });
