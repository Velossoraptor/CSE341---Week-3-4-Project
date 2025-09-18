const { ListSearchIndexesCursor } = require('mongodb');
const validator = require('../helpers/validate');

const saveSpell = (req, res, next) => {
  const validationRule = {
    index: 'required|string',
    name: 'required|string',
    level: 'required|integer|min:0',
    url: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveSpell
};