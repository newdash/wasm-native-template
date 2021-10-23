use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn md5_hash(value: String) -> String {
    let digest = md5::compute(value);
    format!("{:x}", digest)
}

#[wasm_bindgen]
pub fn bcrypt_hash(password: String) -> String {
    let digest = bcrypt::hash(password, bcrypt::DEFAULT_COST).unwrap();
    digest
}

#[wasm_bindgen]
pub fn bcrypt_verify(password: String, hash: String) -> bool {
    return bcrypt::verify(password, &hash).unwrap();
}
