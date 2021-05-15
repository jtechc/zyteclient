const { join } = require('path');
const CommandConstructor = require('../BaseTemplates/CommandConstructor');
const { lstatSync, existsSync, readdirSync, mkdirSync } = require('fs');
/**
 * @param {string} commandsDirectory
 * @param {import('../BaseTemplates/zyteclient').zyteclient} client
 * @returns {import('../BaseTemplates/zyteclient').zyteclient}
 */
async function LoadCommands(commandsDirectory, client) {
  if (!existsSync(join(require.main.path, commandsDirectory))) {
    client.writeOnError({
      result: `There isn't a ${commandsDirectory} so I'll create one.`,
    });
    mkdirSync(join(require.main.path, commandsDirectory), { recursive: true });
  }
  const cmdFolders = readdirSync(join(require.main.path, commandsDirectory));
  for (const cmdFolder of cmdFolders) {
    if (lstatSync(join(require.main.path, commandsDirectory, cmdFolder)).isDirectory())
      await LoadCommands(`${join(commandsDirectory, cmdFolder)}`, client);
    else {
      if (require.main.filename.endsWith('.js') && cmdFolder.endsWith('.js')) {
        /** @type {CommandConstructor} */
        const command = require(join(require.main.path, commandsDirectory, cmdFolder));
        if (command.name === 'help') continue;
        if (client.commands.get(command.name)) {
          client.writeOnError({
            result: `${command.name} has two files with the same 'name' property.`,
          });
          continue;
        }
        if (!(command instanceof CommandConstructor)) {
          client.writeOnError({
            result: `The command file ${join(require.main.path, commandsDirectory, cmdFolder,)} is invalid.  Syntax error.`,
          });
          continue;
        }
        client.commands.set(command.name, command);
        if (command.aliases && command.aliases.length > 0)
          for (const alias of command.aliases) {
            if (client.aliases.get(alias))
              client.writeOnError({
                result: `ALIAS ${alias} has more than one of the same alias in the same file.  Be unqiue.`,
              });
            client.aliases.set(alias, command.name);
          }
        if (command.init !== undefined) command.init(client);
      }
    }
  }
  return client;
}

module.exports = LoadCommands;