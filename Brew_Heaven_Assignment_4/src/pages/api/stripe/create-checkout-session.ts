import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { cartItems } = req.body;

    // Make a request to your backend Stripe controller
    const response = await fetch("http://localhost:3001/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    });

    if (!response.ok) {
      throw new Error(`Error creating session: ${response.statusText}`);
    }

    const session = await response.json();
    res.status(200).json(session);
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
