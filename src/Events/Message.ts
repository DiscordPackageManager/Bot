import { Event, Command } from "@interfaces";
import { Message } from "discord.js";

export const event: Event = {
  name: "message",
  execute: (client, messsage: Message) => {
    if (
      messsage.author.bot ||
      !messsage.content.startsWith(client.config.prefix)
    )
      return;
    const args = messsage.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);

    const cmd = args.shift().toLowerCase();
    if (!cmd) return;
    const command = client.commands.get(cmd) || client.aliases.get(cmd);
    if (command) (command as Command).execute(client, messsage, args);
  },
};
