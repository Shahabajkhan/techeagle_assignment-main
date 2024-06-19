function checkMissingField(obj) {
  for (let key in obj) {
    if (!obj[key]) {
      return { message: `${key} is missing` };
    } else {
      return undefined;
    }
  }
}


module.exports = { checkMissingField };