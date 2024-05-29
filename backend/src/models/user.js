const userModel = {
  getUser: async (username = "", email = "") => {
    let sql = `SELECT * FROM users where username = $1 or email = $2`;

    try {
      const res = __dbpool.query(sql, [username, email]);
      return res;
    } catch {
      throw err;
    }
  },

  registerUser: async (username, email, password) => {
    let sql = `INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3) RETURNING user_id`;

    const dbClient = await __dbpool.connect();

    try {
      dbClient.query("BEGIN");
      const res = dbClient.query(sql, [username, email, password]);
      return res;
    } catch {
      dbClient.query("ROLLBACK");
      throw err;
    } finally {
      dbClient.query("COMMIT");
      dbClient.release();
    }
  },
};

module.exports = userModel;
