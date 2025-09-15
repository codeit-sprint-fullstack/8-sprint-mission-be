const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/pandamarket_dev', {
  dialect: 'postgres',
  logging: false, // SQL 로그 비활성화 (개발 시에는 true로 설정 가능)
  define: {
    timestamps: true,
    underscored: true
  }
});

module.exports = { sequelize };
