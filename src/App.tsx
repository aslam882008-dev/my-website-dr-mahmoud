/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  User, 
  Star, 
  ChevronRight, 
  ArrowLeft, 
  Scissors, 
  Activity, 
  CheckCircle2, 
  Menu, 
  X,
  Instagram,
  Facebook,
  Zap,
  Target,
  Smile,
  Sparkles,
  Layers,
  ChevronDown,
  Loader2
} from 'lucide-react';

// Types
interface Branch {
  city: string;
  name: string;
  address: string;
  mapLink?: string;
}

interface Service {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

interface BeforeAfter {
  id: number;
  category: string;
  before: string;
  after: string;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Mouse position for Parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    operation: '',
    notes: ''
  });

  const [assessmentForm, setAssessmentForm] = useState({
    height: '',
    weight: '',
    age: '',
    previousPregnancy: 'no',
    planningPregnancy: 'no',
    chronicDiseases: 'no'
  });

  const [assessmentResult, setAssessmentResult] = useState<{
    bmi: number;
    status: string;
    type: 'success' | 'warning' | 'danger';
    recommendations: string[];
  } | null>(null);

  const WHATSAPP_NUMBER = '201555786809';
  
  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const services: Service[] = [
    { 
      id: 1, 
      title: 'شفط الدهون', 
      icon: <Layers className="w-12 h-12" />, 
      description: 'إزالة الدهون الموضعية بدقة متناهية لنحت القوام بأحدث تقنيات الفيزر.' 
    },
    { 
      id: 2, 
      title: 'نحت القوام', 
      icon: <Target className="w-12 h-12" />, 
      description: 'إبراز تفاصيل الجسم الرياضية وتنسيق العضلات للحصول على مظهر مثالي.' 
    },
    { 
      id: 3, 
      title: 'شد البطن', 
      icon: <Zap className="w-12 h-12" />, 
      description: 'التخلص من الترهلات وشد عضلات البطن الضعيفة بعد الحمل أو فقدان الوزن.' 
    },
    { 
      id: 4, 
      title: 'شد الترهلات', 
      icon: <Sparkles className="w-12 h-12" />, 
      description: 'استعادة شباب وحيوية الجلد في مختلف مناطق الجسم بتقنيات شد متطورة.' 
    },
    { 
      id: 5, 
      title: 'تجميل الوجه', 
      icon: <Smile className="w-12 h-12" />, 
      description: 'إبراز جمال الوجه الطبيعي وإخفاء عيوب البشرة والتقدم في العمر.' 
    },
    { 
      id: 6, 
      title: 'تجميل الجسم', 
      icon: <User className="w-12 h-12" />, 
      description: 'باقة متكاملة من الحلول التجميلية لتنسيق الجسم بالكامل وتناسقه.' 
    },
  ];

  const branches: Branch[] = [
    { city: 'المنصورة', name: 'عيادات ریفريش', address: 'شارع جيهان أمام بوابة الجلاء', mapLink: 'https://maps.google.com/?q=31.040924,31.364019' },
    { city: 'القاهرة - الدقي', name: 'المساحة', address: '٦ شارع صالح سليم – المساحة – الدقي' },
    { city: 'القاهرة - المهندسين', name: 'مستشفى كايرو كلينك', address: '٤١ شارع دمشق – المهندسين', mapLink: 'https://maps.app.goo.gl/6aRLBRX4xiTFGv1UA?g_st=awb' },
  ];

  const beforeAfterImages: BeforeAfter[] = [
    { 
      id: 1, 
      category: 'نحت القوام', 
      before: 'https://lh3.googleusercontent.com/d/16bDFPNlFoWnQUnAIAh3ATo_bsx8owSW8', 
      after: 'https://lh3.googleusercontent.com/d/15Gics2b2XNs2skvpVV1YcY1O5rWGi-OJ' 
    },
    { 
      id: 2, 
      category: 'مامي ميك اوفر', 
      before: 'https://lh3.googleusercontent.com/d/19l3k2qmYWOeglKyD5tFJWlmFLvYVIYQP', 
      after: 'https://lh3.googleusercontent.com/d/1q-z2Sp7kSXSZkBykXCAQhm0Nq9Potx_Q' 
    },
  ];

  const testimonials: Testimonial[] = [
    { id: 1, name: 'أحمد م.', text: 'تجربة ممتازة مع دكتور محمود، النتيجة فاقت توقعاتي والاحترافية عالية جداً.', rating: 5 },
    { id: 2, name: 'سارة أ.', text: 'أفضل قرار اتخذته هو إجراء العملية مع الدكتور. العيادة مجهزة والتعامل راقي.', rating: 5 },
    { id: 3, name: 'محمد ع.', text: 'دكتور شاطر جداً ومتمكن من أدواته. أنصح به بشدة لكل من يبحث عن التميز.', rating: 5 },
  ];

  const faqs = [
    {
      question: "مدة التعافي من عملية شد البطن قد إيه؟",
      answer: "تبدأ فترة التعافي الأولية من حوالي 10 أيام، ويمكن العودة للأنشطة اليومية الخفيفة تدريجيًا، بينما يكتمل التعافي خلال عدة أسابيع حسب طبيعة كل حالة والالتزام بتعليمات الطبيب."
    },
    {
      question: "هل العملية مؤلمة؟",
      answer: "العملية تتم تحت تخدير كامل، وبعدها قد يكون هناك بعض الانزعاج البسيط، ويتم التحكم فيه بسهولة باستخدام الأدوية."
    },
    {
      question: "النتيجة بتظهر امتى؟",
      answer: "النتيجة الأولية تظهر مباشرة بعد العملية، لكن الشكل النهائي يتحسن تدريجيًا خلال 3 إلى 6 شهور."
    },
    {
      question: "هل في ندبات؟",
      answer: "يوجد جرح بسيط يتم وضعه في أماكن غير ظاهرة قدر الإمكان، ويخف تدريجيًا مع الوقت باستخدام العناية المناسبة."
    },
    {
      question: "هل النتيجة دائمة؟",
      answer: "النتائج تدوم لفترات طويلة جدًا مع الحفاظ على وزن ثابت ونمط حياة صحي."
    },
    {
      question: "امتى أقدر أرجع الشغل؟",
      answer: "غالبًا يمكن العودة للعمل المكتبي بعد 10 إلى 14 يوم، حسب طبيعة العمل والحالة."
    },
    {
      question: "هل العملية آمنة؟",
      answer: "آمنة جدًا عند إجرائها على يد طبيب متخصص وفي مكان مجهز بالكامل."
    }
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `طلب حجز جديد:
الاسم: ${bookingForm.name}
الرقم: ${bookingForm.phone}
العملية: ${bookingForm.operation}
ملاحظات: ${bookingForm.notes || 'لا يوجد'}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    setSubmitStatus('success');
    setBookingForm({ name: '', phone: '', operation: '', notes: '' });
  };

  const handleAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    const h = parseFloat(assessmentForm.height) / 100;
    const w = parseFloat(assessmentForm.weight);
    if (!h || !w) return;

    const bmi = parseFloat((w / (h * h)).toFixed(1));
    let status = '';
    let type: 'success' | 'warning' | 'danger' = 'success';
    let recommendations: string[] = [];

    // RED CASE: BMI > 35 OR Planning Pregnancy OR Chronic Diseases
    if (bmi > 35 || assessmentForm.planningPregnancy === 'yes' || assessmentForm.chronicDiseases === 'yes') {
      status = 'العملية غير مناسبة حاليًا';
      type = 'danger';
      recommendations = ['يفضل تأجيل العملية أو البدء بخطة علاجية'];
    } 
    // GREEN CASE: BMI 18.5 - 30 AND No Chronic AND No planning pregnancy
    else if (bmi >= 18.5 && bmi <= 30 && assessmentForm.chronicDiseases === 'no' && assessmentForm.planningPregnancy === 'no') {
      status = 'حالتك مناسبة لعمليات التجميل';
      type = 'success';
      recommendations = ['نحت القوام', 'شفط الدهون', 'شد الجسم'];
    }
    // YELLOW CASE: BMI 30 - 35 OR minor issues (implicitly covered by else)
    else {
      status = 'حالتك تحتاج تقييم طبي دقيق';
      type = 'warning';
      recommendations = ['يُنصح بحجز استشارة لتحديد الإجراء الأنسب بدقة'];
    }

    setAssessmentResult({ bmi, status, type, recommendations });
  };

  return (
    <div className="bg-brand-white min-h-screen selection:bg-brand-gold/30">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-gold z-[200] origin-right"
        style={{ scaleX }}
      />
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-[100] bg-brand-blue/90 backdrop-blur-md shadow-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <img 
                src="https://lh3.googleusercontent.com/d/1tmTh3ZEVPlfAnkeD0qbvHKCsOHYbVlea" 
                alt="د. محمود الشيوي" 
                className="w-14 h-14 object-contain shadow-xl rounded-full bg-white/10 p-1"
                referrerPolicy="no-referrer"
              />
              <div className="hidden sm:block">
                <span className="text-white font-display text-xl block leading-none">د. محمود الشيوي</span>
                <span className="text-brand-accent text-xs font-medium">استشاري جراحة التجميل وتنسيق القوام</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-reverse space-x-8">
              <a href="#home" className="text-white hover:text-brand-accent transition-colors font-medium">الرئيسية</a>
              <a href="#about" className="text-white hover:text-brand-accent transition-colors font-medium">عن الدكتور</a>
              <a href="#services" className="text-white hover:text-brand-accent transition-colors font-medium">خدماتنا</a>
              <a href="#results" className="text-white hover:text-brand-accent transition-colors font-medium">النتائج</a>
              <button 
                onClick={() => {
                  const el = document.getElementById('assessment-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="text-white hover:text-brand-accent transition-colors font-medium"
              >
                تقييم حالتك
              </button>
              <a href="#faq" className="text-white hover:text-brand-accent transition-colors font-medium">أسئلة شائعة</a>
              <a href="#contact" className="text-white hover:text-brand-accent transition-colors font-medium">اتصل بنا</a>
              <a href="#booking" className="luxury-button px-6 py-2 shadow-none hover:shadow-brand-accent/20">احجز الآن</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-brand-blue border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 text-right">
                <a href="#home" onClick={() => setIsMenuOpen(false)} className="block w-full text-right px-3 py-4 text-white hover:bg-white/10 rounded-lg">الرئيسية</a>
                <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-white hover:bg-white/10 rounded-lg">عن الدكتور</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-white hover:bg-white/10 rounded-lg">خدماتنا</a>
                <a href="#results" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-white hover:bg-white/10 rounded-lg">النتائج</a>
                <button 
                  onClick={() => {
                    const el = document.getElementById('assessment-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                      setIsMenuOpen(false);
                    }
                  }} 
                  className="block w-full text-right px-3 py-4 text-white hover:bg-white/10 rounded-lg"
                >
                  تقييم حالتك
                </button>
                <a href="#faq" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-white hover:bg-white/10 rounded-lg">أسئلة شائعة</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-4 text-white hover:bg-white/10 rounded-lg">اتصل بنا</a>
                <div className="pt-4">
                  <a href="#booking" onClick={() => setIsMenuOpen(false)} className="luxury-button w-full text-center py-4">احجز استشارتك الآن</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - Modern 3D/Glass UI */}
      <section id="home" className="relative min-h-screen pt-20 flex flex-col lg:flex-row overflow-hidden bg-white">
        {/* Floating 3D Orbs/Background Elements */}
        <motion.div 
          animate={{ x: mousePos.x, y: mousePos.y }}
          className="absolute top-20 left-10 w-64 h-64 bg-brand-gold/5 rounded-full blur-[100px] -z-10 animate-pulse"
        ></motion.div>
        <motion.div 
          animate={{ x: -mousePos.x, y: -mousePos.y }}
          className="absolute bottom-20 right-1/2 w-96 h-96 bg-brand-blue/5 rounded-full blur-[120px] -z-10"
        ></motion.div>

        {/* 3D Floating Shapes */}
        <motion.div 
          animate={{ rotate: 360, y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-[15%] w-12 h-12 border-2 border-brand-gold/10 rounded-xl -z-5"
        ></motion.div>
        <motion.div 
          animate={{ rotate: -360, y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-40 left-[10%] w-20 h-20 border-2 border-brand-blue/10 rounded-full -z-5"
        ></motion.div>

        {/* Left Side: Modern Content Pane */}
        <aside className="lg:w-[540px] px-6 py-12 md:p-12 lg:p-20 flex flex-col justify-center relative z-10">
          <div className="space-y-10">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="editorial-badge">مستقبل الطب التجميلي</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-brand-blue leading-tight tracking-tight">
                نصمم <span className="gradient-text">الجمال</span> <br /> بدقة العلم
              </h1>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-md font-light">
                استمتع بتجربة تحول فريدة مع دكتور محمود الشيوي، حيث نجمع بين التقنيات 3D المتطورة واللمسة الفنية المبدعة.
              </p>
            </motion.div>

            {/* Professional Booking Card */}
            <motion.div 
              id="booking-card"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white rounded-[40px] p-6 md:p-10 lg:p-14 shadow-[0_40px_80px_-15px_rgba(10,31,61,0.1)] border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <h3 className="text-3xl font-display text-brand-blue mb-10 relative z-10 text-center">احجز استشارتك الآن</h3>
              
              <form onSubmit={handleBooking} className="space-y-6 relative z-10">
                {submitStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-brand-gold/10 border border-brand-gold/20 rounded-3xl text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-brand-gold text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <CheckCircle2 size={32} />
                    </div>
                    <h4 className="text-2xl font-display text-brand-blue">تم إرسال طلبك!</h4>
                    <p className="text-gray-600 font-light italic text-lg leading-relaxed">
                      "تم إرسال طلبك بنجاح، وسيتم التواصل معك قريبًا"
                    </p>
                    <button 
                      type="button"
                      onClick={() => setSubmitStatus('idle')}
                      className="text-brand-gold font-bold hover:underline pt-4"
                    >
                      إرسال طلب آخر
                    </button>
                  </motion.div>
                ) : (
                  <>
                  {/* الاسم */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-blue/60 mr-1">الاسم بالكامل</label>
                    <input 
                      required
                      type="text" 
                      placeholder="الاسم بالكامل"
                      className="w-full px-6 py-5 bg-brand-white border border-brand-beige/30 rounded-2xl text-brand-blue placeholder:text-brand-blue/30 focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    />
                  </div>

                  {/* الموبايل */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-blue/60 mr-1">رقم الهاتف</label>
                    <div className="relative">
                      <input 
                        required
                        type="tel" 
                        placeholder="رقم الهاتف"
                        className={`w-full px-6 py-5 bg-brand-white border rounded-2xl text-brand-blue placeholder:text-brand-blue/30 focus:outline-none focus:ring-4 focus:ring-brand-blue/5 transition-all ${
                          /^01[0125][0-9]{8}$/.test(bookingForm.phone) 
                            ? 'border-green-500 focus:border-green-500' 
                            : 'border-brand-beige/30 focus:border-brand-blue'
                        }`}
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      />
                      <AnimatePresence>
                        {/^01[0125][0-9]{8}$/.test(bookingForm.phone) && (
                          <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-green-500"
                          >
                            <CheckCircle2 size={24} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* نوع العملية */}
                  <div className="space-y-2 relative">
                    <label className="text-sm font-bold text-brand-blue/60 mr-1">اختر نوع العملية</label>
                    <div className="relative">
                      <select 
                        required
                        className="w-full px-6 py-5 bg-brand-white border border-brand-beige/30 rounded-2xl text-brand-blue focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 appearance-none cursor-pointer pr-12"
                        value={bookingForm.operation}
                        onChange={(e) => setBookingForm({...bookingForm, operation: e.target.value})}
                      >
                        <option value="" disabled>اختر نوع العملية</option>
                        <option value="شفط الدهون">شفط الدهون</option>
                        <option value="نحت الجسم (نحت القوام)">نحت الجسم (نحت القوام)</option>
                        <option value="شد البطن">شد البطن</option>
                        <option value="شد الذراعين">شد الذراعين</option>
                        <option value="شد الفخذين">شد الفخذين</option>
                        <option value="شد الترهلات">شد الترهلات</option>
                        <option value="تكبير الثدي">تكبير الثدي</option>
                        <option value="تصغير الثدي">تصغير الثدي</option>
                        <option value="شد الثدي">شد الثدي</option>
                        <option value="تجميل الأنف">تجميل الأنف</option>
                        <option value="شد الوجه">شد الوجه</option>
                        <option value="شد الجفون">شد الجفون</option>
                        <option value="فيلر وبوتوكس">فيلر وبوتوكس</option>
                        <option value="تجميل الجسم بعد فقدان الوزن">تجميل الجسم بعد فقدان الوزن</option>
                        <option value="أخرى">أخرى</option>
                      </select>
                      <ChevronDown className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold pointer-events-none w-5 h-5" />
                    </div>
                  </div>

                  {/* الملاحظات */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-blue/60 mr-1">ملاحظات إضافية (اختياري)</label>
                    <textarea 
                      rows={3}
                      placeholder="اكتب ملاحظاتك (اختياري)"
                      className="w-full px-6 py-5 bg-brand-white border border-brand-beige/30 rounded-2xl text-brand-blue placeholder:text-brand-blue/30 focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all resize-none"
                      value={bookingForm.notes}
                      onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <p className="text-red-500 text-sm text-center font-bold">حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.</p>
                  )}

                  {/* الزرار */}
                  <motion.button 
                    type="submit" 
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(196, 164, 132, 0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ 
                      boxShadow: ["0 0 0px rgba(196, 164, 132, 0)", "0 0 15px rgba(196, 164, 132, 0.3)", "0 0 0px rgba(196, 164, 132, 0)"] 
                    }}
                    transition={{ 
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                    className="w-full py-6 bg-gradient-to-r from-brand-gold to-brand-beige text-white md:text-brand-blue rounded-2xl font-bold text-xl shadow-lg transition-all flex items-center justify-center gap-3 mt-4 overflow-hidden relative group"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      إرسال الطلب عبر واتساب
                      <MessageCircle size={26} />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </motion.button>
                  </>
                )}
              </form>
            </motion.div>
          </div>
        </aside>

        {/* Right Side: Hero Pane with Professional Visuals */}
        <main className="flex-1 relative min-h-[500px] md:min-h-[600px] lg:min-h-screen">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://lh3.googleusercontent.com/d/1u73z4g82HklQxUdK30ipjMsB1qi6XIdb" 
              alt="دكتور محمود الشيوي" 
              className="w-full h-full object-cover object-top lg:object-center"
              referrerPolicy="no-referrer"
            />
            {/* Modern Glass Overlays */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
            <div className="absolute inset-x-0 top-0 h-1/4 lg:hidden bg-gradient-to-b from-white to-transparent"></div>
            <div className="absolute inset-y-0 left-0 w-1/3 hidden lg:block bg-gradient-to-r from-white to-transparent"></div>
            
            {/* 3D Floating Elements Simulation */}
            <div className="absolute top-1/4 right-10 w-24 h-24 bg-brand-gold/20 rounded-3xl blur-xl animate-bounce"></div>
            <div className="absolute bottom-1/3 left-10 w-16 h-16 bg-brand-blue/20 rounded-full blur-xl animate-pulse"></div>
          </div>

          <div className="absolute bottom-20 left-10 right-10 z-10 lg:pl-10">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="modern-3d-card max-w-xl p-8 md:p-10 bg-white/80 backdrop-blur-xl border border-white/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-1 bg-brand-gold rounded-full"></div>
                <span className="text-brand-gold font-bold tracking-widest uppercase text-xs md:text-sm">استشاري جراحة التجميل وتنسيق القوام</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display text-brand-blue mb-4">د. محمود الشيوي</h2>
              <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed">
                نحن لا نسعى فقط لتغيير المظهر، بل لإعادة بناء الثقة عبر نتائج طبية مبنية على أحدث الأبحاث العلمية والمعايير العالمية في دبي ومصر.
              </p>
            </motion.div>
          </div>
        </main>
      </section>

      {/* About Section - Modern Minimalist */}
      <section id="about" className="py-32 bg-white relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative rounded-[40px] overflow-hidden shadow-2xl group"
            >
              <img 
                src="https://lh3.googleusercontent.com/d/1ePwRaGitH8-EpJ-W7ay7NDKT5D7W5Pd4" 
                alt="دكتور محمود الشيوي - جراحة التجميل" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 p-6 glass-card rounded-2xl">
                <p className="text-white font-bold text-lg">دقة طبية برؤية فنية</p>
              </div>
            </motion.div>

            <div className="space-y-10">
              <div className="space-y-6">
                <span className="editorial-badge">خبرة تتحدث عن نفسها</span>
                <h2 className="text-4xl md:text-6xl font-display text-brand-blue leading-tight">الجمع بين <span className="gradient-text italic">العلم والفن</span></h2>
              </div>
              
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
                يعتبر الدكتور محمود الشيوي أحد أبرز جراحي التجميل المتخصصين في نحت وتنسيق القوام. نعتمد على أدوات تشخيصية ثلاثية الأبعاد وتقنيات جراحية هي الأكثر أماناً وفعالية عالمياً لضمان نتائج طبيعية ومستدامة.
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-brand-blue font-medium">
                <li className="flex items-center gap-3 bg-brand-white p-4 rounded-xl border border-brand-gold/10">
                  <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                  <span>استشاري جراحة التجميل</span>
                </li>
                <li className="flex items-center gap-3 bg-brand-white p-4 rounded-xl border border-brand-gold/10">
                  <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                  <span>ماجستير الجراحه جامعة المنصورة</span>
                </li>
                <li className="flex items-center gap-3 bg-brand-white p-4 rounded-xl border border-brand-gold/10">
                  <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                  <span>دكتوراة جراحة التجميل وتنسيق القوام جامعة المنصورة</span>
                </li>
                <li className="flex items-center gap-3 bg-brand-white p-4 rounded-xl border border-brand-gold/10">
                  <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                  <span>دبلومة الليزر المعهد القومي لليزر جامعة القاهره</span>
                </li>
              </ul>

              <div className="grid grid-cols-2 gap-6 md:gap-10">
                <div className="p-6 md:p-8 rounded-[32px] bg-brand-white border border-brand-blue/5 shadow-sm">
                  <div className="text-4xl md:text-5xl font-display text-brand-blue mb-2">10+</div>
                  <div className="text-[10px] md:text-sm font-bold tracking-widest text-gray-400 uppercase">عاماً من التميز</div>
                </div>
                <div className="p-6 md:p-8 rounded-[32px] bg-brand-white border border-brand-blue/5 shadow-sm">
                  <div className="text-4xl md:text-5xl font-display text-brand-blue mb-2">500+</div>
                  <div className="text-[10px] md:text-sm font-bold tracking-widest text-gray-400 uppercase">حالة ناجحة</div>
                </div>
              </div>

              <div className="pt-6">
                 <a href="#booking" className="luxury-button">احجز موعدك الخاص الآن</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Modern 3D Cards */}
      <section id="services" className="py-32 bg-brand-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24 space-y-6">
            <span className="editorial-badge">خدماتنا المتميزة</span>
            <h2 className="text-4xl md:text-6xl font-display text-brand-blue leading-tight">تخصصات <span className="gradient-text">عالمية</span> بأيدي مصرية</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg md:text-xl font-light">
              نقدم لك باقة متكاملة من الخدمات التجميلية المصممة بعناية فائقة لتلبية كافة تطلعاتك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ 
                  rotateY: 10, 
                  rotateX: -5,
                  translateY: -10,
                  shadow: "0 25px 50px -12px rgba(10, 31, 61, 0.25)" 
                }}
                style={{ perspective: 1000 }}
                className="modern-3d-card group bg-white shadow-xl transition-all duration-300 transform-gpu cursor-default"
              >
                <div className="soft-3d-icon w-24 h-24 mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <div className="text-brand-blue drop-shadow-lg">
                    {service.icon}
                  </div>
                </div>
                <h4 className="text-3xl font-display text-brand-blue mb-6">{service.title}</h4>
                <p className="text-gray-500 leading-relaxed text-lg font-light mb-8">
                  {service.description}
                </p>
                
                {/* Visual Overlay Placeholder/Glass effect */}
                <div className="h-32 rounded-2xl bg-gradient-to-br from-brand-blue/5 to-brand-gold/5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <Sparkles className="absolute -bottom-4 -right-4 w-20 h-20 text-brand-gold/10 rotate-12" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section - Modern Slider Style */}
      <section id="results" className="py-32 bg-brand-blue relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <span className="editorial-badge !border-white/20 !text-brand-beige">النتائج الواقعية</span>
              <h3 className="text-4xl md:text-6xl font-display text-white leading-tight">سحر التحول <br /> <span className="gradient-text">بلمسة علمية</span></h3>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed font-light">
                نحن لا نبيع الوعود، بل نقدم نتائج ملموسة. شاهد تحولات حقيقية لمرضانا الذين استعادوا ثقتهم بأنفسهم عبر إجراءات دقيقة ونتائج طبيعية تماماً.
              </p>
              
              <div className="grid grid-cols-2 gap-6 md:gap-10">
                <div className="glass-card p-6 md:p-8 rounded-[32px]">
                  <div className="text-4xl md:text-5xl font-display text-brand-beige mb-2">+500</div>
                  <div className="text-[10px] md:text-xs font-bold tracking-widest text-white/40 uppercase">قصة نجاح</div>
                </div>
                <div className="glass-card p-6 md:p-8 rounded-[32px]">
                  <div className="text-4xl md:text-5xl font-display text-brand-beige mb-2">100%</div>
                  <div className="text-[10px] md:text-xs font-bold tracking-widest text-white/40 uppercase">دقة وأمان</div>
                </div>
              </div>
              <div className="pt-6">
                <a href="#booking" className="luxury-button !bg-white !text-brand-blue hover:!bg-brand-gold transition-all">استشرنا بخصوص حالتك</a>
              </div>
            </motion.div>

            <div className="relative mt-12 lg:mt-0">
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                {beforeAfterImages.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    {/* Before Image */}
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 }}
                      className="modern-3d-card !p-0 overflow-hidden shadow-2xl"
                    >
                      <img 
                        src={item.before} 
                        alt={`Before ${item.category}`} 
                        className="w-full aspect-[3/4] object-cover grayscale brightness-75" 
                        referrerPolicy="no-referrer" 
                      />
                      <div className="absolute bottom-6 inset-x-6">
                        <div className="glass-card !bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl inline-block">
                          <span className="text-white text-xs font-bold tracking-tighter uppercase">
                            قبل {item.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* After Image */}
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 + 0.1 }}
                      className="modern-3d-card !p-0 overflow-hidden shadow-2xl mt-12"
                    >
                      <img 
                        src={item.after} 
                        alt={`After ${item.category}`} 
                        className="w-full aspect-[3/4] object-cover" 
                        referrerPolicy="no-referrer" 
                      />
                      <div className="absolute bottom-6 inset-x-6">
                        <div className="glass-card !bg-brand-gold/60 backdrop-blur-md px-6 py-3 rounded-2xl inline-block">
                          <span className="text-white text-xs font-bold tracking-tighter uppercase">
                            بعد النتيجة
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Section - Intelligent Tool */}
      <section id="assessment-section" className="py-32 bg-brand-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="modern-3d-card !bg-brand-blue p-8 md:p-16 text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <header className="text-center mb-12 space-y-4">
                  <span className="editorial-badge !border-white/20 !text-brand-gold">تقييم ذكي</span>
                  <h2 className="text-4xl md:text-5xl font-display">قيم حالتك <span className="gradient-text italic">في ثوانٍ</span></h2>
                  <p className="text-white/60 text-lg font-light max-w-2xl mx-auto italic">
                    "هذا التقييم مبدئي ولا يغني عن استشارة الطبيب"
                  </p>
                </header>

                {!assessmentResult ? (
                  <form onSubmit={handleAssessment} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-sm font-bold tracking-widest text-brand-gold uppercase flex items-center gap-2 italic">الطول (سم)</label>
                        <input 
                          type="number" required placeholder="مثال: 170"
                          value={assessmentForm.height}
                          onChange={(e) => setAssessmentForm({...assessmentForm, height: e.target.value})}
                          className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-4 text-white focus:border-brand-gold outline-none"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold tracking-widest text-brand-gold uppercase flex items-center gap-2 italic">الوزن (كجم)</label>
                        <input 
                          type="number" required placeholder="مثال: 75"
                          value={assessmentForm.weight}
                          onChange={(e) => setAssessmentForm({...assessmentForm, weight: e.target.value})}
                          className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-4 text-white focus:border-brand-gold outline-none"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold tracking-widest text-brand-gold uppercase flex items-center gap-2 italic">العمر</label>
                        <input 
                          type="number" required placeholder="مثال: 30"
                          value={assessmentForm.age}
                          onChange={(e) => setAssessmentForm({...assessmentForm, age: e.target.value})}
                          className="w-full bg-white/5 border border-white/20 rounded-2xl px-6 py-4 text-white focus:border-brand-gold outline-none"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold tracking-widest text-brand-gold uppercase block italic">هل سبق لكِ الحمل؟</label>
                        <div className="flex gap-4">
                          <button 
                            type="button" onClick={() => setAssessmentForm({...assessmentForm, previousPregnancy: 'yes'})}
                            className={`flex-1 py-4 rounded-xl border transition-all ${assessmentForm.previousPregnancy === 'yes' ? 'bg-brand-gold border-brand-gold text-brand-blue' : 'bg-white/5 border-white/10'}`}
                          >نعم</button>
                          <button 
                            type="button" onClick={() => setAssessmentForm({...assessmentForm, previousPregnancy: 'no'})}
                            className={`flex-1 py-4 rounded-xl border transition-all ${assessmentForm.previousPregnancy === 'no' ? 'bg-brand-gold border-brand-gold text-brand-blue' : 'bg-white/5 border-white/10'}`}
                          >لا</button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold tracking-widest text-brand-gold uppercase block italic">هل تخططين للحمل قريبًا؟</label>
                        <div className="flex gap-4">
                          <button 
                            type="button" onClick={() => setAssessmentForm({...assessmentForm, planningPregnancy: 'yes'})}
                            className={`flex-1 py-4 rounded-xl border transition-all ${assessmentForm.planningPregnancy === 'yes' ? 'bg-brand-gold border-brand-gold text-brand-blue' : 'bg-white/5 border-white/10'}`}
                          >نعم</button>
                          <button 
                            type="button" onClick={() => setAssessmentForm({...assessmentForm, planningPregnancy: 'no'})}
                            className={`flex-1 py-4 rounded-xl border transition-all ${assessmentForm.planningPregnancy === 'no' ? 'bg-brand-gold border-brand-gold text-brand-blue' : 'bg-white/5 border-white/10'}`}
                          >لا</button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold tracking-widest text-brand-gold uppercase block italic">هل تعاني من أمراض مزمنة؟</label>
                        <div className="flex gap-4">
                          <button 
                            type="button" onClick={() => setAssessmentForm({...assessmentForm, chronicDiseases: 'yes'})}
                            className={`flex-1 py-4 rounded-xl border transition-all ${assessmentForm.chronicDiseases === 'yes' ? 'bg-brand-gold border-brand-gold text-brand-blue' : 'bg-white/5 border-white/10'}`}
                          >نعم</button>
                          <button 
                            type="button" onClick={() => setAssessmentForm({...assessmentForm, chronicDiseases: 'no'})}
                            className={`flex-1 py-4 rounded-xl border transition-all ${assessmentForm.chronicDiseases === 'no' ? 'bg-brand-gold border-brand-gold text-brand-blue' : 'bg-white/5 border-white/10'}`}
                          >لا</button>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="luxury-button w-full !py-4 md:!py-6 text-lg md:text-xl">تحليل حالتي الآن</button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-10"
                  >
                    <div className={`p-6 md:p-10 rounded-[40px] border-2 shadow-2xl transition-all ${
                      assessmentResult.type === 'success' ? 'bg-green-500/10 border-green-500/30' : 
                      assessmentResult.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' : 
                      'bg-red-500/10 border-red-500/30'
                    }`}>
                      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-8 md:mb-10 pb-8 md:pb-10 border-b border-white/10">
                        <div className="text-center md:text-right">
                          <h2 className={`text-3xl md:text-4xl font-display mb-2 ${
                            assessmentResult.type === 'success' ? 'text-green-400' : 
                            assessmentResult.type === 'warning' ? 'text-yellow-400' : 
                            'text-red-400'
                          }`}>{assessmentResult.status}</h2>
                          <div className="text-white/40 font-bold uppercase tracking-widest text-sm italic">مؤشر كتلة جسمك: {assessmentResult.bmi}</div>
                        </div>
                        <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center text-4xl font-display bg-white/5 shadow-inner">
                          {assessmentResult.bmi}
                        </div>
                      </div>

                      <div className="space-y-4 md:space-y-6">
                        <h4 className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4">التوصيات والنتائج:</h4>
                        {assessmentResult.recommendations.map((rec, i) => (
                          <div key={i} className="flex items-center gap-4 text-xl font-light">
                            <div className={`w-2 h-2 rounded-full ${
                              assessmentResult.type === 'success' ? 'bg-green-400' : 
                              assessmentResult.type === 'warning' ? 'bg-yellow-400' : 
                              'bg-red-400'
                            }`}></div>
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <button 
                        onClick={() => setAssessmentResult(null)}
                        className="py-4 md:py-5 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all italic"
                      >إعادة التقييم</button>
                      <button 
                        onClick={() => {
                          const el = document.getElementById('booking-card');
                          if (el) {
                            const navHeight = 80;
                            const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
                            const offsetPosition = elementPosition - navHeight - 40;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth"
                            });
                          }
                        }}
                        className="luxury-button !py-4 md:!py-5 text-center"
                      >احجز استشارة الآن</button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
        </div>
      </section>

      {/* Testimonials - Modern Cards */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24 space-y-6">
             <span className="editorial-badge">ماذا يقول عملاؤنا</span>
             <h3 className="text-4xl md:text-6xl font-display text-brand-blue">ثقة <span className="gradient-text">نعتز بها</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {testimonials.map((t, idx) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="modern-3d-card group hover:bg-brand-blue transition-all duration-500 p-6 md:p-8"
              >
                <div className="flex gap-2 mb-8">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold group-hover:fill-brand-beige group-hover:text-brand-beige" />
                  ))}
                </div>
                <p className="text-brand-blue text-2xl font-light italic mb-12 leading-relaxed group-hover:text-white transition-colors">"{t.text}"</p>
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-blue to-brand-gold text-white rounded-[20px] flex items-center justify-center font-bold text-xl shadow-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <span className="block font-bold text-brand-blue text-lg group-hover:text-white transition-colors tracking-tight">{t.name}</span>
                    <span className="text-sm text-gray-400 group-hover:text-white/40 uppercase tracking-widest font-bold">عميل مراجِع</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Interactive Accordion */}
      <section id="faq" className="py-32 bg-brand-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 space-y-6">
            <span className="editorial-badge">دليلك المعرفي</span>
            <h3 className="text-5xl md:text-6xl font-display text-brand-blue">أسئلة شائعة <span className="gradient-text italic">قبل عمليات التجميل</span></h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group rounded-[32px] overflow-hidden transition-all duration-500 border ${
                  activeFaq === idx 
                    ? 'bg-white border-brand-blue shadow-2xl' 
                    : 'bg-white/50 border-gray-100 hover:border-brand-gold/30 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-8 md:p-10 flex items-center justify-between text-right transition-colors"
                >
                  <span className={`text-xl md:text-2xl font-display transition-colors ${
                    activeFaq === idx ? 'text-brand-blue' : 'text-brand-blue/80 group-hover:text-brand-blue'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`p-3 rounded-full transition-all duration-500 ${
                    activeFaq === idx ? 'bg-brand-blue text-white rotate-180' : 'bg-brand-blue/5 text-brand-gold'
                  }`}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "circOut" }}
                    >
                      <div className="px-8 md:px-10 pb-10 border-r-4 border-brand-gold/30 mr-8 md:mr-10">
                        <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex flex-col items-center gap-6"
            >
              <p className="text-gray-400 font-medium tracking-wide">لسه عندك سؤال؟</p>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('كنت حابب أسأل عن عملية تجميل')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-button flex items-center gap-4 px-10 py-6"
              >
                تواصل معنا عبر واتساب
                <MessageCircle size={24} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Branches & Contact - Glass & 3D */}
      <section id="contact" className="py-32 bg-brand-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div className={`space-y-6 md:space-y-12`}>
              <div className="space-y-6">
                <span className="editorial-badge">شبكة فروعنا</span>
                <h3 className="text-4xl md:text-6xl font-display text-brand-blue">نحن دائماً <br /> <span className="gradient-text italic">بالقرب منك</span></h3>
              </div>
              
              <div className="space-y-6">
                {branches.map((branch, idx) => (
                  <motion.div 
                    key={idx}
                    onClick={() => setActiveBranch(idx)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 md:p-10 rounded-[32px] cursor-pointer transition-all duration-500 border-2 ${activeBranch === idx ? 'bg-brand-blue text-white border-brand-blue shadow-2xl' : 'bg-white text-brand-blue border-transparent hover:border-brand-gold/30 shadow-lg'}`}
                  >
                    <div className="flex justify-between items-center mb-6 md:mb-8">
                      <div className={`p-3 md:p-4 rounded-2xl ${activeBranch === idx ? 'bg-white/10' : 'bg-brand-blue/5'}`}>
                        <MapPin size={24} className={activeBranch === idx ? 'text-brand-gold' : 'text-brand-blue'} />
                      </div>
                      <span className={`text-[10px] md:text-xs font-bold tracking-widest uppercase px-4 md:px-5 py-2 rounded-full ${activeBranch === idx ? 'bg-brand-gold text-brand-blue' : 'bg-brand-blue/5 text-brand-gold'}`}>
                        {branch.city}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-2xl md:text-3xl font-display leading-none">{branch.name}</h4>
                      {branch.mapLink && (
                        <a 
                          href={branch.mapLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 text-sm font-bold uppercase tracking-tighter hover:underline ${activeBranch === idx ? 'text-brand-beige' : 'text-brand-gold'}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          عرض الخريطة
                          <ArrowLeft className="w-4 h-4 rotate-135" />
                        </a>
                      )}
                    </div>
                    <p className={`text-lg font-light ${activeBranch === idx ? 'text-white/60' : 'text-gray-500'}`}>
                      {branch.address}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="modern-3d-card !bg-brand-blue p-6 md:p-12 lg:p-20 text-white flex flex-col justify-center relative shadow-[0_50px_100px_rgba(10,31,61,0.3)] border-none mt-8 lg:mt-0">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px]"></div>
                <h3 className="text-4xl md:text-5xl font-display mb-10 leading-tight">تواصل <br /> <span className="gradient-text italic">بشكل مباشر</span></h3>
                <p className="text-white/60 text-xl mb-14 font-light leading-relaxed">
                  فريقنا الطبي جاهز لاستقبال استفساراتك وتقديم المشورة الأولية بكل رحابة صدر وخصوصية تامة.
                </p>
                <div className="space-y-10">
                  <a href="tel:01555786809" className="flex items-center gap-6 md:gap-8 group cursor-pointer hover:bg-white/5 p-4 -m-4 rounded-3xl transition-all">
                    <div className="w-16 h-16 md:w-20 md:h-20 glass-card !rounded-2xl flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform flex-shrink-0">
                      <Phone size={28} />
                    </div>
                    <div>
                      <div className="text-[10px] md:text-xs text-brand-gold uppercase tracking-[0.4em] font-bold mb-2">اتصل بنا</div>
                      <div className="text-2xl md:text-3xl font-display tracking-tightest">01555786809</div>
                    </div>
                  </a>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 md:gap-8 group cursor-pointer hover:bg-white/5 p-4 -m-4 rounded-3xl transition-all">
                    <div className="w-16 h-16 md:w-20 md:h-20 glass-card !rounded-2xl flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform flex-shrink-0">
                      <MessageCircle size={28} />
                    </div>
                    <div>
                      <div className="text-[10px] md:text-xs text-[#25D366] uppercase tracking-[0.4em] font-bold mb-2">استشارة سريعة</div>
                      <div className="text-2xl md:text-3xl font-display tracking-tightest">عبر الواتساب</div>
                    </div>
                  </a>
                  
                  {/* VIP Direct Line */}
                  <a href="https://wa.me/201068722848" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 md:gap-8 group relative cursor-pointer hover:bg-white/5 p-4 -m-4 rounded-3xl transition-all">
                    <div className="absolute -inset-2 bg-gradient-to-r from-brand-gold/0 via-brand-gold/20 to-brand-gold/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-brand-gold to-brand-beige !rounded-2xl flex items-center justify-center text-brand-blue shadow-lg group-hover:scale-110 transition-transform relative z-10 flex-shrink-0">
                      <User size={28} />
                    </div>
                    <div className="relative z-10">
                      <div className="text-[8px] md:text-[10px] bg-brand-gold text-brand-blue px-2 py-0.5 rounded-full inline-block font-bold mb-2 tracking-widest uppercase shadow-sm">الخط الشخصي المباشر</div>
                      <div className="text-2xl md:text-4xl font-display tracking-tightest text-brand-gold">01068722848</div>
                    </div>
                  </a>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Modern 3D/Minimal */}
      <footer className="bg-white py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-16">
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <img 
                  src="https://lh3.googleusercontent.com/d/1tmTh3ZEVPlfAnkeD0qbvHKCsOHYbVlea" 
                  alt="لوجو د. محمود الشيوي" 
                  className="w-16 h-16 object-contain shadow-2xl rounded-full bg-brand-blue/5 p-2"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-brand-blue font-display text-3xl block leading-none">د. محمود الشيوي</span>
                  <span className="text-gray-400 text-sm font-bold tracking-widest uppercase mt-2 block">استشاري جراحة التجميل وتنسيق القوام</span>
                </div>
              </div>
              <p className="text-gray-400 max-w-sm text-lg font-light leading-relaxed">
                ملتزمون بتقديم أعلى مستويات الرعاية الطبية والجمالية بأحدث ما توصل إليه الطب عالمياً.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 sm:gap-20">
              <div className="space-y-6">
                <h5 className="text-brand-blue font-bold tracking-widest uppercase text-sm">القائمة</h5>
                <div className="flex flex-col gap-4 text-gray-500 font-medium">
                  <a href="#home" className="hover:text-brand-gold transition-colors">الرئيسية</a>
                  <a href="#services" className="hover:text-brand-gold transition-colors">خدماتنا</a>
                  <a href="#results" className="hover:text-brand-gold transition-colors">النتائج</a>
                  <a href="#faq" className="hover:text-brand-gold transition-colors">الأسئلة الشائعة</a>
                </div>
              </div>
              <div className="space-y-6">
                <h5 className="text-brand-blue font-bold tracking-widest uppercase text-sm">اجتماعي</h5>
                <div className="flex flex-col gap-4 text-gray-500 font-medium">
                  <a 
                    href="https://www.instagram.com/dr.mahmoud_elshewy?igsh=MXVmNXg2MDYxYTF4eQ==" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-brand-gold transition-colors"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://www.facebook.com/share/1BG2s8TVYL/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-brand-gold transition-colors"
                  >
                    Facebook
                  </a>
                </div>
              </div>
              <div className="space-y-6">
                <h5 className="text-brand-blue font-bold tracking-widest uppercase text-sm">اتصال مباشر</h5>
                <div className="flex flex-col gap-4 text-gray-500 font-medium">
                  <a href="https://wa.me/201068722848" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors font-bold">د. محمود (شخصي)</a>
                  <a href="tel:01555786809" className="hover:text-brand-gold transition-colors font-bold">حجز المواعيد</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-gray-100 gap-8 text-center md:text-right">
            <p className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">© {new Date().getFullYear()} Dr. Mahmoud El-Shiwy. Crafted with Scientific Precision.</p>
            <div className="flex gap-10">
              <a 
                href="https://www.instagram.com/dr.mahmoud_elshewy?igsh=MXVmNXg2MDYxYTF4eQ==" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6 text-gray-300 hover:text-brand-blue transition-colors cursor-pointer" />
              </a>
              <a 
                href="https://www.facebook.com/share/1BG2s8TVYL/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6 text-gray-300 hover:text-brand-blue transition-colors cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-brand-blue px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity flex items-center shadow-lg">
          تحدث معنا الآن
        </span>
      </a>

      {/* Scroll to Top helper/indicator */}
      <div className="fixed bottom-10 left-10 z-50 pointer-events-none hidden md:block">
        <div className="h-32 w-[1px] bg-brand-blue/10 relative">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-brand-accent origin-top"
            style={{ height: '30%' }}
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}
