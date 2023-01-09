# Local development

## On your machine

To get started, run:

´´´ bash
bundle install
´´´

Run this on a local linux environment (e.g WSL)

``` bash
bundle exec jekyll serve -I --force_polling --port 4001 --drafts
```

## Using Docker

You can run the Jekyll generator via a Docker container to monitor file changes, generate the site and host it. To do so, run [the docker compose file in the root of the repository](docker-compose.yml) and browse to http://localhost:4000.

⚠ Keep in mind that the first run of the container will need to initialise Jekyll and its dependencies so it might take a while for the site to come up.

ℹ Based on the excellent work of [EnvyGeeks](https://github.com/envygeeks/jekyll-docker)
