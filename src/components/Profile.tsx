import Image from "next/image";

type ProfileProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function Profile({ name, bio, imageUrl }: ProfileProps) {
  return (
    <section className="flex flex-col items-center text-center">
      <Image
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        width={150}
        height={150}
        className="h-[132px] w-[132px] rounded-full object-cover shadow-[0_14px_36px_-10px_rgba(160,100,70,0.45)] ring-4 ring-white/80 sm:h-[150px] sm:w-[150px] dark:shadow-[0_14px_36px_-10px_rgba(0,0,0,0.7)] dark:ring-white/10"
        unoptimized
        priority
      />
      <h1 className="mt-7 text-2xl font-semibold tracking-tight">{name}</h1>
      <p className="mt-2 max-w-xs text-balance text-[15px] leading-relaxed text-[var(--muted)]">
        {bio}
      </p>
    </section>
  );
}
