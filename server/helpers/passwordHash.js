import bcrypt from 'bcryptjs';

const hash = password => bcrypt.hashSync(password, 10);
const unhash = (password, hashpassword) => bcrypt.compareSync(password, hashpassword);

export { hash, unhash };
