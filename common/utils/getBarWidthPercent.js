export default function getBarWidthPercent(stats) {
  let statsSum = Object.keys(stats).reduce((sum, key) => {
    sum += (stats[key] || 0);
    return sum;
  }, 0)
  return Object.keys(stats).reduce((result, key) => {
    result[key] = ((stats[key] / statsSum) * 100 + '%') || 0;
    return result;
  }, {});
}
