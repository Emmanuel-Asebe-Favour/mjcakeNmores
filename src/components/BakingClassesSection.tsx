import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Award, GraduationCap, CheckCircle2, Calendar, BookOpen, MessageCircle, Sparkles, Clock, Users } from 'lucide-react';

interface BakingClassesSectionProps {
  onNavigateToEnquiry?: () => void;
}

export const BakingClassesSection: React.FC<BakingClassesSectionProps> = ({ onNavigateToEnquiry }) => {
  const { bakeryInfo } = useBakery();
  const [courseInterest, setCourseInterest] = useState('Comprehensive Cake Masterclass');

  const courses = [
    {
      id: 'cake-masterclass',
      title: 'Comprehensive Cake Masterclass',
      level: 'Beginner to Advanced',
      duration: '4 Weeks Hands-on',
      highlights: [
        'Sponge cake engineering & moisture balancing (Vanilla, Red Velvet, Chocolate)',
        'Sharp edge fondant covering & structural tier dowelling',
        'Modern buttercream piping, textures, & palette knife floral art',
        'Baking costing, cake pricing formulas & commercial packaging',
      ],
      tag: 'Most Popular',
    },
    {
      id: 'small-chops-pastry',
      title: 'Small Chops & Pastries Masterclass',
      level: 'All Skill Levels',
      duration: '2 Weeks Intensive',
      highlights: [
        'Flaky golden Nigerian meat pie & chicken pie shortcrust pastry',
        'Crispy light samosa & spring roll folding from scratch',
        'Secret soft chewy party puff-puff and crunchy chin-chin',
        'Sausage rolls, party finger-food production & bulk event planning',
      ],
      tag: 'Fast-Track Business',
    },
    {
      id: 'weekend-crash',
      title: 'Weekend Dessert & Cupcake Workshop',
      level: 'Hobbyist & Teens',
      duration: '2 Days Weekend',
      highlights: [
        'Gourmet cupcakes & dessert box assembly',
        'Swirl piping, chocolate drips & luxury toppings',
        'Baking safety, oven temperature calibration & tools mastery',
        'Certificate of participation & take-home dessert box',
      ],
      tag: 'Weekend Special',
    },
  ];

  const handleEnrol = (courseTitle: string) => {
    const text = `*BAKING CLASS ENQUIRY - MjcakesNmore*\n` +
      `🎓 *Course:* ${courseTitle}\n` +
      `📍 *Location:* No. 7 Edikwu Road, Eupi, Otukpo\n\n` +
      `Hello! I would like to inquire about the next batch dates, timetable, tuition fee, and registration requirements for the ${courseTitle}.`;
    window.open(`https://wa.me/${bakeryInfo.whatsAppDigits}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="baking-classes" className="py-16 bg-[#FAF5EC] scroll-mt-20 border-t border-b border-[#E8DFD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCEEF1] text-[#3D2314] text-xs font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="w-4 h-4 text-[#C59B27]" />
            <span>MjcakesNmore Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2314] tracking-tight">
            Baking Classes & Cake Training
          </h2>
          <p className="mt-3 text-base text-[#614231] leading-relaxed">
            Gain real practical skills from experienced commercial bakers in Otukpo. Learn the exact trade secrets behind our beloved cakes, pies, and party small chops.
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl p-6 border border-[#EAE0D3] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FCEEF1] text-[#3D2314] border border-[#F2AAB8]">
                    {course.tag}
                  </span>
                  <span className="text-xs text-[#7A5843] font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[#3D2314] mb-2">
                  {course.title}
                </h3>
                <p className="text-xs text-[#C59B27] font-semibold mb-4">
                  Level: {course.level}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-[#F4EBE1]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#3D2314]">What You Will Master:</p>
                  {course.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#614231]">
                      <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                      <span className="leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F4EBE1] space-y-2">
                <button
                  onClick={() => handleEnrol(course.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold shadow-2xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Quick WhatsApp Enrol</span>
                </button>
                {onNavigateToEnquiry && (
                  <button
                    onClick={onNavigateToEnquiry}
                    className="w-full py-2 px-3 rounded-xl bg-[#FAF5EC] hover:bg-[#F2EAE0] text-[#3D2314] text-xs font-semibold border border-[#EAE0D3] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>Customize Training & Start Date</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Academy Highlights Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE0D3] shadow-xs max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="font-serif font-bold text-xl text-[#3D2314]">
              Train In-Person in Otukpo, Benue State
            </h4>
            <p className="text-xs sm:text-sm text-[#614231] max-w-xl">
              All ingredients, professional baking tools, ovens, aprons, and recipe guides are provided during class sessions at our bakery workshop on Edikwu Road.
            </p>
          </div>
          <a
            href={`https://wa.me/${bakeryInfo.whatsAppDigits}?text=${encodeURIComponent('Hello MjcakesNmore! I want to request the full syllabus and fee breakdown for your upcoming baking classes.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-xl bg-[#3D2314] text-[#FDFBF7] hover:bg-[#2E180A] text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            Download Class Schedule
          </a>
        </div>
      </div>
    </section>
  );
};
