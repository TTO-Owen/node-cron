import axios from 'axios';
import chalk from 'chalk';
import { heartbeat, triggerHeartbeat } from './heartbeat';

export const requestLinnworksSync = async (stradaUrl: string, time: string) => {
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
    await triggerHeartbeat(heartbeat.linnSync);
    return { success: true, err: '' }
  } catch (error) {
    console.log(chalk.red('Failed to request Linnworks Sync'));
    return { success: false, err: error }
  }
};