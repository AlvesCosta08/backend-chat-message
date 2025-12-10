module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js' // Não cobrir o arquivo que sobe o servidor
  ]
};