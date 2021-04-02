const app = require('./server');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`[SERVER] Habit is listening on port:  ${port}!`))

const db = require ('./dbConfig/init');
const User = require('./models/User');

