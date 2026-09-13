import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Smartphone, ArrowRight, Lock, CheckCircle2, MapPin, 
  Bell, Camera, RefreshCw, ChevronLeft, Sparkles, User, Mail, Check, Navigation
} from 'lucide-react';
import { RANCHI_LOCATIONS } from '../../data/servicesData';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../lib/firebase';

interface AuthFlowProps {
  onAuthComplete: (userData: { name: string; phone: string; location: string }) => void;
  role?: 'customer' | 'pro';
}

type AuthStep = 'welcome' | 'phone' | 'otp' | 'profile' | 'location' | 'permissions';

export const AuthFlow: React.FC<AuthFlowProps> = ({ onAuthComplete, role = 'customer' }) => {
  const [step, setStep] = useState<AuthStep>('welcome');
  const [phone, setPhone] = useState<string>('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timer, setTimer] = useState<number>(30);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Profile data
  const [fullName, setFullName] = useState<string>('Sarah Sharma');
  const [email, setEmail] = useState<string>('sarah.sharma@gmail.com');
  const [selectedLocation, setSelectedLocation] = useState<string>('Lalpur, Ranchi');
  const [permissions, setPermissions] = useState({
    location: true,
    notifications: true,
    camera: false,
  });

  // Resend OTP countdown timer
  useEffect(() => {
    let interval: any;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Google Login via Firebase Auth before entering any console
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      onAuthComplete({
        name: user.displayName || 'Google User',
        phone: user.phoneNumber || '+91 98765 43210',
        location: selectedLocation,
      });
    } catch (error: any) {
      setErrorMessage(error.message || 'Google Sign-In failed. Please try mobile login.');
    } finally {
      setIsLoading(false);
    }
  };

  // Real-time GPS Geolocation detection
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const gpsLocationStr = `GPS Pin (${latitude.toFixed(4)}, ${longitude.toFixed(4)}) - Ranchi`;
        setSelectedLocation(gpsLocationStr);
        setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        alert('Unable to retrieve GPS location. Please select your locality manually from the list.');
      },
      { timeout: 10000 }
    );
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setTimer(30);
    }, 800);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setErrorMessage('Please enter the complete 4-digit verification code.');
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('profile');
    }, 800);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    setErrorMessage(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('location');
    }, 600);
  };

  const handleLocationSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('permissions');
    }, 600);
  };

  const handlePermissionsComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuthComplete({
        name: fullName,
        phone: `+91 ${phone || '9876543210'}`,
        location: selectedLocation,
      });
    }, 800);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-[#080D1A] text-slate-100 max-w-[390px] mx-auto min-h-[720px] rounded-[36px] border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between z-10 pt-2">
        {step !== 'welcome' && (
          <button
            onClick={() => {
              setErrorMessage(null);
              if (step === 'phone') setStep('welcome');
              else if (step === 'otp') setStep('phone');
              else if (step === 'profile') setStep('otp');
              else if (step === 'location') setStep('profile');
              else if (step === 'permissions') setStep('location');
            }}
            className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400">
            HomeFix Secure Auth
          </span>
        </div>
      </div>

      {/* STEP 1: WELCOME & GOOGLE LOGIN GATE */}
      {step === 'welcome' && (
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 my-auto z-10 animate-in fade-in duration-300">
          <div className="w-20 h-20 rounded-[24px] bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-xl shadow-blue-600/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#080D1A] rounded-[22px] flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-blue-400" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {role === 'pro' ? 'Professional Partner Login' : 'Welcome to HomeFix'}
            </h1>
            <p className="text-xs text-slate-300 max-w-[280px] leading-relaxed">
              {role === 'pro' ? 'Access your job assignments, schedule, earnings, and live service requests.' : 'Ranchi’s trusted marketplace for verified electricians, plumbers, AC technicians, and cleaners.'}
            </p>
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-400 font-medium bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/30 w-full">
              {errorMessage}
            </p>
          )}

          <div className="w-full space-y-3 pt-2">
            {/* GOOGLE LOGIN BUTTON (Mandatory Before Opening Console) */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs tracking-wider shadow-lg transition flex items-center justify-center gap-3 active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>

            <div className="flex items-center my-3">
              <div className="flex-1 border-t border-slate-800" />
              <span className="px-3 text-[10px] text-slate-500 uppercase tracking-widest font-mono">Or</span>
              <div className="flex-1 border-t border-slate-800" />
            </div>

            <button
              onClick={() => setStep('phone')}
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-blue-400" />
              <span>Continue with Mobile OTP</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>₹10,000 HomeFix Shield Insurance included</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: PHONE NUMBER */}
      {step === 'phone' && (
        <div className="flex-1 flex flex-col justify-between z-10 py-4 animate-in fade-in duration-300">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono text-blue-400 font-bold block mb-1">
                Step 1 of 5
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Enter your mobile number</h2>
              <p className="text-xs text-slate-400 mt-1">
                We will send a 4-digit verification OTP to confirm your booking account.
              </p>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  Mobile Number (+91)
                </label>
                <div className="flex items-center rounded-xl bg-slate-950 border border-slate-700/80 focus-within:border-blue-500 overflow-hidden shadow-inner">
                  <div className="px-3.5 py-3 bg-slate-900 border-r border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-1">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98350 12345"
                    autoFocus
                    className="flex-1 px-3 py-3 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none font-mono tracking-wider text-base"
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-xs text-rose-400 font-medium bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/30">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/40 transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Verification OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* STEP 3: OTP */}
      {step === 'otp' && (
        <div className="flex-1 flex flex-col justify-between z-10 py-4 animate-in fade-in duration-300">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono text-blue-400 font-bold block mb-1">
                Step 2 of 5
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Enter 4-digit code</h2>
              <p className="text-xs text-slate-400 mt-1">
                Code sent to <span className="text-white font-mono">+91 {phone}</span>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-4 pt-2">
              <div className="flex justify-between gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      const newOtp = [...otp];
                      newOtp[idx] = val;
                      setOtp(newOtp);
                      if (val && idx < 3) {
                        const nextInput = document.getElementById(`otp-${idx + 1}`);
                        nextInput?.focus();
                      }
                    }}
                    className="w-14 h-14 text-center text-xl font-black font-mono rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
                  />
                ))}
              </div>

              {errorMessage && (
                <p className="text-xs text-rose-400 font-medium bg-rose-950/40 p-2.5 rounded-xl border border-rose-500/30">
                  {errorMessage}
                </p>
              )}

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400">
                  Resend code in <strong className="text-white font-mono">{timer}s</strong>
                </span>
                {timer === 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setTimer(30);
                      alert('New OTP sent: 1234');
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Resend OTP SMS</span>
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/40 transition flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* STEP 4: PROFILE */}
      {step === 'profile' && (
        <div className="flex-1 flex flex-col justify-between z-10 py-4 animate-in fade-in duration-300">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono text-blue-400 font-bold block mb-1">
                Step 3 of 5
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Create your profile</h2>
              <p className="text-xs text-slate-400 mt-1">
                Tell us your name so verified professionals know who they are serving.
              </p>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-3.5 pt-1">
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-blue-400 absolute left-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Sarah Sharma"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/40 transition flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Save & Select Location</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* STEP 5: SELECT LOCATION WITH GPS */}
      {step === 'location' && (
        <div className="flex-1 flex flex-col justify-between z-10 py-4 animate-in fade-in duration-300">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono text-blue-400 font-bold block mb-1">
                Step 4 of 5
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">Select service location</h2>
              <p className="text-xs text-slate-400 mt-1">
                Use real-time GPS or choose your primary locality in Ranchi.
              </p>
            </div>

            {/* REAL-TIME GPS BUTTON */}
            <button
              type="button"
              onClick={handleDetectGPS}
              className="w-full py-3 px-4 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 text-blue-300 font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
            >
              <Navigation className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Detect My Current GPS Location</span>
            </button>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {RANCHI_LOCATIONS.map((loc) => {
                const isSelected = selectedLocation === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white font-semibold'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                      <span className="text-xs">{loc}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleLocationSubmit}
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/40 transition flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Continue to Permissions</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: PERMISSIONS */}
      {step === 'permissions' && (
        <div className="flex-1 flex flex-col justify-between z-10 py-4 animate-in fade-in duration-300">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono text-blue-400 font-bold block mb-1">
                Step 5 of 5
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">App Permissions</h2>
              <p className="text-xs text-slate-400 mt-1">
                Grant permissions to ensure smooth technician GPS tracking.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { key: 'location', title: 'GPS Location Services', desc: 'Required for real-time technician tracking & arrival ETA' },
                { key: 'notifications', title: 'Push Notifications', desc: 'Get updates when professionals accept or arrive' },
              ].map((perm) => (
                <div key={perm.key} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{perm.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{perm.desc}</p>
                  </div>
                  <div className="w-10 h-6 bg-blue-600 rounded-full p-1 flex items-center justify-end">
                    <div className="w-4 h-4 rounded-full bg-white shadow" />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handlePermissionsComplete}
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/40 transition flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Enter HomeFix Console</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
