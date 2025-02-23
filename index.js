require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.peemh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const db = client.db("userDB");
    const usersCollection = db.collection("users");

    // Create a new user
    app.post("/api/user", async (req, res) => {
      const { name, email, phone, role, address } = req.body || {};
      if (!name || !email || !phone || !role) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      try {
        const newUser = {
          name,
          email,
          phone,
          role,
          address,
        };
        const result = await usersCollection.insertOne(newUser);
        return res.status(201).json({
          message: "User created successfully",
          userId: result.insertedId,
        });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    });

    // Get all/single user(s)
    app.get("/api/users/:id?", async (req, res) => {
      const userId = req.params.id;

      try {
        if (userId) {
          const user = await usersCollection.findOne({
            _id: new ObjectId(userId), // Use ObjectId from mongodb
          });
          if (!user) return res.status(404).json({ error: "User not found" });
          return res.status(200).json(user);
        } else {
          const users = await usersCollection.find().toArray();
          return res.status(200).json(users);
        }
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    });

    // Update a user
    app.put("/api/user/:id", async (req, res) => {
      const userId = req.params.id;
      const { name, email, phone, role, address } = req.body;

      if (!name || !email || !phone || !role) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      try {
        const result = await usersCollection.updateOne(
            { 
                _id: new ObjectId(userId)
            },
            { 
                $set: { name, email, phone, role, address }
            }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "User updated successfully" });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    });

    // Update a specific part of a user
    app.patch("/api/user/:id", async (req, res) => {
      const userId = req.params.id;
      const updates = req.body;

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }

      try {
        const result = await usersCollection.updateOne(
          {
            _id: new ObjectId(userId)
          },
          {
            $set: updates
          }
        );

        if (result.modifiedCount === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "User updated successfully" });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    });

    // Delete a user
    app.delete("/api/user/:id", async (req, res) => {
      const userId = req.params.id;
      try {
        const result = await usersCollection.deleteOne({
          _id: new ObjectId(userId),
        });

        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Final settings here
app.get("/", (req, res) => {
  res.send("User Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
