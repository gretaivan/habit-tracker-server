const app = require('./server');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`[SERVER] Habit is listening on port:  ${port}!`))


const streak = require('./models/habits');

async function testing(){
    //2 'coding'
    //let test = await streak.updateStreak(4, 'water')
    //console.log(test)
    //let test1 = await streak.resetCompleted(4, 'water')
    //console.log(test1)
    //let test2 = await streak.resetCompleted(3, 'sleeping')
    //console.log(test2)

};

testing();
// console.log(testing())