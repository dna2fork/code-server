import { Router } from "express"
import { getCookieDomain, redirect } from "../http"
import { Cookie } from "./login"

export const router = Router()

router.get("/", async (req, res) => {
  // Must use the *identical* properties used to set the cookie.
  res.clearCookie(Cookie.Key, {
    domain: getCookieDomain(req.headers.host || "", req.args["proxy-domain"]),
    path: req.query.base || "/",
    sameSite: "lax",
  })

  const to = (typeof req.query.to === "string" && req.query.to) || (
     process.env.EXTERNAL_AUTH_HOST
  )
  res.writeHead(302, { Location: to })
  res.end()
  // return redirect(req, res, to, { to: undefined, base: undefined })
})
