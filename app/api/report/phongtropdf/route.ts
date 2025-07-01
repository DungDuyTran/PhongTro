import { NextRequest } from "next/server";
import { prisma } from "@/prisma/client";
import { exportPhongTroToPDF } from "@/lib/export-pdf-template";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const phongTros = await prisma.phongTro.findMany({
      include: { ToaNha: true },
    });
    const pdfBuffer: Buffer = await exportPhongTroToPDF(phongTros);
    const arrayBuffer = new Uint8Array(pdfBuffer).buffer;

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=phongtro.pdf",
      },
    });
  } catch (error) {
    console.error("Error exporting PDF:", error);
    return new Response("Error generating PDF", { status: 500 });
  }
}
