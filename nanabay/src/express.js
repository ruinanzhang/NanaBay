
const express = require("express");
const app = express();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0327",
  database: "Nanabay"
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  res.send("go to /posts to see posts");
});

app.get("/user", function(req, res) {
  connection.query(`SELECT * FROM User WHERE user_id = ${req.query.id}`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/update_user", function(req, res) {
  connection.query(`UPDATE User SET ${req.query.column} = "${req.query.value}" 
    WHERE user_id = ${req.query.id}`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
  });
});

// 08-07 comment: no auction_id and price in this form 

// app.get("/add_item", function(req, res) {
//   connection.query(`INSERT INTO item
// VALUES (${req.query.item_id}, ${req.query.user_id}, ${req.query.auction_id}, '${req.query.category}', '${req.query.condition}', '${req.query.description}', '${req.query.pic_url}', '${req.query.price}');`, function(
//     error,
//     results,
//     fields
//   ) {
//     if (error) throw error;
//   });
// });

//This will insert an item to the database 

app.get("/add_item", function(req, res) {
  connection.query(`INSERT INTO item
VALUES (${req.query.item_id}, ${req.query.user_id}, '${req.query.category}', 
'${req.query.condition}', '${req.query.description}', '${req.query.pic_url}');`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
  });
  connection.query(`INSERT INTO auction_seller
VALUES (${req.query.auction_id}, ${req.query.item_id}, '${req.query.min_accept_price}', 
'${req.query.start_time}', '${req.query.end_time}');`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
  });
  connection.query(`INSERT INTO auction_res
VALUES (${req.query.auction_id}, ${req.query.item_id}, null, null, null);`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
  });

});

//This will allow user to add a bid for a sepecic item 

app.get("/add_bid", function(req, res) {
  connection.query(`INSERT INTO auction_buyer
VALUES (${req.query.auction_id}, ${req.query.item_id}, '${req.query.buyer_id}', 
'${req.query.bid}', '${req.query.bid_time}');`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
  });

  console.log(`INSERT INTO auction_buyer
VALUES (${req.query.auction_id}, ${req.query.item_id}, '${req.query.buyer_id}', 
'${req.query.bid}', '${req.query.bid_time}');`);

  connection.query(`UPDATE auction_res SET final_res = ${req.query.bid} 
    WHERE auction_id = ${req.query.auction_id}`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
  });
});

//This will add a new user's info into databse when he/she signed up 

app.get("/add_user", function(req, res) {
  console.log(`INSERT INTO user
VALUES (${req.query.user_id}, '${req.query.email}', '${req.query.username}', 
'${req.query.address}', ${req.query.phone}, '${req.query.register_date}', 'Y', 
'${req.query.last_active}','${req.query.paypal_account}',${req.query.seller_rep},
${req.query.buyer_rep},'${req.query.password}');`);
  connection.query(`INSERT INTO user
VALUES (${req.query.user_id}, '${req.query.email}', '${req.query.username}', 
'${req.query.address}', ${req.query.phone}, '${req.query.register_date}', 'Y', 
'${req.query.last_active}','${req.query.paypal_account}',${req.query.seller_rep},
${req.query.buyer_rep},'${req.query.password}');`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
  });
});


//Likes will return 7 columns:

app.get("/likes", function(req, res) {
  connection.query(`SELECT item_id, description, category, item.condition, pic_url, 
    auction_id, auction_start_time, aution_end_time, user_name as seller_name, 
    seller_rep as seller_reputation
FROM ((Nanabay.Like join item using (item_id))join auction_seller using (item_id)) join user
WHERE item.seller_id = user.user_id AND Like.user_id = ${req.query.id}`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

// This will return the item I won in the aution 
app.get("/orders", function(req, res) {
  connection.query( `SELECT item_id, description, category, item.condition, pic_url, 
    auction_id, auction_start_time, aution_end_time, user_name as seller_name, 
    seller_rep as seller_reputation
FROM ((Nanabay.Like join item using (item_id))join auction_seller using (item_id)) join user
WHERE item.seller_id = user.user_id AND Like.user_id = ${req.query.id}`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});



// this will return my bids
app.get("/bids", function(req, res) {
  connection.query(`SELECT description, auction_buyer.item_id, auction_id, bid,
   bit_time as my_bid_time, min_accept_price as min_accept_price, 
   auction_start_time as start_time, aution_end_time as end_time, user_name as seller_name
FROM ((auction_buyer join item using (item_id))join auction_seller using (auction_id)) join user
WHERE seller_id = user.user_id AND buyer_id =  ${req.query.id}`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});


// this will return my sell/ sold items
app.get("/sales", function(req, res) {
  connection.query(`SELECT item.item_id, description,final_res as lastest_bid, 
    auction_start_time, aution_end_time
FROM (item join auction_seller using (item_id)) join auction_res using (auction_id) 
WHERE item.seller_id =  ${req.query.id}`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});


// this will return basic info about an item
app.get("/item", function(req, res) {
  connection.query(`SELECT pic_url, item_id, user_name as seller_name, 
    description, category, item.condition, user.seller_rep, 
    auction_seller.auction_id, min_accept_price as min_bid_accept_price, 
    auction_start_time, aution_end_time as auction_end_time
FROM (item natural join user) join auction_seller using (item_id)
WHERE item.seller_id = user.user_id
AND item_id = ${req.query.id}`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});


//On this page, seller will see latest three bids from buyers
app.get("/seller_item", function(req, res) {
  connection.query(` 
   SELECT auction_id, auction_buyer.item_id, description, pic_url, 
   user_name as buyer_name, bid as bid_amount,buyer_rep as buyer_reputation
FROM (auction_buyer join user) join item using (item_id)
WHERE auction_buyer.buyer_id = user.user_id 
AND seller_id =  ${req.query.id}
ORDER BY bit_time desc
LIMIT 3`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

// this will show the research results defined by the user 
app.get("/search", function(req, res) {
  connection.query(`SELECT * FROM item
WHERE description LIKE '%${req.query.query}%' OR category LIKE '%${req.query.query}%'` ,
 function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});


// this will show the research results defined by the user 
app.get("/add_search_history", function(req, res) {
  connection.query(`INSERT INTO searches VALUES (${req.query.user_id}, '${req.query.search_time}', '${req.query.filter_used}')`,
 function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

// this will show the research results defined by the user 
app.get("/search_history", function(req, res) {
  connection.query(`SELECT * FROM searches
WHERE user_id = ${req.query.user_id} ORDER BY search_time DESC LIMIT 10` ,
 function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/like", function(req, res) {
  connection.query(`INSERT INTO Nanabay.like VALUES (${req.query.user_id}, ${req.query.item_id})`,
 function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(4000, function() {
  console.log("Example app listening on port 4000!");
});

// this will return if a user can login, if return 0, wrong password, if return 1, successfully logged in 
//At the same time, it will update the last_active time if succussflly logged in 
app.get("/login", function(req, res) {
  connection.query(`SELECT distinct user_id
FROM User
WHERE user_name = '${req.query.username}' and password = '${req.query.password}'`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/update_last_active", function(req,res) {
  connection.query(`UPDATE user SET last_active = ${req.query.query.last_active}
    WHERE user_id = (SELECT distinct user_id FROM User
    WHERE user_name = '${req.query.query}' and password = ${req.query.query}`, function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});
