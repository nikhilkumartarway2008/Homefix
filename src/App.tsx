import React, { useState, useMemo } from 'react';
import {
  Wifi,
  Battery,
  Sparkles,
  RotateCcw,
  Smartphone,
  Maximize2,
  Minimize2,
  CheckCircle2,
  ShieldCheck,
  Wrench,
  User,
} from 'lucide-react';
import { TopHeader } from './components/TopHeader';
import { HeroSection } from './components/HeroSection';
import { ServiceCategories } from './components/ServiceCategories';
import { PromoBanner } from './components/PromoBanner';
import { EmergencyCard } from './components/EmergencyCard';
import { TopProfessionals } from './components/TopProfessionals';
import { BottomNavigation, NavTab } from './components/BottomNavigation';
import { BookingModal } from './components/BookingModal';
import { BookingsView } from './components/BookingsView';
import { MessagesView } from './components/MessagesView';
import { ProfileView } from './components/ProfileView';
import { SideDrawer } from './components/SideDrawer';
import { NotificationsModal } from './components/NotificationsModal';
import { AuthFlow } from './components/auth/AuthFlow';
import { AllServicesView } from './components/services/AllServicesView';
import { CategoryDetailView } from './components/services/CategoryDetailView';
import { ServiceDetailView } from './components/services/ServiceDetailView';
import { DescribeProblemView } from './components/services/DescribeProblemView';
import { AppointmentSchedulerView } from './components/services/AppointmentSchedulerView';
import { ProfessionalMatchingView } from './components/services/ProfessionalMatchingView';
import { BookingConfirmationView } from './components/services/BookingConfirmationView';
import { BookingTrackingView } from './components/services/BookingTrackingView';
import { NotificationsView, NotificationItem } from './components/services/NotificationsView';
import { PaymentView } from './components/payment/PaymentView';
import { ProOnboardingView } from './components/professional/ProOnboardingView';
import { FilterBottomSheet } from './components/services/FilterBottomSheet';
import { ProDashboard } from './components/professional/ProDashboard';
import { TOP_PROFESSIONALS, SERVICE_CATEGORIES } from './data/servicesData';
import { DETAILED_SERVICES, DetailedService } from './data/detailedServicesData';
import { Booking, Professional, ServiceCategory, ServiceItem } from './types';

