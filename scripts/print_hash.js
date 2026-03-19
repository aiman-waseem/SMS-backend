#!/usr/bin/env node
import { hashAsync } from '../security/bcrypt.js';

const plain = process.argv[2] || 'admin@123';

async function main() {
  try {
    const hashed = await hashAsync(plain);
    console.log(hashed);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exitCode = 1;
  }
}

main();
