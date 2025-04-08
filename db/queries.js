const pool = require("./pool");

async function addUser(firstname, lastname, username, password) {
    const query =
        "INSERT INTO users (firstname, lastname, username, password, membership) VALUES ($1, $2, $3, $4, $5)";
    await pool.query(query, [firstname, lastname, username, password, 0]);
}

async function userNameExists(username) {
    const query = "SELECT * FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);

    if (result.rowCount > 0) {
        return true;
    }
    return false;
}

async function getUserByUsername(username) {
    const query = "SELECT * FROM users WHERE username = $1";
    const result = await pool.query(query, [username]);
    return result.rows[0];
}

async function getUserById(id) {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(query, [id]);

    return result.rows[0];
}

async function getUsersIdByUsername(username) {
    const query = "SELECT id FROM users where username = $1";
    const { rows } = await pool.query(query, [username]);
    return rows[0].id;
}

async function addNewMessage(title, text, username) {
    const query =
        "INSERT INTO messages (title, text, created_at, author) VALUES ($1, $2, $3, $4)";
    const userId = await getUsersIdByUsername(username);
    const result = await pool.query(query, [title, text, new Date(), userId]);

    return result.rowCount;
}

module.exports = {
    addUser,
    userNameExists,
    getUserByUsername,
    getUserById,
    addNewMessage,
};
