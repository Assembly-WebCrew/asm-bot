import * as fs from 'fs';
import { Client } from 'discord.js';

import { Command } from './command';

import config from './config';
import { dbConnection, Keyword } from './database';

dbConnection()
  .then(async connection => {
    const client = new Client();
    const commands = new Map<string, Command>();

    fs.readdir('./src/commands/', (err, files) => {
      if (err) {
        console.error(err);
        return;
      }

      const modules = files.filter(f => f.split('.').pop() === 'ts');

      if (modules.length <= 0) {
        console.error('No command modules found. Exiting.');
        return;
      }

      console.log(`Loading ${files.length} modules...`);

      modules.forEach(commandFile => {
        const { trigger, exec } = require(`./commands/${commandFile}`).default;
        commands.set(trigger, { name: trigger, exec: exec });
      });
    });

    client.on('ready', async () => {
      console.log(`ASMBot Connected - ${client.users.size - 1} users`);
      client.user.setActivity(`${client.users.size} users`, { type: 'WATCHING' });
    });

    client.on('message', async message => {
      // Ignore bot accounts
      if (message.author.bot) {
        return;
      }

      if (message.content.indexOf(config.bot['prefix']) !== 0) {
        return;
      }

      const messageArray = message.content.split(/\s+/g);
      const command = messageArray[0];
      const args = messageArray.slice(1);
      const cmd = commands.get(command.slice(config.bot['prefix'].length));


      const keywordRepository = await connection.getRepository(Keyword)
      const getKeywordsList = await keywordRepository.find()
      const keywordSearch = getKeywordsList.filter(keyword => keyword.trigger == command.slice(config.bot['prefix'].length))

      if (cmd) {
        await cmd.exec(client, message, args);
        console.log(
          `ASMBot: ${message.author.username}#${
            message.author.discriminator
          } used command '${command}' on ${message.guild.name}`
        );
        } else if (getKeywordsList.length > 0) {
        const [firstResult] = keywordSearch

        await message.channel.send(firstResult.response)
      }
    });

    client.login(config.bot['token']);

    process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
  })
  .catch(error => console.log('TypeORM connection error: ', error));
