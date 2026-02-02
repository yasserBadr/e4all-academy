
import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Baby, 
  Award, 
  CheckCircle2, 
  MessageCircle, 
  Send, 
  X,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  Clock
} from 'lucide-react';
import { getCourseAdvice } from './services/geminiService';
import { ChatMessage, Course } from './types';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً بك في E4All Academy! كيف يمكنني مساعدتك في اختيار الدورة المناسبة اليوم؟' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages: ChatMessage[] = [...chatMessages, { role: 'user', text: userInput }];
    setChatMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    const advice = await getCourseAdvice(userInput);
    setChatMessages([...newMessages, { role: 'model', text: advice }]);
    setIsTyping(false);
  };

  const courses: Course[] = [
    {
      id: 'kids',
      title: 'الإنجليزية للأطفال',
      description: 'منهج ممتع وتفاعلي مصمم خصيصاً للصغار لبناء أساس قوي في اللغة.',
      category: 'kids',
      features: ['تعلم من خلال اللعب', 'مدرسون متخصصون', 'تقارير دورية للأهل'],
      icon: 'Baby'
    },
    {
      id: 'adults',
      title: 'الإنجليزية للكبار',
      description: 'تحسين مهارات التحدث والاستماع للعمل أو السفر أو التطوير الشخصي.',
      category: 'adults',
      features: ['تركيز على المحادثة', 'مواضيع واقعية', 'أوقات مرنة'],
      icon: 'Users'
    },
    {
      id: 'ielts',
      title: 'تحضير اختبار IELTS',
      description: 'دورة مكثفة تضمن لك الحصول على السكور المطلوب للهجرة أو الدراسة بالخارج.',
      category: 'ielts',
      features: ['استراتيجيات الحل', 'امتحانات تجريبية', 'تصحيح مهام الكتابة'],
      icon: 'Award'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-indigo-900 tracking-tighter">E4All <span className="text-indigo-600">Academy</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-reverse space-x-8 text-gray-600 font-medium">
              <a href="#home" className="hover:text-indigo-600 transition">الرئيسية</a>
              <a href="#courses" className="hover:text-indigo-600 transition">الدورات</a>
              <a href="#about" className="hover:text-indigo-600 transition">عن الأكاديمية</a>
              <a href="#contact" className="hover:text-indigo-600 transition">اتصل بنا</a>
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-700 transition hidden sm:block">
              سجل الآن
            </button>
            <button className="md:hidden text-gray-500">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-white pt-16 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-right lg:flex lg:items-center lg:justify-between gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight mb-6">
                استثمر في مستقبلك مع <span className="text-indigo-600">E4All Academy</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                نقدم برامج تعليمية متميزة للغة الإنجليزية تناسب جميع الأعمار والمستويات، من التأسيس للأطفال حتى التميز في الآيلتس.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition transform hover:-translate-y-1">
                  ابدأ رحلتك التعليمية
                </button>
                <button className="bg-white border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition">
                  تصفح الدورات
                </button>
              </div>
              
              <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-4 space-x-reverse">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${i*10}/100/100`} className="w-12 h-12 rounded-full border-4 border-white object-cover" alt="Student" />
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                    +500
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">انضم لأكثر من 500 طالب</p>
                  <p className="text-sm text-gray-500">من مختلف الفئات والأعمار</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
              <img 
                src="https://picsum.photos/seed/academy/800/600" 
                className="rounded-3xl shadow-2xl relative z-10 border-8 border-white object-cover w-full h-[400px] lg:h-[500px]" 
                alt="Academy Atmosphere" 
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 hidden md:block border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <CheckCircle2 className="text-emerald-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">اعتماد دولي</p>
                    <p className="text-xs text-gray-500">مناهج مطابقة للمعايير</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section id="courses" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900 mb-4 italic uppercase tracking-widest text-indigo-600">برامجنا التعليمية</h2>
            <p className="text-xl text-gray-600">نحن لا نعلم اللغة فقط، بل نفتح لك آفاقاً جديدة</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map(course => (
              <div key={course.id} className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition group">
                <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                  {course.id === 'kids' && <Baby className="text-indigo-600 group-hover:text-white w-8 h-8" />}
                  {course.id === 'adults' && <Users className="text-indigo-600 group-hover:text-white w-8 h-8" />}
                  {course.id === 'ielts' && <Award className="text-indigo-600 group-hover:text-white w-8 h-8" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {course.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {course.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-indigo-600" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gray-50 text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition">
                  تفاصيل الدورة
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Formats */}
      <section className="py-24 bg-indigo-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black mb-8 leading-tight">مرونة تامة في اختيار نظام الدراسة</h2>
              <div className="space-y-8">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <div className="flex gap-4">
                    <div className="bg-indigo-500/30 p-4 rounded-xl">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">جلسات فردية (Private)</h4>
                      <p className="text-indigo-100">تركيز كامل بنسبة 100% على احتياجاتك الفردية ونقاط ضعفك لضمان أسرع النتائج.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <div className="flex gap-4">
                    <div className="bg-emerald-500/30 p-4 rounded-xl">
                      <Users className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">جلسات جماعية (Group)</h4>
                      <p className="text-indigo-100">تعلم وسط بيئة تفاعلية محفزة تساعدك على ممارسة المحادثة مع أقرانك بفاعلية.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img src="https://picsum.photos/seed/learn1/400/500" className="rounded-2xl h-64 w-full object-cover shadow-2xl" alt="Learning 1" />
                <img src="https://picsum.photos/seed/learn2/400/300" className="rounded-2xl h-48 w-full object-cover shadow-2xl" alt="Learning 2" />
              </div>
              <div className="space-y-4">
                <img src="https://picsum.photos/seed/learn3/400/300" className="rounded-2xl h-48 w-full object-cover shadow-2xl" alt="Learning 3" />
                <img src="https://picsum.photos/seed/learn4/400/500" className="rounded-2xl h-64 w-full object-cover shadow-2xl" alt="Learning 4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-black text-indigo-600 mb-2">98%</p>
              <p className="text-gray-600 font-bold">نسبة نجاح الطلاب</p>
            </div>
            <div>
              <p className="text-5xl font-black text-indigo-600 mb-2">+10</p>
              <p className="text-gray-600 font-bold">سنوات خبرة</p>
            </div>
            <div>
              <p className="text-5xl font-black text-indigo-600 mb-2">1000+</p>
              <p className="text-gray-600 font-bold">ساعة تدريبية</p>
            </div>
            <div>
              <p className="text-5xl font-black text-indigo-600 mb-2">24/7</p>
              <p className="text-gray-600 font-bold">دعم تعليمي مستمر</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <BookOpen className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-white">E4All <span className="text-indigo-600">Academy</span></span>
              </div>
              <p className="text-lg leading-relaxed mb-8 max-w-md">
                نهدف لتوفير أفضل تجربة لتعلم اللغة الإنجليزية في المنطقة من خلال دمج الأساليب الحديثة مع التكنولوجيا المتقدمة.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition cursor-pointer">
                  <span className="font-bold">fb</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition cursor-pointer">
                  <span className="font-bold">ig</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition cursor-pointer">
                  <span className="font-bold">li</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-xl mb-6">اتصل بنا</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Phone className="text-indigo-500 w-5 h-5" />
                  <span>+20 123 456 789</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-indigo-500 w-5 h-5" />
                  <span>info@e4allacademy.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="text-indigo-500 w-5 h-5" />
                  <span>القاهرة، مصر</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xl mb-6">ساعات العمل</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Clock className="text-indigo-500 w-5 h-5" />
                  <span>السبت - الخميس: 10 ص - 10 م</span>
                </li>
                <li className="text-gray-500 mr-8 italic">
                  الجمعة: مغلق
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} E4All Academy. جميع الحقوق محفوظة. تصميم وتطوير بواسطة فريقنا التقني.
          </div>
        </div>
      </footer>

      {/* AI Chat Bot Button */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 left-6 bg-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50 flex items-center gap-2 group"
      >
        <MessageCircle size={24} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap">
          مستشارك الذكي
        </span>
      </button>

      {/* AI Chat Dialog */}
      {isChatOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:left-6 sm:w-[400px] bg-white sm:rounded-3xl shadow-2xl z-[60] flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-5">
          {/* Chat Header */}
          <div className="bg-indigo-600 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <GraduationCap />
              </div>
              <div>
                <h3 className="font-bold">مستشار E4All الذكي</h3>
                <p className="text-xs text-indigo-100">متاح دائماً لمساعدتك</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-2 rounded-lg transition">
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50 h-[400px]">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="اسألني عن الدورات أو المستويات..."
                className="flex-1 bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isTyping}
                className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:bg-indigo-300 transition"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
