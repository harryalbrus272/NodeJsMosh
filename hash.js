const bcrypt = require('bcrypt');
async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('1234', salt);
  const convertedPassword = await bcrypt.compare('something!', '$2b$10$Jii1Ao.L6NFJNbfo9B7dYOAnamHpmBC2c7RxmRxU/eIp.t.LK95lm');
  console.log(salt);
  console.log(hashedPassword);
  console.log(convertedPassword);
}
run();
