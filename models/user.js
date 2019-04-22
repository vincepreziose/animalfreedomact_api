'use strict';

const bcrypt = require('bcrypt-nodejs');
const { Model } = require('objection');

class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email'],

      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 }
      }
    };
  }

  static async findOneByEmail(email) {
    const user = await this.query()
      .findOne('email', email);

    return user;
  }

  static async save(email, password) {
    const user = await this.query()
      .insert({
        email: email,
        password: password
      });

    return user;
  }

  static async comparePassword(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) return callback(err);
      callback(null, isMatch);
    });
  }
}

module.exports = User;
