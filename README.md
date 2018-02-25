# structr

[![Build Status](https://travis-ci.org/xasdx/structr.svg?branch=master)](https://travis-ci.org/xasdx/structr) [![Coverage Status](https://coveralls.io/repos/github/xasdx/structr/badge.svg?branch=master)](https://coveralls.io/github/xasdx/structr?branch=master) [![npm version](https://badge.fury.io/js/node-structr.svg)](https://www.npmjs.com/package/node-structr)

> Utility that generates custom file and directory hierarchies

## Install it

    npm i node-structr -g

## Use it

The script consumes a text-based hierarchy descriptor as its first argument, which contains the directories and files the user wishes to create. The second, optional argument might specify the target directory.

So the following command:

    structr "$(< desc)" "$(pwd)"

will create the desired hierarchy at `pwd`:

```
Creating directory .../dir
Creating file .../dir/file.txt
Creating directory .../dir/dir
Creating file .../dir/dir/file.h
Creating directory .../another_dir
Creating directory .../another_dir/favDir
Creating file .../file.s
```

with `desc` being a descriptor file, containing the following text:

```
dir
 file.txt
 dir
  file.h
another_dir
 favDir
file.s
```

Note: nesting of files and folders is expressed by single space characters.
