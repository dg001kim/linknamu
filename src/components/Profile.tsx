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
        className="h-[150px] w-[150px] rounded-full border-2 border-gray-300 object-cover dark:border-gray-600"
        unoptimized
        priority
      />
      <h1 className="mt-5 text-xl font-bold">{name}</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{bio}</p>
    </section>
  );
}
