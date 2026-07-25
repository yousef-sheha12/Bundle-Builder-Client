import ReviewPanel from "../components/ReviewPanel";
import StepAccordion from "../components/StepAccordion";

function LandingPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
      <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 lg:gap-6 items-start">
        <div>
          <StepAccordion />
        </div>
        <div>
          <ReviewPanel />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
