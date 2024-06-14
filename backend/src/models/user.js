const userModel = {
  getUser: async (username = "") => {
    let sql = `SELECT * FROM users where username ilike $1`;

    try {
      const res = __dbpool.query(sql, [username]);
      return res;
    } catch {
      throw err;
    }
  },

  registerUser: async (username, password) => {
    let sql = `INSERT INTO users (username, password)
    VALUES ($1, $3) RETURNING user_id`;

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
