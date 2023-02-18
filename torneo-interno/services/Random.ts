export const getRandomString = (length: number) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const getRandomNumber = (length: number) => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

// for (let i = 0; i < 100; i++) {
//   let incscription: YouthInscription = {
//     emergencyPhone: getRandomNumber(10),
//     position: Math.ceil(Math.random() * 4),
//     level: Math.ceil(Math.random() * 5),
//     captain: Math.ceil(Math.random() * 1) === 0 ? false : true,
//     owner: {
//       dni: getRandomNumber(8),
//       name: getRandomString(Math.ceil(Math.random() * 10)),
//       lastName: getRandomString(Math.ceil(Math.random() * 10)),
//       email:
//         getRandomString(Math.ceil(Math.random() * 10)) +
//         "@" +
//         getRandomString(5) +
//         ".com",
//       phone: getRandomNumber(10),
//     },
//     player: {
//       dni: getRandomNumber(8),
//       name: getRandomString(Math.ceil(Math.random() * 10)),
//       lastName: getRandomString(Math.ceil(Math.random() * 10)),
//       email:
//         getRandomString(Math.ceil(Math.random() * 10)) +
//         "@" +
//         getRandomString(5) +
//         ".com",
//       phone: getRandomNumber(10),
//       birthdate: new Date("02-02-2017"),
//       gender: "M",
//     },
//   };
