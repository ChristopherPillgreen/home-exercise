const { Sequelize } = require("sequelize")
const mysql2 = require('mysql2')

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, // Database name
  process.env.MYSQL_USER,     // Database username
  process.env.MYSQL_PASSWORD, // Database password
  {
    host: process.env.MYSQL_HOST || "host.docker.internal", // Default to localhost; use 'mysql' if running inside Docker
    dialect: 'mysql',          // MySQL dialect
    dialectModule: mysql2,
    port: 3306,                // Default MySQL port
    logging: false,            // Disable logging (optional)
  }
);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Seed data

// Export the Sequelize instance

module.exports = {
  sequelize
}
