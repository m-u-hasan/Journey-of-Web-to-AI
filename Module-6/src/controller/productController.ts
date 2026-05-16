import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../services/product.service";
import { Iproduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const url = req.url;
  const method = req.method;

  // Normalize URL (VERY IMPORTANT)
  const normalizedUrl = url?.toLowerCase().replace(/\/$/, "");

  // Handle favicon request
  if (normalizedUrl === "/favicon.ico") {
    res.writeHead(204);
    return res.end();
  }

  const urlParts = normalizedUrl?.split("/");

  const id =
    urlParts?.[1] === "products" && urlParts[2]
      ? Number(urlParts[2])
      : null;

  const isValidId = id !== null && !isNaN(id);

  const products = await readProduct();

  // =========================
  // GET ALL PRODUCTS
  // =========================
  if (method === "GET" && normalizedUrl === "/products") {
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

  // =========================
  // GET SINGLE PRODUCT
  // =========================
  if (method === "GET" && isValidId) {
    const product = products.find((p: Iproduct) => p.Id === id);

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

  // =========================
  // POST PRODUCT
  // =========================
  if (method === "POST" && normalizedUrl === "/products") {
    const body = await parseBody(req);
     const products = await readProduct();
    console.log("METHOD:", method);
    console.log("URL:", normalizedUrl);
    //console.log("BODY:", body);
    const newProduct={
      id: Date.now(),
      ...body,
    };
    //console.log(newProduct);
    products.push(newProduct);
    //console.log(products);

    insertProduct(products)




    res.writeHead(201, {
      "content-type": "application/json",
    });

    return res.end(
      JSON.stringify({
        success: true,
        message: "Product Created Successfully",
        data: products,
      })
    );
  }

  // =========================
  // ROUTE NOT FOUND
  // =========================
  res.writeHead(404, {
    "content-type": "application/json",
  });

  return res.end(
    JSON.stringify({
      success: false,
      message: "Route Not Found",
    })
  );
};