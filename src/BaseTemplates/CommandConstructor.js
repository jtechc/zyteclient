const { zyteclient } = require('./zyteClient');
const { Message } = require('discord.js');


module.exports = class CommandConstructor {
  /** @type {string} */
  name;

  /** @type {string[]} */
  aliases;

  /** @type {string} */
  description;

  /** @type {number} */
  leastArgs;

  /** @type {number} */
  mostArgs;

  /** @type {boolean} */
  ownerOnly;

  /** @type {string} */
  category;

  /** @type {(client: zyteclient) => Promise<unknown> | unknown} */
  init;

  /** @type {({ message, args, client }: { message: Message, args: string[]; client: zyteclient }) => Promise<unknown>;} */
  run;

  /**
   * @param {{
   * name: string;
   * aliases?: string[];
   * description: string;
   * leastArgs: number;
   * mostArgs: number;
   * ownerOnly?: boolean;
   * category: string;
   * init?: (client: zyteclient) => Promise<unknown> | unknown;
   * run: ({ message, args, client }: { message: Message, args: string[]; client: zyteclient }) => Promise<unknown>;
   * }} CommandOptions
   */
  constructor({
    name,
    aliases,
    description,
    leastArgs,
    mostArgs,
    ownerOnly,
    category,
    init,
    run,
  }) {
    if (!ownerOnly) ownerOnly = false;
    if (!aliases) aliases = [];

    this.aliases = aliases;
    this.description = description;
    this.ownerOnly = ownerOnly;
    this.mostArgs = mostArgs;
    this.leastArgs = leastArgs;
    this.category = category;
    this.name = name;
    this.init = init;
    this.run = run;
  }
}
