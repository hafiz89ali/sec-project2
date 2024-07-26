function listLinks(req, res) {
  const data = {
    message: "Link list viewed successfully!",
  };
  return res.status(200).json(data);
}

export default listLinks;
