type LinkCardProps = {
  title: string;
  url: string;
};

export default function LinkCard({ title, url }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl border border-white/70 bg-white/45 px-6 py-[18px] text-center text-[15px] font-medium shadow-[0_4px_24px_-8px_rgba(160,100,70,0.18)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_28px_-10px_rgba(160,100,70,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a789]/60 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] dark:hover:bg-white/[0.1]"
    >
      {title}
    </a>
  );
}
