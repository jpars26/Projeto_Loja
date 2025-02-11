module.exports = {
  roots: ["<rootDir>/frontend"],  
  moduleDirectories: ["node_modules", "<rootDir>/frontend/node_modules", "frontend/src"],
  moduleNameMapper: {
    "^react-router-dom$": "<rootDir>/frontend/__mocks__/react-router-dom.js",
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/tests/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Transpila ES6 para CommonJS
  },
  testEnvironment: "jsdom",
};
