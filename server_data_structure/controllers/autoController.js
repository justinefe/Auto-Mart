class autoController {
  static welcome(req, res) {
    return res.status(200).json({
      message: 'Welcome to Auto-Mart',
    });
  }
}

export default autoController;
