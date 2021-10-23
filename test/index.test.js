const native = require("../pkg")

describe('native module test cases', () => {

  it('should support md5', () => {
    expect(native.md5_hash("123"))
      .toBe("202cb962ac59075b964b07152d234b70")
    expect(native.md5_hash("https://github.com/newdash/wasm-native-template"))
      .toBe("c738f0b79196935cf02f5463745a4535")
  });

  it('should support bcrypt', () => {
    const password = "Passw0rD!"
    const hash = native.bcrypt_hash(password)
    const hash2 = native.bcrypt_hash(password)
    expect(hash).not.toBeUndefined()
    expect(hash2).not.toEqual(hash)
    expect(native.bcrypt_verify(password, hash)).toBeTruthy()
  });

});