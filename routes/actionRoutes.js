const express = require('express');

const router = express.Router();

const db = require('../data/helpers/actionModel.js');

router.get('/', (req, res) => {
  db
    .get()
    .then(action => {
      res.status(200).json(action)
    })
    .catch(error => {
      res.status(404).json(error)
    });
});

router.get('/:id', (req, res) => {
  const {
    id
  } = req.params

  db
    .get(id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(error => {
      res.status(404).json(console.error('not found', error))
    });
});

router.post('/', (req, res) => { // this was working? need to debug
  const action = req.body
  if (!action.description && !action.project_id) {
    res.status(400).json({
      error: 'description and project_id is Required!'
    });
  } else if (action.description.length > 128) {
    res.status(400).json({
      error: 'The Max length for description is 128 characters'
    });
  } else {
    db
      .insert(action)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(error => {
        res.status(500).json(console.error('Error creating action', error)) // throwing this error debug?
      });
  }


});






router.delete('/:id', (req, res) => {
  const {
    id
  } = req.params

  db
    .remove(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(404).json(console.error('not found', error))
    });
});


router.put('/:id', (req, res) => {
  const id = req.params.id
  const changes = req.body

  db
    .update(id, changes)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).json(console.error('Error updating action', error))
    })
})

module.exports = router