# eser.live web site

[![discord chat][discord-image]][discord-url] [![build][build-image]][build-url]
[![test coverage][coverage-image]][coverage-url]
[![license][license-image]][license-url]

## Project Description

This codebase contains all the necessary code to operate the
[eser.live](https://eser.live/) website. Since there's no hidden parts
-excluding some API keys- and it's completely open-source, it simply allows you
to modify it or run your own website by following the instructions below.

Additionally, this repository serves as a template for a full-stack web
application built with [Deno Fresh](https://fresh.deno.dev/) and
[Tailwind CSS](https://tailwindcss.com/).

## Components

- Deno's built-in [formatter](https://deno.land/manual/tools/formatter),
  [linter](https://deno.land/manual/tools/linter) and
  [test runner](https://deno.land/manual/basics/testing) and TypeScript support
- Next-gen web framework with [Fresh](https://fresh.deno.dev/)
- In-built data persistence with [Deno KV](https://deno.com/kv)
- High-level OAuth with [Deno KV OAuth](https://deno.land/x/deno_kv_oauth)
- Modern CSS framework with [Tailwind CSS](https://tailwindcss.com/)
- UI components with [Daisy UI](https://daisyui.com/)
- Pre-commit hooks with [pre-commit](https://pre-commit.com/)

## Get Started

### Get Started Locally

Before starting, you'll need:

- A GitHub account
- The [Deno CLI](https://deno.com/manual/getting_started/installation) and
  [Git](https://github.com/git-guides/install-git) installed on your machine

To get started:

1. Clone this repo:
   ```bash
   git clone https://github.com/eser/eser.live.git
   cd eser.live
   ```
1. Create a new `.env` file:
   ```
   DENO_KV_PATH=:memory:
   DENO_KV_ACCESS_TOKEN=
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   EDITOR_LOGINS=
   ```
1. Navigate to GitHub's
   [**New OAuth Application** page](https://github.com/settings/applications/new).
1. Set **Application name** to your desired application name. E.g. `ACME, Inc`.
1. Set **Homepage URL** to `http://localhost:8000`.
1. Set **Authorization callback URL** to `http://localhost:8000/auth/callback`.
1. Click **Register application**.
1. Copy the **Client ID** value to the `.env` file:
   ```bash
   GITHUB_CLIENT_ID=<GitHub OAuth application client ID>
   ```
1. On the same web page, click **Generate a new client secret**.
1. Copy the **Client secret** value to the `.env` file on a new line:
   ```bash
   GITHUB_CLIENT_SECRET=<GitHub OAuth application client secret>
   ```
1. Start the server:
   ```bash
   deno task start
   ```
1. Navigate to `http://localhost:8000` to start playing with the app.

### Bootstrap the Database (Optional)

Use the following commands to work with your local Deno KV database:

- `deno task db:seed` - Populate the database with data from the
  [Hacker News API](https://github.com/HackerNews/API).
- `deno task db:dump > ./temp/backup.json` - Write all database entries to
  `./temp/backup.json`.
- `deno task db:restore ./temp/backup.json` - Restore the database from
  `./temp/backup.json`.
- `deno task db:reset` - Reset the database. This is not recoverable.

## Customize and Extend

### Global Constants

The [./pkg/main/constants.ts](./pkg/main/constants.ts) file includes global
values used across various aspects of the codebase. Update these values
according to your needs.

### Create a Blog Post

1. Create a `.md` file in the [./content/posts](./content/posts) with the
   filename as the slug of the blog post URL. E.g. a file with path
   `/content/posts/20240620-hello-there.md` will have path
   `/blog/20240620-hello-there`.
1. Write the
   [Front Matter](https://daily-dev-tips.com/posts/what-exactly-is-frontmatter/)
   then [Markdown](https://www.markdownguide.org/cheat-sheet/) text to define
   the properties and content of the blog post.

   ````md
   ---
   title: This is my first blog post!
   publishedAt: 2024-06-20T15:00:00.000Z
   summary: This is an excerpt of my first blog post.
   ---

   # Heading 1

   Hello, world!

   ```javascript
   console.log("Hello World");
   ```
   ````
1. Start the server:
   ```bash
   deno task start
   ```
1. Navigate to the URL of the newly created blog post. E.g.
   `http://localhost:8000/blog/20240620-hello-there`.

See other examples of blog post files in [./content/posts](./content/posts).

### Stylesheets

You can create and customize styles within the capabilities of
[Tailwind CSS](https://tailwindcss.com/) and [Daisy UI](https://daisyui.com/).
Tailwind configuration can be found at
[./pkg/main/tailwind.config.ts](./pkg/main/tailwind.config.ts).

## Deploy to Production

This section assumes that a
[local development environment](#getting-started-locally) is already set up.

1. Navigate to your
   [GitHub OAuth application settings page](https://github.com/settings/developers).
1. Set the **Homepage URL** to your production URL. E.g. `https://eser.live`.
1. Set the **Authorization callback URL** to your production URL with the
   `/auth/callback` path. E.g. `https://eser.live/auth/callback`.
1. Copy all the environment variables in your `.env` file to your production
   environment.

### Deploy to [Deno Deploy](https://deno.com/deploy)

1. Clone this repository.
1. Sign into [Deno Deploy](https://dash.deno.com) with your GitHub account.
1. Select your GitHub organization or user, repository, and branch.
1. Select **Automatic** deployment mode and `main.ts` as the entry point.
1. Click **Link**, which will start the deployment.
1. Once the deployment is complete, click on **Settings** and add the production
   environmental variables, then hit **Save**.

You should now be able to visit your newly deployed SaaS.

### Deploy to any VPS with Docker

[Docker](https://docker.com) makes it easy to deploy and run your Deno app to
any virtual private server (VPS). This section will show you how to do that with
AWS Lightsail and Digital Ocean.

1. [Install Docker](https://docker.com) on your machine, which should also
   install
   [the `docker` CLI](https://docs.docker.com/engine/reference/commandline/cli/).
1. Create an account on [Docker Hub](https://hub.docker.com), a registry for
   Docker container images.

> Note: the [`Dockerfile`](./Dockerfile), [`.dockerignore`](./.dockerignore) and
> [`docker-compose.yml`](./docker-compose.yml) files come included with this
> repo.

1. Grab the SHA1 commit hash by running the following command in the repo's root
   folder:

```sh
# get the SHA1 commit hash of the current branch
git rev-parse HEAD
```

1. Copy the output of the above and paste it as `DENO_DEPLOYMENT_ID` in your
   .env file. This value is needed to enable caching on Fresh in a Docker
   deployment.

1. Finally, refer to these guides for using Docker to deploy Deno to specific
   platforms:

- [Amazon Lightsail](https://deno.land/manual/advanced/deploying_deno/aws_lightsail)
- [Digital Ocean](https://deno.land/manual/advanced/deploying_deno/digital_ocean)
- [Google Cloud Run](https://deno.land/manual/advanced/deploying_deno/google_cloud_run)

## REST API Reference

### `GET /api/questions`

Get all questions in chronological order. Add `?cursor=<cursor>` URL parameter
for pagination. Limited to 10 questions per page.

Example 1:

```jsonc
// https://hunt.deno.land/api/questions
{
  "items": [
    {
      "id": "01HAY7A4ZD737BHJKXW20H59NH",
      "userLogin": "Deniswarui4",
      "question": "czxdczs",
      "score": 0
    },
    {
      "id": "01HAD9KYMCC5RS2FNPQBMYFRSK",
      "userLogin": "jlucaso1",
      "question": "Ok",
      "score": 0
    },
    {
      "id": "01HA7YJJ2T66MSEP78NAG8910A",
      "userLogin": "BrunoBernardino",
      "question": "LockDB: Handle process/event locking",
      "score": 2
    }
    // 7 more items...
  ],
  "cursor": "AjAxSDdUNTBBUkY0QzhEUjRXWjkyVDJZSFhZAA=="
}
```

Example 2 (using `cursor` field from page 1):

```jsonc
// https://hunt.deno.land/api/questions?cursor=AjAxSDdUNTBBUkY0QzhEUjRXWjkyVDJZSFhZAA==
{
  "items": [
    {
      "id": "01H777YG17VY8HANDHE84ZXKGW",
      "userLogin": "BrunoBernardino",
      "question": "Ask Soph about a dead philosopher",
      "score": 2
    },
    {
      "id": "01H6RG2V3AV82FJA2VY6NJD9EP",
      "userLogin": "retraigo",
      "question": "Appraisal: Feature Extraction, Feature Conversion in TypeScript",
      "score": 0
    },
    {
      "id": "01H64TZ3TNKFWS35MJ9PSGNWE1",
      "userLogin": "lambtron",
      "question": "How Deno works (blog post)",
      "score": 2
    }
    // 7 more items...
  ],
  "cursor": "AjAxSDJUSlBYWUJRM1g0OEo2UlIzSFgyQUQ0AA=="
}
```

### `GET /api/questions/:id`

Get the question with the given ID.

Example:

```jsonc
// https://hunt.deno.land/api/questions/01H5379J1VZ7EB54KSCSQSCRJC
{
  "id": "01H5379J1VZ7EB54KSCSQSCRJC",
  "userLogin": "lambtron",
  "question": "saaskit-danet: a modern SaaS template built for Fresh for SSR and Danet for the API",
  "score": 10
}
```

### `GET /api/users`

Get all users in alphabetical order by GitHub login. Add `?cursor=<cursor>` URL
parameter for pagination. Limited to 10 users per page.

Example 1:

```jsonc
// https://hunt.deno.land/api/users
{
  "items": [
    {
      "login": "51chengxu",
      "sessionId": "9a6745a1-3a46-45c8-a265-c7469ff73678"
    },
    {
      "login": "AiridasSal",
      "sessionId": "adb25cac-9be7-494f-864b-8f05b80f7168"
    },
    {
      "login": "ArkhamCookie",
      "sessionId": "fd8e7aec-2701-44ae-925b-25e17ff288c4"
    }
    // 7 more users...
  ],
  "cursor": "AkVob3ItZGV2ZWxvcGVyAA=="
}
```

Example 2 (using `cursor` field from page 1):

```jsonc
// https://hunt.deno.land/api/users?cursor=AkVob3ItZGV2ZWxvcGVyAA==
{
  "items": [
    {
      "login": "EthanThatOneKid",
      "sessionId": "ae7425c1-7932-412a-9956-e456787d557f"
    },
    {
      "login": "Fleury99",
      "sessionId": "2e4920a3-f386-43e1-8c0d-61b5e0edfc0d"
    },
    {
      "login": "FriendlyUser",
      "sessionId": "508ff291-7d1c-4a67-b19f-447ad73b5914"
    }
    // 7 more users...
  ],
  "cursor": "Ak5ld1lhbmtvAA=="
}
```

### `GET /api/users/:login`

Get the user with the given GitHub login.

Example:

```jsonc
// https://hunt.deno.land/api/users/hashrock
{
  "login": "hashrock",
  "sessionId": "97eec97a-6636-485e-9b14-253bfa3ce1de"
}
```

## Goals and Philosophy

For the user, the website should be fast, secure and have a design with clear
intent. Additionally, the HTML should be well-structured and indexable by search
engines. The defining metrics for these goals are:

- A perfect [PageSpeed Insights](https://pagespeed.web.dev/) score.
- Fully valid HTML, as measured by
  [W3C's Markup Validation Service](https://validator.w3.org/).

For the developer, the codebase should minimize the steps and amount of time
required to get up and running. From there, customization and extension of the
web app should be simple. The characteristics of a well-written codebase also
apply, such as:

- Easy to understand
- Modular functionality
- Clearly defined behavior with validation through tests

## Community and Resources

Join [the `#lobi` channel in eser.live Discord][discord-url] to ask questions,
and get unblocked.

[discord-image]: https://img.shields.io/discord/684898665143206084?logo=discord&style=social
[discord-url]: https://discord.gg/ckS4huSvEk
[build-image]: https://github.com/eser/eser.live/actions/workflows/ci-cd.yml/badge.svg
[build-url]: https://github.com/eser/eser.live/actions/workflows/ci-cd.yml
[coverage-image]: https://codecov.io/gh/eser/eser.live/branch/main/graph/badge.svg?token=77F8TYTP13
[coverage-url]: https://codecov.io/gh/eser/eser.live
[license-image]: https://img.shields.io/github/license/eser/eser.live.svg?style=flat-square
[license-url]: https://github.com/eser/eser.live/blob/main/LICENSE
