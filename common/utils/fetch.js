var fetch = require('isomorphic-fetch');

// Use API_BASE on server side to make isomorphic-fetch happy
//
const API_BASE = (typeof window === 'undefined') ?
                 `http://localhost:${process.env.PORT}` : ''

module.exports = function(url, query, options){
  // stringified JSON in REST queries
  //
  // http://docs.strongloop.com/display/public/LB/Querying+data#Queryingdata-Using"stringified"JSONinRESTqueries

  var qs = (query && query.filter && `filter=${JSON.stringify(query.filter)}`);

  if(qs) {
    qs = "?" + qs;
  }

  return fetch(API_BASE + url + qs, options);
};
