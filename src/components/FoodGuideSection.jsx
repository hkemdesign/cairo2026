import React, { useState } from 'react';

// Complete Gastronomy database
const foodDetails = {
  'falafel': {
    name: 'الفلافل المصرية الساخنة',
    slang: 'الطعمية',
    desc: 'حبوب فول مدشوش مفرومة ناعماً وممزوجة بخضرة الكزبرة الجافة والطازجة والبصل والثوم، تشكل على هيئة أقراص وترش بالسمسم المقرمش ثم تقلى بالزيت الحامي حتى تحمر وتصبح هشة ولذيذة جداً.',
    places: 'مطعم أرابياتا، مطعم زيزو (وسط البلد)، مطعم الشبراوي.',
    priceEgp: '10 - 25 جنيه مصري',
    priceSar: '1 - 2 ريال سعودي',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Egyptian_Ta%27ameya.jpg',
    googleLink: 'https://www.google.com/search?q=Egyptian+Taameya+Falafel&tbm=isch'
  },
  'ful': {
    name: 'الفول المدمس بالسمن البلدي',
    slang: 'الفول المدمس',
    desc: 'الفطور القومي اليومي للشعب المصري. حبوب الفول المطهية ببطء شديد على نار هادئة لعدة ساعات في دماسة النحاس التقليدية، ويقدم ساخناً ومهروساً بزيت الزيتون أو السمن البلدي وعصير الليمون والكمون والملح.',
    places: 'مطعم التابعي الدمياطي، وعربات الفول الشعبية المتواجدة بوسط البلد والزمالك.',
    priceEgp: '15 - 35 جنيه مصري',
    priceSar: '1.5 - 3 ريال سعودي',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Foul_mudammas.JPG',
    googleLink: 'https://www.google.com/search?q=Egyptian+Foul+Mudammas&tbm=isch'
  },
  'koshary': {
    name: 'الكشري المصري بالخلطة والدقة',
    slang: 'الكشري',
    desc: 'الوجبة الشعبية الأكثر شهرة في مصر على الإطلاق. يتكون من مزيج لذيذ من الأرز والمعكرونة والعدس بجبة والحمص، يغطى بالبصل المقرمش (الورد) وصلصة الطماطم الغنية ويضاف له الدقة الحمضية والشطة الحارة.',
    places: 'كشري أبو طارق (وسط البلد)، كشري التحرير، كشري سيد حنفي.',
    priceEgp: '40 - 90 جنيه مصري',
    priceSar: '4 - 8 ريال سعودي',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Koshary_2.jpg',
    googleLink: 'https://www.google.com/search?q=Egyptian+Koshary&tbm=isch'
  },
  'kebab': {
    name: 'الكباب والكفتة المشوية على الفحم',
    slang: 'المشويات المصرية',
    desc: 'قطع من لحم الضأن المتبل الفاخر وأصابع الكفتة المصنوعة من اللحم المفروم الممزوج ببهارات الشرق الطازجة، تشوى على الفحم المتوهج وتقدم مع سلطة الطحينة الحامضة وسلطة بلدي وخبز بلدي ساخن.',
    places: 'مطعم صبحي كابر، مطعم الرفاعي بالسيدة زينب، مطعم قصر الكبابجي.',
    priceEgp: '300 - 550 جنيه مصري',
    priceSar: '25 - 45 ريال سعودي',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Kebab_in_Cairo.jpg',
    googleLink: 'https://www.google.com/search?q=Egyptian+Kebab+Kofta&tbm=isch'
  },
  'molokhia': {
    name: 'شوربة الملوخية الخضراء بالدجاج',
    slang: 'الملوخية بالفراخ',
    desc: 'أوراق الملوخية الطازجة تفرم ناعماً وتطبخ في مرقة الدجاج الغنية بالتوابل، وتضاف إليها "الطشة" السحرية الشهيرة (سمن بلدي وثوم مفروم وكزبرة جافة)، وتقدم بجانب الأرز الأبيض والدجاج المحمر.',
    places: 'مطعم أبو السيد (الزمالك)، مطعم صبحي كابر، مطعم البرنس.',
    priceEgp: '160 - 280 جنيه مصري',
    priceSar: '15 - 25 ريال سعودي',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Egyptian_Mulukhiyah_with_chicken.jpg',
    googleLink: 'https://www.google.com/search?q=Egyptian+Mulukhiyah+Chicken&tbm=isch'
  },
  'fish': {
    name: 'سمك البوري المشوي بالردة',
    slang: 'السمك بالردة',
    desc: 'سمك بوري طازج يغطى بنخالة القمح (الردة) ويشوى على صاج ساخن جداً حتى يكتسب لون الشواء المميز، ثم يسقى بتتبيلة الخل والليمون والثوم والفلفل الحار والملح فور خروجه.',
    places: 'مطعم أسماك البرج (مدينة نصر)، مطعم قدورة للأسماك (الجيزة).',
    priceEgp: '180 - 280 جنيه مصري',
    priceSar: '15 - 25 ريال سعودي',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Egypt_Fish.jpg',
    googleLink: 'https://www.google.com/search?q=Grilled+Bouri+Fish+Egypt&tbm=isch'
  },
  'sayadiya': {
    name: 'أرز الصيادية البني بالسمك المقلي',
    slang: 'أرز صيادية',
    desc: 'أرز مصري يطهى مع البصل المحمر الغامق ليعطيه لونه البني الشهير ونكهته الغنية، يقدم بجانب سمك البلطي المقلي والمقرمش المتبل بالثوم والليمون والكمون.',
    places: 'مطعم سمكمك (المهندسين)، مطعم أسماك البرج.',
    priceEgp: '120 - 180 جنيه مصري',
    priceSar: '10 - 15 ريال سعودي',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Sayadiya.jpg',
    googleLink: 'https://www.google.com/search?q=Egyptian+Sayadiya+Rice+Fish&tbm=isch'
  },
  'omali': {
    name: 'طاجن أم علي الساخن بالقشطة',
    slang: 'أم علي',
    desc: 'حلوى مصرية دافئة وشهيرة، تصنع من رقائق عجين مخبوزة مضاف إليها الحليب الساخن والمكسرات المتنوعة والزبيب وجوز الهند والقشطة الطازجة، وتخبز في الفرن حتى يصبح وجهها ذهبياً.',
    places: 'حلواني العبد بوسط البلد، حلواني المالكي، بلدينا للحلويات.',
    priceEgp: '40 - 85 جنيه مصري',
    priceSar: '4 - 7 ريال سعودي',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Om_Ali.jpg',
    googleLink: 'https://www.google.com/search?q=Egyptian+Om+Ali&tbm=isch'
  },
  'basbousa': {
    name: 'البسبوسة الشرقية بالسمن البلدي',
    slang: 'البسبوسة',
    desc: 'حلوى السميد المصرية التقليدية، تخبز بالسمن البلدي وتزين بالمكسرات مثل اللوز أو البندق، وتسقى بالقطر الساخن الخفيف فور خروجها من الفرن لتصبح طرية وذائبة بالفم.',
    places: 'حلواني العبد، حلواني تسيباس، حلواني قويدر.',
    priceEgp: '50 - 110 جنيه مصري',
    priceSar: '5 - 10 ريال سعودي',
    photo: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Basbousa_Egyptian.jpg',
    googleLink: 'https://www.google.com/search?q=Egyptian+Basbousa&tbm=isch'
  }
};

