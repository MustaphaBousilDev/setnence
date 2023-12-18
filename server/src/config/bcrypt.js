const bcrypt = require('bcryptjs');
const { Response } = require("../fremworks/shared/response");

class Bcrypt {
  static async hashPassword(password) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (err) {
      throw new Response({
        status: 500,
        message: err.message,
        data: {},
      });
    }
  }
  static async comparePassword(password, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (err) {
      return new Response({
        status: 500,
        message: err.message,
        data: {},
      });
    }
  }
}

module.exports = Bcrypt;
