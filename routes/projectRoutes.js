const express = require('express')

const router = express.Router()

const db = require('../data/helpers/projectModel.js')

router.get('/', (req, res) => {
  db
    .get()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.json({
        error: 'Failed to get projects from database'
      })
    })
})

router.get('/:id', (req, res) => {
  const {
    id
  } = req.params

  db
    .get(id)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.json({
        error: `Failed to get project ${id} from database`
      })
    })
})

// router.post('/', (req, res) => {
//   const project = req.body

//   db
//     .insert(project)
//     .then(response => {
//       res.status(200).json(response)
//     })
//     .catch(error => {
//       res.json({
//         error: 'Failed to add project to database'
//       })
//     })
// })

router.post('/', (req, res) => {
  const project = req.body
  if (!project.description || !project.name) {
    res.status(400).json({
      error: 'description and name is Required!'
    });
  } else if (project.description.length > 128 || project.name.length > 128) {
    res.status(400).json({
      error: 'The Max for description length is 128 characters'
    });
  } else {
    db
      .insert(project)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(error => {
        res.status(500).json(console.error('Error updating project', error))
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
      res.status(500).json(console.error('Error updating action', error))
    })
})

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

router.get('/:id/actions', (req, res) => {
  const projectId = req.params.id

  db
    .getProjectActions(projectId)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      res.status(500).json(console.error('Error updating action', error))
    })
})

module.exports = router