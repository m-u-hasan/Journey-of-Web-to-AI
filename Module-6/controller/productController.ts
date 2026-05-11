import type { IncomingMessage, ServerResponse } from "http";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse
) => {

  const url = req.url;
  const method = req.method;

  const products = [
    {
      id: 1,
      name: "Rahim",
    },
  ];

  if (url?.startsWith("/Products") && method === "GET") {

    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(
      JSON.stringify({
        success: true,
        message: "This is product route hub zone",
        data: products,
      })
    );
  }
};