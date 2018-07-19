# Liri Node App

This is a command line tool for pulling tweets or movie and song info.

## Getting Started

1. `node liri.js my-tweets "user_name"` * no quotes

   * This will show your last 20 tweets and when they were created in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'` * quotes if more than one word

   * This will show the following information about the song in your terminal/bash window
   ```
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
    ```
      * If no song is provided then your program will default to "The Sign" by Ace of Base.

3. `node liri.js movie-this '<movie name here>'` * quotes if more than one word

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
   * If no movie is supplied the program will output data for the movie 'Mr. Nobody.'

4. `node liri.js do-what-it-says`
     
     * LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * Feel free to change the text in that document to test out the feature for other commands.


### Prerequisites

  Before setting up, you must have [NodeJS](https://nodejs.org/en/) installed.

### Installing

1. Clone the Liri Node App repo.

2. Navigate to the root directory and run `npm init -y` &mdash; this will initialize a `package.json`.

3.  Sign up for a spotify API key.
    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   
    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

4. Sign up for a Twitter API key.
    * Step One: Visit <https://apps.twitter.com/app/new>
   
    * Step Two: Fill out the form with dummy data. Type `http://google.com` in the Website input. Don't fill out the Callback URL input. Then submit the form.
   
    * Step Three: On the next screen, click the Keys and Access Tokens tab to get your consume key and secret. 
     
     * Copy and paste them into your .env file, replacing the `your-twitter-consumer-key` and `your-twitter-consumer-secret` placeholders.
   
    * Step Four: At the bottom of the page, click the `Create my access token` button to get your access token key and secret. 
     
     * Copy the access token key and secret displayed at the bottom of the next screen. Paste them into your .env file, replacing the placeholders for `your-twitter-access-token-key` and `your-twitter-access-token-secret`.

5. Next, create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

    ```js
    # Spotify API keys

    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret

    # Twitter API keys

    TWITTER_CONSUMER_KEY=your-twitter-consumer-key
    TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
    TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
    TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

    ```

## Built With

* [NodeJS](https://nodejs.org/en/) - The JavaScript runtime
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - The JIT-compiled programming language
* [Visual Studio Code](https://code.visualstudio.com/) - The text editor used
* [Spotify](https://developer.spotify.com/) - The music API used
* [Twitter](https://apps.twitter.com/app/new) - The tweet API used
* [OMDb API](http://www.omdbapi.com/) - The movie database API used


## Authors

* **Jesse Loftus** - *JLL* - [Loftusjl](https://github.com/loftusjl)
