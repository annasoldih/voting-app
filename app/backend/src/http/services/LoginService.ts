import User from '../../database/models/User';

export default class LoginService {
  static async getUser(email: string, _password: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }
}
