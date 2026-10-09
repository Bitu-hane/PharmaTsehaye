import React, { useState } from 'react';
import { NavigationTab, Medication, CategoryFilter } from '../../types';
import { MEDICATIONS_DATA, PHARMACY_INFO, formatPriceETB } from '../../data/pharmacyData';
import { 
  ArrowRight, 
  Sparkles, 
  Search,
  MapPin,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: NavigationTab) => void;
  onSelectMedication: (med: Medication) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  onSelectMedication,
}) => {
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [sortOption, setSortOption] = useState<'name' | 'price-low' | 'price-high'>('name');

  // Neighborhood Delivery Checker State
  const [searchNeighborhood, setSearchNeighborhood] = useState('');
  const [checkedResult, setCheckedResult] = useState<string | null>(null);

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'medicine', label: 'Medicines' },
    { id: 'personal', label: 'Personal Care' },
    { id: 'vitamins', label: 'Vitamins' },
    { id: 'baby', label: 'Baby Care' },
    { id: 'firstaid', label: 'First Aid' },
    { id: 'compounding', label: 'Compounded Rx' },
  ];

  // Filtering & Sorting Products
  const filteredProducts = MEDICATIONS_DATA.filter((med) => {
    const matchesCategory = activeCategory === 'all' || med.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || (
      med.name.toLowerCase().includes(q) ||
      med.description.toLowerCase().includes(q) ||
      med.categoryLabel.toLowerCase().includes(q) ||
      (med.activeIngredients || []).some(i => i.toLowerCase().includes(q))
    );
    return matchesCategory && matchesQuery;
  }).sort((a, b) => {
    if (sortOption === 'name') return a.name.localeCompare(b.name);
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    return 0;
  });

  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchNeighborhood.trim()) return;

    const query = searchNeighborhood.trim().toLowerCase();
    const match = PHARMACY_INFO.deliveryCoverageAreas.find(area => area.toLowerCase().includes(query));

    if (match) {
      setCheckedResult(`✓ Great news! We deliver free same-day to ${match} and surrounding areas!`);
    } else {
      setCheckedResult(`✓ Yes! We cover most areas in Addis Ababa including ${searchNeighborhood}. Same-day delivery available!`);
    }
  };

  const handleSelectQuickArea = (area: string) => {
    setSearchNeighborhood(area);
    setCheckedResult(`✓ Great news! We deliver free same-day to ${area} within 3 hours!`);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 animate-fadeIn relative">
      
      {/* Floating decorative ambient background orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[82vh] flex items-center rounded-3xl overflow-hidden shadow-2xl border border-[#0d7377]/20">
        
        {/* Background Image & Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/pharmacy1-wide.jpg" 
            alt="Tsehaye Unique Pharmacy interior" 
            className="w-full h-full object-cover object-center filter brightness-[0.7] saturate-[1.1] scale-105 transition-transform duration-1000 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a2f3a]/90 via-[#0d7377]/65 to-[#1a2f3a]/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl px-6 sm:px-12 py-16 text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#e8d48b]" />
            <span>Trusted Community Pharmacy</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold leading-[1.1] tracking-tight">
            Where Care Meets<br />
            <span className="gradient-text">Uniqueness</span>
          </h1>

          <p className="text-base sm:text-xl text-white/90 font-light leading-relaxed max-w-xl">
            Discover quality medicines, personal care essentials, and expert clinical advice in a welcoming space designed for your well-being.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button 
              onClick={() => {
                document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0d7377] to-[#14919b] hover:brightness-110 text-white font-semibold text-sm shadow-lg shadow-[#0d7377]/40 flex items-center gap-2.5 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setActiveTab('contact')}
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-semibold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#e8d48b]" />
              <span>Visit Us</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-6 max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#e8d48b]">500+</div>
              <div className="text-[11px] sm:text-xs text-white/70 uppercase tracking-wider font-medium">Products</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#e8d48b]">10+</div>
              <div className="text-[11px] sm:text-xs text-white/70 uppercase tracking-wider font-medium">Years Care</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#e8d48b]">24/7</div>
              <div className="text-[11px] sm:text-xs text-white/70 uppercase tracking-wider font-medium">Support</div>
            </div>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/60 text-[10px] tracking-widest uppercase font-medium">
          <span>Scroll to explore</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ===== QUICK SEARCH BANNER ===== */}
      <section className="relative z-20 -mt-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-full p-2.5 sm:p-3 shadow-2xl border border-[#0d7377]/15 flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-3 flex-1 px-4 w-full">
              <Search className="w-5 h-5 text-[#0d7377] shrink-0" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medicines, vitamins, personal care..."
                className="w-full text-sm text-[#1a2f3a] bg-transparent outline-none placeholder:text-[#5a6f7a]"
              />
            </div>
            <button 
              onClick={() => {
                document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#0d7377] to-[#14919b] text-white font-semibold text-xs sm:text-sm shrink-0 shadow-md shadow-[#0d7377]/30 hover:scale-102 transition-transform cursor-pointer"
            >
              Search Catalog
            </button>
          </div>

          {/* Quick Category Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    isActive 
                      ? 'bg-[#0d7377] text-white border-[#0d7377] shadow-md shadow-[#0d7377]/20' 
                      : 'bg-white text-[#5a6f7a] border-[#ebe4d6] hover:border-[#0d7377] hover:text-[#0d7377]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS COLLECTION SECTION ===== */}
      <section id="products-section" className="pt-8 space-y-8 scroll-mt-24">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0d7377]">
            Our Collection
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2f3a]">
            Find What You Need
          </h2>
          <p className="text-sm text-[#5a6f7a]">
            Browse our carefully curated selection of quality healthcare products. Search or filter by category.
          </p>
        </div>

        {/* Products Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#0d7377]/10 shadow-sm">
          <div className="text-xs font-semibold text-[#5a6f7a]">
            Showing <strong className="text-[#0d7377]">{filteredProducts.length}</strong> product{filteredProducts.length !== 1 ? 's' : ''}
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs text-[#5a6f7a] font-medium flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort by:
            </span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="text-xs font-semibold text-[#1a2f3a] bg-[#f7f3eb] border border-[#ebe4d6] rounded-xl px-3 py-1.5 outline-none cursor-pointer focus:border-[#0d7377]"
            >
              <option value="name">Name A–Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((med) => (
              <div
                key={med.id}
                onClick={() => onSelectMedication(med)}
                className="bg-white rounded-2xl border border-[#0d7377]/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Visual Header */}
                  <div className="h-44 bg-gradient-to-br from-[#e8f4f5] to-[#f0f7f8] relative flex items-center justify-center overflow-hidden">
                    {med.emoji ? (
                      <span className="text-5xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                        {med.emoji}
                      </span>
                    ) : (
                      <img 
                        src={med.image} 
                        alt={med.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#0d7377] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      {med.categoryLabel}
                    </span>
                    {!med.isOTC && (
                      <span className="absolute top-3 right-3 bg-[#c9a227] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        Rx
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-base text-[#1a2f3a] group-hover:text-[#0d7377] transition-colors leading-snug">
                      {med.name}
                    </h3>
                    <p className="text-xs text-[#5a6f7a] line-clamp-2 leading-relaxed">
                      {med.description}
                    </p>
                  </div>
                </div>

                {/* Footer Price & View Action */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#f7f3eb] mt-3">
                  <div>
                    <span className="font-bold text-lg text-[#0d7377]">
                      {formatPriceETB(med.price)}
                    </span>
                    <span className="text-[10px] text-[#5a6f7a] block font-medium">/ unit</span>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMedication(med);
                    }}
                    className="w-9 h-9 rounded-xl bg-[#f7f3eb] group-hover:bg-[#0d7377] text-[#0d7377] group-hover:text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                    aria-label="View Product Details"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#0d7377]/10 space-y-4">
            <div className="text-4xl">🔍</div>
            <h3 className="font-bold text-lg text-[#1a2f3a]">No products found</h3>
            <p className="text-xs text-[#5a6f7a]">Try adjusting your search terms or category selection.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-5 py-2.5 rounded-full bg-[#0d7377] text-white text-xs font-semibold hover:bg-[#095456] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* ===== GALLERY SECTION (INSIDE OUR SPACE) ===== */}
      <section id="gallery" className="rounded-3xl bg-gradient-to-br from-[#1a2f3a] via-[#2a4554] to-[#095456] p-8 sm:p-14 text-white space-y-10 relative overflow-hidden shadow-2xl">
        
        <div className="text-center max-w-2xl mx-auto space-y-2 relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#e8d48b]">
            Inside Our Space
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            A Welcoming Pharmacy Experience
          </h2>
          <p className="text-sm text-white/80">
            Step into a clean, organized, and friendly environment designed with your comfort in mind.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          
          <div className="relative rounded-2xl overflow-hidden group aspect-[4/3] shadow-lg border border-white/10">
            <img 
              src="/images/pharmacy1-wide.jpg" 
              alt="Pharmacy shelves and counter" 
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
              loading="lazy" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f3a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="font-bold text-base text-white">Organized Excellence</h3>
              <p className="text-xs text-white/80">Fully stocked shelves with genuine products</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group aspect-[4/3] shadow-lg border border-white/10">
            <img 
              src="/images/pharmacy2-wide.jpg" 
              alt="Pharmacy entrance and seating" 
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
              loading="lazy" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f3a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="font-bold text-base text-white">Comfortable Waiting</h3>
              <p className="text-xs text-white/80">Bright consultation area for your convenience</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group aspect-[4/3] shadow-lg border border-white/10">
            <img 
              src="/images/pharmacy3-wide.jpg" 
              alt="Wide view of product displays" 
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
              loading="lazy" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f3a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="font-bold text-base text-white">Wide Selection</h3>
              <p className="text-xs text-white/80">From medicines to daily personal care</p>
            </div>
          </div>

        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Visual Column */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#0d7377]/15 relative">
            <img 
              src="/images/pharmacy3-wide.jpg" 
              alt="Tsehaye Unique Pharmacy interior view" 
              className="w-full aspect-[4/5] object-cover" 
            />
            <div className="absolute bottom-6 left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-bold text-[#1a2f3a]">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c9a227] to-[#e8d48b] text-[#1a2f3a] flex items-center justify-center font-bold">
                ✦
              </div>
              <div>
                <div>Trusted Choice</div>
                <div className="text-xs text-[#0d7377] font-semibold">Since Day One</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0d7377]">
            About Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2f3a]">
            Tsehaye Unique Pharmacy
          </h2>
          <p className="text-sm sm:text-base text-[#5a6f7a] leading-relaxed">
            At Tsehaye Unique Pharmacy, we believe healthcare should feel personal. Our name reflects our commitment to providing not just medicines, but a uniquely caring experience for every customer who walks through our doors.
          </p>
          <p className="text-sm sm:text-base text-[#5a6f7a] leading-relaxed">
            From prescription fulfillment to everyday wellness products, our knowledgeable team is here to guide you with honesty, clarity, and genuine care. We stock quality brands and maintain a clean, modern space where you can shop with confidence.
          </p>

          {/* 4 Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#0d7377]/10">
              <span className="text-2xl">💊</span>
              <div>
                <h4 className="font-bold text-sm text-[#1a2f3a]">Quality Assured</h4>
                <p className="text-xs text-[#5a6f7a]">Genuine medicines &amp; trusted brands</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#0d7377]/10">
              <span className="text-2xl">🤝</span>
              <div>
                <h4 className="font-bold text-sm text-[#1a2f3a]">Expert Guidance</h4>
                <p className="text-xs text-[#5a6f7a]">Friendly advice you can trust</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#0d7377]/10">
              <span className="text-2xl">🌿</span>
              <div>
                <h4 className="font-bold text-sm text-[#1a2f3a]">Holistic Care</h4>
                <p className="text-xs text-[#5a6f7a]">From Rx to personal wellness</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#0d7377]/10">
              <span className="text-2xl">📍</span>
              <div>
                <h4 className="font-bold text-sm text-[#1a2f3a]">Community Focused</h4>
                <p className="text-xs text-[#5a6f7a]">Serving neighbors with heart</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ===== INTERACTIVE NEIGHBORHOOD DELIVERY CHECKER ===== */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl border border-[#0d7377]/15 shadow-md space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0d7377] font-mono-spec">
            Addis Ababa Delivery Coverage
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a2f3a]">
            Check if we deliver free to your neighborhood
          </h2>
          <p className="text-xs sm:text-sm text-[#5a6f7a]">
            Enter your sub-city or workplace area in Addis Ababa to confirm instant same-day courier dispatch.
          </p>
        </div>

        <form onSubmit={handleCheckDelivery} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0d7377]" />
            <input
              type="text"
              value={searchNeighborhood}
              onChange={(e) => setSearchNeighborhood(e.target.value)}
              placeholder="e.g., Bole, Kazanchis, Old Airport, Sarbet, CMC..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f7f3eb] border border-[#ebe4d6] text-xs sm:text-sm text-[#1a2f3a] outline-none focus:border-[#0d7377]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#0d7377] hover:bg-[#095456] text-white font-semibold text-xs transition-colors shadow-md shadow-[#0d7377]/20 whitespace-nowrap cursor-pointer"
          >
            Check Availability
          </button>
        </form>

        {/* Quick Area Buttons */}
        <div className="space-y-2 pt-2 border-t border-[#ebe4d6]">
          <span className="text-[11px] text-[#5a6f7a] font-medium block">Popular delivery zones:</span>
          <div className="flex flex-wrap gap-2">
            {PHARMACY_INFO.deliveryCoverageAreas.slice(0, 8).map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => handleSelectQuickArea(area)}
                className="px-3 py-1 rounded-full bg-[#f7f3eb] hover:bg-[#0d7377] hover:text-white text-[#1a2f3a] border border-[#ebe4d6] text-xs transition-colors cursor-pointer"
              >
                📍 {area}
              </button>
            ))}
          </div>
        </div>

        {/* Result Banner */}
        {checkedResult && (
          <div className="p-4 rounded-xl bg-[#0d7377] text-white font-semibold text-xs animate-fadeIn flex items-center justify-between">
            <span>{checkedResult}</span>
            <button
              onClick={() => setActiveTab('refill')}
              className="px-3.5 py-1.5 rounded-lg bg-[#c9a227] text-[#1a2f3a] text-xs font-bold hover:bg-white transition-colors cursor-pointer"
            >
              Order Now →
            </button>
          </div>
        )}
      </section>

      {/* ===== CALL TO ACTION CARD ===== */}
      <section>
        <div className="bg-gradient-to-r from-[#095456] via-[#0d7377] to-[#14919b] rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="font-display text-2xl sm:text-4xl font-bold">
            Need Something Specific?
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto">
            Visit us in person or reach out — we're happy to help you find the right product for your health needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('contact')}
              className="px-7 py-3.5 rounded-full bg-white text-[#0d7377] hover:bg-[#f7f3eb] font-bold text-xs sm:text-sm shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              Get Directions
            </button>
            <a
              href={`tel:${PHARMACY_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-bold text-xs sm:text-sm transition-transform hover:scale-105 cursor-pointer"
            >
              Call Us: {PHARMACY_INFO.phone}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
