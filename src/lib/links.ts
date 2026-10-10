export type LinkItem = {
  // 클릭 수를 저장할 때 쓰는 키. 제목이나 URL을 바꿔도 집계가 이어지도록 따로 둔다
  id: string;
  title: string;
  url: string;
};

// TODO: 보여 주기용 더미 데이터. 나중에 실제 내용으로 교체
export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
  { id: "blog", title: "Blog", url: "https://example.com" },
];
