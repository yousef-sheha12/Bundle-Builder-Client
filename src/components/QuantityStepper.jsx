import { useStore } from "../store/useStore";

function QuantityStepper({ productId, variantId = null, compact = false }) {
  const { selections, incrementQuantity, decrementQuantity } = useStore();

  const quantity =
    variantId !== null
      ? selections[productId]?.[variantId] || 0
      : selections[productId] || 0;

  return (
    <div
      className={`inline-flex items-center border border-gray-200 bg-white overflow-hidden ${compact ? "rounded-md" : "rounded-lg"}`}
    >
      <button
        className={`flex items-center justify-center border-none bg-transparent cursor-pointer transition-all duration-150 font-sans font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 ${compact ? "w-6 h-6 text-xs sm:w-6.5 sm:h-6.5 sm:text-sm" : "w-7 h-7 text-sm sm:w-8 sm:h-8 sm:text-base"}`}
        onClick={() => decrementQuantity(productId, variantId)}
        disabled={quantity === 0}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span
        className={`text-center font-medium text-gray-800 border-l border-r border-gray-200 flex items-center justify-center ${compact ? "min-w-5 text-[12px] h-6 px-0.5 sm:min-w-6 sm:text-[13px] sm:h-6.5 sm:px-1" : "min-w-6 text-xs h-7 px-1 sm:min-w-7.5 sm:text-sm sm:h-8 sm:px-1"}`}
      >
        {quantity}
      </span>
      <button
        className={`flex items-center justify-center border-none bg-transparent cursor-pointer transition-all duration-150 font-sans font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 ${compact ? "w-6 h-6 text-xs sm:w-6.5 sm:h-6.5 sm:text-sm" : "w-7 h-7 text-sm sm:w-8 sm:h-8 sm:text-base"}`}
        onClick={() => incrementQuantity(productId, variantId)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantityStepper;
