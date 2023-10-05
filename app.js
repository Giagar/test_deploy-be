const express = require('express');
const app = express()

/* const mongoose = require('mongoose');
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@cluster0.n7tthgp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority` */

app.get('/test', (req, res, next) => {
    let posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(el => ({id: el, title: 'item' + el, content: 'content' + el}))

    res.status(200).json({ message: 'test page', data: { posts }, metadata: { status: 'success' }})
})
/* 
mongoose.connect(MONGODB_URI)
.then(result => {
    console.log('db connection ok: ', )
    app.listen(8080, () => {
        console.log('app ok: ', )
    })
})
.catch(err => { console.log('error', err) })
 */
app.listen(8080, () => {
    console.log('app ok: ', )
})