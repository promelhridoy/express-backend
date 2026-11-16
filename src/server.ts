import express, { type Application, type Request, type Response } from "express";
import { Pool } from "pg";

import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app: Application = express();

const PORT = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

const pool = new Pool({
    // connectionString:  process.env.DATABASE_URL_UNPOOLED,
    connectionString:  process.env.DATABASE_URL,
});

// console.log(pool);

const iniDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        age INT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("Users table is ready!");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
};

iniDB();


app.get("/", (req : Request, res: Response) => {
//   res.send("Hello World!");


res.status(200).json({
    success: true,
    message: "This is root route",
    author: "PHH",
})
});

app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
      // console.log(req.body);
    const {name, email, age, password} = req.body;
    // console.log(password);

    const result = await pool.query(`
        INSERT INTO users(name, email, password, age) VALUES
        ($1, $2, $3, $4) RETURNING *
        `,
         [name, email, password, age],
    );
    
    console.log(result);
    
    
    res.status(201).json({
    success: true,
    message: "User created!",
    data: result.rows[0],
})
  } catch (error: any) {
    res.status(500).json({
    success: false,
    message: error.message,
    error: error,
  })
}
})

app.get("/api/v1/users", async (req: Request, res: Response) => {

  try {
    const result = await pool.query(`
      SELECT * FROM users
      `)

       res.status(200).json({
    success: true,
    message: "User retrived successfully!",
    data: result.rows,
       });
  } catch (error: any) {
     res.status(500).json({
    success: false,
    message: error.message,
    error: error,
  })
}
});

app.get("/api/v1/users/:id", async (req: Request, res: Response) => {

  try {

    const { id } = req.params;

    const result = await pool.query(`
      SELECT * FROM users
      WHERE id = $1
      `, [id],
    )

       res.status(200).json({
    success: true,
    message: "User retrived successfully!",
    data: result.rows[0],
       });
  } catch (error: any) {
     res.status(500).json({
    success: false,
    message: error.message,
    error: error,
  })
}
});

app.put("/api/v1/users/:id", async (req: Request, res: Response) => {

  try {

    const { id } = req.params;

    const {name, password, age, is_Active} = req.body

    const result = await pool.query(`
      UPDATE users
      SET 
      name = COALESCE($1, name),
      password = COALESCE($2, password),
      age = COALESCE($3, age),
      is_Active = COALESCE($4, is_Active),
      updated_at = NOW()
      WHERE id = $5 RETURNING *
      `, [name ?? null, password ?? null, age ?? null, is_Active ?? null, id],
    )

       res.status(200).json({
    success: true,
    message: "User updated successfully!",
    data: result.rows[0],
       });
  } catch (error: any) {
     res.status(500).json({
    success: false,
    message: error.message,
    error: error,
  })
}
});


app.listen(PORT, () => {
  console.log(`The Express server is running on the port ${PORT}`);
});