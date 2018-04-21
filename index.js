/*
  Throw error objects
  Copyright (C) 2018 Warren Parad

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

let originalError = Error;
class ApplicationError extends Error {
  constructor(...args) {
    super(...args);
    originalError.captureStackTrace(this, this.constructor);
    this.message = args[0];
  }
  
  get [Symbol.toStringTag]() {
    return this.toString();
  }

  toString() {
    return this.message ? `${this.constructor.name}: ${JSON.stringify(this.message)}` : this.constructor.name;
  }

  static create(errorObject) {
    this.message = errorObject;
    return this;
  }

  toJSON() {
    return {
      name: this.constructor.name,
      message: this.message,
      stack: this.stack
    };
  }
}

/* eslint-disable-next-line no-global-assign */
global.ApplicationError = ApplicationError;
module.exports = ApplicationError;

/* eslint-disable no-extend-native */
Error.create = ApplicationError.create;
Error.prototype.create = ApplicationError.create;
Error.prototype.toString = function() {
  return this.message ? `ErrorObjectPolyFill: ${JSON.stringify(this.message)}` : 'ErrorObjectPolyFill';
};
Error.prototype.toJSON = function() {
  return {
    name: this.constructor.name,
    message: this.message,
    stack: this.stack
  };
};
