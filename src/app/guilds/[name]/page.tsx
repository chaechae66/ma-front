import Guild from "./_component/Guild";

export default async function GuildPage({
  params,
}: {
  params: { name: string };
}) {
  return (
    <>
      <Guild guild={params.name} />
    </>
  );
}
