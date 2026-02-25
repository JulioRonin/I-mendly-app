import React from 'react';
import { ArrowLeft, Star, MapPin, Share2, Heart, Award, CheckCircle2 } from 'lucide-react';
import { Provider, ServiceCategory } from '../types';

interface ProviderMapProps {
   provider: Provider;
   service: ServiceCategory | null;
   onBack: () => void;
   onBook: () => void;
}

const ProviderMap: React.FC<ProviderMapProps> = ({ provider, onBack, onBook }) => {
   return (
      <div className="h-full bg-canvas overflow-y-auto no-scrollbar relative animate-fade-in">

         {/* Immersive Header Image */}
         <div className="h-[42vh] relative w-full">
            <img
               src={provider.avatarUrl}
               alt={provider.name}
               className="w-full h-full object-contain bg-white"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-canvas" />

            {/* Top Actions */}
            <div className="absolute top-6 left-5 right-5 flex justify-between items-center z-20">
               <button
                  onClick={onBack}
                  className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center text-ink hover:bg-white transition-colors border border-white/50"
               >
                  <ArrowLeft size={18} />
               </button>
               <div className="flex gap-2">
                  <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center text-ink-secondary hover:bg-white transition-colors border border-white/50">
                     <Share2 size={17} />
                  </button>
                  <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center text-ink-secondary hover:text-red-400 hover:bg-white transition-colors border border-white/50">
                     <Heart size={17} />
                  </button>
               </div>
            </div>
         </div>

         {/* Content Container */}
         <div className="relative z-10 -mt-16 px-5 pb-36">

            {/* Main Profile Card */}
            <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-card animate-card-in">

               {/* Header Info */}
               <div className="flex justify-between items-start mb-5">
                  <div>
                     <span className="inline-block bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                        {provider.specialty}
                     </span>
                     <h1 className="text-2xl font-black text-ink leading-tight mb-1.5">
                        {provider.name}
                     </h1>
                     <div className="flex items-center gap-2 text-ink-secondary">
                        <MapPin size={14} className="text-green-500" />
                        <span className="text-sm">{provider.zone} ({provider.distance})</span>
                     </div>
                  </div>
                  <div className="flex flex-col items-center bg-canvas px-4 py-3 rounded-2xl">
                     <div className="flex items-center gap-1 text-yellow-500 mb-0.5">
                        <Star size={14} fill="currentColor" />
                        <span className="text-base font-black text-ink">{provider.rating}</span>
                     </div>
                     <span className="text-[9px] text-ink-muted font-bold uppercase">{provider.reviews} Reseñas</span>
                  </div>
               </div>

               {/* Stats */}
               <div className="flex gap-3 overflow-x-auto no-scrollbar mb-6 py-1">
                  <div className="shrink-0 bg-blue-50 p-3.5 rounded-2xl flex items-center gap-3 border border-blue-100 min-w-[130px]">
                     <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                        <Award size={17} />
                     </div>
                     <div>
                        <span className="block text-lg font-black text-ink">5+</span>
                        <span className="text-[10px] text-ink-muted font-medium">Años Exp.</span>
                     </div>
                  </div>
                  <div className="shrink-0 bg-green-50 p-3.5 rounded-2xl flex items-center gap-3 border border-green-100 min-w-[130px]">
                     <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                        <CheckCircle2 size={17} />
                     </div>
                     <div>
                        <span className="block text-lg font-black text-ink">100%</span>
                        <span className="text-[10px] text-ink-muted font-medium">Verificado</span>
                     </div>
                  </div>
               </div>

               {/* Description */}
               <div className="mb-6">
                  <h3 className="text-sm font-black text-ink mb-2">Sobre mí</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed p-4 bg-canvas rounded-2xl">
                     Especialista en servicios residenciales de alta gama. Me enfoco en el detalle y la limpieza profunda, utilizando productos ecológicos y seguros para tu hogar.
                  </p>
               </div>

               {/* Portfolio */}
               <div>
                  <div className="flex justify-between items-center mb-3">
                     <h3 className="text-sm font-black text-ink">Portafolio</h3>
                     <button className="text-green-600 text-xs font-bold">Ver todo</button>
                  </div>
                  <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x pb-2">
                     {provider.portfolio && provider.portfolio.length > 0 ? (
                        provider.portfolio.map((img, idx) => (
                           <img
                              key={idx}
                              src={img}
                              alt={`Portfolio ${idx}`}
                              className="w-44 h-44 rounded-2xl object-cover shadow-xs snap-center hover:scale-105 transition-transform border border-black/5"
                           />
                        ))
                     ) : (
                        [1, 2, 3].map((i) => (
                           <img
                              key={i}
                              src={`https://source.unsplash.com/random/300x300?interior,home&sig=${i + provider.id.length}`}
                              onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1581578731117-104529d3d3bd?q=80&w=300'}
                              alt="PortfolioPlaceholder"
                              className="w-32 h-32 rounded-2xl object-cover shadow-xs snap-center hover:scale-105 transition-transform border border-black/5"
                           />
                        ))
                     )}
                  </div>
               </div>
            </div>
         </div>

         {/* Floating Bottom Action Bar */}
         <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-canvas via-canvas/90 to-transparent z-40">
            <div className="bg-ink text-white p-2 pl-6 rounded-full shadow-float flex items-center justify-between">
               <div className="flex flex-col justify-center py-1">
                  <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest mb-0.5">Servicios</span>
                  <span className="text-base font-bold text-white">Explorar los costos</span>
               </div>
               <button
                  onClick={onBook}
                  className="bg-green-500 text-white px-7 py-4 rounded-full font-bold text-sm hover:bg-green-600 transition-colors shadow-green"
               >
                  Reservar
               </button>
            </div>
         </div>
      </div>
   );
};

export default ProviderMap;