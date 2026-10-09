import React, { useState, useMemo } from 'react';
import { Medication, CategoryFilter } from '../../types';
import { MEDICATIONS_DATA, formatPriceETB } from '../../data/pharmacyData';
import { 
  Search, 
  Plus, 
  Check, 
  Beaker, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

interface DirectoryViewProps {
  onSelectMedication: (med: Medication) => void;
  onAddToCart: (med: Medication) => void;
  onBookConsultation: (med: Medication) => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  onSelectMedication,
  onAddToCart,
  onBookConsultation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [sortOption, setSortOption] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [onlyOTC, setOnlyOTC] = useState(false);
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'medicine', label: 'Medicines' },
    { id: 'personal', label: 'Personal Care' },
    { id: 'vitamins', label: 'Vitamins' },
    { id: 'baby', label: 'Baby Care' },
    { id: 'firstaid', label: 'First Aid' },
    { id: 'compounding', label: 'Compounded Rx' },
  ];

  const filteredMedications = useMemo(() => {
    let list = MEDICATIONS_DATA.filter((med) => {
      if (selectedCategory !== 'all' && med.category !== selectedCategory) {
        return false;
      }
      if (onlyOTC && !med.isOTC) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = med.name.toLowerCase().includes(query);
        const matchTagline = med.tagline.toLowerCase().includes(query);
        const matchDesc = med.description.toLowerCase().includes(query);
        const matchCat = med.categoryLabel.toLowerCase().includes(query);
        const matchIngredients = (med.activeIngredients || []).some(ing => ing.toLowerCase().includes(query));
        
        return matchName || matchTagline || matchDesc || matchCat || matchIngredients;
      }
      return true;
    });

    if (sortOption === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [searchQuery, selectedCategory, onlyOTC, sortOption]);

  const handleQuickAdd = (e: React.MouseEvent, med: Medication) => {
    e.stopPropagation();
    onAddToCart(med);
    setAddedIds(prev => ({ ...prev, [med.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [med.id]: false }));
    }, 1500);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setOnlyOTC(false);
    setSortOption('name');
  };

  return (
    <div className="space-y-8 pb-20 animate-fadeIn">
      
      {/* Header */}
      <section className="space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0d7377]/10 text-[#0d7377] text-xs font-bold uppercase tracking-wider">
          <Beaker className="w-3.5 h-3.5" />
          <span>Product Catalog &amp; Formulary</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1a2f3a] tracking-tight">
          Explore Products &amp; Medicines
        </h1>
        <p className="text-sm sm:text-base text-[#5a6f7a] leading-relaxed max-w-2xl">
          Browse our selection of quality medicines, personal care essentials, and compounded prescription formulas available with free same-day delivery across Addis Ababa.
        </p>
      </section>

      {/* Controls: Search, Category Filters, Sort, OTC Toggle */}
      <div className="bg-white p-6 rounded-3xl border border-[#0d7377]/15 shadow-sm space-y-5">
        
        {/* Top Row: Search & Options */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0d7377]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, category, or active ingredient..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f7f3eb] border border-[#ebe4d6] text-xs sm:text-sm text-[#1a2f3a] outline-none focus:border-[#0d7377] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#5a6f7a] hover:text-[#1a2f3a]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#5a6f7a] font-medium flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Sort:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="text-xs font-semibold text-[#1a2f3a] bg-[#f7f3eb] border border-[#ebe4d6] rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#0d7377]"
              >
                <option value="name">Name A–Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* OTC Toggle Switch */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#1a2f3a] select-none">
              <input
                type="checkbox"
                checked={onlyOTC}
                onChange={(e) => setOnlyOTC(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-[#ebe4d6] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0d7377] relative"></div>
              <span>OTC Only</span>
            </label>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-[#ebe4d6]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#0d7377] text-white shadow-md shadow-[#0d7377]/20' 
                    : 'bg-[#f7f3eb] hover:bg-[#ebe4d6] text-[#5a6f7a] hover:text-[#1a2f3a]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Reset */}
      <div className="flex justify-between items-center text-xs text-[#5a6f7a]">
        <span>Showing <strong className="text-[#0d7377]">{filteredMedications.length}</strong> products</span>
        {(searchQuery || selectedCategory !== 'all' || onlyOTC || sortOption !== 'name') && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-[#0d7377] hover:underline font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Product Catalog Grid */}
      {filteredMedications.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedications.map((med) => {
            const isJustAdded = addedIds[med.id];

            return (
              <div 
                key={med.id}
                onClick={() => onSelectMedication(med)}
                className="bg-white rounded-2xl border border-[#0d7377]/10 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Visual Header */}
                  <div className="h-48 bg-gradient-to-br from-[#e8f4f5] to-[#f0f7f8] relative flex items-center justify-center overflow-hidden">
                    {med.emoji ? (
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
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
                        Rx Required
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-lg text-[#1a2f3a] group-hover:text-[#0d7377] transition-colors leading-snug">
                      {med.name}
                    </h3>
                    <p className="text-xs text-[#5a6f7a] line-clamp-2 leading-relaxed">
                      {med.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1">
                      {med.activeIngredients.slice(0, 2).map((ing, i) => (
                        <span key={i} className="text-[10px] bg-[#f7f3eb] text-[#5a6f7a] px-2 py-0.5 rounded font-medium">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Price & Add to Cart */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#f7f3eb] mt-3">
                  <div>
                    <span className="font-bold text-lg text-[#0d7377]">
                      {formatPriceETB(med.price)}
                    </span>
                    <span className="text-[10px] text-[#5a6f7a] block font-medium">/ unit</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleQuickAdd(e, med)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#0d7377] hover:bg-[#095456] text-white shadow-md shadow-[#0d7377]/20'
                      }`}
                      title="Add product to cart"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-[#0d7377]/10">
          <div className="w-12 h-12 rounded-2xl bg-[#f7f3eb] flex items-center justify-center mx-auto text-[#0d7377]">
            <Beaker className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-xl text-[#1a2f3a]">
            No formulations match your search
          </h3>
          <p className="text-xs text-[#5a6f7a] max-w-md mx-auto">
            Try adjusting your category filter, clearing your search query, or toggling off the Over-The-Counter filter.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-full bg-[#0d7377] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer hover:bg-[#095456]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset all filters</span>
          </button>
        </div>
      )}

    </div>
  );
};
