// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { NextApiHandler } from "next";
import {
  GetServerSidePropsContext,
  PreviewData,
  GetServerSidePropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";

export const sessionOptions: IronSessionOptions = {
  password: "+gCkLcuH$rTyRF#+$WhVBhU((!V7Invp",
  cookieName: "next-auth",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};

export function withSessionRoute(handler: NextApiHandler<any>) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(
  handler: (
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
  ) =>
    | GetServerSidePropsResult<{ [key: string]: unknown }>
    | Promise<GetServerSidePropsResult<{ [key: string]: unknown }>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    access_token?: string;
  }
}
