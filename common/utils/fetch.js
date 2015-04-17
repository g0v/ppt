var fetch = require('isomorphic-fetch'),
    querystring = require('qs');

// Use API_BASE on server side to make isomorphic-fetch happy
//
const API_BASE = (typeof window === 'undefined') ?
                 `http://localhost:${process.env.PORT}` : ''

module.exports = function(url, query, options){
  var qs = querystring.stringify(query, {arrayFormat: 'repeat'}) || '';
  if(qs) {
    qs = "?" + qs;
  }

  return fetch(API_BASE + url + qs, options);
};
