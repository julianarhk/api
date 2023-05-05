const express = require('express')
const { ObjectId } = require('mongodb')
const app = express()
const port = 3000
let db

app.use(express.json())

app.use(async (_req, _res, next) => {
  const connect = require('./database.js')
  db = await connect()
  next()
})

app.post('/cities', async (req, res) => {
  try {
    const result = await db.collection('cities').insertOne({
      ...req.body
    })

    return res.json({
      status: 'ok',
      message: 'City created successfully!',
      data: result
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      data: []
    })
  }
})

app.patch('/cities/:id', async (req, res) => {
  try {
    const result = await db.collection('cities').updateOne(
      {
        _id: new ObjectId(req.params.id)
      },
      {
        $set: req.body
      }
    )

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        status: 'not found',
        message: 'City not found',
        data: []
      })
    }

    return res.json({
      status: 'ok',
      message: 'City patched successfully!',
      data: result
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      data: []
    })
  }
})

app.get('/cities', async (req, res) => {
  try {
    const result = await db
      .collection('cities')
      .find({ ...req.query })
      .toArray()

    if (result.length === 0) {
      res.status(204).json({
        status: 'empty',
        message: 'No city found with the given parameters.',
        data: []
      })
    } else {
      res.status(200).json({
        status: 'ok',
        message: 'City found with the given parameters.',
        data: result
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
      data: []
    })
  }
})

app.get('/cities/state', async (req, res) => {
  try {
    const result = await db
      .collection('cities')
      .find({ state: req.query.state })
      .toArray()

    if (result.length === 0) {
      return res.status(204).json({
        status: 'empty',
        message: `No city found for the state ${req.query.state}`,
        data: []
      })
    }

    return res.json({
      status: 'ok',
      message: `Cities found for the state ${req.query.state}`,
      data: result
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      data: []
    })
  }
})

app.delete('/cities/:id', async (req, res) => {
  // ObjectID / String
  const result = await db
    .collection('cities')
    .deleteOne({ _id: new ObjectId(req.params.id) })

  return res.json({
    status: 'ok',
    message: `City deleted sucessfully!`,
    data: result
  })
})

app.post('/clients', async (req, res) => {
  const result = await db.collection('clients').insertOne({
    ...req.body
  })

  return res.json({
    status: 'ok',
    message: 'Client created sucessfully!',
    data: result
  })
})

app.get('/clients', async (req, res) => {
  try {
    const result = await db
      .collection('clients')
      .find({ ...req.query })
      .toArray()

    if (result.length === 0) {
      res.status(204).json({
        status: 'empty',
        message: 'No client found with the given parameters.',
        data: []
      })
    } else {
      res.status(200).json({
        status: 'ok',
        message: 'Client found with the given parameters.',
        data: result
      })
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
      data: []
    })
  }
})

app.get('/clients/:id', (_req, res) => {
  return res.json({
    status: 'ok',
    message: `Client's id created sucessfully!`
  })
})

app.patch('/clients/:id', async (req, res) => {
  const result = await db.collection('clients').updateOne(
    {
      _id: new ObjectId(req.params.id)
    },
    {
      $set: req.body
    }
  )

  return res.json({
    status: 'ok',
    message: 'Client patched sucessfully!',
    data: result
  })
})

app.delete('/clients/:id', async (req, res, next) => {
  const result = await db
    .collection('clients')
    .deleteOne({ _id: new ObjectId(req.params.id) })

  return res.json({
    status: 'ok',
    message: `Client deleted successfully!`,
    data: result
  })
})

app.get('/cities', async (_req, res) => {
  const result = await db.collection('cities').find({}).toArray()
  return res.json({
    status: 'ok',
    data: result
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
