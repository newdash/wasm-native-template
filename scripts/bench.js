const b = require('benny')
const native = require("../pkg")
const bcrypt = require("bcryptjs")
const { md5 } = require("@newdash/newdash/md5")

const password = "PassW0rD"

b.suite(
  'BCrypt',

  b.add('bcrypt hash (native)', () => {
    native.bcrypt_hash(password, 10)
  }),

  b.add('bcrypt hash (pure js)', () => {
    bcrypt.hashSync(password, 10)
  }),

  b.add('async bcrypt hash (native)', async () => {
    await native.async_bcrypt_hash(password, 10)
  }),

  b.add('async bcrypt hash (pure js)', async () => {
    await bcrypt.hash(password, 10)
  }),

  b.cycle(),
  b.complete(),
)
const str = "Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser."

b.suite(
  'MD5',

  b.add('md5 (native)', () => {
    native.md5_hash(str)
  }),

  b.add('md5 (pure js)', () => {
    md5(str)
  }),

  b.cycle(),
  b.complete(),
)
