var fetch = require('isomorphic-fetch'),
    debug = require('debug')('ppt:findAll');

// Use API_BASE on server side to make isomorphic-fetch happy
//
const API_BASE = process.env.IS_BROWSER ? '' : `http://localhost:${process.env.PORT}`;

// /api/findAll wrapper
//
module.exports = function(modelName, queryOpt, fetchOptions){
  var optString = (queryOpt && `?q=${JSON.stringify(queryOpt)}`) || '';
  debug('URL:', `${API_BASE}/api/findAll/${modelName}${optString}`);
  return fetch(`${API_BASE}/api/findAll/${modelName}${optString}`, fetchOptions).then((resp) => {
    return resp.json();
  });
};
