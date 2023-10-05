const express = require('express');
const app = express()

const mongoose = require('mongoose');
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASSWORD)}@cluster0.n7tthgp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

// util/helpers
const dummyDataCreator = ({howManyElements = 0, modelPath = ''}) => {
    const Model = require(modelPath);

    if(howManyElements <= 0 || (typeof modelPath !== 'string' || (typeof modelPath === 'string' && modelPath.length <= 0))) {
        return
    }

    // create data
    let elements = []

    for(let i = 1; i <= howManyElements; i++) {
        elements.push(i)
    }

    // save data into db
    elements.forEach(async el => {
        try {
            let element = new Model({
                title: 'title' + el,
                content: 'content' + el,
            })
            await element.save()
        }
        catch(err) {
            console.log('dummyDataCreator error while saving in db: ', err)
        }
    })
}
// dummyDataCreator({howManyElements: 14, modelPath: './models/post.js'})

// routes
app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'home page', data: {  }, metadata: { status: 'success' }})
})

app.get('/test', (req, res, next) => {
    let posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(el => ({id: el, title: 'item' + el, content: 'content' + el}))

    res.status(200).json({ message: 'test page', data: { posts }, metadata: { status: 'success' }})
})

app.get('/test/db', (req, res, next) => {
    Post.find()
    .then(posts => {
        if(!posts) {
            throw '500: server error'
        }

        res.status(200).json({ message: 'test db page', data: { posts }, metadata: { status: 'success' }})
    })
    .catch(err => {
        next(err)
    })
})

app.use((error, req, res, next) => {
    res.status(500).json({ message: 'error', data: { error }, metadata: { status: 'error' }})
})

mongoose.connect(MONGODB_URI)
.then(result => {
    console.log('db connection ok: ', )
    app.listen(8080, () => {
        console.log('app ok: ', )
    })
})
.catch(err => { console.log('error', err) })