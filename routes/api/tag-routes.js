const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
    ]
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id'});
        return;
      }
      res.json(dbTagData);
    }).catch(handleError500(res));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(handleError500(res));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
  })
    .then(dbTagData => {
        if (!dbTagData[0]) {
            res.status(404).json({ message: 'No tag found with this id'});
            return;
        }
        res.json(dbTagData);
  }).catch(handleError500(res));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
        id: req.params.id
    }
  })
    .then(dbTagData => {
        if (!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id'});
            return;
        }
        res.json(dbTagData);
  }).catch(handleError500(res));
});

function handleError500(res){
  return err => {
    // report this -- send an email 
    
    console.log(err)
    console.log('eerrrr');
    res.status(500).json({
      error: 'We encountered an error. Please try again soon.'
    })
  }
}

module.exports = router;
