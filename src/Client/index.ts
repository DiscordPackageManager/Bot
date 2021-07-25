import * as dotenv from "dotenv";
import { Client, Collection } from "discord.js";
import path from "path";
import { readdirSync } from "fs";
import { Command, Event, Config } from "@interfaces";
import ConfigJson from "../config.json";

class PackageManager extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();
  public config: Config = ConfigJson;
  public aliases: Collection<string, Command> = new Collection();

  public async init() {
    dotenv.config();
    this.login(process.env["TOKEN"]);

    //#region Commands
    const commandPath = path.join(__dirname, "..", "Commands");
    readdirSync(commandPath).forEach((dir) => {
      const commands = readdirSync(`${commandPath}/${dir}`).filter((file) =>
        file.endsWith(".ts")
      );
      for (const file of commands) {
        const { command } = require(`${commandPath}/${dir}/${file}`);
        this.commands.set(command.name, command);
        console.log(`Loaded ${command.name}`);
        if (command.aliases !== undefined) {
          if (command.aliases.length > 0) {
            command.aliases.forEach((alias) => {
              this.aliases.set(alias, command);
            });
          }
        }
      }
    });
    //#endregion
    //#region Events
    const eventPath = path.join(__dirname, "..", "Events");
    readdirSync(eventPath).forEach(async (file) => {
      const { event } = await import(`${eventPath}/${file}`);
      this.events.set(event.name, event);
      this.on(event.name, event.execute.bind(null, this));
    });
    //#endregion
  }
}

export default PackageManager;
