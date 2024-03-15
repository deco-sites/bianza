import { ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "deco-sites/bianza/apps/site.ts";
import ProductCard from "deco-sites/bianza/components/product/ProductCard.tsx";

export interface Props {
    page: ProductDetailsPage | null;
}

export default function BuyTogether({ products }: ReturnType<typeof loader>) {

    return(
        <>
            <h1>Buy Together</h1>
            <div class="flex">
                {
                    products.map(product => {
                        return(
                            <ProductCard product={product} />
                        )
                    })
                }
            </div>
        </>
    )
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
    
    // Buscar os produtos do compre junto

    const tag = props.page?.product.additionalProperty?.find(add => add.name === "compre-junto" || add.value === "compre-junto")
    let products = []
    if (tag) {
        products = await ctx.invoke.vnda.loaders.productList({
            typeTags:[
                {key: "compre-junto", value: tag.value}
            ]
        })
    }

    return{
        products,
    }
}