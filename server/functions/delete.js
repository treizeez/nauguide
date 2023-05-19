export const deleter = async (req, res, model) => {
  try {
    const value = await model.findById(req.params.id);
    if (req.body.admin === process.env.identificator) {
      try {
        await value.delete();
        res.status(200).json("Object has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You don't have rights to delete");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
