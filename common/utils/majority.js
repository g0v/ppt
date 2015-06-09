export default function majority(arr) {
  var counts = {}, mostItem;

  arr.forEach(item => {
    counts[item] = counts[item] + 1 || 1;

    // We include "=" in the comparison so that if there are multiple majorities,
    // the last majority will be selected.
    if(!mostItem || counts[item] >= counts[mostItem]){
      mostItem = item;
    }
  })
  return mostItem;
};
