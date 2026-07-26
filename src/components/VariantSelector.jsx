import { useStore } from "../store/useStore";

function VariantSelector({ product }) {
  const { activeVariants, selections, setActiveVariant } = useStore();

  if (!product.hasVariants || product.variants.length === 0) return null;

  const activeVariantId = activeVariants[product.id];

  return (
    <div className="flex gap-1 sm:gap-1.5 flex-wrap mb-2 sm:mb-3">
      {product.variants.map((variant) => {
        const isActive = activeVariantId === variant.id;
        const qty = selections[product.id]?.[variant.id] || 0;
        return (
          <button
            key={variant.id}
            className={`inline-flex items-center gap-1 sm:gap-1.5 py-1 px-2 sm:py-1.25 sm:px-2.5 border rounded-full bg-white cursor-pointer font-sans text-[10px] sm:text-xs text-gray-800 transition-all duration-150 ${isActive ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-400"} ${qty > 0 ? "variant-chip--has-qty" : ""}`}
            onClick={() => setActiveVariant(product.id, variant.id)}
            type="button"
          >
            <img
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shrink-0 border border-black/15 object-cover"
              src={variant.image}
              alt={variant.label}
            />
            <span className="whitespace-nowrap">{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default VariantSelector;
