const bc = require('bcrypt');

async function hashing() {
    const pass = ''
    const hash = ''
    const isMatch = await bc.compare(pass, hash);
    console.log(hash)
}
