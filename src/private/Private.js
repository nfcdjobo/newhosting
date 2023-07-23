import jwt from "jsonwebtoken";
import key from './PrivateKey';

const capsule = data => jwt.sign(data, 'PRIVATE_KEY_JSONWEBTOKEN', {expiresIn: 60*60});

export default capsule;