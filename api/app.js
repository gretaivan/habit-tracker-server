const app = require('./server');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`[SERVER] Habit is listening on port:  ${port}!`))


const streak = require('./models/habits');

async function testing(){
    //2 'coding'
    let test = await streak.updateStreak(3, 'sleeping')
    await console.log(test)

};

testing();
//console.log(testing())
