import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Calendar, ShieldCheck, Bell, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  userProfile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onCancel: () => void;
}

export default function ProfileView({ userProfile, onSaveProfile, onCancel }: ProfileViewProps) {
  const [profile, setProfile] = useState<UserProfile>({ ...userProfile });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleUpdate = (field: string, val: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleAddressUpdate = (field: string, val: any) => {
    setProfile(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: val
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profile);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const genders = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];

  return (
    <div id="profile-view-outer" className="w-full min-h-screen bg-[#faf8f6] py-16 px-6 md:px-12 select-none">
      <div className="max-w-3xl mx-auto">
        
        {/* Profile Avatar Header Segment */}
        <div id="profile-card-header" className="flex flex-col items-center text-center mb-12">
          
          <div className="relative mb-4 group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-stone-200/60 shadow-md">
              <img 
                src={profile.avatar} 
                alt={profile.fullName} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Camera Floating pencil overlay matching image */}
            <label className="absolute bottom-1 right-1 bg-amber-600 hover:bg-amber-700 text-white p-1.5 rounded-full shadow-md cursor-pointer transition-colors active:scale-95">
              <Camera size={14} />
            </label>
          </div>

          <h2 className="font-serif text-3xl font-medium tracking-normal text-stone-900 leading-tight">
            Your Profile
          </h2>
          <p className="text-[10px] tracking-[0.3em] font-mono text-stone-400 uppercase mt-1">
            PERSONAL SETTINGS
          </p>
        </div>

        {/* Dynamic Save Prompt notification */}
        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-3 text-xs font-semibold uppercase tracking-wider"
          >
            <ShieldCheck size={18} className="text-emerald-600" /> Settings updated, saved securely!
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main settings card enclosure */}
          <div className="bg-white border border-stone-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm space-y-8">
            <h3 className="font-serif text-xl font-semibold tracking-wide text-stone-900 border-b border-stone-100 pb-4 mb-4">
              Personal Information
            </h3>

            {/* Grid structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-[9px] tracking-[0.25em] font-medium text-stone-400 uppercase mb-2">
                  FULL NAME
                </label>
                <input 
                  type="text" 
                  value={profile.fullName}
                  onChange={(e) => handleUpdate('fullName', e.target.value)}
                  className="w-full pb-3 pt-1.5 bg-transparent border-b border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-amber-600 font-sans"
                />
              </div>

              {/* Email address */}
              <div>
                <label className="block text-[9px] tracking-[0.25em] font-medium text-stone-400 uppercase mb-2">
                  EMAIL ADDRESS
                </label>
                <input 
                  type="email" 
                  value={profile.email}
                  onChange={(e) => handleUpdate('email', e.target.value)}
                  className="w-full pb-3 pt-1.5 bg-transparent border-b border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-amber-600 font-sans"
                />
              </div>

              {/* Phone number */}
              <div>
                <label className="block text-[9px] tracking-[0.25em] font-medium text-stone-400 uppercase mb-2">
                  PHONE NUMBER
                </label>
                <input 
                  type="text" 
                  value={profile.phone}
                  onChange={(e) => handleUpdate('phone', e.target.value)}
                  className="w-full pb-3 pt-1.5 bg-transparent border-b border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-amber-600 font-sans"
                />
              </div>

              {/* Gender selection */}
              <div>
                <label className="block text-[9px] tracking-[0.25em] font-medium text-stone-400 uppercase mb-2">
                  GENDER
                </label>
                <select 
                  value={profile.gender}
                  onChange={(e) => handleUpdate('gender', e.target.value)}
                  className="w-full pb-3 pt-1.5 bg-transparent border-b border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-amber-600 font-sans cursor-pointer"
                >
                  {genders.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              {/* Date of Birth input with calendar style icon */}
              <div>
                <label className="block text-[9px] tracking-[0.25em] font-medium text-stone-400 uppercase mb-2 flex items-center justify-between">
                  DATE OF BIRTH
                </label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={profile.dob}
                    onChange={(e) => handleUpdate('dob', e.target.value)}
                    className="w-full pb-3 pt-1.5 bg-transparent border-b border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-amber-600 font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Delivery address partition matching Image 8 layout */}
            <div className="pt-8">
              <h3 className="font-serif text-[10px] tracking-[0.35em] font-medium text-amber-700 uppercase mb-6">
                DELIVERY ADDRESS
              </h3>

              <div className="space-y-6">
                {/* Street address */}
                <div>
                  <label className="block text-[9px] tracking-[0.25em] font-medium text-stone-400 uppercase mb-2">
                    STREET ADDRESS
                  </label>
                  <input 
                    type="text" 
                    value={profile.address.street}
                    onChange={(e) => handleAddressUpdate('street', e.target.value)}
                    className="w-full pb-3 pt-1.5 bg-transparent border-b border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-amber-600 font-sans"
                  />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {/* City */}
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] font-medium text-stone-400 uppercase mb-2">
                      CITY
                    </label>
                    <input 
                      type="text" 
                      value={profile.address.city}
                      onChange={(e) => handleAddressUpdate('city', e.target.value)}
                      className="w-full pb-3 pt-1.5 bg-transparent border-b border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-amber-600 font-sans"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] font-medium text-stone-400 uppercase mb-2">
                      STATE
                    </label>
                    <input 
                      type="text" 
                      value={profile.address.state}
                      onChange={(e) => handleAddressUpdate('state', e.target.value)}
                      className="w-full pb-3 pt-1.5 bg-transparent border-b border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-amber-600 font-sans"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-[9px] tracking-[0.25em] font-medium text-stone-400 uppercase mb-2">
                      POSTAL CODE
                    </label>
                    <input 
                      type="text" 
                      value={profile.address.postalCode}
                      onChange={(e) => handleAddressUpdate('postalCode', e.target.value)}
                      className="w-full pb-3 pt-1.5 bg-transparent border-b border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-amber-600 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footnote button CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-stone-100">
              <button
                type="submit"
                className="flex-1 py-4 bg-[#dca42b] hover:bg-[#c39121] text-white text-xs font-semibold uppercase tracking-[0.25em] transition-all shadow-md active:translate-y-0.5"
              >
                SAVE CHANGES
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-4 border border-stone-200 text-stone-500 hover:text-stone-900 text-xs font-semibold uppercase tracking-[0.25em] transition-color text-center hover:bg-stone-50"
              >
                CANCEL
              </button>
            </div>
          </div>
        </form>

        {/* Alerts lineup footer details from Image 8 */}
        <div id="profile-sub-actions" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="flex items-center p-5 bg-white border border-stone-100/80 rounded-3xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-3 bg-amber-50 rounded-2xl mr-4 flex-shrink-0 text-amber-600">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider text-stone-800 uppercase">
                Privacy & Security
              </h4>
              <p className="text-[10px] text-stone-400 mt-0.5">
                Manage your password and visibility in circle registries
              </p>
            </div>
          </div>

          <div className="flex items-center p-5 bg-white border border-stone-100/80 rounded-3xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="p-3 bg-amber-50 rounded-2xl mr-4 flex-shrink-0 text-amber-600">
              <Bell size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider text-stone-800 uppercase">
                Notifications
              </h4>
              <p className="text-[10px] text-stone-400 mt-0.5">
                Select your luxury newsletter, discount notices & order logs
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
