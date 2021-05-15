require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { zyteclient } = require('./BaseTemplates/zyteclient');
const LoadEvents = require('./Loaders/LoadEvents');
const LoadCommands = require('./Loaders/LoadCommands');
const mongo = require('./dbConnections/mongo');
const colors = require("colors");

class zytesasdch {
  /**
   * @private
   * @type {zyteclient}
   */
  _client;
  /**
   * @private
   * @type {string}
   */
  _commandsDirectory;
  /**
   * @private
   * @type {string}
   */
  _eventsDirectory;
  /**
   * @private
   * @type {string}
   */
  _ownerId;
  /**
   * @private
   * @type {string}
   */
  _prefix;
  /**
   * @private
   * @type {string}
   */
  _mongoURI;

  /**
   * @param {Client} client
   * @param {{
   * commandsDirectory?: string;
   * eventsDirectory?: string;
   * ownerId?: string[];
   * prefix: string;
   * mongoURI: string;
   * }} choices
   */
  constructor(client, choices) {
    if (!choices.commandsDirectory) choices.commandsDirectory = 'commands';
    if (!choices.eventsDirectory) choices.eventsDirectory = 'eventsFolder';
    if (!choices.ownerId) choices.ownerId = [];

    this._client = client;
    this._ownerId = choices._ownerId;
    this._commandsDirectory = choices.commandsDirectory;
    this._eventsDirectory = choices.eventsDirectory;
    this._prefix = choices.prefix;
    this._mongoURI = choices.mongoURI;
    this._client.commands = new Collection();
    this._client.aliases = new Collection();
    this._client.prefix = choices.prefix;
    this._client.ownersId = this._ownerId;

    this._client.writeOnInfo = ({ result }) =>
      console.log(
        `${colors.blue('! INFO !')}`.white + colors.white(` ${result}`),
      );
    this._client.writeOnError = ({ result }) =>
      console.log(
        `${colors.red.underline('| ERROR |')}`.white + colors.white(` ${result}`),
      );
    this._client.writeOnDatabase = ({ result }) =>
      console.log(
        `${colors.zebra('-DATABASE CONNECTED-')}`.white + colors.white(` ${result}`),
      );
    this._init();
  }

  /** @private */
  async _init() {
    if (this._mongoURI) await mongo(this._mongoURI);
    else
      this.client.writeOnError({
        result:
          'Mongoose required.',
      });

    this._commands();
    this._events();
  }

  /** @private */
  async _commands() {
    await LoadCommands(
      this._commandsDirectory,
      this._client,
    );

    const setCommands = [];

    for (const command of setCommands) {
      if (!this._client.commands.get(command.name)) {
        this._client.commands.set(command.name, command);
        for (const alias of command.aliases) this._client.aliases.set(alias, command.name);
      }
    }

    this._client.writeOnInfo({
      result: `⚡ zytesasdch ⚡ - loaded ${this._client.commands.size} commands`,
    });
  }

  /** @private */
  async _events() {
    let numberOfEvents = await LoadEvents(
      this._eventsDirectory,
      this._client,
    );

    this._client.writeOnInfo({
      result: `⚡ zytesasdch ⚡ - loaded ${numberOfEvents} events`,
    });
  }

  /** @public */
  get prefix() {
    return this._prefix;
  }
}

module.exports.zytesasdch = zytesasdch;
module.exports.EventConstructor = require('./BaseTemplates/EventConstructor');
module.exports.CommandConstructor = require('./BaseTemplates/CommandConstructor');
