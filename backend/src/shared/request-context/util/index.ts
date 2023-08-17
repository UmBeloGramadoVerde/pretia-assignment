import { plainToClass } from "class-transformer";
import { Request } from "express";

import { UserAccessTokenClaims } from "../../../auth/dtos/auth-token-output.dto";
import {
  FORWARDED_FOR_TOKEN_HEADER,
  REQUEST_ID_TOKEN_HEADER,
} from "../../constants";
import { RequestContext } from "../request-context.dto";

// Creates a RequestContext object from Request
export function createRequestContext(request: Request): RequestContext {
  const ctx = new RequestContext();
  ctx.requestID = request.header(REQUEST_ID_TOKEN_HEADER);
  ctx.url = request.url;
  ctx.ip = request.header(FORWARDED_FOR_TOKEN_HEADER)
    ? request.header(FORWARDED_FOR_TOKEN_HEADER)
    : request.ip;

  console.debug("(request as any).user", (request as any).user);
  // If request.user does not exist, we explicitly set it to null.
  ctx.user =
    (request as any).user ?? null
      ? plainToClass(UserAccessTokenClaims, (request as any).user ?? null, {
          excludeExtraneousValues: true,
        })
      : null;

  return ctx;
}
