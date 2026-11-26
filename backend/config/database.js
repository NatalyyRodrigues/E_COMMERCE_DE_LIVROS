import oracledb from "oracledb";
import { normalizeRows } from "./oracleHelpers.js";

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];

let pool;

export async function initializeDatabase() {
    const user = process.env.ORACLE_USER;
    const password = process.env.ORACLE_PASSWORD;
    const connectString = process.env.ORACLE_CONNECT_STRING || "localhost:1521/XEPDB1";

    if (!user || !password) {
        throw new Error(
            "Configure ORACLE_USER e ORACLE_PASSWORD (arquivo backend/.env). " +
                "Ex.: ORACLE_CONNECT_STRING=localhost:1521/XEPDB1"
        );
    }

    if (pool) {
        return pool;
    }

    pool = await oracledb.createPool({
        user,
        password,
        connectString,
        poolMin: 1,
        poolMax: 5,
        poolIncrement: 1
    });

    const conn = await pool.getConnection();
    try {
        await conn.execute("SELECT 1 FROM DUAL");
        console.log(`Oracle conectado: ${user} @ ${connectString}`);
    } finally {
        await conn.close();
    }

    return pool;
}

export function getPool() {
    if (!pool) {
        throw new Error("Pool Oracle não inicializado. Chame initializeDatabase() antes.");
    }
    return pool;
}

export async function executeQuery(sql, binds = {}) {
    const connection = await getPool().getConnection();
    try {
        const result = await connection.execute(sql, binds);
        return normalizeRows(result.rows || []);
    } finally {
        await connection.close();
    }
}

export async function executeOne(sql, binds = {}) {
    const rows = await executeQuery(sql, binds);
    return rows[0] ?? null;
}

export async function executeDml(sql, binds = {}) {
    const connection = await getPool().getConnection();
    try {
        return await connection.execute(sql, binds, { autoCommit: true });
    } finally {
        await connection.close();
    }
}

export async function nextId(tableName, columnName) {
    const sql = `SELECT NVL(MAX(${columnName}), 0) + 1 AS next_id FROM ${tableName}`;
    const row = await executeOne(sql);
    return Number(row.next_id);
}