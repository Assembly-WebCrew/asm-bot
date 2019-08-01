import { Client, Message, RichEmbed } from 'discord.js';
import { isOrganizer } from '../utils/isOrganizer';
import { getManager } from 'typeorm';
import { Keyword } from '../database';
import config from '../config';

const keywordRepository = getManager().getRepository(Keyword);

export default {
  trigger: 'keywords',
  exec: async (client: Client, message: Message, args: string[]) => {
    if (await isOrganizer(message.member)) {
      const [action, trigger, ...response] = args;
      const unifiedMessage = response.join(' ');
      const embedBase = new RichEmbed().setColor('#0099ff');
      switch (action) {
        case 'add':
          await message.channel.send(
            embedBase
              .setTitle('New Keyword')
              .setDescription(await addNewKeyword(trigger, unifiedMessage))
          );
          break;
        case 'edit':
          console.log('edit');
          break;
        case 'delete':
          console.table([
            trigger,
            Number(trigger),
            isNaN(Number(trigger))
          ]);
          if(isNaN(trigger as any)) {
            await message.channel.send(
              embedBase
                .setTitle('Keywords delete - Failed')
                .setDescription('Make sure you type the proper number of the keyword you want to delete!')
            )
          }
          break;
        case 'list':
          await message.channel.send(
            embedBase.setTitle('Keywords List').setDescription(await listKeywords())
          );
          break;
        default:
          await message.channel.send('Available actions for keywords: add / edit / delete / list');
          break;
      }
    }
  }
};

const addNewKeyword = async (trigger: string, response: string) => {
  if (!trigger) {
    return 'Please provide an trigger words that will be used for custom keyword command';
  } else if (!response) {
    return 'please provide an response that you want the keyword command to return';
  }

  const keywordEntity = await keywordRepository.create({
    trigger,
    response
  });
  const savedKeyword = await keywordRepository.save(keywordEntity);
  console.log(savedKeyword);
  return `There should now be an command ${config.bot['prefix']}${
    savedKeyword.trigger
  } with response: ${savedKeyword.response}`;
};

const editKeyword = async (id: number) => {

};

const deleteKeyword = async (id: number) => {
  const getSelectedKeyword = await keywordRepository.find({id})
  console.log(await getSelectedKeyword);
};

const listKeywords = async () => {
  const getAllKeywords = await keywordRepository.find();
  const formatKeywordslist = getAllKeywords.map(({ trigger, response }, index) => {
    return index + ' - ' + '`!' + trigger + '` = `' + response + '`';
  });
  const stringifyKeywords = formatKeywordslist.join('\n');
  return stringifyKeywords;
};
