import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";

// TODO: 보여 주기용 더미 데이터. 나중에 실제 내용으로 교체
const profile = {
  name: "Kim dg",
  bio: "coding starter",
  imageUrl: "/profile-placeholder.svg",
};

const links = [
  { title: "GitHub", url: "https://github.com" },
  { title: "LinkedIn", url: "https://www.linkedin.com" },
  { title: "Blog", url: "https://example.com" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-6 py-16">
      <Profile {...profile} />
      <nav className="mt-10 flex w-full flex-col gap-4">
        {links.map((link) => (
          <LinkCard key={link.title} {...link} />
        ))}
      </nav>
    </main>
  );
}
