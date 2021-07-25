import Client from "../Client";
import { ClientEvents } from "discord.js";

interface Execute {
  (client: Client, ...args: any[]);
}

export interface Event {
  name: keyof ClientEvents;
  execute: Execute;
}
