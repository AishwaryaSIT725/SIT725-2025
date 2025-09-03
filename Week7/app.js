import express from "express";
import cors from "cors";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health route required for test & screenshot
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, service: "week7-app" });
});

// (Optional) tiny in-memory “products” to mirror your Week6 pattern
const products = [{ id: 1, name: "HDMI", price: 20, description: "hdmi cable" }];
app.get("/api/products", (_req, res) => res.json(products));
app.post("/api/products", (req, res) => {
  const { name, price, description } = req.body || {};
  if (!name || price == null) return res.status(400).json({ error: "missing fields" });
  const item = { id: products.length + 1, name, price: Number(price), description: description || "" };
  products.push(item);
  res.status(201).json(item);
});
