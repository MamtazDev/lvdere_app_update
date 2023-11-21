import { withSessionRoute } from 'contexts/withSession';

export default withSessionRoute(logout);

async function logout(req, res) {
  //fai il logout
  req.session.destroy();
  res.send({ ok: true });
}
