import crypto from "node:crypto";

export function generateRandomId(): string {
  const array = new Uint8Array(16);
  crypto.webcrypto.getRandomValues(array);

  let id = "";

  for (let i = 0; i < array.length; i++) {
    id += array[i].toString(16).padStart(2, "0");
  }

  return id;
}
