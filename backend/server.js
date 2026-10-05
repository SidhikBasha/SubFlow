const express = require("express");
const pool = require("./db");

const organizationRoutes = require("./routes/organizationRoutes");

const app = express();
app.use(express.json());
app.use("/organizations", organizationRoutes);

app.get("/", (req, res) => {
    res.send("SubFlow API is running");
});

app.get("/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            message: "Database connected",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});