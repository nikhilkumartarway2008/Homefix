import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  User,
  Phone,
  Calendar,
  MapPin,
  Award,
  Globe,
  Wallet,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  Sparkles,
} from 'lucide-react';
import { ServiceCategory } from '../../types';

interface ProOnboardingViewProps {
  onCompleteRegistration: (proData: any) => void;
  onBackToHome: () => void;
}

export const ProOnboardingView: React.FC<ProOnboardingViewProps> = ({
  onCompleteRegistration,
  onBackToHome,
}) => {
  const [step, setStep] = useState<number>(1);

  // Form state
  const [name, setName] = useState<string>('Manoj Sharma');
  const [phone, setPhone] = useState<string>('+91 98765 12345');
  const [dob, setDob] = useState<string>('1988-06-14');
  const [category, setCategory] = useState<ServiceCategory>('Plumbing');
  const [photoUrl, setPhotoUrl] = useState<string>('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150');
  
  const [address, setAddress] = useState<string>('Flat 202, Kankarbagh Main Road, Ranchi - 800020');
  const [serviceArea, setServiceArea] = useState<string>('Kankarbagh, Boring Road, Patliputra (Ranchi)');
  const [experience, setExperience] = useState<string>('7');
  const [languages, setLanguages] = useState<string>('Hindi, English, Bhojpuri');

  const [govIdType, setGovIdType] = useState<string>('Aadhaar Card');
  const [govIdNumber, setGovIdNumber] = useState<string>('XXXX-XXXX-4921');
  const [govIdFile, setGovIdFile] = useState<string>('aadhaar_verified.pdf');
  const [addressProofFile, setAddressProofFile] = useState<string>('electricity_bill.pdf');
  const [certificateFile, setCertificateFile] = useState<string>('iti_plumbing_diploma.pdf');

  const [bankHolder, setBankHolder] = useState<string>('Manoj Sharma');
  const [accountNumber, setAccountNumber] = useState<string>('38290100049281');
  const [ifscCode, setIfscCode] = useState<string>('BARB0KANKAR');
  const [upiId, setUpiId] = useState<string>('manoj.sharma@okhdfcbank');

  const [verificationStatus, setVerificationStatus] = useState<'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED'>('PENDING_VERIFICATION');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const categories: ServiceCategory[] = [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting',
    'AC Repair',
    'Appliance Repair',
    'Cleaning',
    'Pest Control',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const newPro = {
      name,
      phone,
      category,
      photoUrl,
      address,
      serviceArea,
      experience: Number(experience),
      languages,
      bankInfo: { bankHolder, accountNumber, ifscCode, upiId },
      verificationStatus,
    };
    onCompleteRegistration(newPro);
  };

  return (
    <div className="flex flex-col h-full bg-[#FFFDF9] text-slate-900 overflow-y-auto pb-32 animate-in fade-in duration-200">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3.5 border-b border-amber-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-slate-700 hover:text-slate-900 hover:bg-amber-100 transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-800" />
          </button>
          <div>
            <h1 className="text-base font-bold text-slate-900 tracking-tight">Professional Partner Onboarding</h1>
            <p className="text-[10px] text-amber-800 font-medium">Join HomeFix Ranchi Network</p>
          </div>
        </div>

        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
          Step {step} of 4
        </span>
      </div>

      <div className="p-4 max-w-lg mx-auto w-full space-y-4">

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s <= step ? 'bg-amber-600' : 'bg-amber-200'
              }`}
            />
          ))}
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* STEP 1: Basic Information */}
            {step === 1 && (
              <div className="p-5 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-4">
                <div className="border-b border-amber-100 pb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-amber-700" />
                  <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">1. Basic Information</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g. Manoj Sharma"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Date of Birth</label>
                      <input
                        type="date"
                        required
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Primary Trade / Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Profile Photo URL</label>
                    <div className="flex items-center gap-3">
                      <img
                        src={photoUrl}
                        alt="Preview"
                        className="w-12 h-12 rounded-xl object-cover border border-amber-300 shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                      <input
                        type="url"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-3 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-md shadow-amber-600/30 flex items-center gap-2 transition"
                  >
                    <span>Next: Location & Skills</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Location & Professional Details */}
            {step === 2 && (
              <div className="p-5 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-4">
                <div className="border-b border-amber-100 pb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-700" />
                  <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">2. Location & Professional Details</h2>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Residential Address</label>
                    <textarea
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Service Area (Ranchi Regions)</label>
                    <input
                      type="text"
                      required
                      value={serviceArea}
                      onChange={(e) => setServiceArea(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="e.g. Boring Road, Kankarbagh, Danapur"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Experience (Years)</label>
                      <input
                        type="number"
                        min="1"
                        max="40"
                        required
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Languages Spoken</label>
                      <input
                        type="text"
                        required
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 px-5 rounded-2xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="py-3 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-md shadow-amber-600/30 flex items-center gap-2 transition"
                  >
                    <span>Next: Verification Docs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Verification & Legal Documents */}
            {step === 3 && (
              <div className="p-5 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-4">
                <div className="border-b border-amber-100 pb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                  <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">3. Verification & Documents</h2>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Government ID and address proof are mandatory for HomeFix trust & safety verification.</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Govt ID Type</label>
                      <select
                        value={govIdType}
                        onChange={(e) => setGovIdType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold"
                      >
                        <option>Aadhaar Card</option>
                        <option>PAN Card</option>
                        <option>Voter ID</option>
                        <option>Driving License</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Govt ID Number</label>
                      <input
                        type="text"
                        value={govIdNumber}
                        onChange={(e) => setGovIdNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <label className="font-bold text-slate-700 block">Upload Government ID Document</label>
                    <div className="flex items-center justify-between p-3 rounded-xl border border-dashed border-amber-300 bg-amber-50/30">
                      <span className="font-mono text-slate-600 truncate">{govIdFile}</span>
                      <span className="px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-[11px]">Uploaded ✓</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <label className="font-bold text-slate-700 block">Upload Address Proof (Electricity bill / Rental Agreement)</label>
                    <div className="flex items-center justify-between p-3 rounded-xl border border-dashed border-amber-300 bg-amber-50/30">
                      <span className="font-mono text-slate-600 truncate">{addressProofFile}</span>
                      <span className="px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-[11px]">Uploaded ✓</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <label className="font-bold text-slate-700 block">Skill/Trade Certificate (Optional)</label>
                    <div className="flex items-center justify-between p-3 rounded-xl border border-dashed border-amber-300 bg-amber-50/30">
                      <span className="font-mono text-slate-600 truncate">{certificateFile}</span>
                      <span className="px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-[11px]">Uploaded ✓</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="py-3 px-5 rounded-2xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 transition"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="py-3 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-md shadow-amber-600/30 flex items-center gap-2 transition"
                  >
                    <span>Next: Bank Payout Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Bank & Payout Information */}
            {step === 4 && (
              <div className="p-5 rounded-3xl bg-white border border-amber-300 shadow-sm space-y-4">
                <div className="border-b border-amber-100 pb-3 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-amber-700" />
                  <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">4. Bank & Payout Information</h2>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Account Holder Name</label>
                    <input
                      type="text"
                      required
                      value={bankHolder}
                      onChange={(e) => setBankHolder(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Account Number</label>
                      <input
                        type="text"
                        required
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">IFSC Code</label>
                      <input
                        type="text"
                        required
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">UPI ID (For Instant Payouts)</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-amber-50/40 font-semibold"
                    />
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                    <span className="font-bold block mb-0.5">Secure Payout Guarantee</span>
                    Earnings are credited directly to your bank account or UPI within 24 hours of job completion.
                  </div>
                </div>

                <div className="pt-3 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="py-3 px-5 rounded-2xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="py-3.5 px-8 rounded-2xl bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-white text-sm font-extrabold shadow-lg shadow-amber-600/30 transition flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Submit Professional Registration</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        ) : (
          /* SUBMITTED / VERIFICATION STATUS DASHBOARD */
          <div className="p-6 rounded-3xl bg-white border border-amber-300 shadow-lg text-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner ${
              verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' :
              verificationStatus === 'REJECTED' ? 'bg-rose-100 text-rose-700' :
              'bg-amber-100 text-amber-700 animate-pulse'
            }`}>
              {verificationStatus === 'VERIFIED' ? <CheckCircle2 className="w-8 h-8 stroke-[3]" /> :
               verificationStatus === 'REJECTED' ? <AlertCircle className="w-8 h-8 stroke-[3]" /> :
               <Clock className="w-8 h-8 stroke-[3]" />}
            </div>

            <div className="space-y-1.5">
              <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${
                verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                verificationStatus === 'REJECTED' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                {verificationStatus}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900">
                {verificationStatus === 'VERIFIED' ? 'Congratulations! You are Verified' :
                 verificationStatus === 'REJECTED' ? 'Verification Requires Update' :
                 'Application Under Background Review'}
              </h2>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                {verificationStatus === 'VERIFIED'
                  ? 'Your profile is now active on HomeFix Ranchi network. You can receive incoming bookings and customer leads.'
                  : verificationStatus === 'REJECTED'
                  ? 'Please update your Aadhaar document or bank details as requested by HomeFix support.'
                  : 'Our Ranchi verification team is reviewing your Govt ID and skill certificates. Approval typically takes 2 hours.'}
              </p>
            </div>

            {/* Interactive Status Switcher for Demo/Testing */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-amber-800 block">Simulate Status (Admin Testing Tool)</span>
              <div className="grid grid-cols-3 gap-2">
                {(['PENDING_VERIFICATION', 'VERIFIED', 'REJECTED'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setVerificationStatus(st)}
                    className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition ${
                      verificationStatus === st ? 'bg-amber-600 text-white border-amber-700 shadow-sm' : 'bg-white text-slate-700 border-amber-300 hover:bg-amber-100'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Professional Public Profile Card preview */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-left space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block">Customer Preview Card</span>
              <div className="flex items-center gap-3">
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-300"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{name}</h3>
                  <p className="text-xs text-amber-800 font-semibold">{category} · {experience} yrs exp</p>
                  <p className="text-[11px] text-slate-600">{serviceArea}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onBackToHome}
              className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold shadow-lg shadow-amber-600/30 transition"
            >
              Back to Home & Customer Portal
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
