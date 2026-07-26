import toast from "react-hot-toast";
import { CATEGORY_LABELS, CATEGORY_ORDER } from "../data/mockData/selection";
import { useStore } from "../store/useStore";
import QuantityStepper from "./QuantityStepper";

function ReviewPanel() {
  const {
    getSelectedItems,
    getSavings,
    getSubtotal,
    getTotalCompareAt,
    productsData,
  } = useStore();

  const items = getSelectedItems();
  const subtotal = getSubtotal();
  const totalCompareAt = getTotalCompareAt();
  const savings = getSavings();
  const shipping = productsData.shipping;

  const groupedItems = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    items: items.filter((item) => item.category === cat),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="bg-[#EDF4FF] border border-gray-200 rounded-xl p-4 sm:p-6 sticky top-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="mb-4 sm:mb-5">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-1.5">
          Your security system
        </h2>
        <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      <div className="mb-4">
        {groupedItems.map((group) => (
          <div key={group.category} className="mb-3 sm:mb-4 last:mb-0">
            <h3 className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-gray-400 uppercase mb-2 sm:mb-2.5 pb-1.5 border-b border-gray-200">
              {group.label}
            </h3>
            {group.items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="flex items-center justify-between gap-2 sm:gap-2.5 py-1.5 sm:py-2"
              >
                <div className="flex items-center gap-2 sm:gap-2.5 flex-1 min-w-0">
                  <img
                    className="w-8 h-8 sm:w-9 sm:h-9 object-contain bg-gray-100 rounded-md shrink-0"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="min-w-0">
                    <span className="text-xs sm:text-[13px] font-medium text-gray-800 block overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.name}
                      {item.variantLabel ? ` (${item.variantLabel})` : ""}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <QuantityStepper
                    productId={item.productId}
                    variantId={item.variantId}
                    compact
                  />
                  <div className="flex flex-col items-end min-w-17.5">
                    {item.compareAtPrice != null && (
                      <span className="text-[10px] sm:text-[11px] text-gray-400 line-through">
                        ${item.compareAtPrice.toFixed(2)}
                        {item.priceUnit || ""}
                      </span>
                    )}
                    <span
                      className={`text-xs sm:text-sm font-semibold ${item.isFree ? "text-emerald-600 font-semibold" : "text-gray-800"}`}
                    >
                      {item.isFree
                        ? "FREE"
                        : item.priceUnit
                          ? `$${item.price.toFixed(2)}${item.priceUnit}`
                          : `$${(item.price * item.quantity).toFixed(2)}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between py-2.5 sm:py-3 border-t border-b border-gray-200 my-2.5 sm:my-3">
        <div className="flex items-center gap-2 text-gray-500">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="sm:w-4.5 sm:h-4.5"
          >
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          <span className="text-xs sm:text-[13px] font-medium">
            {shipping.label}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] sm:text-xs text-gray-400 line-through">
            ${shipping.price.toFixed(2)}
          </span>
          <span className="text-xs sm:text-[13px] font-semibold text-emerald-600">
            FREE
          </span>
        </div>
      </div>

      <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 py-2 sm:py-2.5 px-2 sm:px-2.5 bg-indigo-50 rounded-lg shrink-0">
          <div className="flex items-center justify-center">
            <img
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
              src="/Satisfacation.png"
              alt="Satisfaction guarantee"
            />
          </div>
          <div className="flex flex-col text-[9px] sm:text-[10px] text-indigo-500 leading-tight">
            <strong className="text-xs sm:text-sm font-bold">100%</strong>
            <span>satisfaction guarantee</span>
          </div>
        </div>
        <div className="py-2 sm:py-2.5 px-2 sm:px-2.5 bg-indigo-50 rounded-lg flex-1">
          <p className="text-[9px] sm:text-[10px] text-indigo-900 leading-tight">
            <span className="font-semibold">30-day hassle-free returns</span>
          </p>
          <p className="text-[9px] sm:text-[10px] text-indigo-900 leading-tight mt-0.5">
            If you're not totally in love with the product, we will refund you
            100%.
          </p>
        </div>
      </div>

      <div className="text-center text-[11px] sm:text-xs text-gray-500 mb-2.5 sm:mb-3 py-1.5 sm:py-2 bg-indigo-50 rounded-md">
        as low as{" "}
        <strong className="text-indigo-500">
          ${(subtotal / 12).toFixed(2)}/mo
        </strong>
      </div>

      <div className="text-right mb-3 sm:mb-4">
        <div className="flex items-baseline justify-end gap-1.5 sm:gap-2">
          {totalCompareAt > subtotal && (
            <span className="text-sm sm:text-base text-gray-400 line-through">
              ${totalCompareAt.toFixed(2)}
            </span>
          )}
          <span className="text-xl sm:text-2xl font-bold text-gray-800">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        {savings > 0 && (
          <p className="text-[11px] sm:text-xs text-indigo-500 font-medium mt-1 text-right">
            Congrats! You're saving ${savings.toFixed(2)} on your security
            bundle!
          </p>
        )}
      </div>

      <button
        className="block w-full py-3 sm:py-3.5 bg-indigo-500 text-white border-none rounded-lg font-sans text-sm sm:text-[15px] font-semibold cursor-pointer transition-colors duration-150 mb-2.5 sm:mb-3 hover:bg-indigo-700"
        type="button"
        onClick={() => {
          toast.success("Payment Later");
        }}
      >
        Checkout
      </button>

      <button
        className="block w-full py-2 sm:py-2.5 bg-transparent border-none font-sans text-xs sm:text-[13px] text-gray-500 cursor-pointer underline decoration-gray-500/30 text-center hover:text-gray-800 hover:decoration-gray-800"
        type="button"
        onClick={() => {
          toast.success(
            "System saved! You can close this page and return later.",
          );
        }}
      >
        Save my system for later
      </button>
    </div>
  );
}

export default ReviewPanel;
