import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct, saveProducts } from "../services/product.service";
import { Iproduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const url = req.url;
  const method = req.method;

  const normalizedUrl = url?.toLowerCase().replace(/\/$/, "");

  // Handle favicon
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

  // =========================
  // GET ALL PRODUCTS
  // =========================
  if (method === "GET" && normalizedUrl === "/products") {
    const products = await readProduct();

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
  else if (method === "GET" && isValidId) {
    const products = await readProduct();

    const product = products.find(
      (p: Iproduct) => Number(p.id) === Number(id)
    );

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
  else if (method === "POST" && normalizedUrl === "/products") {
    const body = await parseBody(req);

    const newProduct = {
      id: Date.now(),
      name: body.name,
      description: body.description || null,
      price: Number(body.price),
    };

    // ONLY SERVICE handles DB
    insertProduct(newProduct);

    res.writeHead(201, {
      "content-type": "application/json",
    });

    return res.end(
      JSON.stringify({
        success: true,
        message: "Product Created Successfully",
        data: newProduct,
      })
    );
  }

  // =========================
  // PUT PRODUCT
  // =========================
  else if (method === "PUT" && isValidId) {
    const body = await parseBody(req);
    const products = await readProduct();

    const index = products.findIndex(
      (p: Iproduct) => Number(p.id) === Number(id)
    )

    if (index === -1) {
      res.writeHead(404, {
        "content-type": "application/json",
      });

      return res.end(
        JSON.stringify({
          success: false,
          message: "Product not found",
        })
      );
    }

    products[index] = {
      ...products[index],
      ...body,
    };

    

    const { insertProduct: save } = await import("../services/product.service");
    save(products);

    res.writeHead(200, {
      "content-type": "application/json",
    });

    return res.end(
      JSON.stringify({
        success: true,
        message: "Product updated successfully",
        data: products[index],
      })
    );
  }
//====================
//Product DELETE
//=====================
 if (method === "DELETE" && id !== null) {

  const products = readProduct();

  const index = products.findIndex(
    (p: Iproduct) => Number(p.id) === Number(id)
  );

  // product not found
  if (index === -1) {
    res.writeHead(404, {
      "content-type": "application/json",
    });

    return res.end(
      JSON.stringify({
        success: false,
        message: "Product not found",
      })
    );
  }

  // delete product
  products.splice(index, 1);

  // save updated array
  saveProducts(products);

  res.writeHead(200, {
    "content-type": "application/json",
  });

  return res.end(
    JSON.stringify({
      success: true,
      message: "Product Deleted Successfully",
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