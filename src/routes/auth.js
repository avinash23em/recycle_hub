router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id, role: user.role }, 'yourSecretKey', { expiresIn: '1h' });
      res.json({ token, role: user.role });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  