import bcrypt from 'bcryptjs';

const hash = password => bcrypt.hashSync(password, 6);
const unhash = (password, hashpassword) => bcrypt.compareSync(password, hashpassword);

export { hash, unhash };
