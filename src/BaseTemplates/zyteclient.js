const { Collection, Client } = require('discord.js');

/**
 * @extends {Client}
 */
class zyteclient extends Client {
  /** @type {Collection<string, import('./CommandConstructor')>} */
  commands;
  /** @type {Collection<string, string>} */
  aliases;
  /** @type {string} */
  prefix;
  /** @type {({ result }: { result: string }) => void;} */
  writeOnInfo;
  /** @type {({ result }: { result: string }) => void;} */
  writeOnError;
  /** @type {({ result }: { result: string }) => void;} */
  writeOnDatabase;
}

module.exports.zyteclient = zyteclient;