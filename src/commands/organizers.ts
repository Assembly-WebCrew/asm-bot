import { Client, Message } from "discord.js";
import { isOrganizer } from '../utils/isOrganizer';

export default {
    trigger: 'organizers',
    exec: async (client: Client, message: Message, args: string[]) => {
        if (await isOrganizer(message.member)) {
            await message.channel.send(`Yay, You have the proper roles to use this command!`);
        }
    }
}
