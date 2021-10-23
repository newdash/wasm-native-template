use js_sys::Error;
use wasm_bindgen::prelude::*;

/// hash given string with md5 algorithm, and return hex hash value
///
/// * `value` plain string text
#[wasm_bindgen]
pub fn md5_hash(value: JsValue) -> Result<String, JsValue> {
    // verify
    if !value.is_string() {
        return Err(Error::new(&format!(
            "function 'md5_hash' request string parameter, but give '{}'",
            value.js_typeof().as_string().unwrap(),
        ))
        .into());
    }
    let digest = md5::compute(value.as_string().unwrap());
    Ok(format!("{:x}", digest))
}

/// put a plain password text to hash format
///
/// * `password` plain text password/secret, only accept string
#[wasm_bindgen]
pub fn bcrypt_hash(password: String) -> String {
    let digest = bcrypt::hash(password, bcrypt::DEFAULT_COST).unwrap();
    digest
}

/// hash with bcrypt in async mode
#[wasm_bindgen]
pub async fn async_bcrypt_hash(password: String) -> Result<JsValue, JsValue> {
    let promise =
        wasm_bindgen_futures::future_to_promise(async { Ok(JsValue::from(bcrypt_hash(password))) });
    Ok(wasm_bindgen_futures::JsFuture::from(promise).await?)
}

/// verify bcrypt password with stored hash
///
/// * `password` plain text password/secret
/// * `hash` bcrypt hashed text
#[wasm_bindgen]
pub fn bcrypt_verify(password: String, hash: String) -> Result<bool, JsValue> {
    match bcrypt::verify(password, &hash) {
        Ok(result) => return Ok(result),
        Err(err) => return Err(Error::new(&format!("{}", err)).into()),
    }
}

/// async verify bcrypt password with stored hash
///
/// * `password` plain text password/secret
/// * `hash` bcrypt hashed text
#[wasm_bindgen]
pub async fn async_bcrypt_verify(password: String, hash: String) -> Result<JsValue, JsValue> {
    let promise = wasm_bindgen_futures::future_to_promise(async {
        match bcrypt_verify(password, hash) {
            Ok(result) => return Ok(JsValue::from(result)),
            Err(err) => return Err(err),
        }
    });
    Ok(wasm_bindgen_futures::JsFuture::from(promise).await?)
}
