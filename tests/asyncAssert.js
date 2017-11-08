export default (callback, done) => () => {
  try {
    callback();
    done();
  } catch (err) {
    done(err);
  }
}
