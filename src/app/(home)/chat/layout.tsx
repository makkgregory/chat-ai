import { Metadata } from "next";
import { FC, PropsWithChildren } from "react";

interface Context {
  searchParams: Promise<{ chatId?: string }>;
}

export const generateMetadata = async ({
  searchParams,
}: Context): Promise<Metadata> => {
  return {};
};

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return children;
};

export default Layout;
