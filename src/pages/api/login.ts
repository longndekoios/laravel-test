import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/session";
import { HttpResponse } from "@/types/httpResponse";
import { httpPost } from "@/lib/apiHelper";

export default withIronSessionApiRoute(async function loginRoute(req, res) {
  try {
    const loginRes = await httpPost("api/login", {
      email: req.body.email,
      password: req.body.password,
    });

    // get user from database then:
    req.session.access_token = loginRes.data?.data?.access_token;
    await req.session.save();

    res.send({ ok: true });
  } catch (e) {
    res
      .status(401)
      .send({ status_code: 401, message: "Unauthorized" } as HttpResponse<any>);
  }
}, sessionOptions);
