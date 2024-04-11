import * as Yup from 'yup';

import authConfig from '../../config/auth';

import jwt from 'jsonwebtoken';
import User from '../models/User';



class SessionController {
  async store(request, response) {

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    const userEmailOrPasswordIncorrect = () => {
      return response
        .status(401)
        .json({ error: 'verifique se sua senha ou e-mail estão corretos' });

    };

    if (!(await schema.isValid(request.body))) userEmailOrPasswordIncorrect();


    const { email, password } = request.body;
    const user = await User.findOne({
      where: { email },

    });
    if (!user) userEmailOrPasswordIncorrect();



    if (!(await user.checkPassword(password))) userEmailOrPasswordIncorrect();


    return response.json({
      id: user.id,
      email,
      name: user.name,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
