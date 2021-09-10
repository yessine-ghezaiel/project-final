const router = require('express').Router()

const {tokenMiddleware,checkCommentOwner}= require('../middleware/tokenMiddleware')
const commentController = require('../controllers/commentController')

router.get(`/comments/:id`,commentController.getAllComments)
router.get(`/commentcount`,commentController.getCommentCount)

router.delete(`/deletecomment/:id`,tokenMiddleware,checkCommentOwner,commentController.deleteComment)
router.post(`/addcomment/:id`,tokenMiddleware,commentController.addComment)
router.put(`/updatecomment/:id`,tokenMiddleware,checkCommentOwner,commentController.updateComment)


module.exports = router
