import cron from 'node-cron';
import axios from 'axios';
import chalk from 'chalk';
import * as postmark from 'postmark'

const stradaUrl = 'beta-strada.thetechout.com';

let failure = {
  linnOrderSync: 0,
  algoliaOrderSync: 0,
};

const requestLinnworksSync = async (time: string) => {
  try {
    const request = await axios
      .post(
        'http://' + stradaUrl + '/api/linnworks/sync/cled7kdse0000deq0ymdgv7au'
      )
      .then((response) => {
        return response.data;
      });
    if(request.message == 'Success, No orders to create.') {
      console.log(chalk.grey(`[${time}][${request.build}] cled7kdse0000deq0ymdgv7au Order Sync. ${request.message}`));
    } else {
      console.log(chalk.green(`[${time}][${request.build}] cled7kdse0000deq0ymdgv7au Order Sync. ${request.message} [${request.orders.length || "Unknown"} Orders Synced]`));
    }
    failure.linnOrderSync = 0;
  } catch (error) {
    if(failure.linnOrderSync != 1) {
      emailError("Linnworks Order Sync Failure")
      failure.linnOrderSync = 1;
    }
    console.log(error);
    console.log(chalk.red('Failed to request Linnworks Sync'));
  }
};

const requestAlgoliaSync = async (time: string) => {
  try {
    const request = await axios
      .post(
        'http://' + stradaUrl + '/api/algolia/sync'
      );
    if(request.status == 200) {
      console.log(chalk.grey(`[${time}][${request.data.build}] Algolia Order Sync. ${request.data.message}`));
    } else {
      console.log(chalk.green(`[${time}][${request.data.build}] cled7kdse0000deq0ymdgv7au Order Sync. ${request.data.message}`));
    }
    failure.algoliaOrderSync = 0;
  } catch (error) {
    if(failure.algoliaOrderSync != 1) {
      emailError("Algolia Sync Failure")
      failure.algoliaOrderSync = 1;
    }
    console.log(error);
    console.log(chalk.red('Failed to request Algolia Sync'));
  }
};
cron.schedule(`*/1 7-19 * * *`, async () => {
  const time = (new Date()).toISOString().slice(11,19);
  await requestLinnworksSync(time);
});

cron.schedule(`*/10 * * * *`, async () => {
  const time = (new Date()).toISOString().slice(11,19);
  await requestAlgoliaSync(time);
});

const emailError = async (error_string: string) => {
  let pmclient = new postmark.ServerClient("dc8a33e9-8c4c-4d7d-bca9-60aac0a0241c");
  pmclient.sendEmail({
    "From":"info@thetechout.com",
    "To": "owen.keary@thetechout.com",
    "Subject": "NodeCron Sync Failure",
    "TextBody": error_string
  })
  return true;
}