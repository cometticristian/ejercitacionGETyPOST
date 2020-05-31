const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let used = products.filter((producto) => {return producto.status == 'usado'});
let news = products.filter((producto) => {return producto.status == 'nuevo'});

const controller = {
    list: function(req, res, next) {
        res.render('home', {used:used, news:news});
      }
}

module.exports = controller;