// export function async setValue(key: string, value: string) {
//   await this.env.DB.prepare(`INSERT INTO key_values ("key", "value", "date_created") VALUES (?1, ?2, DATETIME('now'));`).bind(key, value).run()
// }

// export function async getValue(key: string) {
//   const { results } = await this.env.DB.prepare(`SELECT * FROM key_values WHERE "key" = ?1;`).bind(key).all<KeyValueRow>()
//   if (results.length !== 1) return

//   assert(results[0], "Expected one result to exist")
//   return results[0].value
// }

// export function async removeValue(key: string) {
//   await this.env.DB.prepare(`DELETE FROM key_values WHERE "key" = ?1;`).bind(key).run()
// }