export default function FoodGuideSection() {
  const [selectedFood, setSelectedFood] = useState(null);

  const openFoodPopup = (key) => {
    setSelectedFood(foodDetails[key]);
  };

  const closeFoodPopup = () => {
    setSelectedFood(null);
  };

  const categories = [
    {
      title: 'وجبات الفطور والصباح الشعبية',
      items: [
        { key: 'falafel', name: 'الفلافل المصرية الساخنة', slang: 'الطعمية', desc: 'أقراص مقرمشة ومقلية بالزيت محشوة بالفول والكزبرة والبهارات.' },
        { key: 'ful', name: 'الفول المدمس بالسمن البلدي', slang: 'الفول المدمس', desc: 'الفطور القومي اليومي، يطهى ببطء لساعات ويقدم بالتوابل والليمون.' }
      ]
    },
    {
      title: 'أطباق الغداء والعشاء الرئيسية (لحوم ودواجن)',
      items: [
        { key: 'koshary', name: 'الكشري المصري بالخلطة والدقة', slang: 'الكشري', desc: 'مزيج من الأرز والمعكرونة والعدس والحمص مع البصل المقرمش والصلصة.' },
        { key: 'molokhia', name: 'شوربة الملوخية الخضراء بالدجاج', slang: 'الملوخية بالفراخ', desc: 'شوربة أوراق الملوخية المفرومة مع طشة الثوم والكزبرة والسمن.' },
        { key: 'kebab', name: 'الكباب والكفتة المشوية على الفحم', slang: 'المشويات المصرية', desc: 'قطع لحم الضأن المتبل والكفتة المشوية تقدم مع سلطة الطحينة والخبز.' }
      ]
    },
    {
      title: 'الأكلات البحرية والأسماك',
      items: [
        { key: 'fish', name: 'سمك البوري المشوي بالردة', slang: 'السمك بالردة', desc: 'سمك بوري يشوى بنخالة القمح ويسقى بالثوم والليمون والخل.' },
        { key: 'sayadiya', name: 'أرز الصيادية البني بالسمك المقلي', slang: 'أرز صيادية', desc: 'أرز مطبوخ بالبصل المحمر يقدم مع سمك البلطي المقرمش.' }
      ]
    },
    {
      title: 'الحلويات والمقاهي الشرقية (حلى ومشروبات)',
      items: [
        { key: 'omali', name: 'طاجن أم علي الساخن بالقشطة', slang: 'أم علي', desc: 'رقائق عجين وحليب ساخن ومكسرات وقشطة تخبز بالفرن.' },
        { key: 'basbousa', name: 'البسبوسة الشرقية بالسمن البلدي', slang: 'البسبوسة', desc: 'حلوى السميد الذهبية المبللة بالقطر الدافئ والمزينة باللوز.' }
      ]
    }
  ];

  return (
    <>
      <div className="section-title">
        <span>دليل المأكولات والمطاعم المصرية</span>
        <i className="hgi-stroke hgi-restaurant"></i>
      </div>
      
      <div className="card">
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
          مجموعة منتقاة من أشهر الأكلات والمشروبات في المطبخ المصري مقسمة بحسب الوجبة لتسهيل الاستكشاف. اضغط على أي بطاقة لعرض تفاصيل إضافية والمطاعم الموصى بها والأسعار.
        </p>

        {categories.map((cat, index) => (
          <div key={index} className="food-category-block">
            <div className="food-category-title">{cat.title}</div>
            <div className="food-grid">
              {cat.items.map((item) => (
                <div key={item.key} className="food-item-card" onClick={() => openFoodPopup(item.key)}>
                  <div className="food-item-left">
                    <div className="food-name-container">
                      <span className="food-name">{item.name}</span>
                      <span className="food-slang-tag">{item.slang}</span>
                    </div>
                    <p className="food-desc">{item.desc}</p>
                  </div>
                  <div className="food-item-right">
                    <i className="hgi-stroke hgi-arrow-left-01"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedFood && (
        <div className="food-modal active" id="food-detail-modal" onClick={closeFoodPopup} style={{ display: 'flex', opacity: 1 }}>
          <div className="food-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="food-modal-body">
              <div className="food-modal-title">{selectedFood.name}</div>
              <div className="food-modal-slang">الاسم المحلي: {selectedFood.slang}</div>
              <div className="food-modal-desc">{selectedFood.desc}</div>
              
              <div className="food-modal-meta">
                <div className="food-meta-row">
                  <span className="food-meta-label">أشهر المطاعم:</span>
                  <span className="food-meta-value">{selectedFood.places}</span>
                </div>
                <div className="food-meta-row">
                  <span className="food-meta-label">الأسعار بالجنيه:</span>
                  <span className="food-meta-value">{selectedFood.priceEgp}</span>
                </div>
                <div className="food-meta-row">
                  <span className="food-meta-label">الأسعار بالريال:</span>
                  <span className="food-meta-value">{selectedFood.priceSar}</span>
                </div>
              </div>

              <a href={selectedFood.googleLink} target="_blank" rel="noreferrer" className="food-modal-photo-link">
                <i className="hgi-stroke hgi-image-02"></i>
                <span>عرض المزيد من صور جوجل الحقيقية للأكلة</span>
              </a>

              <button className="food-modal-close-btn" onClick={closeFoodPopup}>
                إغلاق التفاصيل
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
