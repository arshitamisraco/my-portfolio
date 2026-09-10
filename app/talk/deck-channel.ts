"use client";

/**
 * Cross-window sync for the deck.
 *
 * The deck at /talk is the source of truth; /talk/presenter is a follower that
 * shows notes, the clock, and the next slide. They talk over a BroadcastChannel
 * so the presenter view can live on a laptop while the deck is mirrored to a
 * projector.
 */

import { useEffect, useRef } from "react";

export const CHANNEL = "coros-talk";

export interface DeckState {
  type: "state";
  index: number;
  elapsed: number;
  running: boolean;
}

export type DeckCommand =
  | { type: "cmd"; cmd: "next" | "prev" | "toggleTimer" | "resetTimer" }
  | { type: "cmd"; cmd: "goto"; index: number }
  // Sent by a presenter window on mount so the deck replies with current state
  // instead of the presenter sitting blank until the next slide change.
  | { type: "hello" };

export type DeckMessage = DeckState | DeckCommand;

/**
 * Subscribe to the channel and get a stable `send`.
 *
 * `onMessage` is held in a ref so a caller can pass an inline handler without
 * tearing down and re-creating the channel on every render.
 */
export function useDeckChannel(onMessage: (message: DeckMessage) => void) {
  const handlerRef = useRef(onMessage);
  handlerRef.current = onMessage;

  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;

    const channel = new BroadcastChannel(CHANNEL);
    channelRef.current = channel;
    channel.onmessage = (event: MessageEvent<DeckMessage>) => handlerRef.current(event.data);

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, []);

  return (message: DeckMessage) => channelRef.current?.postMessage(message);
}

/** mm:ss, and h:mm:ss once a talk runs past an hour. */
export function formatClock(totalSeconds: number): string {
  const sign = totalSeconds < 0 ? "-" : "";
  const abs = Math.abs(Math.round(totalSeconds));
  const hours = Math.floor(abs / 3600);
  const minutes = Math.floor((abs % 3600) / 60);
  const seconds = abs % 60;

  const mm = hours > 0 ? String(minutes).padStart(2, "0") : String(minutes);
  const ss = String(seconds).padStart(2, "0");

  return hours > 0 ? `${sign}${hours}:${mm}:${ss}` : `${sign}${mm}:${ss}`;
}
