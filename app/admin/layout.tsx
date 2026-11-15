import type { Metadata } from "next";
import { Container } from "../components/Container";

export const metadata: Metadata = {
  title: "Media team",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <Container className="py-10 sm:py-16">{children}</Container>;
}
