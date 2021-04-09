# Drink() Sleep() Code() Repeat()
An app for developers to track their drinking, coding and sleeping habits. Ensuring that developers have a healthy code life balance. 

## Features 
+ User can register 
+ User can login and logout
+ User can create a habit and choose frequency of tracking
+ User can complete task on image click 
+ Streak is updated if user completes habit on time

### Client 
Find client side code here [here](https://github.com/gretaivan/habit-tracker-client)

## Installation & Usage 
## Instalation 
+ clone the repo
+ cd into folder

## Usage
### To run locallly
+ To run Node
**`npm start`**
+ To run nodemon
**`npm run dev`**
+ To run tests
**`npm test`**


### To run in docker
+  start api & db services
**`bash _scripts/startDev.sh`**
 
+ triggers a test run of unit tests only
**`npm run unitTests`** 
  
+ starts api & db services testing
**`bash _scripts/startTest.sh`**

+ stop all running services with removal of data
**`bash _scripts/teardown.sh`**


***Do not run both dev and test environments at the same time.***
*** **`dbConfig`** file should be used with names that has prefic "dev_" ***

## Technologies
### Deployment

+ node v12.18.4
+ cors v2.8.5
+ express v4.17.1
+ pg v8.5.1
+ postgres v11.1
+ bcrypt v6.14.11

### Development
+ jest v26.6.3
+ nodemon v2.0.7
+ supertest 6.1.3



## Process 
### Application folder system setup
+ set up the appropriate folder structure
+ added script files 
+ installed dependencies for the application
+ added docker compose files
+ added testing suite with dependencies



## Bugs
- [ ] Error message does not appear if there is an error on login 
- [ ] Prevent user from having the same habit multiple times 

 
## Future Features 
- [ ] Edit habit
- [ ] Delete habit
- [ ] Calender view of habits 
- [ ] Streak progress bar 
- [ ] Tokenisation 

## Authors 
[Greta Ivan](https://github.com/gretaivan),
[Pearl Hamilton](https://github.com/pearlhamilton),
[Ryan Kuppan](https://github.com/RKuppan97),
[Semhar Tesfu](https://github.com/Sem-the-dev),
[James Wheadon](https://github.com/JamesWheadon)

## License 
