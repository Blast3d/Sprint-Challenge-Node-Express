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
      res.status(500).json(console.error('Error updating action', error))
    });
});

router.post('/', (req, res) => {
  const action = req.body

  db
    .insert(action)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).json(console.error('Error updating action', error))
    });
  // if (!action.description) {
  //   res.status(400).json({
  //     error: 'description is Required'
  //   });
  // } else if (action.description.length > 120) {
  //   res.status(400).json({
  //     error: 'The Max length is 120 characters'
  //   });
  // } else {
  //   res.status(500).json(error);
  // }
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
      res.status(500).json(console.error('Error updating action', error))
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