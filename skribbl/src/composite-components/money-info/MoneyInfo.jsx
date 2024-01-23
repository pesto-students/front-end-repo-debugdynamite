import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

function MoneyInfo({ isPositive, money }) {
  let sign = isPositive ? faPlus : faMinus;

  return (
    <div className="flex items-top">
      <FontAwesomeIcon icon={sign} size="xs" className="mt-2" />
      <FontAwesomeIcon icon={faIndianRupeeSign} className="mt-2 ml-0.5" />
      <span className="text-4xl font-bold ml-1">{money}</span>
    </div>
  );
}

export default MoneyInfo;
