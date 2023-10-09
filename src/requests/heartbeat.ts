import axios from 'axios';
import chalk from 'chalk';

export enum heartbeat {
  nodeCron = 'https://uptime.betterstack.com/api/v1/heartbeat/cPQbQ4cRrTuf9RGLJ1eg78Wy',
  linnSync = 'https://uptime.betterstack.com/api/v1/heartbeat/5pSfva5m8NmA12BanT1gm5fN',
  algoliaSync = 'https://uptime.betterstack.com/api/v1/heartbeat/yAUauvqn9LtLbGoKEBvYWDij'
}

export const triggerHeartbeat = (beat: heartbeat) => {
  axios.get(beat).catch(
    (err) => {
      console.log(chalk.red('Heartbeat failed to trigger'));
      console.log(err);
      console.log(chalk.red('====================='));
    }
  );

  return true;
}