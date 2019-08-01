# Assembly Organizing Discord Bot

## Development

### Prerequirements

Node.js is required for this project to run.

- Node `^10.15.0`
- Discord.js `^11.4.2`

### Install dependencies

```bash
$ yarn
```

### Scripts

```bash
# Start bot in development mode
$ yarn run dev
```

### Discord Server

If you want to try out your modifications, you will need a personal server where you can test that everything works before attaching the production account details.

Follow the link below to create Discord server:

- [https://support.discordapp.com/hc/en-us/articles/204849977-How-do-I-create-a-server-](https://support.discordapp.com/hc/en-us/articles/204849977-How-do-I-create-a-server-)

### Bot Account

- Visit page [https://discordapp.com/developers/applications/](https://discordapp.com/developers/applications/)
- Create a New Application, and give it a name
- Click Create a bot account, then Yes, do it
- Visit [https://discordapp.com/oauth2/authorize?client_id=APP_ID&scope=bot](https://discordapp.com/oauth2/authorize?client_id=APP_ID&scope=bot) , replacing APP_ID with the Client/Application ID from the app page, to add the bot to your server (or ask a server admin to do it for you).
- Copy your bot's Token and keep it for later
