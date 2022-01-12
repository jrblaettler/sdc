const app = require('./src/app');

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
