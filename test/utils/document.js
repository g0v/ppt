if (typeof document === 'undefined') {
  global.document = {};
}
// When using shallowRenderer tests invokes setState the test will fail
// with a document is not defined reference error.
