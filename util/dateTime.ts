function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const dateTime = () => {
  const isPositive = getRandomInt(0, 1) === 1;
  const timeAt = new Date();
  const mutator = getRandomInt(1000000, 100000000);
  const availableAt = new Date(
    timeAt.getTime() + (isPositive ? mutator : -1 * mutator)
  );
  return availableAt;
};
