# clay-driver-mysql@3.0.2

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




