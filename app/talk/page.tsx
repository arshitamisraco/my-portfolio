import type { Metadata } from "next";
import Deck from "./Deck";

export const metadata: Metadata = {
  title: "Fuego UX, round two",
  // The deck is a private rehearsal/presentation surface, not portfolio content.
  robots: { index: false, follow: false },
};

export default function TalkPage() {
  return <Deck />;
}
