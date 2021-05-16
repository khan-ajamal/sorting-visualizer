export const delay = (n) => {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
};

export const generateRandomArray = () => {
  const array = [];
  for (let index = 0; index < 25; index++) {
    array.push(Math.ceil(Math.random() * 100));
  }
  return array;
};
