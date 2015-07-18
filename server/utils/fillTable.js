import models from '../models';

export default function fillTable(tableName, data) {
  var Model = models[tableName];
  return Promise.all(
    data.map(datum => Model.create(datum))
  );
}
