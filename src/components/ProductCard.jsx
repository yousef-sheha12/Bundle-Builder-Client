import { useStore } from "../store/useStore";
import QuantityStepper from "./QuantityStepper";
import VariantSelector from "./VariantSelector";

function ProductCard({ product }) {
  const { activeVariants, selections } = useStore();
  const activeVariantId = product.hasVariants
    ? activeVariants[product.id]
    : null;

  const totalQty =
    product.hasVariants && product.variants.length > 0
      ? Object.values(selections[product.id] || {}).reduce(
          (sum, qty) => sum + qty,
          0,
        )
      : selections[product.id] || 0;

  const isActive = totalQty > 0;

  return (
    <div
      className={`relative border border-gray-200 rounded-xl bg-white p-3 sm:p-4 transition-all duration-150 ${isActive ? "border-indigo-500 shadow-[0_0_0_2px_#4F46E5,0_1px_3px_rgba(0,0,0,0.08)]" : "shadow-[0_1px_3px_rgba(0,0,0,0.08)]"}`}
    >
      {product.badge && (
        <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 py-0.5 sm:py-1 px-2 sm:px-2.5 bg-red-500 text-white text-[10px] sm:text-[11px] font-bold rounded-md z-10 tracking-wide">
          {product.badge}
        </span>
      )}

      <div className="flex gap-3 sm:gap-3.5">
        <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-contain"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-0.5 sm:mb-1 leading-tight">
            {product.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed mb-1 sm:mb-1.5">
            {product.description}
          </p>
          {product.learnMore && (
            <a
              href={product.learnMore}
              className="inline-block text-[11px] sm:text-xs font-medium text-indigo-500 underline decoration-indigo-500/30 mb-2 sm:mb-2.5 hover:decoration-indigo-500"
            >
              Learn More
            </a>
          )}

          {product.hasVariants && <VariantSelector product={product} />}

          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <QuantityStepper
              productId={product.id}
              variantId={activeVariantId}
            />

            <div className="flex items-baseline gap-1 sm:gap-1.5 shrink-0">
              {product.compareAtPrice != null && (
                <span className="text-[11px] sm:text-[13px] text-gray-400 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                  {product.compareAtPriceUnit || ""}
                </span>
              )}
              <span
                className={`text-sm sm:text-base font-bold ${product.isFree ? "text-emerald-600" : "text-gray-800"}`}
              >
                {product.isFree
                  ? "FREE"
                  : `$${product.price.toFixed(2)}${product.priceUnit || ""}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
