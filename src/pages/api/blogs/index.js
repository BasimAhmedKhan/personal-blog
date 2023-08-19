import { create, getAll, getByUserEmail } from "@/services/blogs";

export default function handler(req, res) {
  if (req.method === "GET") {
    const { user_email } = req.query;
    if (user_email) {
      try {
        const data = getByUserEmail(user_email);
        res.status(200).json(data)
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    } else {
      try {
        const data = getAll();
        res.status(200).json(data)
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    }
  } else if (req.method === "POST") {
    const {
      title,
      content,
      userEmail,
    } = req.body;
    if (!title || !content || !userEmail) {
      res.status(400).json({ message: "Invalid body" });
      return;
    }
    try {
      const newBlog = create({
        title,
        content,
        userEmail,
      })
      res.status(201).json(newBlog);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
