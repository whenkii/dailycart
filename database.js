// module.exports = {
//   hrPool: {
//     user: process.env.HR_USER,
//     password: process.env.HR_PASSWORD,
//     connectString: process.env.HR_CONNECTIONSTRING,
//     poolMin: 10,
//     poolMax: 10,
//     poolIncrement: 0,
//   },
// };

// echo "export HR_USER=hr" >> ~/.bashrc
// echo "export HR_PASSWORD=oracle" >> ~/.bashrc
// echo "export HR_CONNECTIONSTRING=127.0.0.1/orcl" >> ~/.bashrc
// source ~/.bashrc

module.exports = {
  hrPool: {
    user: "venky",
    password: "venky123456",
    connectString: "208.109.11.24/PDB1",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0,
  },
};
