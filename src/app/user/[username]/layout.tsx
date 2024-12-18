import CharacterTab from "@/app/user/[username]/_component/CharacterTab";

export default function UserLayout({
  params,
  children,
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-96 relative">
        <div className="bg-[url('../assets/images/bg_banner02.png')] w-full h-full absolute -z-20 bg-cover"></div>
        <div className="from-zinc-900 bg-gradient-to-t w-full h-96 absolute -z-10"></div>
      </div>
      <div className="-mt-32 wrap w-full">
        <div>
          <div className="flex flex-col w-full">
            <h2 className="text-left text-3xl font-bold justify-self-start mb-10">
              {decodeURIComponent(params.username)} 검색 결과
            </h2>
            <div className="w-full min-h-32 bg-[#ffffff30] p-10 mb-32 rounded-xl">
              <CharacterTab />
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
