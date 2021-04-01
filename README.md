# Force of Habit
An app to track your habits. 

## Installation & Usage 
## Instalation 
+ clone the repo 

## Usage
### To run in local
+ TO run Node
**`npm start`**
+ To run nodemon
**`npm run dev`**
+ To run tests
**`npm test`**


### To run in server
+ **`bash _scripts/startDev.sh`**
    - starts api & db services
+ **`npm run unitTests`** (from within api folder)
    - triggers a test run of unit tests only
+ **`bash _scripts/startTest.sh`**
- starts api & db services testing

**`bash _scripts/teardown.sh`**
- stop all running services with removal of data

***Do not run both dev and test environments at the same time.***
*** **`dbConfig`** file should be used with names that has prefic "dev_" ***

## Technologies
### Deployment

+ node v12.18.4
+ cors v2.8.5
+ express v4.17.1
+ pg v8.5.1
+ postgres v11.1

### Development
+ jest v26.6.3
+ nodemon v2.0.7
+ supertest 6.1.3

## Authors

## License 

## Process 
### application folder system setup
+ set up the appropriate folder structure
+ added script files 
+ installed dependencies for the application
+ added docker compose files
+ added testing suite with dependencies

### db\migrations 
//TODO
1. Create database schema
//TODO
### dbCongfig file
2. Set up  the DB configuration files 
3. Seed in some data to the DB to start dev process

## Server functionality


### Client 




## Bugs
 

## Wins & Challenges


add to jest tests
--setupFiles ./__tests__/integration/config.js