export default function App() {
  // Navigation & Portal State (Only Customer App & Pro/Helper Portal visible)
  const [activePortal, setActivePortal] = useState<'customer' | 'pro'>('customer');
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [currentLocation, setCurrentLocation] = useState<string>('Ranchi, Jharkhand');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  // Modals & Drawers
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(2);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingTargetService, setBookingTargetService] = useState<ServiceItem | null>(null);
  const [bookingTargetPro, setBookingTargetPro] = useState<Professional | null>(null);
  const [isEmergencyBooking, setIsEmergencyBooking] = useState<boolean>(false);
  const [appliedPromo, setAppliedPromo] = useState<string>('WELCOME20');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Device mockup view toggle & Authentication for each section
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isProAuthenticated, setIsProAuthenticated] = useState<boolean>(false);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('electrical');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('srv-elec-1');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Initial bookings state starts empty
  const [bookings, setBookings] = useState<Booking[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered Professionals based on search & selected category
  const filteredProfessionals = useMemo(() => {
    return TOP_PROFESSIONALS.filter((pro) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pro.mainSkill.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pro.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || pro.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Handlers
  const handleSelectCategory = (cat: ServiceItem) => {
    if (cat.id === 'more' || cat.name === 'More') {
      setActiveTab('all-services' as any);
    } else {
      setSelectedCategoryId(cat.id);
      setActiveTab('category-detail' as any);
    }
  };

  const [emergencyType, setEmergencyType] = useState<string | undefined>(undefined);
  const [problemDetails, setProblemDetails] = useState<{ description: string; photos: string[]; notes: string } | null>(null);
  const [appointmentDetails, setAppointmentDetails] = useState<{
    date: string;
    timeSlot: string;
    address: { name?: string; phone?: string; house: string; street: string; landmark?: string; city: string; pinCode: string };
  } | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [selectedTrackingBooking, setSelectedTrackingBooking] = useState<Booking | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const handleBookFromServiceDetail = (srv: DetailedService, emType?: string) => {
    setEmergencyType(emType);
    setSelectedServiceId(srv.id);
    setActiveTab('describe-problem' as any);
  };

  const handleOpenBooking = (pro?: Professional, service?: ServiceItem, emergency = false) => {
    setBookingTargetPro(pro || null);
    setBookingTargetService(service || null);
    setIsEmergencyBooking(emergency);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Booking ${newBooking.id} confirmed with ${newBooking.professionalName}!`);
  };

  const handleCallPro = (name: string) => {
    alert(`Connecting phone call with verified pro ${name} (+91 98765 43210)...`);
  };

  return (
    <div className="min-h-screen bg-[#080D1A] text-slate-100 flex flex-col items-center justify-start py-6 px-4 selection:bg-blue-600 selection:text-white">
      {/* Top Header & Portal Switcher (Customer vs Pro / Helper) */}
      <header className="w-full max-w-4xl flex items-center justify-between mb-6 bg-slate-900/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#080D1A] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-tight">HomeFix Ecosystem</h1>
            <p className="text-[10px] text-slate-400 font-mono">Ranchi On-Demand Services</p>
          </div>
        </div>

        {/* Portal Switcher Tabs (Admin hidden) */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActivePortal('customer')}
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activePortal === 'customer'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer App</span>
          </button>

          <button
            onClick={() => setActivePortal('pro')}
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activePortal === 'pro'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Pro / Helper</span>
          </button>
        </div>
      </header>

      {/* Render based on Active Portal with Mandatory Login per Section */}
      {activePortal === 'pro' ? (
        !isProAuthenticated ? (
          <div className="w-full max-w-[390px] mx-auto animate-in fade-in duration-200">
            <AuthFlow
              role="pro"
              onAuthComplete={(userData) => {
                setIsProAuthenticated(true);
                showToast(`Welcome back, Partner ${userData.name}!`);
              }}
            />
          </div>
        ) : (
          <div className="w-full max-w-5xl bg-[#080D1A] rounded-[24px] border border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setIsProAuthenticated(false)}
              className="absolute top-4 right-4 z-40 px-3.5 py-1.5 rounded-lg bg-rose-600/20 border border-rose-500/40 text-rose-300 text-xs font-semibold hover:bg-rose-600/30 transition shadow"
            >
              Partner Logout
            </button>
            <ProDashboard 
              bookings={bookings} 
              onUpdateBookingStatus={(id, status) => {
                setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
              }}
            />
          </div>
        )
      ) : (
        /* Customer Portal Container with Mandatory Login */
        <div className="flex flex-col items-center w-full">
          {!isAuthenticated ? (
            <div className="w-full max-w-[390px] mx-auto animate-in fade-in duration-200">
              <AuthFlow
                role="customer"
                onAuthComplete={(userData) => {
                  setCurrentLocation(userData.location);
                  setIsAuthenticated(true);
                  setActiveTab('home');
                  showToast(`Welcome to HomeFix, ${userData.name}!`);
                }}
              />
            </div>
          ) : (
            <>
              {/* Desktop Preview Controller Bar */}
              <aside aria-label="Device Preview Controls" className="hidden sm:flex items-center justify-between w-full max-w-[390px] mb-3 px-3 py-1.5 rounded-2xl bg-[#0D1527]/90 border border-slate-800/80 backdrop-blur-md text-xs shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white tracking-tight">Mobile Preview</span>
                  <span className="text-[10px] text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded-full border border-blue-500/30">
                    390 × 844 px
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                      setActiveTab('home');
                    }}
                    title="Reset to initial state"
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsPhoneFrame(!isPhoneFrame)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 font-medium transition"
                  >
                    {isPhoneFrame ? (
                      <>
                        <Maximize2 className="w-3 h-3" />
                        <span>Full Width</span>
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-3 h-3" />
                        <span>Frame</span>
                      </>
                    )}
                  </button>
                </div>
              </aside>

              {/* Main Container - 390x844px Mobile Canvas */}
              <main
                className={`w-full relative bg-[#FFFDF9] overflow-hidden flex flex-col transition-all duration-300 ${
                  isPhoneFrame
                    ? 'sm:w-[390px] sm:h-[844px] sm:max-h-[844px] sm:rounded-[44px] sm:border-[8px] sm:border-amber-300/80 sm:shadow-[0_25px_70px_rgba(217,119,6,0.15)] sm:ring-1 sm:ring-amber-200'
                    : 'max-w-2xl min-h-screen sm:rounded-3xl sm:border sm:border-amber-300 sm:my-4'
                }`}
              >
                {/* iOS-Style Status Bar */}
                <div className="relative z-40 flex items-center justify-between px-6 pt-3 pb-1 text-slate-900 select-none shrink-0 bg-white/95 border-b border-amber-100">
                  <span className="text-xs font-extrabold tracking-tight">9:41</span>
                  <div className="w-24 h-5 bg-slate-900 rounded-full flex items-center justify-center border border-amber-200 shadow-inner">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700 mr-2" />
                    <div className="w-2 h-2 rounded-full bg-amber-400/60" />
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <div className="flex items-end gap-0.5 h-2.5">
                      <span className="w-0.5 h-1 bg-slate-800 rounded-xs" />
                      <span className="w-0.5 h-1.5 bg-slate-800 rounded-xs" />
                      <span className="w-0.5 h-2 bg-slate-800 rounded-xs" />
                      <span className="w-0.5 h-2.5 bg-slate-800 rounded-xs" />
                    </div>
                    <Wifi className="w-3 h-3 text-slate-800" />
                    <Battery className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>

                {/* Global Toast Notification */}
                {toastMessage && (
                  <div className="absolute top-12 left-4 right-4 z-50 p-2.5 rounded-xl bg-blue-600/95 text-white text-xs font-semibold shadow-xl border border-blue-400/40 flex items-center gap-2 animate-in slide-in-from-top duration-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span className="truncate">{toastMessage}</span>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col justify-between">
                  {activeTab === 'home' && (
                    <div className="space-y-1 pb-16">
                      <TopHeader
                        currentLocation={currentLocation}
                        onSelectLocation={(loc) => {
                          setCurrentLocation(loc);
                          showToast(`Location set to ${loc}`);
                        }}
                        onOpenMenu={() => setIsSideDrawerOpen(true)}
                        onOpenNotifications={() => setActiveTab('notifications' as any)}
                        unreadCount={notifications.filter((n) => n.unread).length}
                        onOpenProfile={() => setActiveTab('profile')}
                      />
                      <HeroSection
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onQuickBookClick={() => handleOpenBooking()}
                      />
                      <ServiceCategories
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleSelectCategory}
                      />
                      <PromoBanner
                        appliedCode={appliedPromo}
                        onApplyCode={(code) => {
                          setAppliedPromo(code);
                          showToast(`Promo code ${code} applied successfully!`);
                        }}
                      />
                      <EmergencyCard onEmergencyClick={() => handleOpenBooking(undefined, undefined, true)} />
                      <TopProfessionals
                        professionals={filteredProfessionals}
                        onBookPro={(pro) => handleOpenBooking(pro)}
                        onViewProfile={(pro) => showToast(`Viewing profile for ${pro.name}`)}
                        onCallPro={handleCallPro}
                      />
                    </div>
                  )}

                  {activeTab === 'all-services' as any && (
                    <AllServicesView
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      onBack={() => setActiveTab('home')}
                      onSelectService={(srvId) => {
                        setSelectedServiceId(srvId);
                        setActiveTab('service-detail' as any);
                      }}
                      onOpenFilter={() => setIsFilterOpen(true)}
                    />
                  )}

                  {activeTab === 'messages' && (
                    <MessagesView
                      onBack={() => setActiveTab('home')}
                      onCallPro={handleCallPro}
                    />
                  )}

                  {activeTab === 'category-detail' as any && (
                    <CategoryDetailView
                      categoryId={selectedCategoryId}
                      onBack={() => setActiveTab('all-services' as any)}
                      onSelectService={(srvId) => {
                        setSelectedServiceId(srvId);
                        setActiveTab('service-detail' as any);
                      }}
                    />
                  )}

                  {activeTab === 'describe-problem' as any && (
                    <DescribeProblemView
                      service={DETAILED_SERVICES.find((s) => s.id === selectedServiceId) || DETAILED_SERVICES[0]}
                      emergencyType={emergencyType}
                      onBack={() => setActiveTab('service-detail' as any)}
                      onSubmitProblem={(details) => {
                        setProblemDetails(details);
                        setActiveTab('appointment-scheduler' as any);
                      }}
                    />
                  )}

                  {activeTab === 'appointment-scheduler' as any && (
                    <AppointmentSchedulerView
                      service={DETAILED_SERVICES.find((s) => s.id === selectedServiceId) || DETAILED_SERVICES[0]}
                      problemDescription={problemDetails?.description || ''}
                      photos={problemDetails?.photos || []}
                      notes={problemDetails?.notes || ''}
                      emergencyType={emergencyType}
                      onBack={() => setActiveTab('describe-problem' as any)}
                      onCompleteBooking={(appointment) => {
                        setAppointmentDetails(appointment);
                        setActiveTab('professional-matching' as any);
                      }}
                    />
                  )}

                  {activeTab === 'professional-matching' as any && (
                    <ProfessionalMatchingView
                      service={DETAILED_SERVICES.find((s) => s.id === selectedServiceId) || DETAILED_SERVICES[0]}
                      problemDescription={problemDetails?.description || ''}
                      appointmentDate={appointmentDetails?.date || 'Today'}
                      appointmentTime={appointmentDetails?.timeSlot || '11:00 AM'}
                      address={appointmentDetails?.address || { house: 'Flat 402', street: 'Lalpur', city: 'Ranchi', pinCode: '834001' }}
                      onBack={() => setActiveTab('appointment-scheduler' as any)}
                      onSelectProfessional={(pro) => {
                        setSelectedProfessional(pro);
                        setActiveTab('booking-confirmation' as any);
                      }}
                      onChooseAnotherTime={() => setActiveTab('appointment-scheduler' as any)}
                      onChooseAnotherDate={() => setActiveTab('appointment-scheduler' as any)}
                      onManualAssistance={() => {
                        alert('Manual assistance requested. Our support team will call you within 5 minutes.');
                        setActiveTab('home');
                      }}
                    />
                  )}

                  {activeTab === 'booking-confirmation' as any && (
                    <BookingConfirmationView
                      service={DETAILED_SERVICES.find((s) => s.id === selectedServiceId) || DETAILED_SERVICES[0]}
                      professional={selectedProfessional || TOP_PROFESSIONALS[0]}
                      appointmentDate={appointmentDetails?.date || 'Today'}
                      appointmentTime={appointmentDetails?.timeSlot || '11:00 AM'}
                      address={{
                        name: appointmentDetails?.address?.name || 'Sarah Jenkins',
                        phone: appointmentDetails?.address?.phone || '+91 98765 43210',
                        house: appointmentDetails?.address?.house || 'Flat 402',
                        street: appointmentDetails?.address?.street || 'Lalpur',
                        landmark: appointmentDetails?.address?.landmark || '',
                        city: appointmentDetails?.address?.city || 'Ranchi',
                        pinCode: appointmentDetails?.address?.pinCode || '834001',
                      }}
                      problemDescription={problemDetails?.description || 'Service request'}
                      photos={problemDetails?.photos || []}
                      notes={problemDetails?.notes || ''}
                      emergencyType={emergencyType}
                      onBack={() => setActiveTab('professional-matching' as any)}
                      onConfirmSuccess={(newBooking) => {
                        handleBookingConfirmed(newBooking);
                        setActiveTab('bookings');
                      }}
                    />
                  )}

                  {activeTab === 'service-detail' as any && (
                    <ServiceDetailView
                      serviceId={selectedServiceId}
                      onBack={() => setActiveTab('category-detail' as any)}
                      onBookService={handleBookFromServiceDetail}
                    />
                  )}

                  {activeTab === 'bookings' && (
                    <BookingsView
                      bookings={bookings}
                      onOpenBookingModal={() => handleOpenBooking()}
                      onCallPro={handleCallPro}
                      onChatPro={() => setActiveTab('messages')}
                      onTrackBooking={(b) => {
                        setSelectedTrackingBooking(b);
                        setActiveTab('booking-tracking' as any);
                      }}
                    />
                  )}

                  {activeTab === 'booking-tracking' as any && selectedTrackingBooking && (
                    <BookingTrackingView
                      booking={selectedTrackingBooking}
                      onBack={() => setActiveTab('bookings')}
                      onCallPro={handleCallPro}
                      onChatPro={() => setActiveTab('messages')}
                      onCancelBooking={(bookingId) => {
                        setBookings((prev) =>
                          prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELLED' } : b))
                        );
                        showToast(`Booking ${bookingId} cancelled successfully.`);
                        setActiveTab('bookings');
                      }}
                      onContactSupport={() => {
                        alert('Connecting to HomeFix Ranchi 24/7 Support Helpline...');
                      }}
                      onOpenPayment={() => setActiveTab('payment' as any)}
                    />
                  )}

                  {activeTab === 'payment' as any && (
                    <PaymentView
                      bookingId={selectedTrackingBooking?.id || 'HF-882910'}
                      serviceName={selectedTrackingBooking?.serviceName || 'Fan Repair & Ceiling Fan Installation'}
                      professionalName={selectedTrackingBooking?.professionalName || 'Rahul Kumar'}
                      onBack={() => setActiveTab(selectedTrackingBooking ? 'booking-tracking' as any : 'bookings')}
                      onPaymentSuccess={(receipt) => {
                        showToast(`Payment of ₹${receipt.total} successful! TXN: ${receipt.transactionId}`);
                      }}
                    />
                  )}

                  {activeTab === 'notifications' as any && (
                    <NotificationsView
                      notifications={notifications}
                      onMarkAllRead={() => {
                        setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
                        showToast('All notifications marked as read.');
                      }}
                      onToggleRead={(id) => {
                        setNotifications((prev) =>
                          prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
                        );
                      }}
                      onOpenBooking={(bookingId) => {
                        const targetBooking = bookings.find((b) => b.id === bookingId);
                        if (targetBooking) {
                          setSelectedTrackingBooking(targetBooking);
                          setActiveTab('booking-tracking' as any);
                        } else {
                          showToast(`Booking ${bookingId} details loading...`);
                        }
                      }}
                      onBack={() => setActiveTab('home')}
                    />
                  )}

                  {activeTab === 'profile' && (
                    <ProfileView 
                      onBackToHome={() => setActiveTab('home')} 
                      onLogout={() => {
                        setIsAuthenticated(false);
                        showToast('Logged out successfully');
                      }}
                    />
                  )}

                  {activeTab === 'pro-onboarding' as any && (
                    <ProOnboardingView
                      onBackToHome={() => setActiveTab('home')}
                      onCompleteRegistration={(proData) => {
                        showToast(`Professional registration submitted for ${proData.name}! Status: ${proData.verificationStatus}`);
                        setActiveTab('home');
                      }}
                    />
                  )}
                </div>

                {/* Filter Bottom Sheet */}
                <FilterBottomSheet
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                  onApplyFilters={(filters) => {
                    showToast(`Applied filters: Max ₹${filters.maxPrice}, Rating ${filters.minRating}+`);
                    setActiveTab('all-services' as any);
                  }}
                />

                {/* Bottom Navigation */}
                <BottomNavigation
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  bookingsCount={bookings.filter((b) => b.status === 'Confirmed').length}
                  messagesCount={1}
                  onQuickBookClick={() => handleOpenBooking()}
                />
              </main>
            </>
          )}
        </div>
      )}

      {/* iPhone Home Indicator Bar */}
      <div className="w-full flex justify-center py-1.5 bg-[#080D1A] shrink-0">
        <div className="w-32 h-1 bg-slate-700/80 rounded-full" />
      </div>

      {/* Modals & Overlays */}
      <SideDrawer
        isOpen={isSideDrawerOpen}
        onClose={() => setIsSideDrawerOpen(false)}
        onSelectCategoryModal={() => {
          setActiveTab('home');
          window.scrollTo({ top: 200, behavior: 'smooth' });
        }}
        onOpenBookings={() => setActiveTab('bookings')}
        onOpenProOnboarding={() => setActiveTab('pro-onboarding' as any)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onMarkAllRead={() => {
          setUnreadNotifications(0);
          showToast('All notifications marked as read');
        }}
      />

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        professional={bookingTargetPro}
        service={bookingTargetService}
        isEmergency={isEmergencyBooking}
        appliedPromoCode={appliedPromo}
        onBookingSuccess={handleBookingConfirmed}
        onOpenChatWithPro={() => {
          setIsBookingModalOpen(false);
          setActiveTab('messages');
        }}
      />
    </div>
  );
}
