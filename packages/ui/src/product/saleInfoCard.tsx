import { useState } from "react";
import { ChevronDown, FileText, User } from "lucide-react";

interface SalesPerson {
  id: string;
  name: string;
  avatar: string;
}

interface SaleInfoCardProps {
  salesPersons?: SalesPerson[];
  paymentMethods?: string[];
  onNote?: () => void;
  onCustomer?: () => void;
}

const defaultSalesPersons: SalesPerson[] = [
  { id: "1", name: "Alice Johnson", avatar: "AJ" },
  { id: "2", name: "Bob Smith", avatar: "BS" },
  { id: "3", name: "Carol White", avatar: "CW" },
];

const defaultPaymentMethods = ["Cash", "Card", "Bank Transfer"];

export const SaleInfoCard = ({
  salesPersons = defaultSalesPersons,
  paymentMethods = defaultPaymentMethods,
  onNote,
  onCustomer,
}: SaleInfoCardProps) => {
  const [selectedPerson, setSelectedPerson] = useState<SalesPerson>(
    salesPersons[0],
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]);

  return (
    <div className="bg-white rounded-lg box-shadow p-3 flex items-center  gap-2">
      {/* Section 1 — Sales Person */}
      <div className="relative w-1/4">
        <span className="text-xs text-gray-400 block mb-1">Sales Person</span>
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          className="flex items-center gap-2 w-full border border-gray-200 rounded-md px-2 py-1.5 text-sm hover:border-gray-400 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold shrink-0">
            {selectedPerson.avatar}
          </div>
          <span className="flex-1 text-left truncate">
            {selectedPerson.name}
          </span>
          <ChevronDown
            size={14}
            className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {dropdownOpen && (
          <ul className="absolute z-20 bottom-9/12 mt-1 left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden text-sm">
            {salesPersons.map((person) => (
              <li key={person.id}>
                <button
                  onClick={() => {
                    setSelectedPerson(person);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition-colors ${
                    selectedPerson.id === person.id
                      ? "bg-secondary-light text-secondary font-medium"
                      : ""
                  }`}
                >
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold shrink-0-0">
                    {person.avatar}
                  </div>
                  {person.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Section 2 — Payment Method */}
      <div className="flex-1 ms-4">
        <span className="text-xs text-gray-400 block mb-1">Payment Method</span>
        <div className="flex gap-3">
          {paymentMethods.map((method) => (
            <label
              key={method}
              className="flex items-center gap-1.5 cursor-pointer text-sm"
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={selectedPayment === method}
                onChange={() => setSelectedPayment(method)}
                className="accent-secondary w-3.5 h-3.5"
              />
              <span
                className={
                  selectedPayment === method
                    ? "text-secondary font-medium"
                    : "text-gray-600"
                }
              >
                {method}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-px h-10 bg-gray-200 shrink-0-0" />

      {/* Section 3 — More Actions */}
      <div className="shrink-0-0">
        <span className="text-xs text-gray-400 block mb-1">More Actions</span>
        <div className="flex gap-2">
          <button
            onClick={onNote}
            className="flex items-center gap-1.5 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:border-secondary hover:text-secondary transition-colors"
          >
            <FileText size={14} />
            Note
          </button>
          <button
            onClick={onCustomer}
            className="flex items-center gap-1.5 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:border-secondary hover:text-secondary transition-colors"
          >
            <User size={14} />
            Customer
          </button>
        </div>
      </div>
    </div>
  );
};
