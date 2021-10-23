const native = require("../pkg")

describe('native module test cases', () => {

  it('should support md5', () => {
    expect(native.md5_hash("123"))
      .toBe("202cb962ac59075b964b07152d234b70")
    expect(native.md5_hash("https://github.com/newdash/wasm-native-template"))
      .toBe("c738f0b79196935cf02f5463745a4535")

    // false
    expect(() => native.md5_hash(123))
      .toThrow("function 'md5_hash' request string parameter, but give 'number'")
  });

  it('should support bcrypt', () => {
    const password = "Passw0rD!"
    const hash = native.bcrypt_hash(password)
    const hash2 = native.bcrypt_hash(password)
    expect(hash).not.toBeUndefined()
    expect(hash2).not.toEqual(hash)
    expect(native.bcrypt_verify(password, hash)).toBeTruthy()

    // false
    expect(() => native.bcrypt_verify(password, '123')).toThrow("Invalid hash: 123")
    expect(native.bcrypt_verify("password", hash)).toBeFalsy()

  });

  it('should support async bcrypt', async () => {
    const password = "Passw0rD!"
    const hash_promise = native.async_bcrypt_hash(password)
    expect(hash_promise).toBeInstanceOf(Promise)
    const hash = await hash_promise
    expect(typeof hash).toBe("string")

    const hash2 = await native.async_bcrypt_hash(password)
    expect(hash).not.toBeUndefined()
    expect(hash2).not.toEqual(hash)
    expect(await native.async_bcrypt_verify(password, hash)).toBeTruthy()

    // false
    await expect(() => native.async_bcrypt_verify(password, '123'))
      .rejects
      .toThrow("Invalid hash: 123")
    expect(await native.async_bcrypt_verify("password", hash)).toBeFalsy()
  });

});