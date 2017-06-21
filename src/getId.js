var _id_counter = {}

function getId (identifier, separator) {
  identifier = identifier || 'id'
  separator = separator || '_'
  var count = _id_counter[identifier] || 0
  _id_counter[identifier] = count + 1
  return identifier + separator + count.toString(36)
}

export default getId;

