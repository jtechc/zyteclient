const { lstatSync, existsSync, readdirSync, mkdirSync } = require('fs');
const { join } = require('path');
const { zyteClient } = require('../BaseTemplates/zyteClient');
const EventConstructor = require('../BaseTemplates/EventConstructor');

/**
 * @param {string} eventsFolder
 * @param {zyteClient} client
 */
async function LoadEvents(eventsFolder, client) {
  let numberOfEvents = 0;
  if (!existsSync(join(require.main.path, eventsFolder))) {
    client.writeOnInfo({
      result: `There isn't a ${eventsFolder} so I'll create one.`,
    });
    mkdirSync(join(require.main.path, eventsFolder), { recursive: true });
  }
  const eventFiles = readdirSync(join(require.main.path, eventsFolder));
  for (const files of eventFiles) {
    if (lstatSync(join(require.main.path, eventsFolder, files)).isDirectory())
      numberOfEvents += await LoadEvents(`${join(eventsDir, files)}`, client);
    else {
      if (require.main.filename.endsWith('.js') && files.endsWith('.js')) {
        /** @type {EventConstructor} */
        const event = require(join(require.main.path, eventsFolder, files));

        if (event.name === 'ready') continue;
        if (!(event instanceof EventConstructor)) {
          client.writeOnError({
            data: `Event: ${require.main.path}\\${eventsFolder}\\${files} is not set up.`
          });
          continue;
        }
        numberOfEvents += 1;
        client.on(event.name, event.run.bind(null, client));
      }
    }
  }
  return numberOfEvents;
}

module.exports = LoadEvents;