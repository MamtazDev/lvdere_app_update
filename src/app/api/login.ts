import axios from 'axios';
import { withSessionRoute } from 'contexts/withSession';
export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
  console.log("quella li",req.body)
  if (req.method === 'POST') {
    const { email, password } = req.body as {
      email?: string;
      password?: string;
    };
    const user = await login({ email, password });
    req.session.user = user?.data;
    await req.session.save();
    return res.send(user.data);
  }
  return res.status(404).send('');
}

async function login({
  email,
  password,
}: {
  email?: string;
  password?: string;
}): Promise<any> {
  //fai il login
  return axios.post(
    `${process.env.BACKEND_ENDPOINT}/auth/login/email`,
    {
      email: email,
      password: password,
    },
    {
      withCredentials: true,
    }
  );
}
