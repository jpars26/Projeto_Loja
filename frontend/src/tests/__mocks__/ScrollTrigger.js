const ScrollTrigger = {
  refresh: jest.fn(),
  create: jest.fn(),
  getAll: jest.fn(() => []),
};

module.exports = { ScrollTrigger };
