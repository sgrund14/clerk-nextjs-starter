import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Set the paths that don't require the user to be signed in
// const publicPaths = ["/", "/sign-in*", "/sign-up*"];

// const isPublic = (path) => {
//   return publicPaths.find((x) => path.match(new RegExp(`^${x}$`.replace("*$", "($|/)"))));
// };

export default withClerkMiddleware((req) => {
  return NextResponse.next();
  // if (isPublic(req.nextUrl.pathname)) {
  //   return NextResponse.next();
  // }
  // const { userId } = getAuth(req);
  // if (!userId) {
  //   const signInUrl = new URL("/sign-in", req.url);
  //   signInUrl.searchParams.set("redirect_url", req.url);
  //   return NextResponse.redirect(signInUrl);
  // }
  // return NextResponse.next();
});

export const config = { matcher: "/((?!.*\\.).*)" };
