import express from 'express'
const router =  express.Router
router.use(express.json)

router.get('/', (req, res, next) => {
        res.status(202).json(req.body)
})

router.param('id', (req,res,next,id) => {

    next()
})
router.get('/:id', (req, res, next) => {
    req.user
})

router.post('/', (req, res, next) => {

})

router.put('/:id', (req, res, next) => {

})

router.delete('/id', (req, res, next) => {

})

export default router;