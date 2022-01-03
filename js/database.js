var db = window.openDatabase("apple", "1.0", "Apple", 200000);

function log(type, message) {
    var current_time = new Date();
    console.log(`${current_time} [${type}] ${message}`);
  }

  function fetch_transaction_success(name) {
    log("INFO", `Insert "${name}" successfully.`);
  }
  function table_transaction_success(table) {
    log("INFO", `Create table "${table}" successfully.`);
  }
  
  function transaction_error(tx, error) {
    log("ERROR", `SQL Error ${error.code}: ${error.message}.`);
  }
  

function initialize_database() {
    db.transaction(function (tx) {
      var query = `CREATE TABLE IF NOT EXISTS city (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL)`;
  
      tx.executeSql(
        query,
        [],
        table_transaction_success("city"),
        transaction_error
      );
  
      var query = `CREATE TABLE IF NOT EXISTS district (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        city_id INTEGER NOT NULL,
        FOREIGN KEY (city_id) REFERENCES city(id))`;
  
      tx.executeSql(
        query,
        [],
        table_transaction_success("district"),
        transaction_error
      );
  
      var query = `CREATE TABLE IF NOT EXISTS ward (
        id INTEGER PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        district_id INTEGER NOT NULL,
        FOREIGN KEY (district_id) REFERENCES district(id))`;
  
      tx.executeSql(
        query,
        [],
        table_transaction_success("ward"),
        transaction_error
      );
  
      query = `CREATE TABLE IF NOT EXISTS account (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstname TEXT NULL,
        lastname TEXT NULL,
        birthday REAL NULL,
        phone TEXT NULL,
        street TEXT NULL,
        ward_id INTEGER NULL,
        district_id INTEGER NULL,
        city_id INTEGER NULL,
        status INTEGER NOT NULL,
        FOREIGN KEY (city_id) REFERENCES city(id))`;
  
      tx.executeSql(
        query,
        [], table_transaction_success("account"),
        transaction_error
      );
  
      var query = `CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT NULL,
        parent_id INTEGER,
        FOREIGN KEY (parent_id) REFERENCES category(id))`;
  
      tx.executeSql(
        query,
        [],
        table_transaction_success("category"),
        transaction_error
      );
  
      var query = `CREATE TABLE IF NOT EXISTS product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        description TEXT NULL,
        price NUMBER NOT NULL,
        category_id INTEGER NOT NULL,
        image TEXT NULL,
        FOREIGN KEY (category_id) REFERENCES category(id))`;
  
      tx.executeSql(
        query,
        [],
        table_transaction_success("product"),
        transaction_error
      );
  
     
  
      var query = `CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (account_id) REFERENCES account(id),
        FOREIGN KEY (product_id) REFERENCES product(id))`;
  
  
      tx.executeSql(
        query,
        [],
        table_transaction_success("cart_item"),
        transaction_error
      );
    });
  }
  
  function fetch_database () {
    db.transaction(function(tx) {
      var query = "INSERT INTO category (name, description) VALUES (?, ?)";
  
      tx.executeSql(query, ["Category 01", "iPhone 13"],fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["Category 02", "iPhone 13 Pro"],fetch_transaction_success("Category 02"), transaction_error);
  
      var query = "INSERT INTO product (name, description, price, category_id, image) VALUES (?, ?, ?, ?, ?)";
  
      tx.executeSql(query, ["iPhone 13 Mini Pink", "Pink", "18000000", "1", "img/minipink.png"],fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Mini Blue", "Blue", "18000000", "1", "img/miniblue.png"],fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Mini Midnight", "Midnight", "18000000", "1", "img/miniblack.png"],fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Mini Starlight", "Starlight", "18000000", "1", "img/miniwhite.png"],fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Mini Product Red", "Product Red", "18000000", "1", "img/minired.png"],fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Pink", "Pink", "23000000", "1", "img/13pink.png"],fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Blue", "Blue", "23000000", "1", "img/13blue.png"],fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Midnight", "Midnight", "23000000", "1", "img/13black.png"],fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Starlight", "Starlight", "23000000", "1", "img/13white.png"],fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Product Red", "Product Red", "23000000", "1", "img/13red.png"],fetch_transaction_success("Category 01"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Pro Blue", "Blue", "29000000", "2", "img/problue.png"],fetch_transaction_success("Category 02"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Pro Silver", "Silver", "29000000", "2", "img/prosilver.png"],fetch_transaction_success("Category 02"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Pro Gold", "Gold", "29000000", "2", "img/progold.png"],fetch_transaction_success("Category 02"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Pro Graphite", "Graphite", "29000000", "2", "img/problack.png"],fetch_transaction_success("Category 02"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Pro Max Blue", "Blue", "32000000", "2", "img/promaxblue.png"],fetch_transaction_success("Category 02"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Pro Max Silver", "Silver", "32000000", "2", "img/promaxsilver.png"],fetch_transaction_success("Category 02"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Pro Max Gold", "Gold", "32000000", "2", "img/promaxgold.png"],fetch_transaction_success("Category 02"), transaction_error);
      tx.executeSql(query, ["iPhone 13 Pro Max Graphite", "Graphite", "32000000", "2", "img/promaxblack.png"],fetch_transaction_success("Category 02"), transaction_error);

      var query = "INSERT INTO account (username, password, status) VALUES (?, ?, ?)";
      tx.executeSql( query, ["example2@abc.com", "123456",1 ], fetch_transaction_success("example2@abc.com"), transaction_error);
  });
  }