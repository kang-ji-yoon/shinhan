var router = require('express').Router();

var admin = require('firebase-admin');

var path = require('path');

var express = require('express');
var app = express();

const convert = require('xml-js');
const request = require('request');

var fs = require('fs');

var serviceAccount = require("./curtaincall-62a7f-firebase-adminsdk-0jpve-95a15f8f97.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://curtaincall-62a7f.firebaseio.com/"
});

var db = admin.database();

var ref = db.ref("/");

router.route('/').get((req, res) => {
  var val4;
  var bankRef = ref.child("bank")
  bankRef.orderByChild("bank").once("value", function(data){
        
    var datapost = data.val();

    var code;
    for(var temp in datapost)
        code = temp;

    
    val4 = {
      money:datapost[code]
    };

    res.json(val4);
  });
  
});

router.route('/delmoney').get((req, res) => {
  res.render('delmoney.html');
});

router.route('/delmoneyout').get((req, res) => {
  res.render('delmoneyout.html');
});

router.route('/yourself').get((req, res) => {
  res.render('yourself.html');
});

router.route('/moneysol').get((req, res) => {
  res.render('moneysol.html');
});

router.route('/moneysolout').get((req, res) => {
  res.render('moneysolout.html');
});

router.route('/yourselfout').get((req, res) => {
  res.render('yourselfout.html');
});

router.route('/yourselfout').post((req, res) => {
  res.render('yourselfout.html');
});


router.route('/moneysolout').post((req, res) => {

  console.log('moneysolout 처리함')

  const axios = require('axios');
  let x = [];
  let y = [];
  var i;

  var addressRef = ref.child("map")

  var val = {
    money: req.body.money,
    person: req.body.people
  };

  console.log(val.money)
  console.log(val.person)

  var val2 = val.money / val.person

  for (i = 0; i < val.person; i++) {
    x.push(Math.random() * (38 - 35.5) + 35);
    y.push(Math.random() * (129 - 126.5) + 126);
    console.log('randomnum');
  }

  for (i = 0; i < val.person; i++) {
    
    axios.get('https://maps.googleapis.com/maps/api/geocode/xml?latlng='+x[i].toFixed(8)+','+y[i].toFixed(8)+'&key=AIzaSyAjZinzVhowvPjP4zu91avN7WyFG4BlpQ0')
      .then((response) => {

        fs.appendFile('maps.xml', response.data, 'utf8', function (error, data) {
          if (error) {
            throw error
          };
          console.log("ASync Write Complete");
        });

        var xmlToJson = convert.xml2js(response.data, {
          compact: true,
          spaces: 4
        });

        console.log(xmlToJson.GeocodeResponse.result[0].formatted_address._text);

        addressRef.child(xmlToJson.GeocodeResponse.result[0].formatted_address._text).set({
          address: xmlToJson.GeocodeResponse.result[0].formatted_address._text,
          money: val2
        });

      })
      .catch((error) => {
        console.log(error);
      })
  }

  res.render('moneysolout.html');

});

router.route('/delmoneyout').post((req, res) => {

  var val3 ={
    receiveMoney: req.body.receiveMoney,
    account: req.body.account,
    address: req.body.address,
    pw1: req.body.pw1,
    pw2: req.body.pw2,
    pw3: req.body.pw3,
    pw4: req.body.pw4
  }
  
  var passwordRef = ref.child("password")
  passwordRef.orderByChild("password").once("value", function(data){
        
    var datapost = data.val();

    var code;
    for(var temp in datapost)
        code = temp;

    
    if(datapost[code] == String(val3.pw1+val3.pw2+val3.pw3+val3.pw4))
    {

      var orderRef = ref.child("order")

      orderRef.child(val3.address).set({
        money: val3.receiveMoney,
        address: val3.address,
        account: val3.account
      });
        
      res.render('delmoneyout.html');
    }
    else
    {
    res.render('delmoney.html');
    }
  });
});

module.exports = router;