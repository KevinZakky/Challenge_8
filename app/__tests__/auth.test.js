/* eslint-disable no-undef */
const AuthenticationController = require('../controllers/AuthenticationController');
const { userModel, roleModel, bcrypt, jwt } = require('../__mocks__/dependencies');
const { EmailNotRegisteredError, WrongPasswordError } = require('../errors');

describe('AuthenticationController', () => {
  let controller;
  let req;
  let res;
  let next;

  beforeEach(() => {
    controller = new AuthenticationController({ userModel, roleModel, bcrypt, jwt });
    req = {
      body: {
        name: 'user',
        email: 'example@gmail.com',
        password: '1111'
      },
      headers: {
        authorization: 'Bearer token'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('handleLogin function', () => {
    test('should return 404 if email not exist', async () => {
      userModel.findOne.mockResolvedValue(null);

      await controller.handleLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(new EmailNotRegisteredError('example@gmail.com'));
    });

    test('should return 401 if user asign wrong password', async () => {
      const user = { id: 1, email: 'user@gmail.com', encryptedPassword: 'hashed_password' };
      userModel.findOne.mockResolvedValue(user);
      bcrypt.compareSync.mockReturnValue(false);

      await controller.handleLogin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(new WrongPasswordError());
    });
  });
});
