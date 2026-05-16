
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./src/database/db.json");

export const readProduct = () => {
  const data = fs.readFileSync(filePath, "utf-8");

  try {
    return JSON.parse(data || "[]");
  } catch (err) {
    console.log("🔥 JSON broken, resetting DB...");
    return [];
  }
};

export const saveProducts = (products: any) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(products, null, 2)
  );
};








export const insertProduct = (payload: any) => {
  const products = readProduct();

  const updated = [...products, payload];

  fs.writeFileSync(
    filePath,
    JSON.stringify(updated, null, 2)
  );
};