const util = require('util');
const { read, readStruct } = require('../reader');
const { write, writeStruct } = require('../writer');
const { getTypeValue, convertToTypedValue } = require('../utils');

const typeMap = new Map();
/**
 * base struct class
 * @class TStruct
 */
class TStruct {
  /**
   * read
   * @param {Object} protocol
   */
  [read](protocol) {
    readStruct(this.constructor.Type, protocol, this);
  }

  /**
   * write
   * @param {Object} protocol
   */
  [write](protocol) {
    writeStruct(this.constructor.Type, protocol, this);
  }

  /**
   *
   * @param {*} value
   * @param {*} type
   * @param {string} fieldName
   */
  [convertToTypedValue](value, type, fieldName) {
    try {
      return getTypeValue(value, type);
    } catch (e) {
      throw new Error(`${this.constructor.name}.${fieldName} ${e.message}`);
    }
  }

  toJSON() {
    const jsonObject = {};
    this.constructor.Type.forEach((field) => {
      jsonObject[field.customName] = this[field.customName];
    });
    return jsonObject;
  }

  [util.inspect.custom]() {
    return this.toObject();
  }

  /**
   * convert to plain object
   */
  toObject() {
    const plainObject = {};
    this.constructor.Type.forEach((field) => {
      if (field.type.typeClass && this[field.customName] !== null) {
        plainObject[field.customName] = this[field.customName].toObject.apply(this[field.customName]);
      } else {
        plainObject[field.customName] = this[field.customName];
      }
    });
    return plainObject;
  }

  static get Type() { return typeMap; }
}
module.exports = TStruct;
