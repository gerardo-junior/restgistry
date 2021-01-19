# Restgistry [![Gitpod Ready-to-Code](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#/https://github.com/gerardo-junior/restgistry)

```
    [+] AUTOR:        Gerardo Junior
    [+] SITE:         https://gerardo-junior.com
    [+] EMAIL:        me@gerardo-junior.com
    [+] GITHUB:       https://github.com/gerardo-junior/tap.api
    [+] TELEGRAM:     @gerardojunior
```

## Come on, do your tests

#### But what will you need?

- [docker](https://docs.docker.com/install/) ~ 18.04.0-ce
- [docker-compose](https://docs.docker.com/compose/) ~ 1.21.1

#### Okay, how to put it to up?

First clone of the project
```bash
git clone https://github.com/gerardo-junior/restgistry.git
cd restgistry
```


Copy the configuration file, and edit
```bash
cp .env.example .env # and configure!
```


ready, now you can use ;)

```bash
docker-compose up # the first time, it will download the images
```

*~ Tip: using the docker-compose you can add `-d` and you can keep with your terminal ~*

To access the api:

Wait for message and open [localhost:8080](http://localhost:8080) in your browser

To use a cli:
```bash
docker-compose exec restgistry node
```

** For more information about the api container read the [README](http://github.com/gerardo-junior/TAP.api.environment) of api.environment

#### How can i use the cli?

```bash
docker-compose exec restgistry npm run start
```

## Run without docker:

you will need to install:

- [nodejs]
- [mysql]

> configure .env to local mysql

```bash
npm install
npm run start
```

## Troubleshooting

#### Is the port already used by other services?

edit the file [docker-compose.yml](docker-compose.yml)
```yml
# (...)


  restgistry:
    image: gerardojunior/nodejs:stable
    restart: on-failure
    container_name: restgistry
    command: npm run start
    env_file:
      - .env
    volumes:
      - .:/src
    ports:
      - [any door]:8080
    links:
      - db
    depends_on:
      - db

# (...)
```

### License  
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
