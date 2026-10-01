import express from "express"
import cors from "cors"
import PG from "pg"
import bcrypt from "bcryptjs"

type UserData = {
    id: number
    email: string
    role: string
    name: string
    last_name: string
}

const app = express()
app.use(cors())
app.use(express.json())

const pool = new PG.Pool({ connectionString: process.env.DATABASE_URL })

app.get("/api/health", async (req, res) => {
    const { rows } = await pool.query("SELECT now()")
    res.json({ ok: true, time: rows[0].now })
})

app.post("/api/auth/register", async (req, res) => {
    const { email, password, name, last_name } = req.body
    if (!email || !password || String(password).length < 8) {
        res.status(400).json({
            error: "Neplatný e-mail nebo heslo (min. 8 znaků)"
        })
        return
    }
    if (!name || !last_name || !String(name).trim() || !String(last_name).trim()) {
        res.status(400).json({
            error: "Vyplň jméno a příjmení"
        })
        return
    }

    const hash = await bcrypt.hash(String(password), 10)
    try {
        const { rows } = await pool.query(
            `INSERT INTO users (email, password_hash, name, last_name)
             VALUES ($1, $2, $3, $4)
             RETURNING id, email, role, name, last_name`,
            [
                String(email).toLowerCase(),
                hash,
                String(name).trim(),
                String(last_name).trim()
            ]
        )
        res.status(201).json(rows[0])
    } catch (err: any) {
        if (err.code === "23505") {
            res.status(409).json({
                error: "E-mail už existuje"
            })
            return
        }
        res.status(500).json({
            error: "Chyba serveru"
        })
    }
})

app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
        String(email).toLowerCase(),
    ])
    const user = rows[0]
    const ok = user && (await bcrypt.compare(String(password), user.password_hash))
    if (!ok) {
        res.status(401).json({
            error: "Špatný e-mail nebo heslo"
        })
        return
    }

    res.json(<UserData>{
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        last_name: user.last_name
    })
})

app.listen(3000, () => console.log("API is running at :3000."))