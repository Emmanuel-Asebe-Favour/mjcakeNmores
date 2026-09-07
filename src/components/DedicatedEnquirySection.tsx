import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { 
  PartyPopper, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  MessageCircle, 
  Layers, 
  Users, 
  HeartHandshake, 
  Cake, 
  Utensils, 
  Palette,
  AlertCircle
} from 'lucide-react';

export type EnquiryTab = 'decor' | 'classes' | 'combo';

interface DedicatedEnquirySectionProps {
  defaultTab?: EnquiryTab;
}

export const DedicatedEnquirySection: React.FC<DedicatedEnquirySectionProps> = ({ defaultTab = 'decor' }) => {
  const { bakeryInfo } = useBakery();
  const [activeTab, setActiveTab] = useState<EnquiryTab>(defaultTab);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Common Contact State
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Event Decor State
  const [eventType, setEventType] = useState('Birthday Celebration');
  const [customEventType, setCustomEventType] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventSetupTime, setEventSetupTime] = useState('Morning (8:00 AM Setup)');
  const [venueAddress, setVenueAddress] = useState('');
  const [venueType, setVenueType] = useState('Indoor Event Hall');
  const [guestCount, setGuestCount] = useState('50 - 150 guests');
  const [colorTheme, setColorTheme] = useState('');
  const [budgetRange, setBudgetRange] = useState('Flexible / Advise me on packages');
  const [decorNotes, setDecorNotes] = useState('');
  
  // Decor Service Requirements (Multi-select)
  const availableDecorServices = [
    'Main Stage Backdrop & Photo Booth Styling',
    'VIP Head Table & Floral Centerpieces',
    'Organic Balloon Arch & Garland Installations',
    'Table Dressing, Runners & Chair Covers',
    'Walkway Carpet & Decorative Aisle Pillars',
    'Ambient Fairy Lights & Mood Uplighting',
    'Custom Celebration Cake Centerpiece',
    'Hot Party Small Chops & Finger Food Platters',
    'Event Day Coordination & Ushering Support',
    'Custom Celebration Souvenirs & Favours',
  ];
  const [selectedDecorServices, setSelectedDecorServices] = useState<string[]>([
    'Main Stage Backdrop & Photo Booth Styling',
    'Organic Balloon Arch & Garland Installations',
    'Table Dressing, Runners & Chair Covers',
  ]);

  // Classes & Training State
  const [courseChoice, setCourseChoice] = useState('Comprehensive Cake Masterclass (4 Weeks)');
  const [classStartDate, setClassStartDate] = useState('');
  const [classSchedule, setClassSchedule] = useState('Weekday Morning (9:00 AM – 1:00 PM)');
  const [trainingVenue, setTrainingVenue] = useState('Bakery Studio (No. 7 Edikwu Road, Eupi, Otukpo)');
  const [experienceLevel, setExperienceLevel] = useState('Complete Beginner (Never baked before)');
  const [classNotes, setClassNotes] = useState('');

  // Class Skills / Requirements (Multi-select)
  const availableClassSkills = [
    'Moist Cake Baking from Scratch (Vanilla, Red Velvet, Chocolate)',
    'Sharp-Edge Fondant Wrapping & Structural Tier Dowelling',
    'Modern Buttercream Piping & Palette Knife Textures',
    'Golden Nigerian Meat Pie & Chicken Pie Pastry Crust',
    'Crispy Samosa & Spring Roll Dough Folding from scratch',
    'Soft Chewy Party Puff-Puff & Crunchy Chin-Chin',
    'Baking Costing, Pricing Formulas & Commercial Packaging',
    'Certificate of Completion & Tools Guidance',
  ];
  const [selectedClassSkills, setSelectedClassSkills] = useState<string[]>([
    'Moist Cake Baking from Scratch (Vanilla, Red Velvet, Chocolate)',
    'Sharp-Edge Fondant Wrapping & Structural Tier Dowelling',
    'Golden Nigerian Meat Pie & Chicken Pie Pastry Crust',
  ]);

  // Combo Additions
  const [comboCakeSize, setComboCakeSize] = useState('2-Tier Celebration Cake');
  const [comboSmallChopsPacks, setComboSmallChopsPacks] = useState('50 Party Packs');

  // Toggle helper for decor services
  const toggleDecorService = (service: string) => {
    setSelectedDecorServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  // Toggle helper for class skills
  const toggleClassSkill = (skill: string) => {
    setSelectedClassSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  // Generate WhatsApp text based on active tab
  const generateMessageText = (): string => {
    if (activeTab === 'decor') {
      const resolvedEventType = eventType === 'Other' ? (customEventType || 'Special Event') : eventType;
      let text = `*✨ EVENT DECORATION & STYLING ENQUIRY*\n`;
      text += `*Bakery & Events:* MjcakesNmore (Otukpo)\n`;
      text += `------------------------------------\n`;
      text += `👤 *Client Name:* ${fullName.trim() || 'Not specified'}\n`;
      text += `📱 *Phone / WhatsApp:* ${phoneNumber.trim() || 'Not specified'}\n`;
      text += `🎉 *Event Type:* ${resolvedEventType}\n`;
      text += `📅 *Event Date:* ${eventDate || 'Not specified'}\n`;
      text += `⏰ *Setup / Event Time:* ${eventSetupTime}\n`;
      text += `📍 *Venue & Area in Otukpo:* ${venueAddress.trim() || 'Otukpo (Address pending)'}\n`;
      text += `🏛️ *Venue Environment:* ${venueType}\n`;
      text += `👥 *Estimated Guests:* ${guestCount}\n`;
      if (colorTheme.trim()) {
        text += `🎨 *Color Theme / Aesthetic:* ${colorTheme.trim()}\n`;
      }
      text += `💰 *Budget Expectation:* ${budgetRange}\n\n`;
      
      text += `🛠️ *Specific Service Requirements:*\n`;
      if (selectedDecorServices.length > 0) {
        selectedDecorServices.forEach(service => {
          text += `  • ${service}\n`;
        });
      } else {
        text += `  • Full bespoke decoration consultation\n`;
      }

      if (decorNotes.trim()) {
        text += `\n📝 *Additional Vision / Requests:*\n${decorNotes.trim()}\n`;
      }
      text += `\n------------------------------------\n`;
      text += `Hello MjcakesNmore! I would love to confirm availability and discuss decor packages for my event in Otukpo.`;
      return text;
    } else if (activeTab === 'classes') {
      let text = `*🎓 BAKING & PASTRY TRAINING ENQUIRY*\n`;
      text += `*Academy:* MjcakesNmore (Otukpo)\n`;
      text += `------------------------------------\n`;
      text += `👤 *Participant Name:* ${fullName.trim() || 'Not specified'}\n`;
      text += `📱 *Phone / WhatsApp:* ${phoneNumber.trim() || 'Not specified'}\n`;
      text += `📚 *Masterclass Program:* ${courseChoice}\n`;
      text += `📅 *Target Start Date / Month:* ${classStartDate || 'Earliest available batch'}\n`;
      text += `⏰ *Preferred Schedule:* ${classSchedule}\n`;
      text += `📍 *Training Venue:* ${trainingVenue}\n`;
      text += `⭐ *Current Experience Level:* ${experienceLevel}\n\n`;

      text += `🎯 *Key Skills & Modules of High Interest:*\n`;
      if (selectedClassSkills.length > 0) {
        selectedClassSkills.forEach(skill => {
          text += `  • ${skill}\n`;
        });
      } else {
        text += `  • Complete syllabus from basic to mastery\n`;
      }

      if (classNotes.trim()) {
        text += `\n📝 *Goals / Special Enquiries:*\n${classNotes.trim()}\n`;
      }
      text += `\n------------------------------------\n`;
      text += `Hello MjcakesNmore! Please share the upcoming batch timetable, tuition fee breakdown, and registration details.`;
      return text;
    } else {
      // Combo Tab
      const resolvedEventType = eventType === 'Other' ? (customEventType || 'Special Event') : eventType;
      let text = `*👑 ALL-IN-ONE CELEBRATION COMBO ENQUIRY*\n`;
      text += `*(Decorations + Cake + Small Chops Catering)*\n`;
      text += `*MjcakesNmore - Otukpo, Benue State*\n`;
      text += `------------------------------------\n`;
      text += `👤 *Client Name:* ${fullName.trim() || 'Not specified'}\n`;
      text += `📱 *Phone / WhatsApp:* ${phoneNumber.trim() || 'Not specified'}\n`;
      text += `🎉 *Event Type:* ${resolvedEventType}\n`;
      text += `📅 *Event Date:* ${eventDate || 'Not specified'}\n`;
      text += `📍 *Venue & Location in Otukpo:* ${venueAddress.trim() || 'Otukpo (Address pending)'}\n`;
      text += `🏛️ *Venue Type:* ${venueType}\n`;
      text += `👥 *Estimated Guests:* ${guestCount}\n`;
      if (colorTheme.trim()) {
        text += `🎨 *Theme / Colors:* ${colorTheme.trim()}\n`;
      }
      text += `🎂 *Cake Requirement:* ${comboCakeSize}\n`;
      text += `🥟 *Small Chops Catering:* ${comboSmallChopsPacks}\n\n`;

      text += `✨ *Included Decor Requirements:*\n`;
      if (selectedDecorServices.length > 0) {
        selectedDecorServices.forEach(s => {
          text += `  • ${s}\n`;
        });
      }

      if (decorNotes.trim()) {
        text += `\n📝 *Notes & Custom Styling:*\n${decorNotes.trim()}\n`;
      }
      text += `\n------------------------------------\n`;
      text += `Hello MjcakesNmore! Please provide a combined package quote for event decor, custom cake, and small chops for my event.`;
      return text;
    }
  };

  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      setValidationError('Please enter your Name.');
      return false;
    }
    if (!phoneNumber.trim()) {
      setValidationError('Please enter your Phone or WhatsApp Number.');
      return false;
    }

    if (activeTab === 'decor' || activeTab === 'combo') {
      if (!eventDate) {
        setValidationError('Please select the Event Date.');
        return false;
      }
      if (!venueAddress.trim()) {
        setValidationError('Please specify the Venue or Location in/around Otukpo.');
        return false;
      }
      if (selectedDecorServices.length === 0) {
        setValidationError('Please select at least one Service Requirement.');
        return false;
      }
    } else if (activeTab === 'classes') {
      if (!classStartDate) {
        setValidationError('Please select your preferred Target Start Date.');
        return false;
      }
      if (selectedClassSkills.length === 0) {
        setValidationError('Please choose at least one Skill or Module of interest.');
        return false;
      }
    }

    setValidationError(null);
    return true;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const message = generateMessageText();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${bakeryInfo.whatsAppDigits}?text=${encoded}`, '_blank');
  };

  const handleCopy = () => {
    const message = generateMessageText();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="enquiry" className="py-16 sm:py-20 bg-gradient-to-b from-[#FDFBF7] via-[#FAF5EC] to-[#FDFBF7] scroll-mt-20 border-t border-[#E8DFD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCEEF1] text-[#3D2314] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#F2AAB8]/50">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Dedicated Consultation & Bookings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2314] tracking-tight">
            Event Decorations & Baking Classes Enquiry
          </h2>
          <p className="mt-3 text-base text-[#614231] leading-relaxed">
            Planning a celebration in Otukpo or eager to master the art of commercial baking? Provide your event date, venue, and exact service requirements below to receive a personalized quote and timetable on WhatsApp.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-[#EAE0D3] shadow-xs max-w-2xl w-full sm:w-auto">
            <button
              type="button"
              id="enquiry-tab-decor"
              onClick={() => {
                setActiveTab('decor');
                setValidationError(null);
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'decor'
                  ? 'bg-[#3D2314] text-white shadow-sm'
                  : 'text-[#614231] hover:text-[#3D2314] hover:bg-[#FAF5EC]'
              }`}
            >
              <PartyPopper className="w-4 h-4 text-[#F2AAB8]" />
              <span>Event Decorations</span>
            </button>

            <button
              type="button"
              id="enquiry-tab-classes"
              onClick={() => {
                setActiveTab('classes');
                setValidationError(null);
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'classes'
                  ? 'bg-[#3D2314] text-white shadow-sm'
                  : 'text-[#614231] hover:text-[#3D2314] hover:bg-[#FAF5EC]'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-[#C59B27]" />
              <span>Baking Classes</span>
            </button>

            <button
              type="button"
              id="enquiry-tab-combo"
              onClick={() => {
                setActiveTab('combo');
                setValidationError(null);
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'combo'
                  ? 'bg-[#3D2314] text-white shadow-sm'
                  : 'text-[#614231] hover:text-[#3D2314] hover:bg-[#FAF5EC]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Decor + Cake Combo</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Form on Left (7 cols), Live Preview & Dispatch on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Container */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE0D3] shadow-sm">
            
            {/* Validation Notice Banner */}
            {validationError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <div>
                  <span className="font-bold">Missing Information: </span>
                  {validationError}
                </div>
              </div>
            )}

            <form onSubmit={handleSendWhatsApp} className="space-y-6">
              
              {/* SECTION 1: Client Contact */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C59B27] mb-3 flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>1. Contact Details</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                      Your Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="enquiry-input-name"
                      type="text"
                      required
                      placeholder="e.g. Grace Agada"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                      WhatsApp / Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="enquiry-input-phone"
                      type="tel"
                      required
                      placeholder="e.g. 08060349174"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: EVENT DECORATIONS / COMBO SPECIFICS */}
              {(activeTab === 'decor' || activeTab === 'combo') && (
                <div className="pt-4 border-t border-[#F0E6D9] space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#C59B27] mb-3 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>2. Event Date, Timing & Location Details</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Event Type */}
                    <div>
                      <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                        Celebration / Event Type
                      </label>
                      <select
                        id="enquiry-select-event-type"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                      >
                        <option value="Birthday Celebration">Birthday Celebration</option>
                        <option value="Wedding / Traditional Marriage">Wedding / Traditional Marriage</option>
                        <option value="Anniversary Celebration">Anniversary Celebration</option>
                        <option value="Child Dedication / Naming">Child Dedication / Naming</option>
                        <option value="Corporate Event / Gala / Dinner">Corporate Event / Gala / Dinner</option>
                        <option value="Church Programme / Convention">Church Programme / Convention</option>
                        <option value="Graduation / Send-off Party">Graduation / Send-off Party</option>
                        <option value="Funeral / Memorial Reception">Funeral / Memorial Reception</option>
                        <option value="Surprise Party">Surprise Party</option>
                        <option value="Other">Other (Specify below)</option>
                      </select>
                    </div>

                    {/* Custom event type if other */}
                    {eventType === 'Other' && (
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                          Specify Event Type
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Milestone Jubilee or Product Launch"
                          value={customEventType}
                          onChange={(e) => setCustomEventType(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:outline-none"
                        />
                      </div>
                    )}

                    {/* Event Date */}
                    <div>
                      <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                        Event Date <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="enquiry-input-event-date"
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Event Setup Time */}
                    <div>
                      <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                        Setup & Start Time
                      </label>
                      <select
                        value={eventSetupTime}
                        onChange={(e) => setEventSetupTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                      >
                        <option value="Morning (8:00 AM Setup / 11:00 AM Event)">Morning (8:00 AM Setup / 11:00 AM Event)</option>
                        <option value="Afternoon (12:00 PM Setup / 2:00 PM Event)">Afternoon (12:00 PM Setup / 2:00 PM Event)</option>
                        <option value="Evening (3:00 PM Setup / 5:00 PM Event)">Evening (3:00 PM Setup / 5:00 PM Event)</option>
                        <option value="Previous Day Setup Requested">Previous Day Setup Requested</option>
                      </select>
                    </div>

                    {/* Venue Type */}
                    <div>
                      <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                        Venue Environment
                      </label>
                      <select
                        value={venueType}
                        onChange={(e) => setVenueType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                      >
                        <option value="Indoor Event Hall">Indoor Event Hall</option>
                        <option value="Outdoor Canopy / Open Field">Outdoor Canopy / Open Field</option>
                        <option value="Church Auditorium / Sanctuary">Church Auditorium / Sanctuary</option>
                        <option value="Private Residence / Compound">Private Residence / Compound</option>
                        <option value="Hotel Banquet Space">Hotel Banquet Space</option>
                      </select>
                    </div>

                    {/* Venue Location Address (Otukpo focus) */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#3D2314] mb-1.5 flex items-center justify-between">
                        <span>Event Venue / Address in or around Otukpo <span className="text-rose-600">*</span></span>
                        <span className="text-[11px] text-[#7A5843] font-normal">Otukpo Delivery/Setup Area</span>
                      </label>
                      <input
                        id="enquiry-input-venue"
                        type="text"
                        required
                        placeholder="e.g. Jesus College Hall, Otukpo Town Hall, Double K, Residence in Eupi / Sabon Gari..."
                        value={venueAddress}
                        onChange={(e) => setVenueAddress(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Guest Count */}
                    <div>
                      <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                        Estimated Guest Count
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                      >
                        <option value="Intimate (Under 50 guests)">Intimate (Under 50 guests)</option>
                        <option value="50 - 150 guests">50 - 150 guests</option>
                        <option value="150 - 300 guests">150 - 300 guests</option>
                        <option value="300 - 500 guests">300 - 500 guests</option>
                        <option value="500+ Mega Celebration">500+ Mega Celebration</option>
                      </select>
                    </div>

                    {/* Theme / Palette */}
                    <div>
                      <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                        Theme Colors (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Emerald Green & Gold, Blush & Rose Gold"
                        value={colorTheme}
                        onChange={(e) => setColorTheme(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Combo Add-on specifics */}
                  {activeTab === 'combo' && (
                    <div className="p-4 rounded-2xl bg-[#FAF5EC] border border-[#EAE0D3] space-y-3">
                      <div className="flex items-center gap-2 text-[#3D2314] font-bold text-xs">
                        <Cake className="w-4 h-4 text-[#C59B27]" />
                        <span>Included Cake & Pastry Specifications</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-[#3D2314] mb-1">
                            Cake Tier Size & Design
                          </label>
                          <select
                            value={comboCakeSize}
                            onChange={(e) => setComboCakeSize(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-[#D9CBBF] text-xs text-[#3D2314]"
                          >
                            <option value="Single Tier Luxury Cake (8-inch)">Single Tier Luxury Cake (8-inch)</option>
                            <option value="2-Tier Celebration Cake (6 & 8 inch)">2-Tier Celebration Cake (6 & 8 inch)</option>
                            <option value="3-Tier Grand Wedding Cake">3-Tier Grand Wedding Cake</option>
                            <option value="Custom Stepped Cake Structure">Custom Stepped Cake Structure</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-[#3D2314] mb-1">
                            Party Small Chops Platters
                          </label>
                          <select
                            value={comboSmallChopsPacks}
                            onChange={(e) => setComboSmallChopsPacks(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-[#D9CBBF] text-xs text-[#3D2314]"
                          >
                            <option value="25 Party Packs (Meat pie, samosa, spring rolls, puff puff)">25 Party Packs</option>
                            <option value="50 Party Packs">50 Party Packs</option>
                            <option value="100 Party Packs">100 Party Packs</option>
                            <option value="200+ Bulk Small Chops Catering">200+ Bulk Catering</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service Requirements Multi-Select */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-[#3D2314] mb-2 flex items-center justify-between">
                      <span>Specific Service Requirements <span className="text-rose-600">*</span></span>
                      <span className="text-[11px] text-[#7A5843] font-normal">Select all that apply</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {availableDecorServices.map((service) => {
                        const isSelected = selectedDecorServices.includes(service);
                        return (
                          <div
                            key={service}
                            onClick={() => toggleDecorService(service)}
                            className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer select-none transition-all text-xs font-medium ${
                              isSelected
                                ? 'bg-[#FCEEF1] border-[#F2AAB8] text-[#3D2314] font-semibold'
                                : 'bg-[#FAF5EC]/30 border-[#EAE0D3] text-[#614231] hover:bg-[#FAF5EC]'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                              isSelected
                                ? 'bg-[#3D2314] border-[#3D2314] text-white'
                                : 'bg-white border-[#D9CBBF]'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="leading-snug">{service}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                      Estimated Decor Budget Range (Optional)
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                    >
                      <option value="Flexible / Advise me on packages">Flexible / Advise me on packages</option>
                      <option value="Under ₦80,000 (Simple Setup / Backdrops)">Under ₦80,000 (Simple Setup / Backdrops)</option>
                      <option value="₦80,000 – ₦180,000 (Standard Hall Transformation)">₦80,000 – ₦180,000 (Standard Hall Transformation)</option>
                      <option value="₦180,000 – ₦350,000 (Premium Event Styling & Lights)">₦180,000 – ₦350,000 (Premium Event Styling & Lights)</option>
                      <option value="₦350,000+ (Luxury Wedding / Grand VIP Production)">₦350,000+ (Luxury Wedding / Grand VIP Production)</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                      Special Design Requests / Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Share inspiration, flower preferences, specific backdrop shapes, or special requirements for Otukpo venue..."
                      value={decorNotes}
                      onChange={(e) => setDecorNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* SECTION 3: BAKING CLASSES & TRAINING SPECIFICS */}
              {activeTab === 'classes' && (
                <div className="pt-4 border-t border-[#F0E6D9] space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#C59B27] mb-3 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>2. Training Program & Schedule Selection</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Course Selection */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                        Course / Workshop of Interest <span className="text-rose-600">*</span>
                      </label>
                      <select
                        id="enquiry-select-course"
                        value={courseChoice}
                        onChange={(e) => setCourseChoice(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                      >
                        <option value="Comprehensive Cake Masterclass (4 Weeks Hands-on)">
                          Comprehensive Cake Masterclass (4 Weeks Hands-on)
                        </option>
                        <option value="Small Chops & Pastries Masterclass (2 Weeks Intensive)">
                          Small Chops & Pastries Masterclass (2 Weeks Intensive)
                        </option>
                        <option value="Weekend Dessert & Cupcake Workshop (2 Days Weekend)">
                          Weekend Dessert & Cupcake Workshop (2 Days Weekend)
                        </option>
                        <option value="Custom 1-on-1 Private Mentorship (Flexible Dates)">
                          Custom 1-on-1 Private Mentorship (Flexible Dates)
                        </option>
                      </select>
                    </div>

                    {/* Target Start Date */}
                    <div>
                      <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                        Preferred Start Date <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="enquiry-input-class-date"
                        type="date"
                        required
                        value={classStartDate}
                        onChange={(e) => setClassStartDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                      />
                    </div>

                    {/* Class Schedule */}
                    <div>
                      <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                        Preferred Daily Schedule
                      </label>
                      <select
                        value={classSchedule}
                        onChange={(e) => setClassSchedule(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                      >
                        <option value="Weekday Morning (9:00 AM – 1:00 PM)">Weekday Morning (9:00 AM – 1:00 PM)</option>
                        <option value="Weekday Afternoon (2:00 PM – 6:00 PM)">Weekday Afternoon (2:00 PM – 6:00 PM)</option>
                        <option value="Weekend Intensive (Saturdays & Sundays)">Weekend Intensive (Saturdays & Sundays)</option>
                      </select>
                    </div>

                    {/* Training Venue / Location */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                        Training Venue & Location
                      </label>
                      <select
                        value={trainingVenue}
                        onChange={(e) => setTrainingVenue(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                      >
                        <option value="Bakery Studio (No. 7 Edikwu Road, Eupi, Otukpo)">
                          Bakery Studio (No. 7 Edikwu Road, behind Tonnimas, Eupi, Otukpo)
                        </option>
                        <option value="Private In-Home Coaching (Within Otukpo)">
                          Private In-Home Coaching (Within Otukpo)
                        </option>
                        <option value="Online / WhatsApp Video Consultation">
                          Online / WhatsApp Video Consultation
                        </option>
                      </select>
                    </div>

                    {/* Current Experience Level */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                        Current Baking Experience
                      </label>
                      <select
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none"
                      >
                        <option value="Complete Beginner (Never baked before)">Complete Beginner (Never baked before)</option>
                        <option value="Home Baker / Hobbyist (Knows basics, wants mastery)">Home Baker / Hobbyist (Knows basics, wants mastery)</option>
                        <option value="Commercial Baker (Upscaling sharp edges, recipes & costing)">Commercial Baker (Upscaling sharp edges, recipes & costing)</option>
                      </select>
                    </div>
                  </div>

                  {/* Skills / Modules of Interest */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-[#3D2314] mb-2 flex items-center justify-between">
                      <span>Specific Skills & Service Requirements <span className="text-rose-600">*</span></span>
                      <span className="text-[11px] text-[#7A5843] font-normal">Select key areas</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {availableClassSkills.map((skill) => {
                        const isSelected = selectedClassSkills.includes(skill);
                        return (
                          <div
                            key={skill}
                            onClick={() => toggleClassSkill(skill)}
                            className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer select-none transition-all text-xs font-medium ${
                              isSelected
                                ? 'bg-[#FCEEF1] border-[#F2AAB8] text-[#3D2314] font-semibold'
                                : 'bg-[#FAF5EC]/30 border-[#EAE0D3] text-[#614231] hover:bg-[#FAF5EC]'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-colors ${
                              isSelected
                                ? 'bg-[#3D2314] border-[#3D2314] text-white'
                                : 'bg-white border-[#D9CBBF]'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="leading-snug">{skill}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Learning Goals */}
                  <div>
                    <label className="block text-xs font-bold text-[#3D2314] mb-1.5">
                      Special Learning Goals / Inquiries
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Inquire about installment payment options, starter toolkits, or specialized wedding tier training..."
                      value={classNotes}
                      onChange={(e) => setClassNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EC]/50 border border-[#D9CBBF] text-sm text-[#3D2314] focus:ring-2 focus:ring-[#F2AAB8] focus:bg-white focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#F0E6D9] flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  id="submit-enquiry-whatsapp-btn"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>

                <button
                  type="button"
                  id="copy-enquiry-text-btn"
                  onClick={handleCopy}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-[#F4EBE1] hover:bg-[#EAE0D3] text-[#3D2314] font-semibold text-xs transition-all active:scale-95 flex items-center justify-center gap-2 border border-[#D9CBBF] cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#7A5843]" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Message Preview & Studio Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live WhatsApp Preview Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#EAE0D3] shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[#F0E6D9]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#25D366]" />
                  <span className="text-xs font-bold text-[#3D2314] uppercase tracking-wider">
                    WhatsApp Message Preview
                  </span>
                </div>
                <span className="text-[11px] text-[#7A5843] bg-[#FAF5EC] px-2 py-0.5 rounded-md border border-[#EAE0D3]">
                  Direct to 08060349174
                </span>
              </div>

              {/* Chat Bubble Simulator */}
              <div className="bg-[#EFE8DC]/40 rounded-2xl p-4 border border-[#E8DFD4] font-mono text-xs text-[#3D2314] whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto shadow-inner">
                {generateMessageText()}
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-[#7A5843]">
                <span>✓ Automatically formatted</span>
                <span>Opens WhatsApp instantly</span>
              </div>
            </div>

            {/* Otukpo Location & Service Guarantee Card */}
            <div className="bg-[#FAF5EC] rounded-3xl p-6 border border-[#E8DFD4] space-y-3.5">
              <h4 className="font-serif font-bold text-base text-[#3D2314] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C59B27]" />
                <span>Otukpo Bakery & Studio Assurance</span>
              </h4>

              <div className="space-y-2.5 text-xs text-[#614231] leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#3D2314]">On-Site Inspection in Otukpo:</strong> For large events and weddings, our lead decorator inspects your venue in advance to plan backdrops and electrical connections.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#3D2314]">100% Hands-On Training:</strong> Academy students work directly with commercial mixers, ovens, and premium ingredients at our studio behind Tonnimas Fuel Station, Eupi.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#3D2314]">Flexible Payment Milestones:</strong> Event bookings and training tuition allow installment schedules confirmed upfront on WhatsApp.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#EAE0D3] flex items-center justify-between text-xs font-semibold text-[#3D2314]">
                <span>Address:</span>
                <span className="text-[#7A5843] text-right">No. 7 Edikwu Rd, Eupi, Otukpo</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
