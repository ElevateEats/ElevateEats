const express = require('express')
const router =  express.Router

router.use(express.json)

router.get('/', (req, res, next) => {
        res.status(202).json(req.body)
    }
)