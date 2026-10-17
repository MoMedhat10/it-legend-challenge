"use client";

import type { ReactNode } from "react";
import { useWideMode, WideModeProvider } from "@/components/player/WideMode";
import styles from "./PlayerLayout.module.css";

interface PlayerLayoutProps {
  video: ReactNode;
  actions: ReactNode;
  materials: ReactNode;
  topics: ReactNode;
  comments: ReactNode;
}

/** Client shell for the player page; the slots stay Server Components. */
export function PlayerLayout(props: PlayerLayoutProps) {
  return (
    <WideModeProvider>
      <LayoutGrid {...props} />
    </WideModeProvider>
  );
}

function LayoutGrid({ video, actions, materials, topics, comments }: PlayerLayoutProps) {
  const { wide } = useWideMode();
  return (
    <div className={styles.layout} data-wide={wide}>
      {/* On mobile the white band covers the page gutters while content scrolls under the sticky video. */}
      <div className={`${styles.video} -mx-4 bg-white px-4 py-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:p-0`}>{video}</div>
      <div className={styles.actions}>{actions}</div>
      <div className={styles.materials}>{materials}</div>
      <div className={styles.topics}>{topics}</div>
      <div className={styles.comments}>{comments}</div>
    </div>
  );
}
