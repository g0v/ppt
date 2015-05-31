var express = require('express'),
    models = require('../models'),
    Sequelize = require('Sequelize'),
    debug = require('debug')('ppt:api'),
    router = express.Router();

const FINDALL_OPTION_WHITELIST = [
  'limit', 'offset', 'having', 'include', 'where', 'attributes'
];

router.get('/findAll/:modelName', function(req, res) {
  var model = models[req.params.modelName],
      rawOptions = (req.query.q && JSON.parse(req.query.q)) || {},
      options = {};

  FINDALL_OPTION_WHITELIST.forEach(key => {
    if(typeof rawOptions[key] !== 'undefined'){
      options[key] = rawOptions[key];
    }
  });

  if ( model ) {
    if(options.include){
      debug("INCLUDE before", options.include);
      options.include = parseIncludes(model, options.include);
      debug("INCLUDE after", options.include);
    }


    model.findAll(options).then( data => {
      res.json(data);
    }).catch( reason => {
      debug('Model fetch rejected', reason);
      res.status('Unprocessable Entity').end();
    } );
  } else {
    res.status('Bad Request').end();
  }
});

module.exports = router;

// Parses "options.include" for /findAll.
// Note that "through" option is omitted deliberately because the option makes
// no sense, since all relations should be already declared by schema.
//
const INCLUDE_KEYS_WHITELIST = [
  'model', 'association', 'as', 'where', 'attributes', 'required'
];

function parseIncludes(sourceModel, includes) {
  return includes.map( includeOpt => {

    // If includeOpt is already an Sequelize.Model instance,
    // no need for parsing this item.
    if (includeOpt instanceof Sequelize.Model) {
      return includeOpt;
    }

    var opt = {}, model;

    INCLUDE_KEYS_WHITELIST.forEach( key => {
      if( typeof includeOpt[key] !== 'undefined' ) {
        opt[key] = includeOpt[key];
      }
    });

    if(typeof opt.model === 'string') {
      opt.model = model = models[includeOpt.model]
    }

    if(typeof opt.association === 'string') {
      opt.association = sourceModel.associations[includeOpt.association];
      model = opt.association.target;
    }

    // Parse nested include
    if (includeOpt.include) {
      if(model){
        opt.include = parseIncludes(model, includeOpt.include);
      }else{
        throw "options.include[] should include either 'model' or 'association'.";
      }
    }

    return opt;
  });
}
