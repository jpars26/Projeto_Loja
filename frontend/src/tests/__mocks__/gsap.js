function createTimeline() {
  const timeline = {};
  timeline.to = jest.fn(() => timeline);
  timeline.fromTo = jest.fn(() => timeline);
  timeline.set = jest.fn(() => timeline);
  return timeline;
}

const gsap = {
  registerPlugin: jest.fn(),
  context: jest.fn((callback) => {
    callback();
    return { revert: jest.fn() };
  }),
  matchMedia: jest.fn(() => ({
    add: jest.fn((_query, callback) => {
      if (typeof callback === "function") {
        callback({ conditions: {} });
      }
    }),
    revert: jest.fn(),
  })),
  fromTo: jest.fn(),
  to: jest.fn(),
  set: jest.fn(),
  timeline: jest.fn(createTimeline),
  utils: {
    toArray: jest.fn((value) => (Array.isArray(value) ? value : [value])),
  },
};

module.exports = gsap;
module.exports.default = gsap;
