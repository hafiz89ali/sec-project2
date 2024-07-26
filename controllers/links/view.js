function viewLink(req, res) {
  const data = {
    message: "Link viewed successfully!",
  };
  return res.status(200).json(data);
}

export default viewLink;
