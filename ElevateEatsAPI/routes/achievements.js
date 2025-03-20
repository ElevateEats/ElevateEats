const express = require('express');
const router = express.Router()
router.use(express.json())

router.post('/', (req,res,next) =>{
    //create achievement
    console.log(req.body)
    res.status(202).json(req.body)
})

module.exports = router;

