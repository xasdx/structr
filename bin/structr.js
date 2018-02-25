#!/usr/bin/env node

require("../lib").generate(process.argv[2], { pathPrefix: process.argv[3] })
