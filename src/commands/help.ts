import { Client, Message } from 'discord.js';
import config from '../config'

export default {
    trigger: 'help',
    exec: async (client: Client, message: Message, args: string[]) => {
        // Arg 1 = Event(summer/winter)
        // Arg 2 = Keyword

        if (args[0] && args[1]) {
            const event = args[0].toLowerCase();
            const keyword = args[1].toLowerCase();
            if (event.includes('winter') || event.includes('summer')) {
                // TODO:
                // 1. Figure out best way to deliver location details or help which is not hardcoded inside the bot (REST API/GraphQL/Website Scraper?)
                // 2. Build keyword search function in components

            } else {
                await message.channel.send(`Could not recognize given event. Make sure it's either **summer** or **winter**`);
            }
        } else {
            await message.channel.send(`If you need help to find something, please use the command in following format: **${config.bot['prefix']}help winter sleeping**`);
        }
    }
}
