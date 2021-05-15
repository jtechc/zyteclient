const { connect } = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const colors = require('colors');

/** @param {string} mongoURI */
module.exports = async () => {
    await connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    keepAlive: true,
  },
    (e) => {
      if (e) throw e;
      else console.log(`${colors.zebra('-DATABASE CONNECTED-')}`)
    }
  );
};