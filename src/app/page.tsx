import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";

// TODO: 보여 주기용 더미 데이터. 나중에 실제 내용으로 교체
const profile = {
  name: "김개발",
  bio: "풀스택 개발자| 요즘에는 AI 개발에 관심이 많아요",
  imageUrl: "/KKUKKU.jpg",
};

const links = [
  { title: "GitHub", url: "https://github.com" },
  { title: "LinkedIn", url: "https://www.linkedin.com" },
  { title: "Blog", url: "https://example.com" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-7 pb-20 pt-24 sm:px-8 sm:pt-28">
      <Profile {...profile} />
      <nav className="mt-12 flex w-full flex-col gap-4">
        {links.map((link) => (
          <LinkCard key={link.title} {...link} />
        ))}
      </nav>
    </main>
  );
}
