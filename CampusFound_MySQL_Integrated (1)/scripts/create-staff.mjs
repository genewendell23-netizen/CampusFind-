import 'dotenv/config'
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output })
try {
  const email = (await rl.question('Staff email: ')).trim().toLowerCase()
  const fullName = (await rl.question('Staff full name: ')).trim()
  const roleInput = (await rl.question('Role (staff/administrator): ')).trim().toLowerCase()
  const role = roleInput === 'administrator' ? 'administrator' : 'staff'
  const password = await rl.question('Temporary password (12+ chars, upper/lower/number): ')
  if (!email || fullName.split(/\s+/).length < 2 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/.test(password)) throw new Error('Enter a valid email, full name, and strong password.')
  const db = await mysql.createConnection({ host:process.env.DB_HOST||'localhost',port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',database:process.env.DB_NAME||'campusfound_db' })
  const hash = await bcrypt.hash(password,12)
  await db.execute('INSERT INTO users (full_name,email,password_hash,role,email_verified) VALUES (?,?,?,?,1)',[fullName,email,hash,role])
  console.log(`${role} account created. Keep the credentials private.`)
  await db.end()
} catch (e) { console.error(e.message); process.exitCode=1 } finally { rl.close() }
