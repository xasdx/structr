# structr

[![Build Status](https://travis-ci.org/xasdx/structr.svg?branch=master)](https://travis-ci.org/xasdx/structr)

> Utility that generates custom file and directory hierarchies

## Usage

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
