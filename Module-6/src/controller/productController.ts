import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../services/product.service";
import {Iproduct} from "../types/product.type";

//GET all products: 
export const productController = async(
  req: IncomingMessage,
  res: ServerResponse
) => {

  const url = req.url;
  const method = req.method;

  // const products = [
  //   // {
  //   //   id: 1,
  //   //   name: "Rahim",
  //   // },
  // ];

  // /product => /products/1=>['', 'product', '1']

  //urlParts = ["", "products", "1"]
const urlParts = url?.toLowerCase().split("/");

const id =
  urlParts?.[1] === "products" && urlParts[2]
    ? Number(urlParts[2])
    : null;

    console.log("This actual loading data from ",id);

const isValidId = id !== null && !isNaN(id);

const products = await readProduct();

// GET ALL PRODUCTS
if (url === "/products" && method === "GET") {
  res.writeHead(200, {
    "content-type": "application/json",
  });

  return res.end(
    JSON.stringify({
      success: true,
      data: products,
    })
  );
}

// GET SINGLE PRODUCT
if (method === "GET" && isValidId) {
  const product = products.find((p: Iproduct) => p.Id === id);
  console.log(product);

  res.writeHead(200, {
    "content-type": "application/json",
  });

  return res.end(
    JSON.stringify({
      success: true,
      data: product || null,
    })
  );
}
};