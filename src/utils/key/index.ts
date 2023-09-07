export default {
  get get() {
    return `${+new Date()}-${Math.random().toFixed(10)}`;
  },
};
