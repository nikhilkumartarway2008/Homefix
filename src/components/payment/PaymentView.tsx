import React, { useState } from 'react';
import {
  Wallet,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ArrowLeft,
  Download,
  RefreshCcw,
  Banknote,
  Smartphone,
  Lock,
  Sparkles,
} from 'lucide-react';
import { PaymentState, PaymentDetails, processPaymentGateway } from '../../services/paymentService';

interface PaymentViewProps {
  bookingId?: string;
  serviceName?: string;
  professionalName?: string;
  initialAmount?: number;
  onBack: () => void;
  onPaymentSuccess: (receipt: PaymentDetails) => void;
}

export const PaymentView: React.FC<PaymentViewProps> = ({
  bookingId = 'HF-882910',
  serviceName = 'Fan Repair & Ceiling Fan Installation',
  professionalName = 'Rahul Kumar',
  initialAmount = 369,
  onBack,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'CASH'>('ONLINE');
  const [onlineProvider, setOnlineProvider] = useState<'UPI' | 'CARD' | 'NETBANKING' | 'WALLET'>('UPI');
  const [paymentState, setPaymentState] = useState<PaymentState>('PENDING');
  const [activeTab, setActiveTab] = useState<'checkout' | 'history' | 'refunds'>('checkout');
  const [showInvoiceModal, setShowInvoiceModal] = useState<boolean>(false);
  const [completedPayment, setCompletedPayment] = useState<PaymentDetails | null>(null);

  // Pricing items as requested
  const serviceCharge = 399;
  const platformFee = 20;
  const discount = 50;
  const total = serviceCharge + platformFee - discount; // 369

  const [paymentHistory, setPaymentHistory] = useState<PaymentDetails[]>([]);

  const handleExecutePayment = async () => {
    setPaymentState('PROCESSING');
    const result = await processPaymentGateway(paymentMethod, total, (st) => setPaymentState(st));

    if (result.success) {
      const receipt: PaymentDetails = {
        bookingId,
        serviceName,
        professionalName,
        serviceCharge,
        platformFee,
        discount,
        total,
        paymentMethod,
        status: 'SUCCESS',
        transactionId: result.transactionId,
        timestamp: 'Just now',
        refundStatus: 'NONE',
      };
      setCompletedPayment(receipt);
      setPaymentHistory((prev) => [receipt, ...prev]);
      setShowInvoiceModal(true);
      onPaymentSuccess(receipt);
    } else {
      setPaymentState('FAILED');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFDF9] text-slate-900 overflow-y-auto pb-32 animate-in fade-in duration-200">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3.5 border-b border-amber-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-amber-100 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-800" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Secure Checkout & Payments</h1>
            <p className="text-[10px] text-amber-800 font-medium">256-bit Bank Grade Security</p>
          </div>
        </div>

        <div className="flex bg-amber-100/60 p-1 rounded-xl border border-amber-200">
          <button
            onClick={() => setActiveTab('checkout')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              activeTab === 'checkout' ? 'bg-amber-600 text-white shadow' : 'text-slate-700'
            }`}
          >
            Pay
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
              activeTab === 'history' ? 'bg-amber-600 text-white shadow' : 'text-slate-700'
            }`}
          >
            History
          </button>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto w-full space-y-4">

        {activeTab === 'checkout' && (
          <>
            {/* ================= PRICE BREAKDOWN CARD ================= */}
            <div className="p-5 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Booking #{bookingId}
                  </span>
                  <h2 className="text-sm font-extrabold text-slate-900 mt-1">{serviceName}</h2>
                </div>
                <span className="text-xs font-bold text-slate-600">With {professionalName}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Service charge</span>
                  <span className="font-mono font-semibold">₹{serviceCharge}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Platform fee</span>
                  <span className="font-mono font-semibold">₹{platformFee}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount applied</span>
                  <span className="font-mono">-₹{discount}</span>
                </div>
                <div className="pt-2.5 border-t border-amber-200 flex justify-between items-center text-sm font-black text-slate-900">
                  <span>Total Payable</span>
                  <span className="font-mono text-base text-amber-900">₹{total}</span>
                </div>
              </div>
            </div>

            {/* ================= PAYMENT METHOD SELECTION ================= */}
            <div className="p-5 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-4">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Choose Payment Method</h3>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('ONLINE')}
                  className={`p-3.5 rounded-2xl border text-left transition flex flex-col gap-1 ${
                    paymentMethod === 'ONLINE'
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 shadow-xs'
                      : 'bg-white border-amber-200 hover:bg-amber-50/40'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-amber-700" />
                  <span className="text-xs font-extrabold text-slate-900 mt-1">Online Payment</span>
                  <span className="text-[10px] text-slate-500">UPI, Cards, NetBanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CASH')}
                  className={`p-3.5 rounded-2xl border text-left transition flex flex-col gap-1 ${
                    paymentMethod === 'CASH'
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300 shadow-xs'
                      : 'bg-white border-amber-200 hover:bg-amber-50/40'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-emerald-700" />
                  <span className="text-xs font-extrabold text-slate-900 mt-1">Pay After Service</span>
                  <span className="text-[10px] text-slate-500">Cash / UPI to Expert</span>
                </button>
              </div>

              {/* Online Sub-providers */}
              {paymentMethod === 'ONLINE' && (
                <div className="pt-2 space-y-2 animate-in fade-in duration-200">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Select Gateway Provider (Modular)</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'UPI', label: 'Google Pay / PhonePe / UPI' },
                      { id: 'CARD', label: 'Credit / Debit Card' },
                      { id: 'NETBANKING', label: 'Net Banking' },
                      { id: 'WALLET', label: 'Paytm / Mobikwik Wallet' },
                    ].map((prov) => (
                      <button
                        key={prov.id}
                        type="button"
                        onClick={() => setOnlineProvider(prov.id as any)}
                        className={`p-2.5 rounded-xl border text-left font-bold transition ${
                          onlineProvider === prov.id ? 'bg-amber-600 text-white border-amber-700 shadow' : 'bg-amber-50/50 text-slate-700 border-amber-200'
                        }`}
                      >
                        {prov.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Note */}
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center gap-2 text-[11px] text-amber-900">
                <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Sensitive payment details are tokenized securely. No card data is stored on HomeFix servers.</span>
              </div>
            </div>

            {/* ================= PAYMENT EXECUTE BUTTON ================= */}
            <button
              type="button"
              disabled={paymentState === 'PROCESSING'}
              onClick={handleExecutePayment}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-white text-sm font-extrabold shadow-xl shadow-amber-600/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {paymentState === 'PROCESSING' ? (
                <>
                  <RefreshCcw className="w-5 h-5 animate-spin" />
                  <span>Processing Secure Payment...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Pay ₹{total} {paymentMethod === 'ONLINE' ? `via ${onlineProvider}` : 'on Service Completion'}</span>
                </>
              )}
            </button>

            {paymentState === 'FAILED' && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Payment gateway timeout or declined. Please retry.</span>
                </div>
                <button
                  onClick={() => setPaymentState('PENDING')}
                  className="font-extrabold underline text-rose-900"
                >
                  Retry
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Payment & Refund History</h3>

            {paymentHistory.map((item, idx) => (
              <div key={idx} className="p-4 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-2.5">
                <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                  <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {item.bookingId}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    item.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900">{item.serviceName}</h4>
                    <p className="text-[10px] text-slate-500">{item.timestamp} · {item.paymentMethod}</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">TXN: {item.transactionId}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900 font-mono">₹{item.total}</span>
                    {item.refundStatus === 'REFUNDED' && (
                      <span className="block text-[9px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 mt-1">
                        REFUNDED
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-100 flex justify-end">
                  <button
                    onClick={() => {
                      setCompletedPayment(item);
                      setShowInvoiceModal(true);
                    }}
                    className="py-1.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1 transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Invoice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ================= DIGITAL RECEIPT / INVOICE MODAL ================= */}
      {showInvoiceModal && completedPayment && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-amber-300 p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="text-center space-y-1">
              <span className="text-[10px] font-extrabold uppercase text-amber-800 tracking-wider">HomeFix Digital Tax Invoice</span>
              <h3 className="text-base font-black text-slate-900">Payment Successful</h3>
              <p className="text-[10px] text-slate-500 font-mono">Transaction ID: {completedPayment.transactionId}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600">Booking ID</span>
                <span className="font-mono font-bold">{completedPayment.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Service</span>
                <span className="font-bold text-slate-900">{completedPayment.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Professional</span>
                <span className="font-bold text-slate-900">{completedPayment.professionalName}</span>
              </div>
              <div className="flex justify-between border-t border-amber-200 pt-2">
                <span className="text-slate-600">Service Charge</span>
                <span className="font-mono">₹{completedPayment.serviceCharge}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Platform Fee</span>
                <span className="font-mono">₹{completedPayment.platformFee}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discount</span>
                <span className="font-mono">-₹{completedPayment.discount}</span>
              </div>
              <div className="flex justify-between border-t border-amber-200 pt-2 font-black text-sm">
                <span>Total Paid</span>
                <span className="font-mono text-amber-900">₹{completedPayment.total}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  alert('Tax invoice downloaded successfully to your device.');
                }}
                className="flex-1 py-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-extrabold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="flex-1 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-md shadow-amber-600/30 transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
