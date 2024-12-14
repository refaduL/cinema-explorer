const app = require("./app");
const pool = require("./config/db");
const { serverPort } = require("./config/secret");

const testDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database successfully.");
    connection.release();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

const startServer = async () => {
  const server = app.listen(serverPort, () => {
    console.log(`Server is running at http://localhost:${serverPort}`);
  });
  
  await testDatabaseConnection();

  // Graceful shutdown for the pool
  process.on("SIGINT", async () => {
    console.log("\nGracefully shutting down...");
    server.close(() => {
      console.log("HTTP server closed.");
    });

    try {
      await pool.end();
      console.log("Database connection pool closed.");
    } catch (error) {
      console.error("Error closing the database pool:", error.message);
    } finally {
      process.exit(0);
    }
  });

  process.on("SIGTERM", async () => {
    console.log("\nGracefully shutting down...");
    server.close(() => {
      console.log("HTTP server closed.");
    });

    try {
      await pool.end();
      console.log("Database connection pool closed.");
    } catch (error) {
      console.error("Error closing the database pool:", error.message);
    } finally {
      process.exit(0);
    }
  });
};

startServer();
