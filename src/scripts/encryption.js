const bcrypt = require('bcrypt');
const crypto = require('crypto');

const saltRounds = 10;
const algorithm = 'aes-256-cbc';
const key = 'MySecretKey1234567890';

async function hashData(data, callback) {
  if (data) {
    // Generate a salt and hash
    bcrypt.hash(data, saltRounds, function (err, hash) {
      if (err) {
        console.error('Error hashing password:', err);
        return;
      }
      callback(hash);
    });
  }
}

async function compareHash(data, hash, callback) {
  if (data && hash) {
    // Compare the password entered by user with the hash stored in the database
    bcrypt.compare(data, hash, function (err, result) {
      if (err) {
        console.error('Error comparing password with hash:', err);
        return;
      }
      callback(result);
    });
  }
}

async function encryptData(data) {
  if (data) {
    // Encrypt the user's password
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encryptedData = cipher.update(data);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);
    return encryptedData.toString('hex');
  }
  return -1;
}

async function decryptData(data, iv) {
  if (data && iv) {
    // Example of decrypting the password
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(iv.toString('hex'), 'hex'));
    let decryptedData = decipher.update(Buffer.from(data.toString('hex'), 'hex'));
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);
    return decryptedData.toString();
  }
  return -1;
}


module.exports = {
  hashData,
  compareHash,
  encryptData,
  decryptData,
};
