/** @type {import('jest').Config} */
const config = {
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "reports",
        outputName: "junit.xml",
      },
    ],
  ],
};

export default config;
