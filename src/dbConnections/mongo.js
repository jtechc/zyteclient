const { connect } = require('mongoose');
const mongoURI = process.env.MONGO_URI;

module.exports = async () => {
    await connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    keepAlive: true,
  },
    (err) => {
      if (err) throw err;
    }
  );
}