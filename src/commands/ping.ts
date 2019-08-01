import { Client, Message } from "discord.js";

export default {
    trigger: 'ping',
    exec: async (client: Client, message: Message, args: string[]) => {
        await message.reply(`Pong! ${client.ping}`);
    }
}
