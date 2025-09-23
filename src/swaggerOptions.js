import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', // 버전
    info: {
      title: '코드잇 풀스택 스프린트 미션 판다마켓', // 프로젝트 이름
      version: '1.0.0', // 버전
      description: 'API 문서 with Swagger',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development Server',
      },
    ],
  },
};

// 기존 코드에서 참조하는 swaggerDefinition을 options.definition으로 매핑
const swaggerDefinition = options.definition;

const swaggerOptions = {
  swaggerDefinition,
  apis: [
    './src/app.js', // API 파일
    './src/routes/*.js', // 각 라우트 파일의 JSDoc
    './src/docs/swagger.js', // docs 폴더의 주석 파일
  ],
};

const specs = swaggerJsdoc(swaggerOptions);

const swaggerUiOptions = {
  explorer: true,
  customCss: `
    .swagger-ui .topbar {display: none}
    .swagger-ui .info .title { color: #3b82f6; }
    .swagger-ui .scheme-container { background: #f8fafc; padding: 10px; border-radius: 5px; }
  `,
  customSiteTitle: '코드잇 풀스택 스프린트 미션 판다마켓 API Docs',
};

export { specs, swaggerUiOptions };
