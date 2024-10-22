import MainRank from "./_components/MainRank";
import SearchForm from "./_components/SearchForm";

export default function Home() {
  return (
    <>
      <div className="wrap w-full h-96 relative">
        <div className="flex-center">
          <div className="mt-20">
            <h4 className="font-semibold text-3xl text-center text-white">
              메이플 스토리
              <br />
              닉네임 및 길드를 검색해주세요
            </h4>
            <SearchForm />
          </div>
          <div className="bg-[url('../assets/images/bg_banner01.png')] w-full h-full absolute -z-20"></div>
          <div className="from-zinc-900 bg-gradient-to-t w-full h-96 absolute -z-10"></div>
        </div>
      </div>
      <MainRank />
    </>
  );
}
