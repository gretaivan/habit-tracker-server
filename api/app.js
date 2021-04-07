const app = require('./server');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`[SERVER] Habit is listening on port:  ${port}!`))


const streak = require('./models/habits');

async function testing(){
let test = await streak.updateStreak(1, 'coding')
return test
};

testing()

console.log(await testing())