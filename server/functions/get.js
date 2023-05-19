export const get = async (req, res, model) => {
  try {
    const value = await model.find();
    res.status(200).json(value);
  } catch (err) {
    res.status(500).json(err);
  }
};
