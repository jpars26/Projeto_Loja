module.exports = {
  roots: ["<rootDir>/src/tests"], // Define a raiz correta dos testes
  moduleDirectories: ["node_modules", "<rootDir>/src", "<rootDir>/src/tests"],
  moduleNameMapper: {
    "^react-router-dom$": "<rootDir>/src/tests/__mocks__/react-router-dom.js",
    "^.+\\.(jpg|jpeg|png|gif|webp|svg|mp4|mov|webm)$": "<rootDir>/src/tests/__mocks__/fileMock.js",
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-router-dom)/)", 
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], 
  testEnvironment: "jsdom",
};

