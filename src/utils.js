export const NUMBER_OF_BARS = 25;

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
  for (let index = 0; index < NUMBER_OF_BARS; index++) {
    array.push(Math.ceil(Math.random() * 100));
  }
  return array;
};
