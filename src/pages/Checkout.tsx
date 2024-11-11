import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { detectCardType, formatCardNumber } from '../utils/cardUtils';
import { CreditCard, Building2, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const [isGuest, setIsGuest] = useState(true);
  const [cardType, setCardType] = useState('unknown');
  const [showBankModal, setShowBankModal] = useState(false);
  const cart = useStore((state) => state.cart);
  const promoCode = useStore((state) => state.promoCode);
  const setPromoCode = useStore((state) => state.setPromoCode);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [bankData, setBankData] = useState({
    accountNumber: '',
    transitNumber: '',
    institutionNumber: '',
  });

  useEffect(() => {
    setCardType(detectCardType(formData.cardNumber));
  }, [formData.cardNumber]);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formattedNumber });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setShowBankModal(true);
    }, 1500);
  };

  const handleBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle bank account linking
    setTimeout(() => {
      setShowBankModal(false);
      // Show success message or redirect
    }, 1000);
  };

  const renderCardLogo = () => {
    const baseClass = "h-8 transition-opacity duration-200";
    const activeClass = "opacity-100";
    const inactiveClass = "opacity-30";

    return (
      <div className="flex space-x-2 mb-2">
        <img
          src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/visa.svg"
          alt="Visa"
          className={`${baseClass} ${cardType === 'visa' ? activeClass : inactiveClass}`}
        />
        <img
          src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/mastercard.svg"
          alt="Mastercard"
          className={`${baseClass} ${cardType === 'mastercard' ? activeClass : inactiveClass}`}
        />
        <img
          src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/amex.svg"
          alt="American Express"
          className={`${baseClass} ${cardType === 'amex' ? activeClass : inactiveClass}`}
        />
      </div>
    );
  };

  const BankLinkModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center space-x-2 mb-6">
          <Building2 className="h-6 w-6 text-indigo-600" />
          <h2 className="text-2xl font-bold">Link Your Bank Account</h2>
        </div>

        <form onSubmit={handleBankSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border rounded-md"
              value={bankData.accountNumber}
              onChange={(e) =>
                setBankData({ ...bankData, accountNumber: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Transit Number (5 digits)
            </label>
            <input
              type="text"
              required
              maxLength={5}
              className="w-full px-3 py-2 border rounded-md"
              value={bankData.transitNumber}
              onChange={(e) =>
                setBankData({ ...bankData, transitNumber: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Institution Number (3 digits)
            </label>
            <input
              type="text"
              required
              maxLength={3}
              className="w-full px-3 py-2 border rounded-md"
              value={bankData.institutionNumber}
              onChange={(e) =>
                setBankData({ ...bankData, institutionNumber: e.target.value })
              }
            />
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span>Your banking information is encrypted and secure</span>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowBankModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Skip for now
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Link Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {showBankModal && <BankLinkModal />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Checkout</h2>
          
          <div className="mb-8">
            <div className="flex space-x-4 mb-4">
              <button
                className={`flex-1 py-2 px-4 rounded-md ${
                  isGuest
                    ? 'bg-gray-200'
                    : 'bg-indigo-600 text-white'
                }`}
                onClick={() => setIsGuest(false)}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-md ${
                  isGuest
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200'
                }`}
                onClick={() => setIsGuest(true)}
              >
                Guest Checkout
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Province
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.province}
                  onChange={(e) =>
                    setFormData({ ...formData, province: e.target.value })
                  }
                >
                  <option value="">Select Province</option>
                  <option value="ON">Ontario</option>
                  <option value="BC">British Columbia</option>
                  <option value="AB">Alberta</option>
                  <option value="QC">Quebec</option>
                  <option value="MB">Manitoba</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="YT">Yukon</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border rounded-md"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
              />
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Payment Information</h3>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">Secure Payment</span>
                </div>
              </div>
              
              {renderCardLogo()}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="•••• •••• •••• ••••"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        setFormData({ ...formData, expiryDate: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      className="w-full px-3 py-2 border rounded-md"
                      value={formData.cvv}
                      onChange={(e) =>
                        setFormData({ ...formData, cvv: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700"
            >
              Complete Purchase
            </button>
          </form>
        </div>

        <div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <p className="font-medium">{item.brand}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">${item.sellingPrice}</p>
              </div>
            ))}

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Promo Code
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border rounded-md"
                    value={promoCode || ''}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button className="px-4 py-2 bg-gray-200 rounded-md">
                    Apply
                  </button>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}