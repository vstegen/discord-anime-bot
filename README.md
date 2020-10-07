# Discord Bot

This is a small Discord bot allowing users to query information about anime and manga. It is built using `discord.js` and the `AniList API` to get the information.

I initially created this bot in order to get more familiar with GraphQL and Discord bots in general.

## Setup

Clone this repo and run `npm install` to install all dependencies.

In order to use it, create an `.env` file in the project's root directory containing your Discord token:

.env file:
```env
TOKEN=<insert token here>
```

The token can be generated here: [Discord for developers](https://discord.com/developers). Here, you have to set up a new application and copy the corresponding generated token.

## Usage

After installing the dependencies using `npm install`, the bot can be started via `npm start`.

## Commands

The bot currently only supports two commands:

```
!anime <anime name>
!manga <manga name>
```

Both commands will then display the following information:

* Show title
* AniList URL
* Average score
* Season & season year
* Start & end date
* Episode / volume count
* Short description
* Preview image of the show
