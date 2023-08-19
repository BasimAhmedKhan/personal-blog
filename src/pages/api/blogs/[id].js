import { deleteById, getById } from "@/services/blogs";

export default function handler(req, res) {
  const {
    query: { id },
  } = req;

  if (req.method === "DELETE") {
    try {
      const data = deleteById(id);
      res.status(200).json(data);
    } catch (e) {
      res.status(404).json({ message: "Blog not found" });
    }
  } else if (req.method === "GET") {
    try {
      const data = getById(id);
      res.status(200).json(data);
    } catch (e) {
      res.status(404).json({ message: "Blog not found" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}