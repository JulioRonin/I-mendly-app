import React, { useState } from 'react';
import { AppView, AppState, UserRole, ServiceCategory, Provider, ServiceItem, BookingDetails } from './types';
import { DEMO_CLIENT, DEMO_PROVIDER_USER, DEMO_ORDERS } from './constants';

// Screens
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import ClientHome from './components/ClientHome';
import ProviderList from './components/ProviderList';
import ProviderProfile from './components/ProviderProfile';
import ServiceConfig from './components/ServiceConfig';
import BookingCalendar from './components/BookingCalendar';
import PaymentScreen from './components/PaymentScreen';
import OrdersScreen from './components/OrdersScreen';
import OrderTracking from './components/OrderTracking';
import ClientProfileScreen from './components/ClientProfileScreen';
import ProviderOnboarding from './components/ProviderOnboarding';
import ProviderDashboard from './components/ProviderDashboard';
import AdminDashboard from './components/AdminDashboard';

const initialState: AppState = {
  currentView: AppView.SPLASH,
  history: [],
  userRole: null,
  clientUser: null,
  providerUser: null,
  selectedCategory: null,
  selectedProvider: null,
  selectedService: null,
  bookingDetails: {},
  orders: DEMO_ORDERS,
  onboardingStep: 0,
  notifCount: 2,
};

export default function App() {
  const [state, setState] = useState<AppState>(initialState);

  const navigate = (view: AppView, resetHistory = false) => {
    setState(prev => ({
      ...prev,
      currentView: view,
      history: resetHistory ? [] : [...prev.history, prev.currentView],
    }));
  };

  const goBack = () => {
    setState(prev => {
      const history = [...prev.history];
      const last = history.pop() ?? AppView.CLIENT_HOME;
      return { ...prev, currentView: last, history };
    });
  };

  const setRole = (role: UserRole) => {
    setState(prev => ({
      ...prev,
      userRole: role,
      clientUser: role === 'client' ? DEMO_CLIENT : null,
      providerUser: role === 'provider' ? DEMO_PROVIDER_USER : null,
    }));
  };

  const setCategory = (cat: ServiceCategory | null) => setState(prev => ({ ...prev, selectedCategory: cat }));
  const setProvider = (p: Provider | null) => setState(prev => ({ ...prev, selectedProvider: p }));
  const setService = (s: ServiceItem | null) => setState(prev => ({ ...prev, selectedService: s }));
  const setBooking = (b: Partial<BookingDetails>) => setState(prev => ({ ...prev, bookingDetails: { ...prev.bookingDetails, ...b } }));

  const commonProps = { state, navigate, goBack, setCategory, setProvider, setService, setBooking };

  const renderView = () => {
    switch (state.currentView) {
      case AppView.SPLASH:
        return <SplashScreen onDone={() => navigate(AppView.LOGIN, true)} />;

      case AppView.LOGIN:
        return (
          <LoginScreen
            onLogin={(role) => {
              setRole(role);
              if (role === 'client') navigate(AppView.CLIENT_HOME, true);
              else if (role === 'provider') navigate(AppView.PROVIDER_DASHBOARD, true);
              else navigate(AppView.ADMIN_DASHBOARD, true);
            }}
            onProviderRegister={() => navigate(AppView.PROVIDER_ONBOARDING, true)}
          />
        );

      case AppView.CLIENT_HOME:
        return <ClientHome {...commonProps} />;

      case AppView.PROVIDER_LIST:
        return <ProviderList {...commonProps} />;

      case AppView.PROVIDER_PROFILE:
        return <ProviderProfile {...commonProps} />;

      case AppView.SERVICE_CONFIG:
        return <ServiceConfig {...commonProps} />;

      case AppView.BOOKING_CALENDAR:
        return <BookingCalendar {...commonProps} />;

      case AppView.PAYMENT:
        return <PaymentScreen {...commonProps} />;

      case AppView.ORDERS:
        return <OrdersScreen {...commonProps} />;

      case AppView.ORDER_TRACKING:
        return <OrderTracking {...commonProps} />;

      case AppView.CLIENT_PROFILE:
        return <ClientProfileScreen {...commonProps} />;

      case AppView.PROVIDER_ONBOARDING:
        return (
          <ProviderOnboarding
            onComplete={() => navigate(AppView.PROVIDER_DASHBOARD, true)}
            onLogin={() => navigate(AppView.LOGIN, true)}
          />
        );

      case AppView.PROVIDER_DASHBOARD:
        return <ProviderDashboard {...commonProps} />;

      case AppView.ADMIN_DASHBOARD:
        return <AdminDashboard {...commonProps} />;

      default:
        return <ClientHome {...commonProps} />;
    }
  };

  return (
    <div className="h-full w-full overflow-hidden bg-im-dark">
      {renderView()}
    </div>
  );
}
