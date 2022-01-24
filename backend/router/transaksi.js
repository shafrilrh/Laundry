// memanggil library
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const md5 = require('md5')
app.use(express.json())
// memanggil model
const transaksi = require('../models/index').transaksi
const detail_transaksi = require("../models/detail").detail

// memanggil verifyToken agar bisa digunakan
const verify = require('./verify')

// use app
app.use(express.urlencoded({ extended:true }))

// GET
app.get('/',verify, async (req,res) =>{
    transaksi.findAll({
        include: [{all:true, nested: true}]
    })
    .then(result=>{
        res.json(result)
    })
    .catch(error =>{
        res.json({
            message: error.message
        })
    })
})

// POST
app.post('/', async (req, res) => {
    let data = {
        id_member: req.body.id_member,
        tgl: req.body.tgl,
        batas_waktu: req.body.batas_waktu,
        tgl_bayar: req.body.tgl_bayar,
        status: req.body.status,
        dibayar: req.body.dibayar,
        id_user: req.body.id_user
    }
    transaksi.create(data)
    .then(result => {
        res.json({
            message: 'Data Inserted',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// PUT
app.put('/',verify,  async (req, res) => {
    let param = { id_transaksi: req.body.id_transaksi }
    let data = {
        id_member: req.body.id_member,
        tgl: req.body.tgl,
        batas_waktu: req.body.batas_waktu,
        tgl_bayar: req.body.tgl_bayar,
        status: req.body.status,
        dibayar: req.body.dibayar,
        id_user: req.body.id_user
    }
    transaksi.update(data,{where:param})
    .then(result => {
        res.json({
            message: 'Data Updated',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// DELETE
app.delete('/:id_transaksi',verify,  async (req, res) => {
    let param = { id_transaksi: req.params.id_transaksi }
    transaksi.destroy({where:param})
    .then(result => {
        res.json({
            message: 'Data Destroyed',
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app



