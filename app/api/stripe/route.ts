import Stripe from "stripe";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export async function POST(req: Request) {
  const { soTien, hoaDonId } = await req.json();

  if (soTien > 99999999) {
    return NextResponse.json(
      { error: "Số tiền vượt quá giới hạn Stripe" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "vnd",
            product_data: {
              name: `Thanh toán hóa đơn #${hoaDonId}`,
            },
            unit_amount: soTien,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/thanh-toan/thanh-cong?hd=${hoaDonId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/thanh-toan/that-bai`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
