# Prometheus exporter for WH Group warehouse stock balance

[![](https://github.com/hfreire/whgroup-exporter/workflows/ci/badge.svg)](https://github.com/hfreire/whgroup-exporter/actions?workflow=ci)
[![](https://github.com/hfreire/whgroup-exporter/workflows/cd/badge.svg)](https://github.com/hfreire/whgroup-exporter/actions?workflow=cd)
[![Coverage Status](https://coveralls.io/repos/github/hfreire/whgroup-exporter/badge.svg?branch=master)](https://coveralls.io/github/hfreire/whgroup-exporter?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/hfreire/whgroup-exporter/badge.svg)](https://snyk.io/test/github/hfreire/whgroup-exporter)
[![](https://img.shields.io/github/release/hfreire/whgroup-exporter.svg)](https://github.com/hfreire/whgroup-exporter/releases)

> Export WhGroup wine warehouse metrics like physical stock and much more [WhGroup](https://whgroup.se/).

### Features
* 8 metrics out-of-the-box: physical stock, reserved, reservable, in purchase, in order, on the shelf, balance 3pl, balance difference 3pl
* Uses your existing long-lived session cookie to authorize requests to WhGroup Portal - WhCloud.
* Uses [Request on Steroids](https://github.com/hfreire/request-on-steroids) to rate limit, retry and circuit break outgoing HTTP requests :white_check_mark:
* Launch :rocket: inside a Docker container :whale: so you don't need to manage the dependencies :raised_hands: :white_check_mark:

### How to use

#### Use it in your terminal
Using it in your terminal requires [Docker](https://www.docker.com) installed in your system.

##### Run the Docker image in a container
Detach from the container and expose port `9749`.
```
docker run -d -p "9749:3000" ghcr.io/hfreire/whgroup-exporter
```

##### Use curl to fetch the metrics
```
curl http://localhost:9749/metrics
```

#### Available REST API endpoints
Swagger documentation available at `http://localhost:9749/docs`.

#### Available usage environment variables
Variable | Description | Required | Default value
:---:|:---:|:---:|:---:
PORT | The port to be used by the HTTP server. | false | `3000`
API_KEYS | The secret keys that should be used when securing endpoints. | false | `undefined`
SO_TIMEOUT | TCP socket connection timeout. | false | `120000`
BASE_PATH | Base path to be prefixed to all available endpoint paths. | false | `/`
PING_PATH | Endpoint path for pinging app. | false | `/ping`
HEALTHCHECK_PATH | Endpoint for checking app health. | false | `/healthcheck`
LOG_LEVEL | The log level verbosity. | false | `info`
ENVIRONMENT | The environment the app is running on. | false | `undefined`
ROLLBAR_API_KEY | The server API key used to talk with Rollbar. | false | `undefined`
WHCLOUD_SESSION_COOKIE | WhCloud session cookie to authorize requests. | true | `undefined`

### How to build
##### Clone the GitHub repo
```
git clone https://github.com/hfreire/whgroup-exporter.git
```

##### Change current directory

```
cd whgroup-exporter
```

##### Run the NPM script that will build any required assets

```
npm run build --if-present
```

##### Run the NPM script that will start the server

```
npm run start
```

### How to contribute

You can contribute either with code (e.g., new features, bug fixes and documentation) or
by [donating 5 EUR](https://paypal.me/hfreire/5). You can read the [contributing guidelines](CONTRIBUTING.md) for
instructions on how to contribute with code.

All donation proceedings will go to the [Sverige för UNHCR](https://sverigeforunhcr.se), a swedish partner of
the [UNHCR - The UN Refugee Agency](http://www.unhcr.org), a global organisation dedicated to saving lives, protecting
rights and building a better future for refugees, forcibly displaced communities and stateless people.

### License

Read the [license](./LICENSE.md) for permissions and limitations.
