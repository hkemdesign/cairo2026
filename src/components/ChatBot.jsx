import React, { useState, useRef, useEffect } from 'react';

export default function ChatBot({ budgetData, exchangeRate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      isUser: false,
      text: `أهلاً بك! أنا دليل مساعدك الذكي للتخطيط. لقد قرأت كافة تفاصيل <b>ويكي القاهرة الشامل</b> ولوحة التحكم.<br>
      يمكنك سؤالي عن:<br>
      • 🔺 منطقة الأهرامات وكيفية تفادي الاحتيال والخيالة.<br>
      • 🚗 التنقل في القاهرة (أوبر، المترو، التاكسي الأبيض).<br>
      • 🥣 المأكولات والمطاعم الشهيرة (الفول، الكشري، المشويات، السمك المشوي).<br>
      • 💳 البقشيش والفصال في خان الخليلي ومياه الشرب والوقاية.<br>
      • 📱 شراء شريحة الإنترنت والبيانات وتأشيرة المطار.<br>
      تفضل بسؤالي وسأجيبك فوراً! 🇪🇬`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const query = text.trim();
    if (!query) return;

    // Add user message
    setMessages(prev => [...prev, { isUser: true, text: query }]);
    setInputVal('');
    setIsTyping(true);

    // Simulate bot response with dynamic typing indicator
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getLocalResponse(query);
      setMessages(prev => [...prev, { isUser: false, text: botResponse }]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(inputVal);
    }
  };

  // Predefined suggestion chips
  const suggestions = [
    'الأهرامات والجمال',
    'كيف أتنقل؟',
    'أشهر أكلة شعبية',
    'نصائح الأمان',
    'ميزانية الرحلة'
  ];

  // Offline QA Search Engine based on Wiki & HTML
  const getLocalResponse = (query) => {
    query = query.trim().toLowerCase();
    
    // Remove Arabic diacritics & common letters for matching
    const cleanQuery = query
        .replace(/[أإآ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/[\u064B-\u065F]/g, ''); // Remove harakat
    
    if (cleanQuery.includes('هرم') || cleanQuery.includes('جيزه') || cleanQuery.includes('خوفو') || cleanQuery.includes('ابو الهول') || cleanQuery.includes('سقاره')) {
        return `<b>منطقة أهرامات الجيزة وأبو الهول:</b><br>
        • <b>أفضل وقت للزيارة:</b> الصباح الباكر (من الساعة 8 صباحاً) لتفادي حرارة الشمس والازدحام.<br>
        • <b>نصائح الركوب:</b> احذر من عارضي ركوب الخيل والجمال غير الرسميين (الخراتية) عند الأهرامات. اتفق على السعر مسبقاً بدقة (المتوسط الرسمي 200-300 جنيه مصري للجولة).<br>
        • <b>تذكرة الدخول:</b> التذكرة العامة للمنطقة لا تشمل الدخول لداخل الهرم الأكبر (تحتاج تذكرة منفصلة للداخل).<br>
        • <b>المتحف الكبير (GEM):</b> يقع قريباً جداً، وتأكد من حجز تذكرته مسبقاً عبر الإنترنت لمشاهدة البهو العظيم ومجموعة رمسيس.`;
    }
    
    if (cleanQuery.includes('مواصلات') || cleanQuery.includes('تنقل') || cleanQuery.includes('اوبر') || cleanQuery.includes('مترو') || cleanQuery.includes('تاكسي') || cleanQuery.includes('طريق')) {
        return `<b>دليل المواصلات والتنقل الكامل بالقاهرة:</b><br>
        • <b>تطبيقات النقل الذكي (Uber / Careem):</b> الخيار الأفضل والأكثر أماناً وموثوقية للسياح، حيث يتم تحديد السعر مسبقاً والدفع عبر الفيزا أو كاش لتجنب التفاوض مع السائقين.<br>
        • <b>مترو أنفاق القاهرة:</b> الحل السحري لتفادي الاختناقات المرورية. الخط الثالث (الخط الأخضر) يربط مصر الجديدة بالزمالك ووسط البلد وهو نظيف ومكيف بالكامل.<br>
        • <b>مجمع الأديان:</b> يمكنك الوصول إليه بسهولة ومباشرة عبر النزول في محطة مترو <i>مار جرجس</i>.<br>
        • <b>التاكسي الأبيض:</b> تأكد من تشغيل العداد دائماً قبل الانطلاق، وفي حال الرفض استعن بأوبر مباشرة.`;
    }
    
    if (cleanQuery.includes('فطور') || cleanQuery.includes('فطار') || cleanQuery.includes('طعميه') || cleanQuery.includes('فول')) {
        return `<b>وجبات الفطور والصباح الشعبية بمصر:</b><br>
        • <b>الفلافل المصرية (الطعمية):</b> تحضر من الفول المدشوش المقشر والكزبرة والخضروات مما يجعلها خفيفة وخضراء وهشة من الداخل.<br>
        • <b>الفول المدمس:</b> الفطور القومي، فول يطهى ببطء لساعات طويلة ويقدم بزيت الزيتون أو السمن البلدي والتوابل الحارة.<br>
        • <b>أشهر المطاعم الموصى بها:</b> مطعم أرابياتا، مطعم زيزو (وسط البلد)، والتابعي الدمياطي.`;
    }

    if (cleanQuery.includes('كشري') || cleanQuery.includes('ابو طارق') || cleanQuery.includes('التحرير')) {
        return `<b>الكشري المصري بالخلطة والدقة:</b><br>
        • أشهر أكلة شعبية مصرية مكونة من الأرز، المعكرونة، العدس الأسود، الحمص، والبصل المقرمش (الورد)، تضاف إليها صلصة الطماطم ودقة الخل والثوم والليمون.<br>
        • <b>أين تجربه؟</b> كشري أبو طارق (وسط البلد) أو كشري التحرير.<br>
        • <b>السعر التقريبي:</b> 40 - 90 جنيه مصري (≈ 4 - 8 ريال سعودي).`;
    }

    if (cleanQuery.includes('لحم') || cleanQuery.includes('كباب') || cleanQuery.includes('كفته') || cleanQuery.includes('مشويات') || cleanQuery.includes('صبحي كابر') || cleanQuery.includes('الرفاعي')) {
        return `<b>أطباق المشويات واللحوم المصرية:</b><br>
        • قطع من لحم الضأن المتبل والكفتة المشوية على الفحم الساخن، تقدم مع سلطة الطحينة الحامضة والخبز البلدي الساخن.<br>
        • <b>أين تجربه؟</b> مطعم صبحي كابر، مطعم الرفاعي بالسيدة زينب، وقصر الكبابجي.<br>
        • <b>السعر التقريبي:</b> 300 - 550 جنيه مصري (≈ 25 - 45 ريال سعودي).`;
    }

    if (cleanQuery.includes('ملوخيه') || cleanQuery.includes('ابو السيد')) {
        return `<b>شوربة الملوخية الخضراء بالدجاج:</b><br>
        • حساء أوراق الجوت الخضراء المفرومة المطهية بمرقة الدجاج وتضاف إليها "الطشة" الذهبية بالثوم والكزبرة والسمن البلدي.<br>
        • <b>أين تجربه؟</b> مطعم أبو السيد (الزمالك - طراز تراثي راقٍ) أو مطعم صبحي كابر.<br>
        • <b>السعر التقريبي:</b> 160 - 280 جنيه مصري (≈ 15 - 25 ريال سعودي).`;
    }

    if (cleanQuery.includes('سمك') || cleanQuery.includes('سي فود') || cleanQuery.includes('بحر') || cleanQuery.includes('صياديه') || cleanQuery.includes('بوري') || cleanQuery.includes('قدوره')) {
        return `<b>المأكولات البحرية والأسماك بالقاهرة:</b><br>
        • <b>سمك البوري المشوي بالردة:</b> سمك بوري يشوى بنخالة القمح على صاج ساخن جداً ويسقى بتتبيلة الخل والليمون والثوم.<br>
        • <b>أرز الصيادية البني:</b> أرز مطبوخ بالبصل المحمر الغامق يقدم مع سمك بلطي مقلي ومقرمش.<br>
        • <b>أشهر الأماكن الموصى بها:</b> مطاعم أسماك البرج (مدينة نصر)، قدورة للأسماك (الجيزة)، وسمكمك (المهندسين).<br>
        • <b>السعر التقريبي:</b> 100 - 280 جنيه مصري (≈ 10 - 25 ريال سعودي).`;
    }

    if (cleanQuery.includes('حلي') || cleanQuery.includes('حلويات') || cleanQuery.includes('ام علي') || cleanQuery.includes('بسبوسه') || cleanQuery.includes('العبد')) {
        return `<b>الحلويات والحلويات الشرقية بمصر:</b><br>
        • <b>أم علي:</b> طاجن دافئ من رقائق العجين المذكورة مع الحليب الساخن والمكسرات والقشطة والزبيب.<br>
        • <b>البسبوسة:</b> حلوى السميد المبللة بالقطر الدافئ والمخبوزة بالسمن البلدي.<br>
        • <b>أشهر الأماكن الموصى بها:</b> حلواني العبد بوسط البلد، حلواني المالكي، وحلواني تسيباس.<br>
        • <b>شاي النعناع:</b> لا تفوت شرب شاي بالنعناع في مقهى الفيشاوي التاريخي بخان الخليلي.`;
    }
    
    if (cleanQuery.includes('امان') || cleanQuery.includes('نصب') || cleanQuery.includes('غش') || cleanQuery.includes('احتيال') || cleanQuery.includes('بقشيش') || cleanQuery.includes('فصال') || cleanQuery.includes('اكراميه')) {
        return `<b>إرشادات الأمان وتجنب الاحتيال في القاهرة:</b><br>
        • <b>ثقافة الفصال والتفاوض:</b> في خان الخليلي والأسواق الشعبية، لا تقبل بالسعر الأول أبداً وتفاوض بلطف للحصول على نصف السعر المعروض.<br>
        • <b>ثقافة البقشيش (الإكرامية):</b> أمر معتاد للخدمات البسيطة (5-20 جنيه مصري). احتفظ دائماً بأوراق نقدية فكة للعمال وسائقي الأوبر وحاملي الحقائب.<br>
        • <b>مياه الشرب:</b> تجنب مياه الحنفية تماماً واعتمد كلياً على زجاجات المياه المعدنية المغلقة.<br>
        • <b>الخيول والجمال:</b> لا تتعامل مع الخيالة غير الرسميين عند الأهرامات لتفادي الابتزاز المالي.`;
    }

    if (cleanQuery.includes('شريحه') || cleanQuery.includes('بيانات') || cleanQuery.includes('اتصال') || cleanQuery.includes('جوال') || cleanQuery.includes('نت') || cleanQuery.includes('انترنت')) {
        return `<b>شراء شريحة البيانات المحلية:</b><br>
        • احرص على شراء شريحة اتصال محلية (Vodafone أو Orange أو WE) فور وصولك لمطار القاهرة الدولي من الأكشاك الرسمية في صالة الوصول.<br>
        • ستحتاج لجواز سفرك للتسجيل، الباقات رخيصة جداً ومهمة لتشغيل خرائط جوجل وطلب أوبر.`;
    }

    if (cleanQuery.includes('تاشيره') || cleanQuery.includes('فيزا') || cleanQuery.includes('دخول') || cleanQuery.includes('جواز')) {
        return `<b>تأشيرة الدخول المسبقة:</b><br>
        • مواطنو دول الخليج يمكنهم استخراج تأشيرة دخول فورية عند معابر مطار القاهرة بقيمة 25 دولار أمريكي نقداً، أو التقديم الإلكتروني المسبق لتسريع الدخول.`;
    }

    if (cleanQuery.includes('طقس') || cleanQuery.includes('جو') || cleanQuery.includes('سبتمبر') || cleanQuery.includes('حر') || cleanQuery.includes('برد')) {
        return `<b>الطقس والملابس في سبتمبر:</b><br>
        • يكون الطقس دافئاً نهاراً (28-32°م) ولطيفاً معتدلاً ليلاً (18-20°م).<br>
        • الملابس القطنية الخفيفة والفضفاضة هي الأنسب للمشي الطويل.<br>
        • احرص على ارتداء ملابس ساترة ومناسبة عند زيارة المساجد التراثية.`;
    }

    if (cleanQuery.includes('ميزانيه') || cleanQuery.includes('سعر') || cleanQuery.includes('فلوس') || cleanQuery.includes('تكلفه') || cleanQuery.includes('ريال')) {
        const total = budgetData.flights + budgetData.hotel + budgetData.transport + budgetData.activities + budgetData.food;
        return `<b>ميزانية الرحلة الحالية للفرد:</b> ${total.toLocaleString()} ريال سعودي (ما يعادل ${Math.round(total * exchangeRate).toLocaleString()} جنيه مصري).<br>
        يمكنك تعديل أي بند مباشرة بالضغط على زر "تعديل" الميزانية باللوحة.`;
    }

    if (cleanQuery.includes('جدول') || cleanQuery.includes('يوم') || cleanQuery.includes('برنامج') || cleanQuery.includes('خطة')) {
        return `<b>برنامج الرحلة اليومي المقسم على 6 أيام:</b><br>
        • <b>اليوم 1:</b> الوصول والاستقرار بالفندق وعشاء فلوكة نيلية.<br>
        • <b>اليوم 2:</b> أهرامات الجيزة، أبو الهول، والمتحف المصري الكبير (GEM).<br>
        • <b>اليوم 3:</b> قلعة صلاح الدين، مجمع الأديان ومتحف الحضارة، وغروب حديقة الأزهر.<br>
        • <b>اليوم 4:</b> شارع المعز، كشري أبو طارق، وبازار خان الخليلي ومقهى الفيشاوي.<br>
        • <b>اليوم 5:</b> إفطار بالزمالك، برج القاهرة، وتمشية كوبري قصر النيل.<br>
        • <b>اليوم 6:</b> شراء الحلويات والمانجو وتسجيل المغادرة للعودة.<br>
        اضغط على أي يوم في لوحة التحكم لعرض تفاصيل أنشطته وصورته الخاصة.`;
    }

    return `لم أفهم سؤالك بدقة. تفضل بسؤالي عن الأهرامات، التكلفة والميزانية، المواصلات، الأكلات الشعبية، أو نصائح الأمان في خان الخليلي.`;
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="chat-launcher" onClick={() => setIsOpen(true)}>
        <i className="hgi-stroke hgi-chat-bot"></i>
        <span>اسأل دليل القاهرة</span>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div className="chat-backdrop active" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Chat Sheet Sidebar */}
      <div className={`chat-sheet ${isOpen ? 'active' : ''}`} id="chat-sheet">
        <div className="chat-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="hgi-stroke hgi-chat-bot" style={{ fontSize: '24px', color: 'var(--text-title)' }}></i>
            <div>
              <div style={{ fontWeight: 800, fontSize: '15px' }}>دليل القاهرة الذكي</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>مساعدك للتنقل والتخطيط والأمان</div>
            </div>
          </div>
          <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
            <i className="hgi-stroke hgi-cancel-01"></i>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages" id="chat-messages-container">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.isUser ? 'user' : 'bot'}`} dangerouslySetInnerHTML={{ __html: msg.text }}></div>
          ))}
          {isTyping && (
            <div className="chat-bubble bot" id="typing-indicator">
              جاري البحث في دليل القاهرة...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="chat-suggestions">
          {suggestions.map((sug, index) => (
            <button key={index} className="suggestion-chip" onClick={() => handleSend(sug)}>
              {sug}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="chat-input-area">
          <div className="chat-input-wrapper">
            <input 
              type="text" 
              placeholder="اكتب سؤالك هنا عن معالم مصر أو الأكلات..." 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          <button className="chat-send-btn" onClick={() => handleSend(inputVal)}>
            <i className="hgi-stroke hgi-sent"></i>
          </button>
        </div>
      </div>
    </>
  );
}
