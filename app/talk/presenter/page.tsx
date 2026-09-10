import type { Metadata } from "next";
import Presenter from "./Presenter";

export const metadata: Metadata = {
  title: "Presenter view",
  robots: { index: false, follow: false },
};

export default function PresenterPage() {
  return <Presenter />;
}
