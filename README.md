# AI-Powered-App

This is a project that demonstrates how to use several AI technologies:

- OpenAI chat completion API
- Deepgram speech-to-text API
- Replicate API to run the miniGPT vision encoder model
- gpt-3-encoder package to tokenize strings into tokens (which are used to set limits on the length of prompts sent to OpenAI)

## Get it Working

To see this project working, you can clone the project and then do the following.

### Install dependencies

```
npm install
```

### Create .env file

Create a `.env` file at the root of the project and then go into the `.gitignore` file and add `.env` to the list. This will make sure that the `.env` file does not get pushed up to github if you choose to push the project up to github.

## API Keys

Add API keys to the `.env` file as you see in the `.env-example` file. Go to each of these websites to sign up for an API key:

[OpenAI](https://platform.openai.com/signup)

[Deepgram](https://dpgr.am/deepgram-signup)

[Replicate](https://replicate.com/)

### Run the development environment

```
npm run dev
```

### Run the server

```
node index.js
```

### Questions

If you have any questions, you can reach out to me on [twitter](https://twitter.com/sandra_rodgers_)
