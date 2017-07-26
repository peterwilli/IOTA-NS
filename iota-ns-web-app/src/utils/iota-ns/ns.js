const pow = require('proof-of-work')
const sha256 = require('sha256')

const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

class NS {
  static toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }
  static randomName() {
    var text = "";
    for (var i = 0; i < 128; i++)
      text += allowedCharacters.charAt(Math.floor(Math.random() * allowedCharacters.length));

    return text;
  }

  static calculateDifficulty(name) {
    var amountCharacters = name.split('').filter(function(item, i, ar) {
      return ar.indexOf(item) === i;
    }).length
    var difficulty = (128 - name.length)
    difficulty = Math.max(difficulty, 10)
    return difficulty
  }

  createName(name) {
    var difficulty = NS.calculateDifficulty(name)
    var solver = new pow.Solver()
    var hashbytes = sha256(name, {
      asBytes: true
    })
    var prefix = hashbytes
    var nonce = solver.solve(difficulty, prefix)
    console.log(`
prefix: ${ NS.toHexString(prefix) }
nonce: ${NS.toHexString(nonce)}
hash as result: ${sha256(prefix.concat(nonce))}
    `);
    return nonce
  }

}

export default NS
