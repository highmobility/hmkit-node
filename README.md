# HMKit Node.js SDK

[![NPM version](https://img.shields.io/npm/v/hmkit.svg)](https://www.npmjs.com/package/hmkit) | ![Build Status](https://github.com/highmobility/hmkit-node/workflows/Node%20CI/badge.svg)

![Auto API](https://github.com/highmobility/auto-api/blob/master/assets/autoapi-header.png?raw=true)

The HMKit Node.js SDK makes it easy to work with car data using HIGH MOBILITY's Auto API. The SDK implements a strong security layer between your Node.js app and the platform, and offers a straightforward native interface to read from – and write to – connected cars.

The library is designed to give Node.js developers simple access to High Mobility's systems, by handling the communication protocols, authentication flows and other security related components in their entirety.

# Table of contents

- [HMKit Node.js SDK](#hmkit-nodejs-sdk)
- [Table of contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Getting started](#getting-started)
    - [Examples](#examples)
  - [Contributing](#contributing)
  - [Licence](#licence)

## Requirements

HMKit Node.js SDK requires Node v10.0.0 or higher.

## Installation

Use the npm package manager for Node.js. Simply type the following into a terminal window:

```
$ npm install hmkit
```

## Getting started

Get started by reading High Mobility's [Node.js SDK guide](https://docs.high-mobility.com/guides/getting-started/node-js/).  
Check out the [code references](https://docs.high-mobility.com/api-references/code-references/node-js/telematics/) for additional information.

### Examples

Two sample apps are available on Github.com, and showcase different use-cases for HMKit:

- [Scaffold](https://github.com/highmobility/hm-node-scaffold)
  - Demonstrates the most basic implementation of HMKit.
- [AutoAPI Explorer](https://github.com/highmobility/hm-node-auto-api-explorer)
  - This project implements [High Mobility's](https://www.high-mobility.com/) OAuth and the HMKit Node.js SDK for working with car data. It consists of two pages: a login page to start the authentication flow, and a dashboard which displays the car's diagnostics state and which can lock and unlock the doors via the Auto API.

## Contributing

We will happily accept patches and contributions to this project. Before getting to work, please first discuss the changes that you wish to make with us via [GitHub Issues](https://github.com/highmobility/hmkit-node/issues), [Spectrum](https://spectrum.chat/high-mobility/) or [Slack](https://slack.high-mobility.com/).

See more in [CONTRIBUTING.md](https://github.com/highmobility/hmkit-node/blob/master/CONTRIBUTING.md)

## Licence

This repository is released under the MIT licence. See more in [LICENCE](https://github.com/highmobility/hmkit-node/blob/master/LICENSE.md)
