import React from 'react';
import { AppState, AppView } from '../types';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

interface Props {
  state: AppState;
  navigate: (v: AppView) => void;
  goBack: () => void;
  setCategory: (c: any) => void;
  setProvider: (p: any) => void;
  setService: (s: any) => void;
  setBooking: (b: any) => void;
}

export default function ScheduleScreen({ state, navigate }: Props) {
  return (
    <div className="h-full flex flex-col" style={{ background: '#060D16' }}>
      <Navbar title="Mi agenda" />
      <div className="flex-1 flex items-center justify-center flex-col gap-4">
        <span style={{ fontSize: 48 }}>📅</span>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>Sin servicios agendados</p>
      </div>
      <BottomNav current={AppView.CLIENT_HOME} navigate={navigate} role="client" />
    </div>
  );
}
