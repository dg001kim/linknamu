type LinkCardProps = {
  title: string;
  url: string;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ title, url, count, onClick }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block w-full rounded-2xl border border-white/70 bg-white/45 px-16 py-[18px] text-center text-[15px] font-medium shadow-[0_4px_24px_-8px_rgba(160,100,70,0.18)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_28px_-10px_rgba(160,100,70,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a789]/60 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] dark:hover:bg-white/[0.1]"
    >
      {title}
      {/* 제목은 가운데에 두고 클릭 수만 오른쪽 끝에 띄운다 */}
      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-normal tabular-nums text-[var(--muted)]">
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
