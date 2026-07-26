import { useStore } from "../store/useStore";
import ProductCard from "./ProductCard";

function StepAccordion() {
  const {
    activeStep,
    getStepProductCount,
    setActiveStep,
    nextStep,
    productsData,
  } = useStore();

  return (
    <div className="flex flex-col">
      {productsData.steps.map((step, index) => {
        const isOpen = activeStep === index;
        const productCount = getStepProductCount(step.id);
        const stepProducts = productsData.products.filter(
          (p) => p.step === step.id,
        );

        return (
          <div
            key={step.id}
            className={`border border-gray-200 rounded-xl bg-white overflow-hidden transition-shadow duration-200 ${isOpen ? "border-indigo-500 shadow-[0_0_0_1px_#4F46E5]" : ""} ${index > 0 ? "mt-2" : ""}`}
          >
            <button
              className={`flex items-center justify-between w-full py-3 px-3.5 sm:py-4 sm:px-5 bg-transparent border-none cursor-pointer text-left font-sans ${isOpen ? "bg-indigo-50" : ""}`}
              onClick={() => setActiveStep(isOpen ? null : index)}
              type="button"
            >
              <div className="flex flex-col gap-0.5 sm:gap-1">
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
                  STEP {step.stepNumber} OF {productsData.steps.length}
                </span>
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <span className="flex items-center justify-center text-indigo-500">
                    {index === 0 && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="sm:w-5 sm:h-5"
                      >
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="sm:w-5 sm:h-5"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="sm:w-5 sm:h-5"
                      >
                        <rect x="1" y="3" width="15" height="13" />
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="sm:w-5 sm:h-5"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                    )}
                  </span>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                    {step.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-[11px] sm:text-[13px] font-medium text-indigo-500 whitespace-nowrap">
                  {productCount > 0 ? `${productCount} selected` : ""}
                </span>
                <span className="flex items-center justify-center text-gray-500">
                  {isOpen ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="sm:w-4 sm:h-4"
                    >
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="sm:w-4 sm:h-4"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </span>
              </div>
            </button>
            {isOpen && (
              <div className="px-3.5 pb-3.5 sm:px-5 sm:pb-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {stepProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {step.nextLabel && (
                  <button
                    className="block w-full max-w-[320px] mx-auto mt-4 sm:mt-5 py-2.5 sm:py-3 px-5 sm:px-6 bg-white border border-gray-200 rounded-lg font-sans text-xs sm:text-sm font-semibold text-gray-800 cursor-pointer transition-all duration-150 text-center hover:border-indigo-500 hover:text-indigo-500 hover:bg-indigo-50"
                    onClick={nextStep}
                    type="button"
                  >
                    Next: {step.nextLabel}
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepAccordion;
