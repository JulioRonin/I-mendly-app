import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatInterface from './components/ChatInterface';
import ServiceGrid from './components/ServiceGrid';
import ServiceConfig from './components/ServiceConfig';
import ProviderMap from './components/ProviderMap';
import ProviderList from './components/ProviderList';
import ProviderServiceList from './components/ProviderServiceList'; // New Import
import OffersScreen from './components/OffersScreen'; // New Import
import CalendarBooking from './components/CalendarBooking';
import PaymentScreen from './components/PaymentScreen';
import LoginScreen from './components/LoginScreen';
import OrdersScreen from './components/OrdersScreen';
import ProfileScreen from './components/ProfileScreen';
import AdminDashboard from './components/AdminDashboard';
import ScheduleScreen from './components/ScheduleScreen'; // New Import
import ProviderDashboard from './components/ProviderDashboard';
import BottomNav from './components/BottomNav';
import { AppView, Message, ServiceCategory, Provider, Order } from './types';
import { SERVICES, MOCK_PROVIDERS, ZONES } from './constants'; // Import Data
import { initializeGemini } from './services/geminiService';
import { Bell } from 'lucide-react';

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2024-001',
    serviceName: 'Limpieza Profunda',
    serviceDescription: 'Limpieza completa de interiores con productos eco-friendly.',
    providerName: "Karla's Cleaning",
    providerAvatar: "https://images.unsplash.com/photo-1581578731117-104529d3d3bd?q=80&w=100",
    price: 800,
    status: 'En progreso',
    currentPhase: 3,
    date: 'Hoy, 2:00 PM',
    location: 'Calle Principal #123, Ciudad de México',
    phases: [
      { label: 'Solicitud', description: 'Servicio solicitado', status: 'completed', date: 'Feb 24, 10:00 AM' },
      { label: 'Aprobación', description: 'Proveedor aceptó el servicio', status: 'completed', date: 'Feb 24, 10:30 AM' },
      { label: 'Escrow', description: 'Fondos retenidos por Mendly', status: 'completed', date: 'Feb 24, 11:15 AM' },
      { label: 'Trabajo', description: 'El trabajo ha comenzado', status: 'current' },
      { label: 'Entrega', description: 'Pendiente de finalizar', status: 'pending' },
      { label: 'Pago', description: 'Pendiente de liberación', status: 'pending' }
    ],
    messages: [
      { id: '1', sender: 'system', text: 'Tu solicitud ha sido enviada al proveedor.', timestamp: '10:00 AM' },
      { id: '2', sender: 'provider', text: 'Hola! He recibido tu solicitud. Estaré ahí a las 2:00 PM.', timestamp: '10:35 AM' },
      { id: '3', sender: 'system', text: '¡Fondos asegurados en Escrow!', timestamp: '11:15 AM' }
    ],
    photos: []
  },
  {
    id: 'ORD-2024-002',
    serviceName: 'Reparación Eléctrica',
    serviceDescription: 'Revisión y cambio de contactos dañados en cocina.',
    providerName: 'EMDICO',
    providerAvatar: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=100",
    price: 300,
    status: 'En espera de aprobación',
    currentPhase: 0,
    date: 'Mañana, 10:00 AM',
    location: 'Av. Reforma #456, Ciudad de México',
    phases: [
      { label: 'Solicitud', description: 'Esperando al proveedor', status: 'current', date: 'Feb 25, 10:00 AM' },
      { label: 'Aprobación', description: 'Por aceptar', status: 'pending' },
      { label: 'Escrow', description: 'Fondos retenidos', status: 'pending' },
      { label: 'Trabajo', description: 'En progreso', status: 'pending' },
      { label: 'Entrega', description: 'Terminado', status: 'pending' },
      { label: 'Liberación', description: 'Pago liberado', status: 'pending' }
    ],
    messages: [
      { id: '1', sender: 'system', text: 'Solicitud enviada con éxito.', timestamp: '10:00 AM' }
    ],
    photos: []
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [history, setHistory] = useState<AppView[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null); // New State
  const [selectedZone, setSelectedZone] = useState<string | null>(null); // New State for Zone Filter
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS); // New Global Orders State
  const [bookingDetails, setBookingDetails] = useState<{ date: string; time: string } | null>(null);

  const handleUpdateOrder = (orderId: string, updatedOrder: Order) => {
    setOrders(prev => prev.map(o => o.id === orderId ? updatedOrder : o));
  };

  // Helper to navigate and keep track of history
  const navigateTo = (view: AppView) => {
    if (view !== currentView) {
      setHistory(prev => [...prev, currentView]);
      setCurrentView(view);
    }
  };

  const goBack = (fallback: AppView = AppView.SERVICES) => {
    if (history.length > 0) {
      const prevView = history[history.length - 1];

      // Safety check: if prevView requires a provider but we don't have one, pop again or fallback
      if ((prevView === AppView.MAP || prevView === AppView.PROVIDER_SERVICES) && !selectedProvider) {
        const remainingHistory = history.slice(0, -1);
        if (remainingHistory.length > 0) {
          setHistory(remainingHistory);
          setCurrentView(remainingHistory[remainingHistory.length - 1]);
          return;
        }
        setCurrentView(fallback);
        setHistory([]);
        return;
      }

      setHistory(prev => prev.slice(0, -1));
      setCurrentView(prevView);
    } else {
      setCurrentView(fallback);
    }
  };

  // Modals for old functionality, keeping them for "Chat" actions just in case
  const [showRenderModal, setShowRenderModal] = useState(false);
  const [generatedRenderData, setGeneratedRenderData] = useState<any>(null);

  useEffect(() => {
    initializeGemini();
  }, []);

  const handleActionTrigger = (action: string, data?: any) => {
    console.log("Trigger Action:", action, data);
    if (action === 'SHOW_CALENDAR') {
      navigateTo(AppView.CALENDAR);
    } else if (action === 'SHOW_RENDER') {
      setGeneratedRenderData(data);
      setShowRenderModal(true);
    } else if (action === 'OPEN_PROVIDER') {
      // Navigating from Chat -> Provider Profile
      if (data) {
        setSelectedProvider(data);
        // We might need selectedService too if the map view relies on it, 
        // but for now let's hope provider data is enough or we interpret it.
        // Actually ProviderMap needs `service` prop usually. 
        // Let's try to infer service from provider.categoryId
        const service = SERVICES.find(s => s.id === data.categoryId);
        if (service) setSelectedService(service);

        navigateTo(AppView.MAP);
      }
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.LOGIN:
        return <LoginScreen onLogin={(isProvider) => {
          if (isProvider) {
            navigateTo(AppView.PROVIDER_DASHBOARD);
          } else {
            navigateTo(AppView.SERVICES);
          }
        }} />;
      case AppView.CHAT:
        return (
          <ChatInterface
            messages={messages}
            setMessages={setMessages}
            onActionTrigger={handleActionTrigger}
            onBack={() => goBack(AppView.SERVICES)}
          />
        );
      case AppView.SERVICES:
        return <ServiceGrid
          selectedZone={selectedZone}
          onSelectZone={setSelectedZone}
          onOpenOffers={() => navigateTo(AppView.OFFERS)} // New Handler
          onOpenChat={() => navigateTo(AppView.CHAT)}
          onSelectService={(s) => {
            setSelectedService(s);
            // Always go to Provider List first for standard categories
            // Update: User requested all categories (including Architecture/Design) to show provider list instead of Chat.
            navigateTo(AppView.PROVIDER_LIST);
          }}
          onOpenRecommended={(serviceId, providerId) => {
            const service = SERVICES.find(s => s.id === serviceId);
            const provider = MOCK_PROVIDERS.find(p => p.id === providerId);
            if (service && provider) {
              setSelectedService(service);
              setSelectedProvider(provider);
              navigateTo(AppView.MAP);
            }
          }}
        />;
      case AppView.OFFERS:
        return <OffersScreen
          onBack={() => goBack(AppView.SERVICES)}
          onRedeem={() => {
            const cleaningService = SERVICES.find(s => s.id === '10');
            if (cleaningService) {
              setSelectedService(cleaningService);
              navigateTo(AppView.PROVIDER_LIST);
            }
          }}
        />;
      case AppView.PROVIDER_LIST:
        return selectedService ? (
          <ProviderList
            category={selectedService}
            selectedZone={selectedZone}
            onBack={() => goBack(AppView.SERVICES)}
            onSelectProvider={(provider) => {
              setSelectedProvider(provider);
              navigateTo(AppView.MAP); // Go to Profile/Portfolio Layer
            }}
          />
        ) : <div>Error: No category selected</div>;
      case AppView.PROVIDER_SERVICES:
        return selectedProvider ? (
          <ProviderServiceList
            provider={selectedProvider}
            onBack={() => goBack(AppView.MAP)} // Back to Profile
            onSelectService={(service) => {
              // Store selected sub-service if needed, then go to Calendar
              // setSelectedSubService(service); // TODO: Add state for this if needed
              navigateTo(AppView.BOOKING_CALENDAR);
            }}
          />
        ) : <div>Error: No provider selected</div>;
      case AppView.SERVICE_CONFIG:
        return selectedService ? (
          <ServiceConfig
            service={selectedService}
            onBack={() => goBack(AppView.SERVICES)}
            onNext={() => navigateTo(AppView.BOOKING_CALENDAR)}
          />
        ) : <div>Error</div>;
      case AppView.MAP:
        return <ProviderMap
          service={selectedService}
          provider={selectedProvider}
          onBook={() => navigateTo(AppView.PROVIDER_SERVICES)} // Go to Service Selection
          onBack={() => goBack(AppView.PROVIDER_LIST)} // Back to List
        />;
      case AppView.CALENDAR:
        return <ScheduleScreen />;
      case AppView.BOOKING_CALENDAR:
        return <CalendarBooking
          onConfirm={(date, time) => {
            setBookingDetails({ date: date.toDateString(), time });
            navigateTo(AppView.PAYMENT);
          }}
          onCancel={() => {
            // Return to appropriate previous screen based on history
            goBack(AppView.SERVICES);
          }}
          onBack={() => goBack(AppView.SERVICES)}
        />;
      case AppView.PAYMENT:
        return <PaymentScreen
          onBack={() => goBack(AppView.BOOKING_CALENDAR)}
          onConfirm={() => {
            // Create New Order - STARTING ESCROW FLOW
            if (selectedProvider && selectedService && bookingDetails) {
              const newOrder: Order = {
                id: `ORD-${Date.now().toString().slice(-6)}`,
                serviceName: selectedService.name,
                serviceDescription: selectedService.description,
                providerName: selectedProvider.name,
                providerAvatar: selectedProvider.avatarUrl,
                price: selectedProvider.pricePerHour || 500,
                status: 'En espera de aprobación',
                currentPhase: 0,
                date: `${bookingDetails.date}, ${bookingDetails.time}`,
                location: 'Dirección Registrada',
                phases: [
                  { label: 'Solicitud', description: 'Esperando al proveedor', status: 'current', date: new Date().toLocaleDateString() },
                  { label: 'Aprobación', description: 'Por aceptar', status: 'pending' },
                  { label: 'Escrow', description: 'Fondos retenidos', status: 'pending' },
                  { label: 'Trabajo', description: 'En progreso', status: 'pending' },
                  { label: 'Entrega', description: 'Terminado', status: 'pending' },
                  { label: 'Liberación', description: 'Pago liberado', status: 'pending' }
                ],
                messages: [{ id: '1', sender: 'system', text: '¡Pedido creado con éxito! Esperando aprobación del proveedor.', timestamp: new Date().toLocaleTimeString() }],
                photos: []
              };
              setOrders(prev => [newOrder, ...prev]);
            }

            // Done
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              role: 'system',
              text: '✅ ¡Solicitud enviada! Tu servicio está en espera de aprobación.',
              timestamp: new Date()
            }]);
            navigateTo(AppView.CHAT); // Go to Chat to see confirmation
          }}
        />;
      case AppView.ORDERS:
        return <OrdersScreen orders={orders} setOrders={setOrders} onUpdateOrder={handleUpdateOrder} />;
      case AppView.PROFILE:
        return <ProfileScreen onOpenAdmin={() => navigateTo(AppView.ADMIN)} />;
      case AppView.ADMIN:
        return <AdminDashboard onBack={() => goBack(AppView.PROFILE)} />;
      case AppView.PROVIDER_DASHBOARD:
        return <ProviderDashboard onLogout={() => navigateTo(AppView.LOGIN)} />;
      default:
        return <div className="p-10 text-center text-gray-400 font-bold">Coming Soon</div>;
    }
  };

  return (
    <Router>
      <div className="flex flex-col h-screen font-sans relative text-gray-900 bg-[#F3F4F6] selection:bg-brand-purple selection:text-white">

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative z-0">
          {renderContent()}
        </div>

        {/* Render Result Modal */}
        {showRenderModal && (
          <div className="absolute inset-0 z-[60] bg-black/80 flex items-center justify-center p-6 backdrop-blur-md animate-fade-in">
            <div className="bg-dark-card border border-white/10 rounded-[2.5rem] overflow-hidden w-full max-w-sm shadow-2xl animate-pop relative">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"
                className="w-full h-72 object-cover"
                alt="Render"
              />
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Success</h3>
                <button onClick={() => setShowRenderModal(false)} className="w-full bg-brand-purple text-white py-4 rounded-full font-bold">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* New Bottom Navigation - Show on relevant screens */}
        {currentView !== AppView.LOGIN &&
          currentView !== AppView.CHAT &&
          currentView !== AppView.MAP &&
          currentView !== AppView.PROVIDER_SERVICES &&
          currentView !== AppView.BOOKING_CALENDAR &&
          currentView !== AppView.OFFERS &&
          currentView !== AppView.PAYMENT &&
          currentView !== AppView.PROVIDER_DASHBOARD && (
            <BottomNav currentView={currentView} onNavigate={navigateTo} />
          )}
      </div>
    </Router>
  );
};

export default App;