import * as dotenv from 'dotenv';
dotenv.config();


import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as UserModel from '../models/userModel';
import * as middleware from '../middlewares/middleware';

const secret_key = process.env.SECRET_KEY || 'secret key';

async function register(req:any, res:any) {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({ username, password: hashedPassword, email });

    res.status(201).json({ message: 'User registered successfully', user:{id:user.id, username:user.username, email:user.email} });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function login(req:any, res:any) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findByUsername(username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const accessToken = jwt.sign({ username: user.username, email: user.email }, secret_key, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username: user.username, email: user.email }, secret_key, { expiresIn: '7d' });

    await UserModel.saveToken(user.id, accessToken, refreshToken);

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function refreshToken(req:any, res:any) {
    const { refreshToken } = req.body;
  try {
    const newAccessToken = await middleware.refreshToken(refreshToken);
    if (!newAccessToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export { register, login, refreshToken, }
