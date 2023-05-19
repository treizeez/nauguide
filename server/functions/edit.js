export const edit = async (req, res, model, param) => {
  try {
    if (req.body.admin === process.env.identificator) {
      try {
        const updatedValue = await model.findByIdAndUpdate(req.params.id, {
          $set: req.body.value,
        });
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
