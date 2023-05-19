export const editMany = async (req, res, model) => {
  console.log(req.body.first, req.body.second);
  try {
    if (req.body.admin === process.env.identificator) {
      try {
        const updatedValue = await model.updateMany(
          { type: req.body.first },
          { $set: { type: req.body.second } }
        );
        res.status(200).json(updatedValue);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You don't have rights to update");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
