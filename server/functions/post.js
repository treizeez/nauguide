export const post = async (req, res, model) => {
  const newValue = new model(req.body.value);
  try {
    if (req.body.admin === process.env.identificator) {
      const savedValue = await newValue.save();
      res.status(200).json(savedValue);
    } else {
      res.status(401).json("You don't have rights to post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
