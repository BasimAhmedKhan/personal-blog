import { changePassword, save } from "@/services/users";

export default function handler(req, res) {
    console.log(req.body);
    if (req.method !== "POST") {
        return res.status(404).send();
    }
    const { email, password, oldPassword } = req.body;
    try {
        changePassword(email, oldPassword, password)
        res.status(200).send();
    } catch (err) {
        res.status(400).json({message: err});
    }

}