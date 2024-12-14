
const pool = require("../config/db");

const generatePosterUrl = (title) => {
    return `${title.toLowerCase().replace(/\s+/g, "_")}.jpg`;
};

const findOrCreateByName = async (name, tableName, idColumn, nameColumn) => {
    const [rows] = 
        await pool.query(`SELECT ${idColumn} FROM ${tableName} WHERE ${nameColumn} = ?`, [name]);
        
    if (rows.length > 0) {
        return rows[0][idColumn];
    }

    const [result] = await pool.execute(`INSERT INTO ${tableName} (${nameColumn}) VALUES (?)`, [name]);
    return result.insertId;
};


module.exports = {generatePosterUrl, findOrCreateByName};