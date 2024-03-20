import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "deco-sites/bianza/apps/site.ts";
import ProductCard from "deco-sites/bianza/components/product/ProductCard.tsx";
import { SectionProps } from "deco/types.ts";
import type { Manifest as ManifestVNDA } from "apps/vnda/manifest.gen.ts";
import { ManifestOf } from "deco/mod.ts";
import { InvocationProxy } from "deco/utils/invoke.types.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

export default function BuyTogether({ products }: SectionProps<typeof loader>) {
  return (
    <>
      <h1 class="font-bold text-base-content text-[40px] leading-[120%]">
        Compre Junto
      </h1>
      <div class="flex">
        {products?.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </>
  );
}

type Vnda = InvocationProxy<ManifestVNDA>;

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  // Buscar os produtos do compre junto

  const tag = props.page?.product.additionalProperty?.find((add) =>
    add.name === "compre-junto" || add.value === "compre-junto"
  );
  let products: Product[] | null = null;
  if (tag) {
    products = await (ctx.invoke as unknown as Vnda).vnda.loaders.productList({
      typeTags: [
        { key: "compre-junto", value: tag.value || "" },
      ],
    });
  }

  return {
    products,
  };
};
