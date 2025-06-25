import contact from "../model/contact.js";

const confirmationHandler = async (req, res) =>{
  const { email,  name, message } = req.body;

  if (!email || !name || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  else {
    const reqContact = await contact.create({
      email, 
      name,
      message,
    })
    reqContact.save();
    res.status(200).json({ message: 'Email sent successfully' });
  }
}

export default confirmationHandler;