import "@testing-library/jest-dom";

jest.mock("react-lazy-load-image-component", () => ({
    LazyLoadImage: (props) => {
      return <img {...props} />;
    },
  }));
  

// Mock para matchMedia (corrige erro do react-slick)
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };
};

// Mock para IntersectionObserver (corrige erro do Framer Motion)
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
