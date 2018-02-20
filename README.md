# structr

[![Build Status](https://travis-ci.org/xasdx/structr.svg?branch=master)](https://travis-ci.org/xasdx/structr) [![Coverage Status](https://coveralls.io/repos/github/xasdx/structr/badge.svg?branch=master)](https://coveralls.io/github/xasdx/structr?branch=master) [![npm version](https://badge.fury.io/js/node-structr.svg)](https://www.npmjs.com/package/node-structr)

> Utility that generates custom file and directory hierarchies

## Install it

    npm i node-structr -g

## Use it

The script consumes a text based hierarchy descriptor as its first argument, which contains the directories and files the user wishes to create.

Nesting can be expressed by space characters. See the example input below:

```
dir
 file.txt
 dir
  file.h
another_dir
 favDir
file.s
```
