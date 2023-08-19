import { save } from "@/services/users";

export default function handler(req, res) {
    console.log(req.body);
    if (req.method !== "POST") {
        return res.status(404).send();
    }
    const { email, password, firstName, lastName, } = req.body;
    try {
        save(email, password, firstName, lastName);
        res.status(201).send();
    } catch (err) {
        res.status(400).json({message: err});
    }

}
  