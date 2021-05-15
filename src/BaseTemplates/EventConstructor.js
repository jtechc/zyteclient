const { zyteclient } = require('./zyteclient');
/**
 * @template {keyof import('discord.js').ClientEvents} str
 */

module.exports = class EventConstructor {

  /**
   * @type {str};
   */
  name;

  /** @param {boolean}; */
  once;

  /**
   * @function
   * @param {zyteclient} client
   * @returns {Promise<any>}
   * @type {(client: zyteclient, ...args: import('discord.js').ClientEvents[str]) => Promise<unknown>}
   */
  run;

  /**
   * @param {str} name
   * @param {boolean} once
   * @param {(client: zyteclient, ...args: import('discord.js').ClientEvents[str]) => Promise<unknown>} run
   */
  constructor(name, once, run) {
    this.name = name;
    this.once = once;
    this.run = run;
  }
};