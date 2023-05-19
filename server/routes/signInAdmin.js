import bcrypt from "bcryptjs";

export const signInAdmin = (req, res) => {
  const identificator = req.query.identificator;
  identificator && bcrypt.compareSync(identificator, process.env.identificator)
    ? res.send(process.env.identificator)
    : res.send("err");
};
