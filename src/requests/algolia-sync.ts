import axios from 'axios';
import chalk from 'chalk';
import { heartbeat, triggerHeartbeat } from './heartbeat';

export const requestAlgoliaSync = async (stradaUrl: string, time: string) => {
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
    await triggerHeartbeat(heartbeat.algoliaSync);
    return { success: false, err: "" }
  } catch (error) {
    console.log(chalk.grey(`[${time}][${chalk.red('ERROR')}] Failed to request Algolia Sync`));
    return { success: false, err: error }
  }
};