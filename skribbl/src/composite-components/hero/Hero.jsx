import BackButton from "../../components/back-button/BackButton";

import { DASHBOARD_ROUTE } from "../../constants/routes";

const heroClassName = "bg-black text-white p-2";
const entryFeesClassName = "text-right m-4";
const backButtonClassName = "m-4";

function Hero({ children, entryFees }) {
  const renderBackButton = () => {
    return (
      <div className={backButtonClassName}>
        <BackButton target={DASHBOARD_ROUTE} />
      </div>
    );
  };

  const renderEntryFees = () => {
    return (
      <div className={entryFeesClassName}>*Entry Fees: {entryFees} coins</div>
    );
  };

  return (
    <div className={heroClassName}>
      {renderBackButton()}
      {children}
      {renderEntryFees()}
    </div>
  );
}

export default Hero;
