import { Command } from "@interfaces";

export const command: Command = {
  name: "install",
  execute: async (client, message, args) => {
    console.log("this should prob install smt");
  },
};
