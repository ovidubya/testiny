const getCombinations = (payloads) => {
  if (!payloads) return [];

  return (function recurse(keys) {
    if (!keys.length) return [{}];
    let result = recurse(keys.slice(1));
    return payloads[keys[0]].reduce(
      (acc, value) =>
        acc.concat(
          result.map((item) => Object.assign({}, item, { [keys[0]]: value }))
        ),
      []
    );
  })(Object.keys(payloads));
};

module.exports = {
  getCombinations,
};
