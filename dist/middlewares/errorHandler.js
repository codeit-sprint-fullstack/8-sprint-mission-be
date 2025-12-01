import { Prisma } from "@prisma/client";
export default function errorHandler(e, req, res, next) {
    console.error(e);
    if (e.name === "StructError") {
        return res.status(400).json({ message: e.message });
    }
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025") {
        return res.status(404).json({ message: "Cannot find given id" });
    }
    if (e.status && e.message) {
        return res.status(e.status).json({ message: e.message });
    }
    return res
        .status(500)
        .json({ message: "Server error", detail: e.message ?? "Unknown error" });
}
