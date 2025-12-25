import ExploreByCategoryOrLocation from "@/src/screens/explore/Detailed";

const DetailExplorePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return <ExploreByCategoryOrLocation slug={slug} />;
};

export default DetailExplorePage;
