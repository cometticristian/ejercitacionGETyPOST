const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    list: function (req, res, next) {
        res.render('products', { products: products });
    },
    detail: function (req, res, next) {
        let id = req.params.id;
        let product = [];
        for (let i = 0; i < products.length; i++) {
            if (id == products[i].id) {
                product.push(products[i]);
            }
        }

        res.render('detail', { product: product });
    },
    delete: function (req, res, next) {
        let id = req.params.id;

        products = products.filter((producto) => {return producto.id != id});

        fs.writeFileSync(productsFilePath, JSON.stringify(products));
        res.redirect('/products');
    },
    editForm: function (req, res, next) {
        let id = req.params.id;
        let productsEdit;
        for (let i=0; i<products.length; i++) {
            if (products[i].id == id) {
                 productsEdit = products[i];
            }
            
        }
        res.render('edit', { productsEdit:productsEdit });
    },
    edit: function (req, res, next) {
        let id = req.params.id;
        productEdited = {
            id:Number(id),
            name:req.body.name,
            price:req.body.price,
            status:req.body.status
        }

        for (let i = 0; i < products.length; i++) {
            if (products[i].id == id) {
                products[i] = productEdited;
            }
        }
        

        fs.writeFileSync(productsFilePath, JSON.stringify(products));

        res.redirect('/products');
    },
    create: function (req, res, next) {

        let productId = 0;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id > productId) {
                productId = products[i].id;
            }
        }

        let newProduct =  {
            id: productId + 1,
            name: req.body.name,
            price: Number(req.body.price),
            status: req.body.status
        }

        products.push(newProduct);

        fs.writeFileSync(productsFilePath, JSON.stringify(products));

        res.redirect('/products');
    }
}

module.exports = controller;