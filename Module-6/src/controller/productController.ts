import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../services/product.service";

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


const products = await readProduct();
  
  if (url?.startsWith("/Products") && method === "GET") {

    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(
      JSON.stringify({
        success: true,
        message: "Product route and retrive successfully",
        data: products,
      })
    );
  }
};