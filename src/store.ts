interface KeyValueRow {
  key: string;
  value: string;
  date_created: string;
}

export async function setValue(
  database: D1Database,
  key: string,
  value: string
) {
  await database
    .prepare(
      `INSERT INTO key_values ("key", "value", "date_created") VALUES (?1, ?2, DATETIME('now'));`
    )
    .bind(key, value)
    .run();
}

export async function getValue(database: D1Database, key: string) {
  const { results } = await database
    .prepare(`SELECT * FROM key_values WHERE "key" = ?1;`)
    .bind(key)
    .all<KeyValueRow>();

  if (results.length !== 1) return;
  if (!results[0]) {
    throw new Error(`Expected one result to exist for ${key}`);
  }

  return results[0].value;
}

export async function removeValue(database: D1Database, key: string) {
  await database
    .prepare(`DELETE FROM key_values WHERE "key" = ?1;`)
    .bind(key)
    .run();
}
