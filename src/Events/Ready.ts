import { Event } from "@interfaces";

export const event: Event = {
  name: "ready",
  execute: (client) => {
    client.user.setPresence({
      activity: { name: `for ${client.config.prefix}`, type: "WATCHING" },
      status: "dnd",
    });
    console.log(`Logged in as ${client.user.tag}`);
  },
};
