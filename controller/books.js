import book from "../model/book.js";

const bookHandler = async (req, res) =>{
  const { email,  name,sDate, eDate } = req.body;
  console.log(email, name , sDate, eDate);

  if (!email || !name || !sDate || !eDate) {

    return res.status(400).json({ error: 'Missing required ' });
  }

  else {
    const reqbook= await book.create({
      email, 
      name,
      sDate,
      eDate,
    })
    reqbook.save();
    res.status(200).json({ message: 'Email sent successfully' });
  }
}

export default bookHandler;