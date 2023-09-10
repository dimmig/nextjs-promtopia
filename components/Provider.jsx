"use client";

import { SessionProvider } from "next-auth/react";

const Provider = ({ children, currentSession }) => {
  return <SessionProvider session={currentSession}>{children}</SessionProvider>;
};

export default Provider;
