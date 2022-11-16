# Ohmonpepet

This project was about building a petsitting platform because my wife and I couldn't find a correct one at the time. I worked on it during early mornings and weekends for about a year before dropping it when I joined a new company and needed to focus on having a successfull onboarding !

It still very much a WIP that I stopped working on mid migration from an NoSQL db (MongoDB) to an SQL (PostgreSQL). As such the project is likely not working at all at the moment !

Looking back on it, more than a year after the last development, there are so many thing I would do differently :D

Mostly, I would ship a working MVP so much earlier, one of the reason this project was dropped was that after my wife started a new job herself and stopped working on it, I kept working on it to try new stuff. It became a test ground for different new tools that I wanted to try instead of a product MVP.

Anyhow here is a rundown of the project:

At the start the idea was to build a web only product but the current monorepo structure reflect the later will to leverage the amazing work of [Fernando Rojo](https://twitter.com/FernandoTheRojo) to share code between a NextJS web app and a React Native app.

As such the current monorepo structure is the following:

- web: Web app (NextJS)
- mobile: Mobile app (empty boilerplate)
- shared: test package to share code between the web & mobile
- data: package where I planned the share the http clients and the automatically generate GraphQL operations between the web & mobile apps
- api: an NodeJS express web server serving a GraphQL api

The overall idea was to automatically generate http operations typed hooks from the GraphQL schema and this way provide full stack type safety accross the project. It worked quite well and helped a lot when I was still doing my migration from NoSQL to SQL (which include a significant rework of the GraphQL schema in the process as I was more familiar with the domain).
