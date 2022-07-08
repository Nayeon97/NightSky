import * as status from "../utils/status.js";
export default function loginRequired(req, res, next) {
  if (!req.user) {
    throw new Error(
      "로그인 후 사용해야 합니다.",
      status.STATUS_401_UNAUTHORIZED
    );
  }
  next();
}
