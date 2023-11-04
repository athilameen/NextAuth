import hashedPassword from "@/lib/auth";
import connetToDatabase from "@/lib/db";

async function handler(req, res) {

  if (req.method !== "POST") {
    return;
  }

  const email = req.body.email;
  const password = req.body.password;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 8
  ) {
    res.status(422).json({ message : 'Invaild input - Password Should be atleast 8 characters long.'});
    return;
  }

  const hashPassword = await hashedPassword(password);

  const client = await connetToDatabase();
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email: email});

  if(existingUser){
    res.status(422).json({ message : 'User already exists'});
    client.close();
    return;
  }

  const singup = await db.collection('users').insertOne({
    email: email,
    password: hashPassword,
  });

  console.log(singup);
  res.status(201).json({ message: "Created user Successfully" });

  client.close();

}

export default handler;
