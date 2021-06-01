const { Router } = require('express');
const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct } = require('../controller/product');
const  multer = require('multer');
// const { addCategory, getCategories } = require('../controller/category');
const router = express.Router();
const Product = require('../models/product');
const shortid = require('shortid');
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname )
    }
})

const upload = multer({storage: storage});

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
// router.get('/product/getcategory', getCategories);


module.exports = router;