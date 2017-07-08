clay-driver-mysql
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/realglobe-Inc/clay-driver-mysql
[bd_travis_url]: http://travis-ci.org/realglobe-Inc/clay-driver-mysql
[bd_travis_shield_url]: http://img.shields.io/travis/realglobe-Inc/clay-driver-mysql.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/realglobe-Inc/clay-driver-mysql
[bd_travis_com_shield_url]: https://api.travis-ci.com/realglobe-Inc/clay-driver-mysql.svg?token=
[bd_license_url]: https://github.com/realglobe-Inc/clay-driver-mysql/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/realglobe-Inc/clay-driver-mysql
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/realglobe-Inc/clay-driver-mysql.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/realglobe-Inc/clay-driver-mysql.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/realglobe-Inc/clay-driver-mysql
[bd_gemnasium_shield_url]: https://gemnasium.com/realglobe-Inc/clay-driver-mysql.svg
[bd_npm_url]: http://www.npmjs.org/package/clay-driver-mysql
[bd_npm_shield_url]: http://img.shields.io/npm/v/clay-driver-mysql.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Mysql driver for ClayDB

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install clay-driver-mysql --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

```javascript
'use strict'

const { MysqlDriver } = require('clay-driver-mysql')

{
  const clayLump = require('clay-lump')
  let lump01 = clayLump({
    driver: new MysqlDriver('my-app', 'user01', 'xxxxxx', {})
  })
  /* ... */
}

```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/03.API.md.hbs" Start -->

<a name="section-doc-guides-03-a-p-i-md"></a>

API
---------

# clay-driver-mysql@3.0.0

Mysql driver for ClayDB

+ Functions
  + [create(args)](#clay-driver-mysql-function-create)
+ [`MysqlDriver`](#clay-driver-mysql-class) Class
  + [new MysqlDriver(database, username, password, options)](#clay-driver-mysql-class-mysql-driver-constructor)

## Functions

<a class='md-heading-link' name="clay-driver-mysql-function-create" ></a>

### create(args) -> `MysqlDriver`

Create driver instance

| Param | Type | Description |
| ----- | --- | -------- |
| args | * |  |



<a class='md-heading-link' name="clay-driver-mysql-class"></a>

## `MysqlDriver` Class

Driver to save data into sqlite

**Extends**:

+ `SequelizeDriver`



<a class='md-heading-link' name="clay-driver-mysql-class-mysql-driver-constructor" ></a>

### new MysqlDriver(database, username, password, options)

Constructor of MysqlDriver class

| Param | Type | Description |
| ----- | --- | -------- |
| database | string | Name of database |
| username | string | Database username |
| password | string | Database password |
| options | Object | Optional settings |
| options.logging | boolean,function | Logging option |
| options.benchmark | boolean | Show benchmark |







<!-- Section from "doc/guides/03.API.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [Apache-2.0 License](https://github.com/realglobe-Inc/clay-driver-mysql/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [ClayDB][clay_d_b_url]
+ [Realglobe, Inc.][realglobe,_inc__url]
+ [MySQL][my_s_q_l_url]

[clay_d_b_url]: https://github.com/realglobe-Inc/claydb
[realglobe,_inc__url]: http://realglobe.jp
[my_s_q_l_url]: https://www.mysql.com/

<!-- Links End -->
