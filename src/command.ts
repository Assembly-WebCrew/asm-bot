import { Client, Message } from "discord.js";

export interface Command {
    name: string;
    exec(client: Client, message: Message, args: string[]): Promise<void>;
}
