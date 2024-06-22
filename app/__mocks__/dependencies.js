/* eslint-disable no-undef */
const userModel = {
  findOne: jest.fn(),
  create: jest.fn()
};

const roleModel = {
  findOne: jest.fn()
};

const bcrypt = {
  hashSync: jest.fn(),
  compareSync: jest.fn()
};

const jwt = {
  sign: jest.fn(),
  verify: jest.fn()
};

module.exports = {
  userModel,
  roleModel,
  bcrypt,
  jwt
};
