const bc = require('bcrypt');

async function hashing() {
    const pass = ''
    const hashGen = await bc.hash(pass, 10);
    console.log(hash)
}
