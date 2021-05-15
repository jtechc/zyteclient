# zyteclient

An annoyingly average discord.js command handler that is very work in progress.

> ##Note
> 
> #Due to the raging popular demand, I've decided to ship the command in a super nifty way (sound familiar?)

  `ZyteClient`: Class; `zyteClient`: instanceof @extends Discord.Client; `zyteclient`: package name

 ## Good luck!

`ZyteClient` class is where your initial loading will take place.

## Require --- Deconstruct


```javascript
require('dotenv').config();
const { Client } = require('discord.js');
const { ZyteClient } = require('zyteclient');

const client = new Client();
```

## Then new constructor on your client.on('ready') event

```javascript
client.on('ready', () => {
  //passing in the zyteClient parameter, and options object...
  new ZyteClient(client, {

    /** both commandsDirectory and eventsDirectory
     *  can have whatever name you want.  If the directory specified 
     *  doesn't exist, it'll create it.
     */  

    commandsDirectory: 'commands',
    eventsDirectory: 'events',
    ownerId: [' '],
    prefix: '%',
    mongoURI: process.env.MONGOURI,
  });
  console.log(`Logged in as ${client.user.username}`);

  // .. rest of logging in here
})
```

## Command and Events Folder

Ideally..
#### File loader will load any folders/files within the specified commandsDirectory and eventsDirectory.

Then require the `CommandConstructor` and you have some required/optional properties.

```javascript
//top of ping.js
const { CommandConstructor } = require('zyteclient');

module.exports = new CommandConstructor({
  name: 'ping',
  aliases: ['pong'], // optional 
  description: 'Ping the pong.',
  leastArgs: 0,
  mostArgs: Infinity,
  ownerOnly: false, // optional
  category: 'fun',
  init: (client) => {
    client.writeOnInfo = ({ result: `${this.name} was loaded.` });
  },
  run: async (message, args, client) => {
    message.reply('Pong.');
  };
});
```
The three parameters that each command can take are:
* `message`: Message
* `args`: Command arguments after the command name [0]
* `client`: `instanceof @extends Client` (discord.js)

## Installation


```
npm i zyteclient
```


## License

ISC