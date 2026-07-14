import React, { useState, useRef, useEffect } from 'react';

export default function ChatBot({ budgetData, exchangeRate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('gemini_api_key') || '';
  });
  const [tempKey, setTempKey] = useState(apiKey);
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

  const handleSend = async (text) => {
    const query = text.trim();
    if (!query) return;

    // Add user message
    setMessages(prev => [...prev, { isUser: true, text: query }]);
    setInputVal('');
    setIsTyping(true);

    if (apiKey) {
      // Use Live Gemini 2.5 Flash API
      try {
        const chatHistoryForApi = messages
          .filter((_, idx) => idx > 0) // Skip welcome message
          .slice(-6) // Take last 6 messages
          .map(msg => ({
            role: msg.isUser ? 'user' : 'model',
            parts: [{ text: msg.text.replace(/<[^>]*>/g, '') }] // Strip HTML
          }));

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                ...chatHistoryForApi,
                {
                  role: 'user',
                  parts: [{ text: query }]
                }
              ],
              systemInstruction: {
                parts: [{
                  text: `أنت 'دليل'، مساعد ذكي ومستشار سياحي خبير ومبسط بالسياحة والسفر في القاهرة لمساعدة السياح (خاصة القادمين من الخليج كالمملكة العربية السعودية) للتخطيط لرحلتهم في القاهرة 2026.
                  
                  إليك تفاصيل الرحلة المعتمدة لتستخدمها بدقة عند الحاجة:
                  • عدد الأيام: 6 أيام / 5 ليالٍ. الطقس في سبتمبر دافئ نهاراً (28-32م) ومعتدل ليلاً.
                  • اليوم 1: الوصول لمطار القاهرة الدولي، الاستقرار بالفندق (الزمالك أو وسط البلد)، مساءً رحلة فلوكة نيلية وعشاء.
                  • اليوم 2: صباحاً أهرامات الجيزة وأبو الهول، ظهراً المتحف المصري الكبير (GEM)، الغداء كباب وكفتة مشويات الجيزة.
                  • اليوم 3: صباحاً قلعة صلاح الدين ومسجد محمد علي، ظهراً مجمع الأديان (الكنيسة المعلقة ومسجد عمرو بن العاص) والمتحف القومي للحضارة (المومياوات الملكية)، عصراً حديقة الأزهر لمشاهدة الغروب.
                  • اليوم 4: صباحاً تمشية شارع المعز التاريخي، الغداء كشري أبو طارق بوسط البلد، مساءً بازار خان الخليلي ومقهى الفيشاوي لشرب شاي النعناع.
                  • اليوم 5: صباحاً إفطار بالزمالك، برج القاهرة لمشاهدة البانوراما، مساءً تمشية كوبري قصر النيل (أسدي قصر النيل) وعشاء فاخر.
                  • اليوم 6: صباحاً شراء حلويات شرقية (العبد، تسيباس) والمانجو والفطير المشلتت، ظهراً حزم الحقائب والمغادرة للمطار.
                  
                  تفاصيل المأكولات والمطاعم الموصى بها:
                  • الفطور: الفلافل المصرية (الطعمية) والفول المدمس بالسمن البلدي (مطاعم: أرابياتا، زيزو، التابعي الدمياطي).
                  • الغداء/العشاء: الكشري (أبو طارق، التحرير)، المشويات (صبحي كابر، الرفاعي، قصر الكبابجي)، الحواوشي (حواوشي الربيع، الرفاعي)، الفتة المصرية (أبو السيد)، الملوخية بالدجاج (أبو السيد بالزمالك، صبحي كابر)، الأسماك (البوري المشوي بالردة، أرز صيادية بني - مطاعم: البرج، قدورة، سمكمك).
                  • الحلويات: أم علي بالقشطة والمكسرات، البسبوسة بالسمن البلدي (العبد، تسيباس، قويدر).
                  
                  إرشادات الأمان وتجنب الاحتيال:
                  • الأهرامات: تجنب التعامل مع عارضي ركوب الخيل والجمال غير الرسميين (الخراتية)، حجز التذاكر رسمياً، الاتفاق المسبق على السعر بدقة (المتوسط 200-300 جنيه).
                  • التسوق: ثقافة الفصال في خان الخليلي ضرورية (التفاوض للحصول على نصف السعر المعروض).
                  • المواصلات: الاعتماد بالدرجة الأولى على تطبيقات أوبر (Uber) أو كابتن/كريم لتجنب جدال الأسعار والتاكسي الأبيض. المترو (الخط الثالث الأخضر) رائع وسريع ومكيف.
                  • المياه: تجنب شرب مياه الحنفية والاعتماد كلياً على المياه المعدنية المغلقة. البقشيش (الإكرامية) متداول للعمال والخدمات البسيطة (5-20 جنيه).
                  
                  أجب باللغة العربية بأسلوب ودود ومبسط وواضح ولطيف. لا تذكر تفاصيل تقنية مثل HTML أو البرمجة. ركز فقط على القاهرة والسياحة.`
                }]
              }
            })
          }
        );

        setIsTyping(false);

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            const formatted = text
              .replace(/\n/g, '<br>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>');
            setMessages(prev => [...prev, { isUser: false, text: formatted }]);
            return;
          }
        }
        throw new Error('API response format error');
      } catch (err) {
        console.warn('Gemini API call failed, using offline fallback QA.', err);
        const botResponse = getLocalResponse(query);
        setMessages(prev => [
          ...prev, 
          { isUser: false, text: `⚠️ <em>فشل الاتصال بـ Gemini API، تم تشغيل الرد التلقائي دون اتصال:</em><br><br>${botResponse}` }
        ]);
      }
    } else {
      // Use Offline Fallback QA Search Engine
      setTimeout(() => {
        setIsTyping(false);
        const botResponse = getLocalResponse(query);
        setMessages(prev => [...prev, { isUser: false, text: botResponse }]);
      }, 600);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(inputVal);
    }
  };

  const saveApiKey = () => {
    const key = tempKey.trim();
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setIsSettingsOpen(false);
  };

  const clearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setTempKey('');
    setIsSettingsOpen(false);
  };

  // Predefined suggestion chips
  const suggestions = [
    'الأهرامات والجمال',
    'كيف أتنقل؟',
    'أشهر أكلة شعبية',
    'نصائح الأمان',
    'برنامج الرحلة'
  ];

  // Offline QA Search Engine based on Wiki & HTML
  const getLocalResponse = (query) => {
    query = query.trim().toLowerCase();
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
        • <b>سمك البوري المشوي بالردة:</b> سمك بوري يشوى بنخالة القمح على صاج ساخن جداً ويسقى بتتبيلة الخل والليمون والثوم والملح.<br>
        • <b>أرز الصيادية البني:</b> أرز مطبوخ بالبصل المحمر الغامق يقدم مع سمك بلطي مقلي ومقرمش.<br>
        • <b>أشهر الأماكن الموصى بها:</b> مطاعم أسماك البرج (مدينة نصر)، قدورة للأسماك (الجيزة)، وسمكمك (المهندسين).<br>
        • <b>السعر التقريبي:</b> 100 - 280 جنيه مصري (≈ 10 - 25 ريال سعودي).`;
    }

    if (cleanQuery.includes('حلي') || cleanQuery.includes('حلويات') || cleanQuery.includes('ام علي') || cleanQuery.includes('بسبوه') || cleanQuery.includes('العبد')) {
        return `<b>الحلويات والحلويات الشرقية بمصر:</b><br>
        • <b>أم علي:</b> طاجن دافئ من رقائق العجين المخبوزة مع الحليب الساخن والمكسرات والقشطة والزبيب.<br>
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
      <div className="daleel-launcher" onClick={() => setIsOpen(true)}>
        <div className="daleel-launcher-info">
          <div className="daleel-avatar">
            <i className="hgi-stroke hgi-chat-bot"></i>
            <span className="daleel-status-dot"></span>
          </div>
          <div>
            <div className="daleel-launcher-title">مساعدك الذكي (دليل)</div>
            <div className="daleel-launcher-desc">{apiKey ? 'Gemini 2.5 Flash نشط 🟢' : 'الوضع الذكي دون اتصال 🌐'}</div>
          </div>
        </div>
        <i className="hgi-stroke hgi-arrow-left-01"></i>
      </div>

      {/* Backdrop */}
      <div 
        className={`chat-sheet-backdrop ${isOpen ? 'active' : ''}`} 
        onClick={() => { setIsOpen(false); setIsSettingsOpen(false); }}
      ></div>

      {/* Chat Sheet Sidebar */}
      <div className={`chat-sheet ${isOpen ? 'active' : ''}`} id="chat-sheet">
        <div className="chat-header">
          <div className="daleel-avatar" style={{ marginRight: 0, marginLeft: '10px', flexShrink: 0 }}>
            <i className="hgi-stroke hgi-chat-bot"></i>
            <span className="daleel-status-dot"></span>
          </div>
          <div className="chat-header-info">
            <div className="chat-header-title">دليل القاهرة الذكي</div>
            <div className="chat-header-subtitle">
              {apiKey ? 'Gemini 2.5 Flash متصل نشط' : 'الوضع المحلي (اضغط الترس للتفعيل)'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button 
              className="chat-close-btn" 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
              title="إعدادات مفتاح API"
              style={{ color: isSettingsOpen ? 'var(--text-title)' : 'var(--text-primary)' }}
            >
              <i className="hgi-stroke hgi-settings-01"></i>
            </button>
            <button className="chat-close-btn" onClick={() => { setIsOpen(false); setIsSettingsOpen(false); }}>
              <i className="hgi-stroke hgi-cancel-01"></i>
            </button>
          </div>
        </div>

        {/* Settings view for Gemini API Key */}
        {isSettingsOpen ? (
          <div className="chat-messages" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--bg-color)' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-title)' }}>
              إعدادات الاتصال الذكي بـ Gemini
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              لتفعيل الردود الذكية المتقدمة، يمكنك إنشاء مفتاح API مجاني لـ Gemini من Google AI Studio ولصقه هنا. يتم حفظ المفتاح محلياً في متصفحك فقط لتفادي كشفه علناً.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Gemini API Key (مفتاح الاتصال)
              </label>
              <input 
                type="password" 
                placeholder="AIzaSy..." 
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', fontFamily: 'monospace' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button 
                className="btn" 
                style={{ flex: 1, padding: '10px', background: 'var(--text-title)', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: 800 }} 
                onClick={saveApiKey}
              >
                حفظ المفتاح
              </button>
              <button 
                className="btn" 
                style={{ padding: '10px', background: '#E24A4A', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: 800 }} 
                onClick={clearApiKey}
              >
                حذف
              </button>
            </div>
            <a 
              href="https://aistudio.google.com/" 
              target="_blank" 
              rel="noreferrer" 
              style={{ fontSize: '12px', color: 'var(--text-title)', textDecoration: 'underline', textAlign: 'center', marginTop: '10px', fontWeight: 700 }}
            >
              احصل على مفتاح مجاني من Google AI Studio
            </a>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="chat-messages" id="chat-messages-container">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`chat-bubble ${msg.isUser ? 'user' : 'bot'}`} 
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                ></div>
              ))}
              {isTyping && (
                <div className="chat-bubble bot" id="typing-indicator">
                  جاري البحث والتحليل الذكي...
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
          </>
        )}
      </div>
    </>
  );
}
