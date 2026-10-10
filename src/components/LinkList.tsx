"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/lib/links";

type LinkListProps = {
  links: LinkItem[];
};

export default function LinkList({ links }: LinkListProps) {
  // 받아 오기 전에는 비어 있어 모든 카드가 0회로 보인다
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let ignore = false;

    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: Record<string, number>) => {
        if (ignore) return;
        // 응답을 기다리는 사이에 눌린 클릭이 서버 값에 덮이지 않도록 큰 쪽을 남긴다
        setCounts((prev) => {
          const next = { ...data };
          for (const [id, count] of Object.entries(prev)) {
            next[id] = Math.max(next[id] ?? 0, count);
          }
          return next;
        });
      })
      .catch((error) => console.error("클릭 수를 가져오지 못했습니다:", error));

    return () => {
      ignore = true;
    };
  }, []);

  const handleClick = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    // keepalive: 새 탭으로 넘어가거나 페이지를 떠나도 요청이 끊기지 않게 한다
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: { count: number }) => {
        setCounts((prev) => ({ ...prev, [id]: Math.max(prev[id] ?? 0, data.count) }));
      })
      .catch((error) => console.error("클릭 수를 저장하지 못했습니다:", error));
  };

  return (
    <nav className="mt-12 flex w-full flex-col gap-4">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          title={link.title}
          url={link.url}
          count={counts[link.id] ?? 0}
          onClick={() => handleClick(link.id)}
        />
      ))}
    </nav>
  );
}
