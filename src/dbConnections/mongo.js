const { connect } = require('mongoose');
const colors = require('colors');

/**@param {string} mongoURI */
module.exports = async (mongoURI) => {
  await connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    keepAlive: true,
  },
    (e) => {
      if (e) throw e;
      else console.log(`${colors.blue('-DATABASE CONNECTED-')}`);
    }
  );
};