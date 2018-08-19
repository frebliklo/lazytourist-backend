# Tourist backend

This project is a dive into learning more node and serve as a backend to these applications: [tipCalc](https://github.com/frebliklo/tip-calculator) and [tipCalcNative](https://github.com/frebliklo/tipcalcnative)

If you want to know more about the app and the frontend then please check out the repos or the [design files in Figma](https://www.figma.com/file/HlwfxHwAtONcq1XLfFxAEim0/tipCalc?node-id=0%3A1)

You can find the native version on [Google Play](https://play.google.com/store/apps/details?id=com.frebliklo.tipcalc)!

## 1.0 Installation and setup

### 1.1 Setup
To get going with the project locally then clone the repo and install all dependencies

`npm install`

### 1.2 MongoDB
The project uses mongodb. To get up and running do the following:

Install MongoDB Community server. The latest version can be found [here](https://www.mongodb.com/download-center?jmp=nav#community)

When installed go into the folder where you've installed mongo and proceed into the bin folder

`cd mongo/bin`

Start the database server and provide the path to your local data source for the database

`./mongod --dbpath ~/mongo-data`

If everything went succesfully, the last line in the terminal should be: `[initiateandlisten] waiting for connections on port 27017`

In a new tab or terminal window you can now connect to the database

`./mongo`

Now you're ready to run commands. Test your connection by inserting some arbitrary document

`> db.Tourist.insert({name: 'John D Rockefeller'})`

You should get a message saying `WriteResult({ "nInserted": 1 })`. This means that you have succesfully inserted a document in the database. Yay!

To make sure that everything went ok run the following to retrieve and review the document

`> db.Tourist.find()`

When developing you need to enable authentication and store the credentials along with the other API keys needed (see below in 2.1).

When working with the db locally I use Robo 3T to have a graphical UI. If you want ot do the same then you can find the application at their website [https://robomongo.org/](https://robomongo.org/)

## 2.0 Development

### 2.1 API keys

To run the application locally you need API keys for the different APIs used and store them in `keys/dev.js`

The needed API keys are:
- [CurrencyLayer](https://currencylayer.com/)
- [Fixer.io](https://fixer.io/)
