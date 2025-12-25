import { Card, CardContent } from "@/lib/ui/card";
import { CATEGORIES } from "@/src/utils/constants";
import { useRouter } from "next/navigation";

const Categories = ({ categoryCounts }: { categoryCounts: any }) => {
  const router = useRouter();

  const categoriesWithCounts = CATEGORIES?.map((cat) => ({
    ...cat,
    count: categoryCounts?.[cat?.id] || 0,
  }));

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/explore/${categoryId}`);
  };
  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {categoriesWithCounts?.map(
          (category: {
            id: string;
            label: string;
            icon: string;
            description: string;
            count: any;
          }) => (
            <Card
              key={category.id}
              className="py-2 group cursor-pointer hover:shadow-lg transition-all hover:border-purple-500/50"
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardContent className="px-3 sm:p-6 flex items-center gap-3">
                <div className="text-3xl sm:text-4xl">{category.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-1 group-hover:text-green-400 transition-colors">
                    {category.label}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} Event{category.count !== 1 ? "s" : ""}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default Categories;
