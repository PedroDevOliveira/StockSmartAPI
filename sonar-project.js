const sonarqubeScanner = require('sonarqube-scanner');
const dotenv = require('dotenv');

dotenv.config();

sonarqubeScanner({
  serverUrl: process.env.SONAR_HOST_URL || 'http://localhost:9000',
  token: process.env.SONAR_TOKEN || 'sqp_83b68671dbf2e8e66cd1394f80cc02057f4730a6',
  options: {
    'sonar.projectKey': 'Stock-Smart',
    'sonar.sources': ['src/'],
    'sonar.test.inclusions': '__tests__/**/*.ts',
    'sonar.javascript.lcov.reportPaths': '__tests__/coverage/lcov.info',
    'sonar.testExecutionReportPaths': '__tests__/coverage/sonar-report.xml'
  }
});
