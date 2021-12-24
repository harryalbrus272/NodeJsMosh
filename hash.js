const bcrypt = require('bcrypt');
async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('1234', salt);
  const convertedPassword = await bcrypt.compare('1235', hashedPassword);
  console.log(salt);
  console.log(hashedPassword);
  console.log(convertedPassword);
}
run();
