export const checkAdmin = (req, res) =>
  req.body.admin === process.env.identificator
    ? res.send(true)
    : res.send(false);
