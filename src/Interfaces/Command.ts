import Client from "../Client";
import { Message } from "discord.js";

interface Execute {
  (client: Client, message: Message, args: string[]);
}

export interface Command {
  name: string;
  description?: string;
  aliases?: string[];
  execute: Execute;
}
