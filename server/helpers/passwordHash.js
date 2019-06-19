import bcrypt from 'bcryptjs';

const hash = password => bcrypt.hashSync(password, 6);
export default { hash };
