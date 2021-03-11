# A-Meow-sement Park

Where you spend the day playing like a cat.

A-Meow-sement Park is a single page mini game application that ulilize vanilla Javascript as the front end and rails as the backend API.

User account will be created simply by entering the user name at the welcome screen then game selection will be loaded up to select the mini game desired. BGM and sound effects are implemented to enrich the gaming experience. Although sound can be toggled off, playing with sound on is highly recommended.

Each game will promp a rule message simply explaining the game play flow for each game prior to starting of the game.

Each game will have their own leaderboard of top 10 score.

Users are able to submit their scrore to the database 

Each user will have access to all of their game records and will be able to delete their record if it's not on the leaderboard.

## Play Now

To see the app on public domain, click [here](https://oopanpan.github.io/ameowsement)

## Play Later

To run the app on local machine first clone this repository

### making a local copy of the app
```bash
git clone https://github.com/oopanpan/ameowsement.git
```

### check environment
this project was built in ruby 2.7.1 and postgreSQL as database, you can install using homebrew

```bash
$ brew install ruby
$ brew install postgres
```

### check dependencies and run migration 

**in ameowsment_backend_api**
```bash
$ bundle && yarn
$ rails db:setup
```

### start the server

**in ameowsment_backend_api**
```bash
$ rails s
```

### lauch the website with your favorite browser

run index.html located in ameowsment_frontend folder

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This work is licensed under a Creative Commons Attribution 3.0 Unported License.
"Copyright © 2011 Varazuvi™ www.varazuvi.com"

Studio high quality sounds & musical scoring over a broad range of genres to be used in development under our "Free To Use" license.

Music from Uppbeat (free for Creators!):
https://uppbeat.io/t/all-good-folks/bathtime-funk
License code: GOPHEKYLHHJU5W6K