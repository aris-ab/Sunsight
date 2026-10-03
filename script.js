    const MODULE_SPECS = {
      450: {
        name: 'Tier-1 450W Compact All-Black',
        w: 1.04,
        l: 1.76,
        eff: '20.9%',
        tech: 'Compact All-Black Mono',
        price: 1600000,
        desc: 'Compact All-Black'
      },
      550: {
        name: 'Tier-1 550W Mono PERC Bifacial',
        w: 1.13,
        l: 2.27,
        eff: '21.5%',
        tech: 'Half-Cut Mono PERC',
        price: 1850000,
        desc: 'Mono PERC Bifacial'
      },
      580: {
        name: 'Bifacial 580W Dual-Glass',
        w: 1.13,
        l: 2.38,
        eff: '22.4%',
        tech: 'Dual-Glass Bifacial',
        price: 2150000,
        desc: 'Bifacial Dual-Glass'
      }
    };

    // Global State
    const simState = {
      bill: 2800000,
      tariff: 1700,
      modulePower: 550,
      inverterType: 'string', // 'string' or 'micro'
      pitch: 22,
      azimuth: 188, // in degrees (0 to 360)
      ridge: 12.48,
      slope: 7.28,
      setback: 0.50, // in meters
      gutter: 0.60, // in meters (jalur talang air)
      orientation: 'portrait', // 'portrait' or 'landscape'
      panelGap: 3, // in cm (2 to 10 cm)
      extraTilt: 10, // in degrees (0 to 20 deg)
      moduleCount: 24,
      maxAvailableSlots: 24,
      customCount: null,
      cols: 8,
      rows: 3,
      roofShape: 'rectangle', // 'rectangle', 'l-shape', 'trapezoid'
      hasObstacle: true, // HVAC chiller
      hasSkylight: true, // Skylight kaca
      slotOverrides: {} // dynamic slot states ('active', 'skylight', 'hvac', 'empty')
    };

    function formatRp(val) {
      return 'Rp ' + Math.round(val).toLocaleString('id-ID');
    }

    function toggleRightPanel() {
      const panel = document.getElementById('right-panel-wrapper');
      const icon = document.getElementById('panel-toggle-icon');
      
      const isCollapsed = panel.classList.contains('lg:w-0');
      
      if (isCollapsed) {
        panel.classList.remove('lg:w-0');
        panel.classList.add('lg:w-[380px]');
        icon.textContent = 'chevron_right';
      } else {
        panel.classList.remove('lg:w-[380px]');
        panel.classList.add('lg:w-0');
        icon.textContent = 'chevron_left';
      }
    }

    // Eco-Forest Layered Diorama Tree Configurations (Expanded 24 Diverse Trees across 3 Layers)
    const ecoTreeConfigs = [
      // Stage 1 (Initial Sprout: 500k - 2.8M, ids 0-5)
      { id: 0, layer: 'front', x: 168, y: 75, scale: 1.14, type: 'oak', delay: 20 },
      { id: 1, layer: 'mid', x: 135, y: 56, scale: 0.92, type: 'pine', delay: 40 },
      { id: 2, layer: 'back', x: 175, y: 46, scale: 0.70, type: 'poplar', delay: 60 },
      { id: 3, layer: 'mid', x: 202, y: 56, scale: 0.90, type: 'oak', delay: 80 },
      { id: 4, layer: 'front', x: 228, y: 74, scale: 1.12, type: 'poplar', delay: 100 },
      { id: 5, layer: 'back', x: 118, y: 41, scale: 0.72, type: 'pine', delay: 120 },

      // Stage 2 (Growth Canopy: 3M - 6M, ids 6-10)
      { id: 6, layer: 'mid', x: 70, y: 53, scale: 0.90, type: 'oak', delay: 140 },
      { id: 7, layer: 'front', x: 110, y: 73, scale: 1.16, type: 'oak', delay: 160 },
      { id: 8, layer: 'back', x: 210, y: 44, scale: 0.67, type: 'poplar', delay: 180 },
      { id: 9, layer: 'mid', x: 238, y: 54, scale: 0.89, type: 'pine', delay: 200 },
      { id: 10, layer: 'back', x: 85, y: 38, scale: 0.66, type: 'pine', delay: 220 },

      // Stage 3 (Expanding Woodland: 6M - 10M, ids 11-15)
      { id: 11, layer: 'front', x: 290, y: 75, scale: 1.15, type: 'oak', delay: 240 },
      { id: 12, layer: 'mid', x: 170, y: 58, scale: 0.88, type: 'pine', delay: 260 },
      { id: 13, layer: 'back', x: 245, y: 42, scale: 0.71, type: 'oak', delay: 280 },
      { id: 14, layer: 'mid', x: 102, y: 53, scale: 0.87, type: 'poplar', delay: 300 },
      { id: 15, layer: 'front', x: 48, y: 76, scale: 1.10, type: 'pine', delay: 320 },

      // Stage 4 (Dense Forest: 10M - 13M, ids 16-19)
      { id: 16, layer: 'back', x: 52, y: 42, scale: 0.70, type: 'oak', delay: 340 },
      { id: 17, layer: 'mid', x: 272, y: 53, scale: 0.91, type: 'pine', delay: 360 },
      { id: 18, layer: 'back', x: 280, y: 41, scale: 0.66, type: 'pine', delay: 380 },
      { id: 19, layer: 'mid', x: 35, y: 62, scale: 0.88, type: 'poplar', delay: 400 },

      // Stage 5 (Full Lush Biosphere: 13M - 15M Slider Mentok, ids 20-23)
      { id: 20, layer: 'back', x: 22, y: 49, scale: 0.65, type: 'pine', delay: 420 },
      { id: 21, layer: 'back', x: 150, y: 44, scale: 0.68, type: 'pine', delay: 440 },
      { id: 22, layer: 'mid', x: 308, y: 54, scale: 0.87, type: 'oak', delay: 460 },
      { id: 23, layer: 'back', x: 315, y: 43, scale: 0.69, type: 'poplar', delay: 480 }
    ];

    function getTreeSvgGeometry(type) {
      if (type === 'pine') {
        return `
          <ellipse cx="0" cy="0.5" rx="4" ry="1.2" fill="#047857" opacity="0.35"/>
          <rect x="-1" y="-6" width="2" height="6.5" rx="0.5" fill="#78350f"/>
          <polygon points="0,-11 -7,-1 7,-1" fill="#059669"/>
          <polygon points="0,-15 -6,-5 6,-5" fill="#047857"/>
          <polygon points="0,-20 -5,-10 5,-10" fill="#065f46"/>
          <polygon points="0,-20 0,-10 5,-10" fill="#10b981" opacity="0.35"/>
        `;
      } else if (type === 'oak') {
        return `
          <ellipse cx="0" cy="0.5" rx="4.5" ry="1.5" fill="#047857" opacity="0.35"/>
          <rect x="-1.2" y="-7" width="2.4" height="7.5" rx="0.5" fill="#78350f"/>
          <circle cx="0" cy="-13" r="8" fill="#047857"/>
          <circle cx="-4" cy="-12" r="5.5" fill="#059669"/>
          <circle cx="4" cy="-12" r="5.5" fill="#10b981"/>
          <circle cx="0" cy="-16" r="6" fill="#34d399"/>
        `;
      } else {
        return `
          <ellipse cx="0" cy="0.5" rx="3.5" ry="1.2" fill="#047857" opacity="0.35"/>
          <rect x="-1" y="-7" width="2" height="7.5" rx="0.5" fill="#a16207"/>
          <ellipse cx="0" cy="-15" rx="5.5" ry="9.5" fill="#0f766e"/>
          <ellipse cx="-1.5" cy="-15" rx="4" ry="8" fill="#14b8a6"/>
          <circle cx="1" cy="-18" r="3.5" fill="#5eead4"/>
        `;
      }
    }

    function initEcoForest() {
      const backContainer = document.getElementById('eco-trees-back-container');
      const midContainer = document.getElementById('eco-trees-mid-container');
      const frontContainer = document.getElementById('eco-trees-front-container');
      if (!backContainer || !midContainer || !frontContainer) return;

      backContainer.innerHTML = '';
      midContainer.innerHTML = '';
      frontContainer.innerHTML = '';

      ecoTreeConfigs.forEach((cfg) => {
        const treeSvg = getTreeSvgGeometry(cfg.type);
        // Outer G: Sets exact fixed coordinates (x, y) and proportional scale
        // Inner G: Handles vertical pop-up ("poing") strictly from bottom center (0, 0)
        const html = `
          <g transform="translate(${cfg.x}, ${cfg.y}) scale(${cfg.scale})">
            <g id="eco-tree-${cfg.id}" class="eco-tree-stem dormant" style="transition-delay: ${cfg.delay}ms; transform: scale(0); opacity: 0;">
              ${treeSvg}
            </g>
          </g>
        `;

        if (cfg.layer === 'back') backContainer.insertAdjacentHTML('beforeend', html);
        else if (cfg.layer === 'mid') midContainer.insertAdjacentHTML('beforeend', html);
        else frontContainer.insertAdjacentHTML('beforeend', html);
      });
    }

    function updateEcoTrees(treesCount, maxPotential) {
      const backContainer = document.getElementById('eco-trees-back-container');
      if (!backContainer || !backContainer.children.length) {
        initEcoForest();
      }

      const count = Math.max(0, Number(treesCount) || 0);
      const totalTreesInConfig = ecoTreeConfigs.length;

      // Scale active trees from 2 sprouts (at min bill Rp 500k / ~128 trees) up to all 24 trees (at max bill Rp 15M / ~3850 trees)
      const minBenchmark = 120;
      const maxBenchmark = 3850;
      const progressRatio = Math.max(0, Math.min(1, (count - minBenchmark) / (maxBenchmark - minBenchmark)));
      const activeCount = Math.max(2, Math.min(totalTreesInConfig, Math.round(2 + progressRatio * (totalTreesInConfig - 2))));

      for (let i = 0; i < totalTreesInConfig; i++) {
        const treeEl = document.getElementById(`eco-tree-${i}`);
        if (treeEl) {
          if (i < activeCount) {
            treeEl.classList.remove('dormant');
            treeEl.classList.add('sprouted');
            treeEl.style.transform = 'scale(1)';
            treeEl.style.opacity = '1';
          } else {
            treeEl.classList.remove('sprouted');
            treeEl.classList.add('dormant');
            treeEl.style.transform = 'scale(0)';
            treeEl.style.opacity = '0';
          }
        }
      }

      // Update forest badge and equivalent green area
      const forestLabel = document.getElementById('ecoForestLabel');
      if (forestLabel) {
        forestLabel.textContent = `${count.toLocaleString('id-ID')} Pohon Lestari`;
      }
      const treeAreaEl = document.getElementById('ecoTreeArea');
      if (treeAreaEl) {
        const ha = (count * 0.0011).toFixed(2);
        treeAreaEl.textContent = `~${ha} Ha Lestari`;
      }
      const coverageEl = document.getElementById('ecoCoverageBadge');
      if (coverageEl && simState.bill && simState.tariff) {
        const homeKwh = (simState.bill / simState.tariff) * 12;
        const pct = Math.round(((simState.actualYearlyProd || 17850) / homeKwh) * 100);
        if (pct >= 100) {
          coverageEl.textContent = '100% Beban Listrik Bersih';
          coverageEl.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100/95 text-emerald-800 border border-emerald-200 shadow-2xs';
        } else {
          coverageEl.textContent = `${pct}% Beban Listrik Tertutup`;
          coverageEl.className = 'text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-100/95 text-sky-800 border border-sky-200 shadow-2xs';
        }
      }
    }

    function updateSimulation() {
      const monthlyKwh = simState.bill / simState.tariff;
      const dailyKwh = monthlyKwh / 30;
      const peakSunHours = 4.5;
      
      let efficiency = 1.0;
      if (simState.pitch < 10) efficiency = 0.92;
      else if (simState.pitch > 30) efficiency = 0.95;

      let neededKwp = (dailyKwh / peakSunHours) / efficiency;
      
      // 1. Usable Dimensions & Setback Margin Calculations
      const usableRidge = Math.max(1, simState.ridge - 2 * simState.setback);
      const usableSlope = Math.max(1, simState.slope - simState.setback - simState.gutter);
      const netArea = usableRidge * usableSlope;
      const area = simState.ridge * simState.slope;

      if (document.getElementById('grossAreaDisplay')) document.getElementById('grossAreaDisplay').textContent = area.toFixed(2);
      if (document.getElementById('netAreaDisplay')) document.getElementById('netAreaDisplay').textContent = netArea.toFixed(2);
      if (document.getElementById('netAreaDisplay2')) document.getElementById('netAreaDisplay2').textContent = netArea.toFixed(2);
      if (document.getElementById('netAreaPctDisplay')) document.getElementById('netAreaPctDisplay').textContent = Math.round((netArea / area) * 100) + '%';

      // 2. Module Specifications & Geometric Packing
      const currentSpec = MODULE_SPECS[simState.modulePower] || MODULE_SPECS[550];
      const panelW = simState.orientation === 'portrait' ? currentSpec.w : currentSpec.l;
      const panelL = simState.orientation === 'portrait' ? currentSpec.l : currentSpec.w;
      const gapM = (simState.panelGap || 3) / 100;

      // Calculate how many columns & rows physically fit
      let cols = Math.floor((usableRidge + gapM) / (panelW + gapM));
      let rows = Math.floor((usableSlope + gapM) / (panelL + gapM));
      if (cols < 1) cols = 1;
      if (rows < 1) rows = 1;

      // Identify valid roof slots within geometric boundary
      function isOutOfBounds(r, c) {
        if (simState.roofShape === 'l-shape') {
          return c >= Math.ceil(cols * 0.65) && r < Math.floor(rows * 0.42);
        } else if (simState.roofShape === 'trapezoid') {
          return r === 0 && (c === 0 || c === cols - 1);
        }
        return false;
      }

      const validSlots = [];
      const obstacleRow = Math.min(rows - 1, 1);
      const obstacleCol = Math.max(1, Math.floor((cols - 2) / 2));

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (!isOutOfBounds(r, c)) {
            validSlots.push({ r, c, key: `${r}_${c}` });
          }
        }
      }

      const totalValidSlots = validSlots.length;
      simState.maxAvailableSlots = totalValidSlots;

      // Count active modules from dynamic slot states
      let activeCount = 0;
      validSlots.forEach(slot => {
        let state = simState.slotOverrides[slot.key];
        if (!state) {
          if (simState.hasObstacle && slot.r === obstacleRow && (slot.c === obstacleCol || slot.c === obstacleCol + 1)) {
            state = 'hvac';
          } else if (simState.hasSkylight && slot.r === 0 && slot.c === Math.min(1, cols - 1)) {
            state = 'skylight';
          } else {
            state = 'active';
          }
        }
        if (state === 'active') activeCount++;
      });

      let modulesFitted = Math.max(0, activeCount);
      simState.cols = cols;
      simState.rows = rows;
      simState.moduleCount = modulesFitted;

      // Sync Tab 2 Manual Module Count controls
      const manualDisplay = document.getElementById('manualModuleCountDisplay');
      if (manualDisplay) manualDisplay.textContent = `${modulesFitted} Modul`;

      const maxDisplay = document.getElementById('manualMaxCountDisplay');
      if (maxDisplay) maxDisplay.textContent = `dari maks ${totalValidSlots} slot`;

      const countSlider = document.getElementById('moduleCountSlider');
      if (countSlider) {
        countSlider.max = Math.max(1, totalValidSlots);
        countSlider.value = modulesFitted;
      }

      const countBadge = document.getElementById('customCountBadge');
      if (countBadge) {
        countBadge.textContent = `${modulesFitted} Terpasang`;
      }

      const actualKwp = (modulesFitted * (simState.modulePower / 1000));
      const azimuthEff = (typeof getAzimuthEfficiency === 'function')
        ? getAzimuthEfficiency(simState.azimuth !== undefined ? simState.azimuth : 188)
        : 0.984;
      const actualYearlyProd = actualKwp * peakSunHours * 365 * efficiency * azimuthEff;
      
      const azBadge = document.getElementById('azimuthEffBadge');
      if (azBadge) {
        const effPct = (azimuthEff * 100).toFixed(1);
        azBadge.textContent = `${effPct}% Efisiensi Sinar`;
        if (azimuthEff >= 0.95) {
          azBadge.className = 'px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold whitespace-nowrap shrink-0 shadow-2xs transition-colors';
        } else if (azimuthEff >= 0.92) {
          azBadge.className = 'px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-[10px] font-bold whitespace-nowrap shrink-0 shadow-2xs transition-colors';
        } else {
          azBadge.className = 'px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold whitespace-nowrap shrink-0 shadow-2xs transition-colors';
        }
      }
      
      const capEl = document.getElementById('metric-capacity');
      if (capEl) capEl.textContent = actualKwp.toFixed(1);
      
      const prodEl = document.getElementById('metric-prod');
      if (prodEl) prodEl.textContent = (actualYearlyProd / 1000).toFixed(1);
      
      const descText = `${modulesFitted} Modul (${simState.modulePower}W ${currentSpec.desc})`;
      const moduleDescEl = document.getElementById('metric-module-desc');
      if (moduleDescEl) moduleDescEl.textContent = descText;
      const capexModule = document.getElementById('capex-module-desc');
      if (capexModule) capexModule.textContent = descText;
      
      const costOfModules = modulesFitted * currentSpec.price;
      const inverterPrice = (simState.inverterType === 'string') ? (actualKwp * 1200000) : (modulesFitted * 1100000);
      const rackingPrice = modulesFitted * 350000;
      const installPrice = 15000000;
      
      const totalCapex = costOfModules + inverterPrice + rackingPrice + installPrice;
      
      if(document.getElementById('costModules')) document.getElementById('costModules').textContent = formatRp(costOfModules);
      if(document.getElementById('costInverter')) document.getElementById('costInverter').textContent = formatRp(inverterPrice);
      if(document.getElementById('costRacking')) document.getElementById('costRacking').textContent = formatRp(rackingPrice);
      if(document.getElementById('costInstall')) document.getElementById('costInstall').textContent = formatRp(installPrice);
      if(document.getElementById('capexTotalDisplay')) document.getElementById('capexTotalDisplay').textContent = 'Total: ' + formatRp(totalCapex);
      
      const monthlySaving = (actualYearlyProd / 12) * simState.tariff;
      const cappedSaving = Math.min(monthlySaving, simState.bill); 
      
      if(document.getElementById('monthlySavingDisplay')) document.getElementById('monthlySavingDisplay').textContent = formatRp(cappedSaving);
      const savingEl = document.getElementById('metric-saving');
      if(savingEl) savingEl.innerHTML = `${(cappedSaving/1000000).toFixed(2)}M`;
      
      const cumulative25 = (cappedSaving * 12) * 25;
      if(document.getElementById('cumulativeSavingsDisplay')) document.getElementById('cumulativeSavingsDisplay').textContent = formatRp(cumulative25);

      // Financial ROI Math
      const yearlySaving = cappedSaving * 12;
      const payback = yearlySaving > 0 ? (totalCapex / yearlySaving).toFixed(1) : 0;
      const irr = yearlySaving > 0 ? (100 * Math.pow(yearlySaving / totalCapex, 1/15)).toFixed(1) : 0; // rough estimation
      
      if(document.getElementById('paybackDisplay')) document.getElementById('paybackDisplay').textContent = payback;
      if(document.getElementById('irrDisplay')) document.getElementById('irrDisplay').textContent = `IRR ${irr}%`;
      if(document.getElementById('metric-payback')) document.getElementById('metric-payback').textContent = payback;
      if(document.getElementById('metric-irr')) document.getElementById('metric-irr').textContent = `IRR ${irr}%`;
      if(document.getElementById('metric-bep')) document.getElementById('metric-bep').textContent = Math.ceil(payback);
      if(document.getElementById('bepLabel')) document.getElementById('bepLabel').textContent = `BEP: Thn ${payback}`;

      // Eco Impact (Environmental Calculation dynamically linked to Household Bill & Clean Transition Potential)
      // Standard ESDM 2024 grid factor: ~0.80 kg CO2 / kWh
      const annualHomeKwh = (simState.bill / simState.tariff) * 12;
      // Carbon reduction and tree planting equivalent scales with clean energy transition across full slider range (up to 15M)
      const co2ReductionTon = (annualHomeKwh * 0.8) / 1000;
      // 1 mature urban tree absorbs ~22 kg CO2 / year
      const treesEquivalent = Math.max(1, Math.round((co2ReductionTon * 1000) / 22));
      const maxPotentialTrees = Math.max(treesEquivalent, 3850);

      simState.co2ReductionTon = co2ReductionTon;
      simState.treesEquivalent = treesEquivalent;
      simState.annualHomeKwh = annualHomeKwh;
      simState.actualYearlyProd = actualYearlyProd;

      const ecoCo2El = document.getElementById('ecoCo2Display');
      if (ecoCo2El) ecoCo2El.textContent = co2ReductionTon.toFixed(1);

      const ecoCo2HeaderEl = document.getElementById('ecoCo2HeaderDisplay');
      if (ecoCo2HeaderEl) ecoCo2HeaderEl.textContent = `${co2ReductionTon.toFixed(1)} Ton CO2/thn`;

      const ecoTreesEl = document.getElementById('ecoTreesDisplay');
      if (ecoTreesEl) ecoTreesEl.textContent = treesEquivalent.toLocaleString('id-ID');

      // Update Top Ribbon Global Metrics Summary
      const metricTreesSummary = document.getElementById('metric-trees-summary');
      if (metricTreesSummary) metricTreesSummary.textContent = `${treesEquivalent.toLocaleString('id-ID')} Pohon`;
      const metricCo2Summary = document.getElementById('metric-co2-summary');
      if (metricCo2Summary) metricCo2Summary.textContent = `${co2ReductionTon.toFixed(1)} Ton CO2`;

      // Update Tab 2 Module Array Eco Badge
      const tab2EcoSummary = document.getElementById('tab2-eco-summary');
      if (tab2EcoSummary) tab2EcoSummary.textContent = `${treesEquivalent.toLocaleString('id-ID')} Pohon (~${co2ReductionTon.toFixed(1)} Ton CO2/thn)`;

      // Update Sprouting Tree Visualizer
      updateEcoTrees(treesEquivalent, maxPotentialTrees);

      // Sync with PDF Proposal Export Modal
      const pdfEcoCo2El = document.getElementById('pdfEcoCo2Display');
      if (pdfEcoCo2El) pdfEcoCo2El.textContent = `${co2ReductionTon.toFixed(1)} Ton / tahun`;

      const pdfEcoTreesEl = document.getElementById('pdfEcoTreesDisplay');
      if (pdfEcoTreesEl) pdfEcoTreesEl.textContent = `${treesEquivalent.toLocaleString('id-ID')} Pohon / tahun`;

      const pdfEcoForest25El = document.getElementById('pdfEcoForest25Display');
      if (pdfEcoForest25El) pdfEcoForest25El.textContent = `${(treesEquivalent * 25).toLocaleString('id-ID')} Pohon (~${(treesEquivalent * 25 * 0.0011).toFixed(1)} Ha)`;

      const pdfKwpEl = document.getElementById('pdfKwpDisplay');
      if (pdfKwpEl) pdfKwpEl.textContent = `${actualKwp.toFixed(2)} kWp (${descText})`;

      const pdfYearlyProdEl = document.getElementById('pdfYearlyProdDisplay');
      if (pdfYearlyProdEl) pdfYearlyProdEl.textContent = `${Math.round(actualYearlyProd).toLocaleString('id-ID')} kWh/thn`;

      const pdfRoofBadge = document.getElementById('pdfRoofConfigBadge');
      if (pdfRoofBadge && typeof getAzimuthDetails === 'function') {
        const azDetails = getAzimuthDetails(simState.azimuth !== undefined ? simState.azimuth : 188);
        pdfRoofBadge.textContent = `${modulesFitted}x Modul Surya • Orientasi ${azDetails.code} ${simState.azimuth || 188}° • Tilt ${simState.pitch}°`;
      }

      const pdfAreaEl = document.getElementById('pdfAreaDisplay');
      if (pdfAreaEl) pdfAreaEl.textContent = `${netArea.toFixed(1)} m²`;

      const pdfCapexEl = document.getElementById('pdfCapexDisplay');
      if (pdfCapexEl) pdfCapexEl.textContent = formatRp(totalCapex);

      const pdfYearlySavingEl = document.getElementById('pdfYearlySavingDisplay');
      if (pdfYearlySavingEl) pdfYearlySavingEl.textContent = formatRp(yearlySaving);

      const pdfPaybackEl = document.getElementById('pdfPaybackDisplay');
      if (pdfPaybackEl) pdfPaybackEl.textContent = `${payback} Tahun`;

      const pdfIrrEl = document.getElementById('pdfIrrDisplay');
      if (pdfIrrEl) pdfIrrEl.textContent = `${irr}%`;
      
      // Store current financial state on simState for ROI Chart
      simState.totalCapex = totalCapex;
      simState.yearlySaving = yearlySaving;
      simState.payback = Number(payback);
      simState.irr = Number(irr);
      simState.inverterPrice = inverterPrice;

      // Update Interactive ROI & Cumulative Cash Flow Chart
      updateRoiChart();

      // Render Dynamic Module Grid on Polygon Canvas
      renderPolygonModules();
    }

    // ========================================================
    // INTERACTIVE CUMULATIVE CASH FLOW & ROI CHART LOGIC
    // ========================================================
    let currentRoiYear = null;

    function getRoiCashFlowAtYear(t) {
      const capex = simState.totalCapex || 103300000;
      const yearly = simState.yearlySaving || 29400000;
      const invPrice = simState.inverterPrice || 15120000;
      // Inverter replacement at Year 12 (standard PV life-cycle, ~75% of inverter capex)
      const inverterMaintenance = (t >= 12) ? Math.round(invPrice * 0.75) : 0;
      return -capex + (yearly * t) - inverterMaintenance;
    }

    function formatRpWithSign(val) {
      const rounded = Math.round(val);
      const absVal = Math.abs(rounded);
      const sign = rounded > 0 ? '+' : (rounded < 0 ? '-' : '');
      return `${sign}Rp ${absVal.toLocaleString('id-ID')}`;
    }

    function updateRoiChart() {
      const capex = simState.totalCapex || 103300000;
      const yearly = simState.yearlySaving || 29400000;
      const payback = simState.payback || (yearly > 0 ? capex / yearly : 4.8);
      const max25Profit = getRoiCashFlowAtYear(25);

      const xMin = 28;
      const xMax = 320;
      const yTop = 14;
      const yBottom = 106;

      // Ensure coordinate bounds
      const minVal = -capex * 1.05;
      const maxVal = Math.max(capex * 0.5, max25Profit * 1.05);
      const valRange = maxVal - minVal;

      function mapX(t) {
        return xMin + (Math.max(0, Math.min(25, t)) / 25) * (xMax - xMin);
      }

      function mapY(v) {
        return yBottom - ((v - minVal) / valRange) * (yBottom - yTop);
      }

      const yZero = mapY(0);
      const bepYearClamped = Math.max(0, Math.min(25, payback));
      const xBep = mapX(bepYearClamped);

      // 1. Update Zero Baseline & Badge
      const zeroLine = document.getElementById('svg-roi-zero-line');
      if (zeroLine) {
        zeroLine.setAttribute('y1', yZero);
        zeroLine.setAttribute('y2', yZero);
      }
      const zeroBadgeRect = document.getElementById('svg-roi-zero-badge-rect');
      if (zeroBadgeRect) zeroBadgeRect.setAttribute('y', yZero - 6);
      const zeroBadgeText = document.getElementById('svg-roi-zero-badge-text');
      if (zeroBadgeText) zeroBadgeText.setAttribute('y', yZero + 3);

      // 2. Generate Dense Sampling Points (0 to 25 years with 0.5 year step)
      const points = [];
      for (let t = 0; t <= 25; t += 0.5) {
        points.push({ t, x: mapX(t), y: mapY(getRoiCashFlowAtYear(t)), cf: getRoiCashFlowAtYear(t) });
      }

      // 3. Build Full Continuous Line Path
      let pathCurve = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        pathCurve += ` L ${points[i].x} ${points[i].y}`;
      }
      const curveEl = document.getElementById('svg-roi-curve');
      if (curveEl) curveEl.setAttribute('d', pathCurve);

      // 4. Build Deficit Polygon (from t=0 to t=bep, below zero line)
      let pathDeficit = `M ${points[0].x} ${yZero}`;
      for (let i = 0; i < points.length; i++) {
        if (points[i].t <= bepYearClamped) {
          pathDeficit += ` L ${points[i].x} ${points[i].y}`;
        }
      }
      pathDeficit += ` L ${xBep} ${yZero} Z`;
      const deficitFill = document.getElementById('svg-roi-deficit-fill');
      if (deficitFill) deficitFill.setAttribute('d', pathDeficit);

      // 5. Build Profit Polygon (from t=bep to t=25, above zero line)
      let pathProfit = `M ${xBep} ${yZero}`;
      for (let i = 0; i < points.length; i++) {
        if (points[i].t >= bepYearClamped) {
          pathProfit += ` L ${points[i].x} ${points[i].y}`;
        }
      }
      pathProfit += ` L ${points[points.length - 1].x} ${yZero} Z`;
      const profitFill = document.getElementById('svg-roi-profit-fill');
      if (profitFill) profitFill.setAttribute('d', pathProfit);

      // 6. Update Dynamic Gradient Stops based on BEP percentage along X axis
      const bepPct = Math.max(5, Math.min(95, ((xBep - xMin) / (xMax - xMin)) * 100));
      const stop1 = document.getElementById('roiGradStop1');
      const stop2 = document.getElementById('roiGradStop2');
      if (stop1 && stop2) {
        stop1.setAttribute('offset', `${Math.max(0, bepPct - 3).toFixed(1)}%`);
        stop2.setAttribute('offset', `${Math.min(100, bepPct + 3).toFixed(1)}%`);
      }

      // 7. Update BEP Group Marker
      const bepGroup = document.getElementById('svg-roi-bep-group');
      if (bepGroup) {
        bepGroup.setAttribute('transform', `translate(${xBep}, ${yZero})`);
      }
      const bepText = document.getElementById('svg-bep-text');
      if (bepText) bepText.textContent = `★ BEP: ${payback.toFixed(1)} Thn`;
      const bepLabel = document.getElementById('bepLabel');
      if (bepLabel) bepLabel.textContent = `BEP: Thn ${payback.toFixed(1)}`;
      const bepSub = document.getElementById('roi-btn-bep-sub');
      if (bepSub) bepSub.textContent = `Thn ${payback.toFixed(1)}`;

      // 8. Update Inverter Maintenance Marker at Year 12
      const xInv = mapX(12);
      const invGroup = document.getElementById('svg-roi-inverter-group');
      if (invGroup) {
        invGroup.setAttribute('transform', `translate(${xInv}, 14)`);
      }

      // 9. Synchronize or initialize active inspected year (default to BEP)
      if (currentRoiYear === null) {
        currentRoiYear = payback;
      }
      renderRoiInspection(currentRoiYear);
    }

    function renderRoiInspection(year, showTooltip = true) {
      const capex = simState.totalCapex || 103300000;
      const yearly = simState.yearlySaving || 29400000;
      const payback = simState.payback || (yearly > 0 ? capex / yearly : 4.8);
      const max25Profit = getRoiCashFlowAtYear(25);

      const t = Math.max(0, Math.min(25, Number(year)));
      currentRoiYear = t;

      const xMin = 28;
      const xMax = 320;
      const yTop = 14;
      const yBottom = 106;
      const minVal = -capex * 1.05;
      const maxVal = Math.max(capex * 0.5, max25Profit * 1.05);
      const valRange = maxVal - minVal;

      const x = xMin + (t / 25) * (xMax - xMin);
      const rawCf = getRoiCashFlowAtYear(t);
      const isBepYear = Math.abs(t - payback) < 0.2;
      const cf = isBepYear ? 0 : rawCf;
      const y = yBottom - ((cf - minVal) / valRange) * (yBottom - yTop);
      const totalSavings = yearly * t;

      // A. Update Crosshair & Tracking Dot
      const crosshair = document.getElementById('svg-roi-crosshair');
      if (crosshair) {
        crosshair.setAttribute('x1', x);
        crosshair.setAttribute('x2', x);
        crosshair.setAttribute('opacity', '1');
      }
      const dot = document.getElementById('svg-roi-track-dot');
      if (dot) {
        dot.setAttribute('cx', x);
        dot.setAttribute('cy', y);
        dot.setAttribute('opacity', '1');
      }

      // B. Update Top Real-time Inspector Stat Strip
      const statusPill = document.getElementById('roi-status-pill');
      if (statusPill) {
        if (isBepYear) {
          statusPill.textContent = 'Titik Impas';
          statusPill.className = 'text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 border border-amber-200';
        } else if (Math.abs(t - 12) < 0.4) {
          statusPill.textContent = 'Ganti Inverter';
          statusPill.className = 'text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 border border-amber-200';
        } else if (t === 0) {
          statusPill.textContent = 'Investasi Awal';
          statusPill.className = 'text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 border border-rose-200';
        } else if (cf > 0) {
          statusPill.textContent = 'Profit Murni';
          statusPill.className = 'text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200';
        } else {
          statusPill.textContent = 'Balik Modal';
          statusPill.className = 'text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 border border-rose-200';
        }
      }

      const inspectYear = document.getElementById('roi-inspect-year');
      if (inspectYear) {
        inspectYear.textContent = isBepYear ? `Tahun ${t.toFixed(1)} (BEP)` : `Tahun ${t.toFixed(1)}`;
      }

      const inspectVal = document.getElementById('roi-inspect-val');
      if (inspectVal) {
        if (isBepYear || Math.abs(cf) < 300000) {
          inspectVal.textContent = 'Rp 0 (Titik Impas)';
          inspectVal.className = 'font-title text-xs font-extrabold text-amber-600 block mt-1';
        } else if (cf > 0) {
          inspectVal.textContent = formatRpWithSign(cf);
          inspectVal.className = 'font-title text-xs font-extrabold text-emerald-600 block mt-1';
        } else {
          inspectVal.textContent = formatRpWithSign(cf);
          inspectVal.className = 'font-title text-xs font-extrabold text-rose-600 block mt-1';
        }
      }

      const inspectSavings = document.getElementById('roi-inspect-savings');
      if (inspectSavings) {
        inspectSavings.textContent = formatRp(totalSavings);
      }

      const cumCo2 = ((simState.co2ReductionTon || 14.2) * t).toFixed(1);
      const cumTrees = Math.round((simState.treesEquivalent || 645) * t);

      const inspectEco = document.getElementById('roi-inspect-eco');
      if (inspectEco) {
        inspectEco.textContent = `${cumTrees.toLocaleString('id-ID')} Pohon (~${cumCo2}T)`;
      }

      // C. Update Slider & Slider Label
      const slider = document.getElementById('roi-year-slider');
      if (slider && Number(slider.value) !== Number(t.toFixed(1))) {
        slider.value = t.toFixed(1);
      }
      const sliderLabel = document.getElementById('roi-slider-label');
      if (sliderLabel) {
        sliderLabel.textContent = `Tahun ${t.toFixed(1)} / 25`;
      }

      // D. Update Floating Glassmorphic Tooltip
      const tooltip = document.getElementById('roi-tooltip');
      const wrapper = document.getElementById('roi-chart-wrapper');
      if (tooltip && wrapper) {
        if (!showTooltip) {
          tooltip.classList.add('hidden');
          return;
        }

        tooltip.classList.remove('hidden');
        const tipYear = document.getElementById('roi-tip-year');
        if (tipYear) tipYear.textContent = `Tahun ${t.toFixed(1)}`;
        
        const tipStatus = document.getElementById('roi-tip-status');
        if (tipStatus) {
          if (isBepYear || Math.abs(cf) < 300000) {
            tipStatus.textContent = 'Titik Impas (BEP)';
            tipStatus.className = 'text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-amber-950 text-amber-300 border border-amber-800';
          } else if (cf > 0) {
            tipStatus.textContent = 'Profit Bersih';
            tipStatus.className = 'text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800';
          } else {
            tipStatus.textContent = 'Pemulihan Modal';
            tipStatus.className = 'text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-rose-950 text-rose-300 border border-rose-800';
          }
        }

        const tipVal = document.getElementById('roi-tip-val');
        if (tipVal) {
          if (isBepYear || Math.abs(cf) < 300000) {
            tipVal.textContent = 'Rp 0 (Impas)';
            tipVal.className = 'font-bold font-title text-[10.5px] text-amber-400';
          } else if (cf > 0) {
            tipVal.textContent = formatRpWithSign(cf);
            tipVal.className = 'font-bold font-title text-[10.5px] text-emerald-400';
          } else {
            tipVal.textContent = formatRpWithSign(cf);
            tipVal.className = 'font-bold font-title text-[10.5px] text-rose-400';
          }
        }

        const tipSavings = document.getElementById('roi-tip-savings');
        if (tipSavings) {
          tipSavings.textContent = formatRp(totalSavings);
        }

        const tipEco = document.getElementById('roi-tip-eco');
        if (tipEco) {
          tipEco.textContent = `${cumCo2} T (~${cumTrees.toLocaleString('id-ID')} Pohon)`;
        }

        // Position tooltip smoothly: strictly clamped on X, and dynamically placed above or below the curve on Y
        const wrapperRect = wrapper.getBoundingClientRect();
        const tipWidth = tooltip.offsetWidth || 185;
        const tipHeight = tooltip.offsetHeight || 75;
        const halfTipW = tipWidth / 2;

        const rawLeftPx = (x / 340) * wrapperRect.width;
        const clampedLeft = Math.max(halfTipW + 8, Math.min(wrapperRect.width - halfTipW - 8, rawLeftPx));

        let topPx;
        if (y > 56) {
          // Point is in lower half (e.g. BEP or early deficit) -> place tooltip cleanly in upper empty sky (top: 8px)
          topPx = 8;
        } else {
          // Point is in upper half (e.g. mature profit years) -> place tooltip safely below curve
          topPx = Math.min(wrapperRect.height - tipHeight - 12, (y / 125) * wrapperRect.height + 12);
        }

        tooltip.style.left = `${clampedLeft}px`;
        tooltip.style.top = `${topPx}px`;
        tooltip.style.transform = 'translateX(-50%)';
      }
    }

    function onRoiChartHover(e) {
      const wrapper = document.getElementById('roi-chart-wrapper');
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const clientX = e.clientX;
      const offsetX = clientX - rect.left;
      const svgX = (offsetX / rect.width) * 340;

      const xMin = 28;
      const xMax = 320;
      const clampedX = Math.max(xMin, Math.min(xMax, svgX));
      const year = ((clampedX - xMin) / (xMax - xMin)) * 25;
      
      clearMilestoneSelection();
      renderRoiInspection(year, true);
    }

    function onRoiChartLeave() {
      // Hide floating tooltip so chart is completely unobstructed and clean
      const tooltip = document.getElementById('roi-tooltip');
      if (tooltip) {
        tooltip.classList.add('hidden');
      }
      // Revert crosshair tracking cleanly to BEP point without forcing tooltip to pop open
      if (simState.payback) {
        setMilestoneActive('roi-btn-bep');
        renderRoiInspection(simState.payback, false);
      }
    }

    function onRoiSliderInput(val) {
      clearMilestoneSelection();
      renderRoiInspection(val, true);
    }

    function clearMilestoneSelection() {
      document.querySelectorAll('.roi-ms-btn').forEach(btn => {
        btn.className = 'roi-ms-btn py-1.5 px-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[10px] font-semibold text-center transition flex flex-col items-center gap-0.5';
      });
    }

    function setMilestoneActive(btnId) {
      clearMilestoneSelection();
      const btn = document.getElementById(btnId);
      if (btn) {
        if (btnId === 'roi-btn-bep') {
          btn.className = 'roi-ms-btn py-1.5 px-1 rounded-lg bg-amber-500 text-white border border-amber-600 shadow-sm text-[10px] font-bold text-center transition flex flex-col items-center gap-0.5';
        } else {
          btn.className = 'roi-ms-btn py-1.5 px-1 rounded-lg bg-slate-900 text-white border border-slate-900 shadow-sm text-[10px] font-bold text-center transition flex flex-col items-center gap-0.5';
        }
      }
    }

    function snapRoiChartToYear(year) {
      setMilestoneActive(year === 0 ? 'roi-btn-0' : (year === 12 ? 'roi-btn-12' : (year === 25 ? 'roi-btn-25' : '')));
      renderRoiInspection(year, true);
    }

    function snapRoiChartToBep(showTip = true) {
      const bep = simState.payback || 4.8;
      setMilestoneActive('roi-btn-bep');
      renderRoiInspection(bep, showTip);
    }

    // History stack for smart "Back" navigation
    let navigationHistory = [];
    let currentAppState = 'state-landing';

    function switchState(stateName, isBackNavigation = false) {
      // Make it backwards compatible (e.g., 'landing' -> 'state-landing')
      if (!stateName.startsWith('state-')) {
        stateName = 'state-' + stateName;
      }

      if (!isBackNavigation && currentAppState && currentAppState !== stateName) {
        navigationHistory.push(currentAppState);
      }
      currentAppState = stateName;

      const allStates = [
        'state-landing', 'state-scanning', 'state-studio', 
        'state-auth', 'state-dashboard', 'state-profile'
      ];

      allStates.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
      });

      const activeEl = document.getElementById(stateName);
      if (activeEl) {
        activeEl.classList.remove('hidden');
        if (stateName === 'state-landing' || stateName === 'state-dashboard' || stateName === 'state-auth') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (stateName === 'state-dashboard') {
          setTimeout(() => {
            if (typeof initShopifyGlobe === 'function') initShopifyGlobe();
            if (typeof startDashLiveClock === 'function') startDashLiveClock();
            if (typeof updateDashCalculator === 'function') updateDashCalculator();
          }, 60);
        }
      }
    }

    function goBackState() {
      while (navigationHistory.length > 0) {
        const previousState = navigationHistory.pop();
        // If current state is dashboard or studio, don't back-navigate into the auth form
        if ((currentAppState === 'state-dashboard' || currentAppState === 'state-studio') && previousState === 'state-auth') {
          continue;
        }
        if (previousState && previousState !== currentAppState) {
          switchState(previousState, true);
          return;
        }
      }
      // Smart Fallback defaults if history is empty
      if (currentAppState === 'state-studio' || currentAppState === 'state-profile') {
        switchState('state-dashboard', true);
      } else {
        switchState('state-landing', true);
      }
    }

    function goToLandingState() {
      goBackState();
    }

    function toggleDashSidebar() {
      const sidebar = document.getElementById('dash-sidebar');
      if (!sidebar) return;
      if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
        sidebar.classList.add('flex');
      } else {
        sidebar.classList.add('hidden');
        sidebar.classList.remove('flex');
      }
    }

    window.switchState = switchState;
    window.goBackState = goBackState;
    window.goToLandingState = goToLandingState;
    window.toggleDashSidebar = toggleDashSidebar;

    let scanningTimers = [];

    function clearScanningTimers() {
      scanningTimers.forEach(t => clearTimeout(t));
      scanningTimers = [];
    }

    function appendScanTerminalLog(text, status = 'OK') {
      const logs = document.getElementById('scan-terminal-logs');
      if (!logs) return;
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between gap-2 py-0.5 text-slate-300';
      row.innerHTML = `
        <span class="truncate">${text}</span>
        <span class="text-emerald-400 font-bold shrink-0">[${status}]</span>
      `;
      logs.appendChild(row);
      logs.scrollTop = logs.scrollHeight;
    }

    function goToStudioDirect() {
      clearScanningTimers();
      switchState('studio');
      updateSimulation();
    }

    // Scanning transition with Live Computer Vision Telemetry
    function startScanningSequence() {
      clearScanningTimers();
      switchState('scanning');

      // Update Target Address display
      const dashInput = document.getElementById('dashboard-search-input');
      const landingInput = document.getElementById('landing-address-input');
      let currentAddr = "Jl. Diponegoro No. 24, Menteng, Jakarta Pusat";
      if (dashInput && dashInput.value.trim() && !dashInput.closest('section')?.classList.contains('hidden')) {
        currentAddr = dashInput.value.trim();
      } else if (landingInput && landingInput.value.trim()) {
        currentAddr = landingInput.value.trim();
      }
      const addrTarget = document.getElementById('scanning-target-address');
      if (addrTarget) {
        addrTarget.textContent = `Target: ${currentAddr} [-6.2088°, 106.8456°] | Sensor: 90° Nadir (GSD 0.08 m/px)`;
      }

      // Reset Monitor & Console state
      const monitorBg = document.getElementById('scan-monitor-bg');
      const monitorOverlay = document.getElementById('scan-monitor-overlay');
      const monitorPhase = document.getElementById('scan-monitor-phase');
      const monitorAlgo = document.getElementById('scan-monitor-algo');
      const monitorSub = document.getElementById('scan-monitor-sub');
      const terminalLogs = document.getElementById('scan-terminal-logs');
      const progressBar = document.getElementById('scan-progress-bar');
      const progressPercent = document.getElementById('scan-progress-percent');

      if (terminalLogs) terminalLogs.innerHTML = '';
      if (progressBar) progressBar.style.width = '20%';
      if (progressPercent) progressPercent.textContent = '20%';

      // PHASE 1: 0ms - RGB Ingestion & Sensor Radiometry
      if (monitorBg) monitorBg.style.filter = 'none';
      if (monitorOverlay) monitorOverlay.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center">
          <div class="w-36 h-24 border border-dashed border-sky-400/80 rounded bg-sky-500/10 flex items-center justify-center">
            <span class="text-[9px] font-code-metric text-sky-300 font-bold">RoI CALIBRATION</span>
          </div>
        </div>
      `;
      if (monitorPhase) monitorPhase.textContent = 'PASS 1/4: INGEST ORTOFOTO SATELIT';
      if (monitorAlgo) monitorAlgo.textContent = 'Sensor: WorldView-3 (RGB 24-bit TrueColor)';
      if (monitorSub) monitorSub.innerHTML = '<span>Resolusi: 1024×1024 px</span><span>GSD: 0.08 m/piksel</span>';
      appendScanTerminalLog('[DIP-01] Memuat raster ortofoto satelit 1024x1024 px...', 'OK');
      appendScanTerminalLog('[DIP-02] Konversi ke Luminans Y = 0.299R + 0.587G + 0.114B...', 'OK');

      // PHASE 2: 750ms - Gaussian Blur & Canny Edge Detection
      scanningTimers.push(setTimeout(() => {
        if (monitorBg) monitorBg.style.filter = 'grayscale(100%) invert(100%) contrast(300%) brightness(50%)';
        if (monitorOverlay) monitorOverlay.innerHTML = `
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="30%" y1="48%" x2="70%" y2="44%" stroke="#00f0ff" stroke-width="2.5" stroke-dasharray="6,3" />
            <polygon points="40,30 220,15 230,120 30,135" fill="none" stroke="#22d3ee" stroke-width="2" />
          </svg>
        `;
        if (monitorPhase) monitorPhase.textContent = 'PASS 2/4: DETEKSI TEPI CANNY & SOBEL';
        if (monitorAlgo) monitorAlgo.textContent = 'Operator Sobel 3x3: G = √(Gx² + Gy²)';
        if (monitorSub) monitorSub.innerHTML = '<span>Canny Threshold: 50 / 150</span><span>Ridge Hough: 188.2°</span>';
        if (progressBar) progressBar.style.width = '48%';
        if (progressPercent) progressPercent.textContent = '48%';
        appendScanTerminalLog('[DIP-03] Gaussian Smoothing filter σ=1.2 (Reduksi Derau)...', 'OK');
        appendScanTerminalLog('[CV-04] Konvolusi Gradien Sobel Gx, Gy (Deteksi Tepi)...', 'OK');
      }, 750));

      // PHASE 3: 1550ms - Otsu Binarization & Contour Reconstruction
      scanningTimers.push(setTimeout(() => {
        if (monitorBg) monitorBg.style.filter = 'grayscale(100%) contrast(250%) brightness(35%)';
        if (monitorOverlay) monitorOverlay.innerHTML = `
          <div class="relative w-full h-full flex items-center justify-center">
            <div class="w-48 h-28 border-2 border-emerald-400 bg-emerald-500/30 rounded-lg flex flex-col items-center justify-center p-2 text-center shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              <span class="text-[9px] font-bold text-emerald-300 font-code-metric">ATAP GENTENG TERSEGMENTASI</span>
              <span class="text-[8px] text-emerald-200 font-code-metric">Ambang Optimal T* = 138</span>
            </div>
          </div>
        `;
        if (monitorPhase) monitorPhase.textContent = 'PASS 3/4: SEGMENTASI BINARISASI OTSU';
        if (monitorAlgo) monitorAlgo.textContent = 'Minimisasi Variansi Intra-Kelas (T* = 138)';
        if (monitorSub) monitorSub.innerHTML = '<span>Morfologi: Closing 3x3</span><span>Kontur: 12.48m × 7.28m</span>';
        if (progressBar) progressBar.style.width = '75%';
        if (progressPercent) progressPercent.textContent = '75%';
        appendScanTerminalLog('[CV-05] Ambang binerisasi optimal Otsu T*=138 tercapai...', 'OK');
        appendScanTerminalLog('[CV-06] Operasi Morfologi Closing & Ekstraksi Kontur...', 'OK');
      }, 1550));

      // PHASE 4: 2350ms - Azimuth PCA Vector & Radiometry Heatmap
      scanningTimers.push(setTimeout(() => {
        if (monitorBg) monitorBg.style.filter = 'grayscale(100%) contrast(150%) brightness(30%)';
        if (monitorOverlay) monitorOverlay.innerHTML = `
          <div class="relative w-full h-full flex items-center justify-center">
            <div class="w-48 h-28 rounded-lg bg-gradient-to-tr from-amber-500/50 via-rose-500/30 to-sky-500/20 border border-amber-400 flex flex-col items-center justify-center text-center">
              <span class="text-[9px] font-bold text-amber-300 font-code-metric flex items-center gap-1">
                <span class="material-symbols-outlined text-[12px]">explore</span>
                AZIMUTH: 188° SSW
              </span>
              <span class="text-[8px] text-white font-code-metric">G_eff = 4.85 kWh/m²/hari</span>
            </div>
          </div>
        `;
        if (monitorPhase) monitorPhase.textContent = 'PASS 4/4: REKONSTRUKSI POLIGON & RADIOMETRI';
        if (monitorAlgo) monitorAlgo.textContent = 'Vektor Normal Azimuth & Pemetaan Insolasi';
        if (monitorSub) monitorSub.innerHTML = '<span>Masking Halangan: 2 Objek</span><span>Status: CAD Vector Siap</span>';
        if (progressBar) progressBar.style.width = '100%';
        if (progressPercent) progressPercent.textContent = '100%';
        appendScanTerminalLog('[CV-07] Momen citra & analisis PCA: Azimuth 188° SSW...', 'OK');
        appendScanTerminalLog('[CV-08] Radiometri: Iradiansi G_eff 4.85 kWh/m²/hari...', 'OK');
        appendScanTerminalLog('[CV-09] Rekonstruksi geometri CAD selesai! Mengalihkan...', 'READY');
      }, 2350));

      // FINISH: 3200ms - Smooth transition into Studio
      scanningTimers.push(setTimeout(() => {
        goToStudioDirect();
      }, 3200));
    }

    function setLandingSampleAddress(addrText) {
      const addr = document.getElementById('landing-address-input');
      if (addr) {
        addr.value = addrText;
        addr.focus();
        addr.classList.add('ring-2', 'ring-amber-500');
        setTimeout(() => addr.classList.remove('ring-2', 'ring-amber-500'), 1000);
      }
    }

    function switchHeroShowcaseMode(mode) {
      const tabPanels = document.getElementById('hero-tab-panels');
      const tabCv = document.getElementById('hero-tab-cv');
      const tabHeat = document.getElementById('hero-tab-heat');

      const layerPanels = document.getElementById('hero-layer-panels');
      const layerCv = document.getElementById('hero-layer-cv');
      const layerHeat = document.getElementById('hero-layer-heat');

      const title = document.getElementById('hero-showcase-title');
      const bg = document.getElementById('hero-mockup-bg');

      if (!tabPanels || !layerPanels) return;

      const inactiveClass = 'py-1.5 px-2 rounded-lg text-slate-600 hover:text-slate-900 transition flex items-center justify-center gap-1 cursor-pointer';
      [tabPanels, tabCv, tabHeat].forEach(t => {
        if (t) t.className = inactiveClass;
      });

      if (layerPanels) layerPanels.classList.add('hidden');
      if (layerCv) layerCv.classList.add('hidden');
      if (layerHeat) layerHeat.classList.add('hidden');

      if (mode === 'cv') {
        if (tabCv) tabCv.className = 'py-1.5 px-2 rounded-lg bg-slate-900 text-cyan-400 shadow-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer';
        if (layerCv) layerCv.classList.remove('hidden');
        if (bg) bg.style.filter = 'grayscale(100%) contrast(180%) brightness(40%)';
        if (title) title.textContent = 'CV: Segmentasi Otsu & Deteksi Tepi';
      } else if (mode === 'heat') {
        if (tabHeat) tabHeat.className = 'py-1.5 px-2 rounded-lg bg-amber-500 text-slate-950 shadow-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer';
        if (layerHeat) layerHeat.classList.remove('hidden');
        if (bg) bg.style.filter = 'contrast(120%) brightness(55%)';
        if (title) title.textContent = 'CV Radiometri: Heatmap Iradiansi';
      } else {
        // default: 'panels'
        if (tabPanels) tabPanels.className = 'py-1.5 px-2 rounded-lg bg-white text-slate-900 shadow-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer';
        if (layerPanels) layerPanels.classList.remove('hidden');
        if (bg) bg.style.filter = 'contrast(125%) brightness(95%)';
        if (title) title.textContent = 'Simulasi CAD: Tata Letak Surya';
      }
    }

    function onLandingCalculatorChange(val) {
      const bill = Number(val) || 2800000;
      const slider = document.getElementById('landingBillSlider');
      if (slider && Number(slider.value) !== bill) {
        slider.value = bill;
      }
      
      const billDisplay = document.getElementById('landingBillDisplay');
      if (billDisplay) {
        billDisplay.textContent = 'Rp ' + bill.toLocaleString('id-ID') + ' / bulan';
      }

      const tariff = (typeof simState !== 'undefined' && simState.tariff) ? simState.tariff : 1444.7;
      const monthlyKwh = bill / tariff;
      const targetSolarKwh = monthlyKwh * 0.87;
      const kwpNeeded = Math.max(1.6, Math.round((targetSolarKwh / (4.5 * 30 * 0.8)) * 10) / 10);
      
      const monthlySaving = Math.round(bill * 0.87);
      const cumulative25 = monthlySaving * 12 * 25;
      
      const turnkeyCost = kwpNeeded * 13500000;
      const annualSaving = monthlySaving * 12;
      const paybackYears = Math.max(3.8, Math.round((turnkeyCost / annualSaving) * 10) / 10);

      const savingEl = document.getElementById('landingCalcSavingMonth');
      if (savingEl) savingEl.textContent = 'Rp ' + monthlySaving.toLocaleString('id-ID');

      const kwpEl = document.getElementById('landingCalcKwp');
      if (kwpEl) kwpEl.textContent = kwpNeeded.toFixed(1) + ' kWp';

      const total25El = document.getElementById('landingCalc25Total');
      if (total25El) total25El.textContent = 'Rp ' + (cumulative25 / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' Juta';

      const paybackEl = document.getElementById('landingCalcPayback');
      if (paybackEl) paybackEl.textContent = '~' + paybackYears.toFixed(1) + ' Tahun';
    }

    function applyLandingCalculatorToStudio() {
      const slider = document.getElementById('landingBillSlider');
      const val = slider ? Number(slider.value) : 2800000;
      
      if (typeof simState !== 'undefined') {
        simState.bill = val;
      }
      const studioSlider = document.getElementById('inputBill');
      if (studioSlider) studioSlider.value = val;
      if (typeof onBillSliderChange === 'function') {
        onBillSliderChange(val);
      }
      
      triggerQuickDemo();
    }

    function toggleLandingFaq(index) {
      const body = document.getElementById(`faq-body-${index}`);
      const icon = document.getElementById(`faq-icon-${index}`);
      if (!body) return;
      const isCurrentlyHidden = body.classList.contains('hidden');
      
      for (let i = 1; i <= 5; i++) {
        const b = document.getElementById(`faq-body-${i}`);
        const ic = document.getElementById(`faq-icon-${i}`);
        if (b) b.classList.add('hidden');
        if (ic) ic.style.transform = 'rotate(0deg)';
      }

      if (isCurrentlyHidden) {
        body.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    }

    function triggerQuickDemo() {
      const addr = document.getElementById('landing-address-input');
      if (addr && !addr.value.trim()) {
        addr.value = "Jl. Diponegoro No. 24, Menteng, Jakarta Pusat";
      }
      startScanningSequence();
    }

    function filterLandingLindyCategory(category) {
      if (category === 'kalkulator' || category === 'hemat') {
        document.getElementById('quick-calculator')?.scrollIntoView({ behavior: 'smooth' });
      } else if (category === 'desain' || category === 'studio') {
        goToStudioDirect();
      } else if (category === 'properti') {
        switchState('state-dashboard');
        setTimeout(() => { if (typeof switchDashTab === 'function') switchDashTab('properti'); }, 80);
      }
    }

    window.onLandingCalculatorChange = onLandingCalculatorChange;
    window.applyLandingCalculatorToStudio = applyLandingCalculatorToStudio;
    window.toggleLandingFaq = toggleLandingFaq;
    window.triggerQuickDemo = triggerQuickDemo;
    window.setLandingSampleAddress = setLandingSampleAddress;
    window.filterLandingLindyCategory = filterLandingLindyCategory;

    // Studio Tabs Switching
    function switchTab(targetPaneId, clickedBtn) {
      const allPanes = document.querySelectorAll('.tab-pane');
      allPanes.forEach(pane => {
        pane.classList.add('hidden');
        pane.classList.remove('block');
      });

      const activePane = document.getElementById(targetPaneId);
      if (activePane) {
        activePane.classList.remove('hidden');
        activePane.classList.add('block');
        if (targetPaneId === 'pane-financials') {
          setTimeout(() => {
            updateRoiChart();
            updateEcoTrees(simState.treesEquivalent, Math.max(simState.treesEquivalent, Math.round(((simState.actualYearlyProd || 17850) * 0.8) / 22)));
          }, 30);
        }
      }

      const allTabs = document.querySelectorAll('.studio-tab-btn');
      allTabs.forEach(tab => {
        tab.className = 'studio-tab-btn pb-2.5 text-center text-slate-500 hover:text-slate-800 font-title text-xs font-medium border-b-2 border-transparent flex items-center justify-center gap-1.5 transition-all';
        const badge = tab.querySelector('.tab-badge');
        if (badge) badge.className = 'tab-badge w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[10px] flex items-center justify-center font-bold transition-all';
      });

      clickedBtn.className = 'studio-tab-btn pb-2.5 text-center text-amber-600 font-title text-xs font-bold border-b-2 border-amber-600 flex items-center justify-center gap-1.5 transition-all';
      const activeBadge = clickedBtn.querySelector('.tab-badge');
      if (activeBadge) activeBadge.className = 'tab-badge w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] flex items-center justify-center font-bold transition-all';
    }

    // Pitch & Geometry logic
    function setPitchValue(val) {
      simState.pitch = Number(val);
      const slider = document.getElementById('pitchSlider');
      if (slider) slider.value = val;
      
      const badge = document.getElementById('pitchBadge');
      if (badge) badge.textContent = val + '° Kemiringan';
      
      // Animate SVG Roof Rafter & PV Assembly around pivot (20, 70)
      const roofGroup = document.getElementById('svg-roof-group');
      if (roofGroup) {
        roofGroup.setAttribute('transform', `rotate(-${val}, 20, 70)`);
      }
      
      // Dynamically calculate and update angle arc & shaded wedge
      const arc = document.getElementById('svg-angle-arc');
      const wedge = document.getElementById('svg-angle-wedge');
      if (arc || wedge) {
        const radius = 32;
        const rad = val * Math.PI / 180;
        const arcX = 20 + radius * Math.cos(rad);
        const arcY = 70 - radius * Math.sin(rad);
        
        if (val <= 0.5) {
          if (arc) arc.setAttribute('d', '');
          if (wedge) wedge.setAttribute('d', '');
        } else {
          if (arc) arc.setAttribute('d', `M ${20 + radius} 70 A ${radius} ${radius} 0 0 0 ${arcX.toFixed(1)} ${arcY.toFixed(1)}`);
          if (wedge) wedge.setAttribute('d', `M 20 70 L ${20 + radius} 70 A ${radius} ${radius} 0 0 0 ${arcX.toFixed(1)} ${arcY.toFixed(1)} Z`);
        }
      }
      
      // Real-time Cosine Calculation
      const cosVal = Math.cos(val * Math.PI / 180).toFixed(2);
      const cosineEl = document.getElementById('pitchCosineDisplay');
      if (cosineEl) cosineEl.textContent = `Cos ${val}° = ${cosVal}`;

      const angleValEl = document.getElementById('pitchAngleValue');
      if (angleValEl) angleValEl.textContent = `Kemiringan: ${val}°`;

      // Efficiency status badge in Indonesian
      const badgeEl = document.getElementById('pitchEfficiencyBadge');
      if (badgeEl) {
        if (val >= 15 && val <= 25) {
          badgeEl.className = 'inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md';
          badgeEl.innerHTML = '<span class="material-symbols-outlined text-[13px]">check_circle</span><span>Tangkapan Surya Optimal (99%)</span>';
        } else if (val < 15) {
          badgeEl.className = 'inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md';
          badgeEl.innerHTML = '<span class="material-symbols-outlined text-[13px]">warning</span><span>Sudut Landai: Disarankan Racking 10°</span>';
        } else {
          badgeEl.className = 'inline-flex items-center gap-1 text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md';
          badgeEl.innerHTML = '<span class="material-symbols-outlined text-[13px]">info</span><span>Sudut Curam: Tangkapan Surya Baik (95%)</span>';
        }
      }

      // FIX PRESET BUTTON SELECTION: Exact numeric comparison using data-pitch!
      const presetBtns = document.querySelectorAll('.pitch-preset-btn');
      presetBtns.forEach(btn => {
        const btnPitch = Number(btn.getAttribute('data-pitch') || 0);
        if (btnPitch === Number(val)) {
          btn.className = 'pitch-preset-btn py-1.5 px-1.5 rounded-lg bg-slate-900 text-white border border-slate-900 text-[11px] font-bold text-center shadow-sm transition-all';
        } else {
          btn.className = 'pitch-preset-btn py-1.5 px-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-medium text-center transition-all';
        }
      });
      updateSimulation();
    }

    let currentOffsetX = 0, currentOffsetY = 0;
    let currentRotation = 8;

    function updateDimensions() {
      const r = document.getElementById('input-ridge').value;
      const s = document.getElementById('input-slope').value;
      simState.ridge = Number(r);
      simState.slope = Number(s);
      document.getElementById('canvas-ridge-val').textContent = Number(r).toFixed(2) + ' m';
      document.getElementById('canvas-slope-val').textContent = Number(s).toFixed(2) + ' m';
      
      const box = document.getElementById('cad-array-box');
      if(box) {
        // 1 meter = approx 20px on the canvas
        box.style.width = (simState.ridge * 20) + 'px';
        box.style.height = (simState.slope * 20) + 'px';
        box.style.transform = `translate(calc(-50% + ${currentOffsetX}px), calc(-50% + ${currentOffsetY}px)) rotate(${currentRotation}deg)`;
      }
      
      updateSimulation();
    }

    // ==========================================
    // AZIMUTH ORIENTATION & COMPASS ENGINE
    // ==========================================
    function getAzimuthEfficiency(deg) {
      deg = ((deg % 360) + 360) % 360;
      let devFromMeridian = deg % 180;
      if (devFromMeridian > 90) devFromMeridian = 180 - devFromMeridian; // 0° at N/S, 90° at E/W
      
      // Indonesian tropical solar profile (equatorial ~ -6°S):
      // Max irradiance at North/South axis (~99.4%), slight drop at pure East/West (~91.4%)
      let eff = 0.994 - 0.078 * Math.sin((devFromMeridian * Math.PI) / 180);
      
      // Tropical afternoon thermal factor & cloud profile for West orientation
      if (deg > 180 && deg < 360) {
        eff -= 0.005 * Math.sin((devFromMeridian * Math.PI) / 180);
      }
      
      // Calibrated preset optimal value
      if (Math.round(deg) === 188) return 0.984;
      
      return Math.max(0.88, Math.min(1.0, eff));
    }

    function getAzimuthDetails(deg) {
      deg = ((Math.round(deg) % 360) + 360) % 360;
      
      if (deg === 188) {
        return {
          code: 'SSW',
          name: 'Selatan Daya',
          desc: 'Menghadap garis khatulistiwa. Deviasi 8° dari arah Selatan Sejati (Optimal AI).',
          featureIcon: 'check_circle',
          featureText: 'Bebas bayangan pohon & rintangan sekitar',
          featureClass: 'text-emerald-700'
        };
      }
      if (deg === 180) {
        return {
          code: 'S',
          name: 'Selatan Sejati',
          desc: 'Menghadap poros selatan sempurna. Tangkapan radiasi matahari konstan sepanjang tahun.',
          featureIcon: 'check_circle',
          featureText: 'Poros Selatan Sejati • Tangkapan Maksimal',
          featureClass: 'text-emerald-700'
        };
      }
      if (deg === 0 || deg === 360) {
        return {
          code: 'N',
          name: 'Utara Sejati',
          desc: 'Menghadap khatulistiwa utara. Tangkapan matahari equatorial konsisten.',
          featureIcon: 'check_circle',
          featureText: 'Orientasi Khatulistiwa • Penyinaran Bersih',
          featureClass: 'text-emerald-700'
        };
      }
      if (deg === 90) {
        return {
          code: 'E',
          name: 'Timur Sejati',
          desc: 'Menghadap fajar timur. Produksi puncak pagi hari, berkurang di sore hari.',
          featureIcon: 'wb_sunny',
          featureText: 'Puncak pagi hari • Waspada pohon timur',
          featureClass: 'text-sky-700'
        };
      }
      if (deg === 270) {
        return {
          code: 'W',
          name: 'Barat Sejati',
          desc: 'Menghadap matahari terbenam. Puncak produksi siang ke sore dengan suhu panel lebih hangat.',
          featureIcon: 'thermostat',
          featureText: 'Puncak sore hari • Suhu panel lebih hangat',
          featureClass: 'text-amber-700'
        };
      }

      const directions = [
        { min: 348.75, max: 360, code: 'N', name: 'Utara Sejati', desc: 'Menghadap poros utara. Tangkapan optimal equinox Maret–September.' },
        { min: 0, max: 11.25, code: 'N', name: 'Utara Sejati', desc: 'Menghadap poros utara. Tangkapan optimal equinox Maret–September.' },
        { min: 11.25, max: 33.75, code: 'NNE', name: 'Utara-Timur Laut', desc: 'Orientasi utara condong fajar pagi.' },
        { min: 33.75, max: 56.25, code: 'NE', name: 'Timur Laut', desc: 'Penyinaran stabil pagi hingga siang hari.' },
        { min: 56.25, max: 78.75, code: 'ENE', name: 'Timur Menenggara', desc: 'Tangkapan radiasi dominan matahari terbit.' },
        { min: 78.75, max: 101.25, code: 'E', name: 'Timur', desc: 'Menghadap matahari terbit. Efisiensi puncak pagi hari, berkurang di sore hari.' },
        { min: 101.25, max: 123.75, code: 'ESE', name: 'Tenggara Timur', desc: 'Penyerapan energi baik menjelang tengah hari.' },
        { min: 123.75, max: 146.25, code: 'SE', name: 'Tenggara', desc: 'Menghadap belahan tenggara khatulistiwa.' },
        { min: 146.25, max: 168.75, code: 'SSE', name: 'Selatan-Tenggara', desc: 'Deviasi rendah dari meridian selatan. Tangkapan sangat tinggi.' },
        { min: 168.75, max: 191.25, code: 'SSW', name: 'Selatan Daya', desc: 'Menghadap garis khatulistiwa. Deviasi 8° dari arah Selatan Sejati (Optimal).' },
        { min: 191.25, max: 213.75, code: 'SSW', name: 'Selatan-Barat Daya', desc: 'Orientasi ideal iklim tropis Indonesia dengan pemanfaatan sinar sore.' },
        { min: 213.75, max: 236.25, code: 'SW', name: 'Barat Daya', desc: 'Penyerapan optimal saat matahari condong ke barat daya.' },
        { min: 236.25, max: 258.75, code: 'WSW', name: 'Barat-Barat Daya', desc: 'Tangkapan intensif sore hari, suhu modul cenderung lebih hangat.' },
        { min: 258.75, max: 281.25, code: 'W', name: 'Barat', desc: 'Menghadap matahari terbenam. Puncak produksi siang-sore hari.' },
        { min: 281.25, max: 303.75, code: 'WNW', name: 'Barat-Barat Laut', desc: 'Penyerapan matahari sore condong ke utara.' },
        { min: 303.75, max: 326.25, code: 'NW', name: 'Barat Laut', desc: 'Menghadap barat laut khatulistiwa.' },
        { min: 326.25, max: 348.75, code: 'NNW', name: 'Utara-Barat Laut', desc: 'Cenderung ke utara dengan tangkapan radiasi tengah hari.' }
      ];

      let match = directions.find(d => deg >= d.min && deg < d.max) || directions[0];
      
      let featureIcon = 'check_circle';
      let featureText = 'Bebas bayangan pohon & rintangan sekitar';
      let featureClass = 'text-emerald-700';

      if (deg >= 60 && deg <= 120) {
        featureIcon = 'wb_sunny';
        featureText = 'Puncak pagi hari • Waspada pohon timur';
        featureClass = 'text-sky-700';
      } else if (deg >= 240 && deg <= 300) {
        featureIcon = 'thermostat';
        featureText = 'Puncak sore hari • Suhu panel lebih hangat';
        featureClass = 'text-amber-700';
      }

      return {
        code: match.code,
        name: match.name,
        desc: match.desc,
        featureIcon,
        featureText,
        featureClass
      };
    }

    const AZIMUTH_PRESETS = [0, 90, 180, 188, 270];

    function setAzimuth(deg, syncCad = true) {
      deg = Math.round(deg);
      deg = ((deg % 360) + 360) % 360;
      simState.azimuth = deg;

      // 1. Rotate Needle
      const needle = document.getElementById('compassNeedleWrapper');
      if (needle) {
        needle.style.transform = `rotate(${deg}deg)`;
      }

      // 2. Readouts & Details
      const details = getAzimuthDetails(deg);
      const eff = getAzimuthEfficiency(deg);
      const effPct = (eff * 100).toFixed(1);

      const degEl = document.getElementById('azimuthDegDisplay');
      if (degEl) degEl.textContent = `${deg}°`;

      const sliderVal = document.getElementById('azimuthSliderValDisplay');
      if (sliderVal) sliderVal.textContent = `${deg}°`;

      const slider = document.getElementById('azimuthSlider');
      if (slider && Number(slider.value) !== deg) slider.value = deg;

      const nameEl = document.getElementById('azimuthNameDisplay');
      if (nameEl) nameEl.textContent = `${details.code} (${details.name})`;

      const descEl = document.getElementById('azimuthDescDisplay');
      if (descEl) descEl.textContent = details.desc;

      const featContainer = document.getElementById('azimuthFeatureDisplay');
      const featIcon = document.getElementById('azimuthFeatureIcon');
      const featText = document.getElementById('azimuthFeatureText');
      if (featContainer && featIcon && featText) {
        featContainer.className = `pt-0.5 flex items-center gap-1.5 ${details.featureClass} text-[10px] font-semibold`;
        featIcon.textContent = details.featureIcon;
        featText.textContent = details.featureText;
      }

      const badge = document.getElementById('azimuthEffBadge');
      if (badge) {
        badge.textContent = `${effPct}% Efisiensi Sinar`;
        if (eff >= 0.95) {
          badge.className = 'px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold whitespace-nowrap shrink-0 shadow-2xs transition-colors';
        } else if (eff >= 0.92) {
          badge.className = 'px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-[10px] font-bold whitespace-nowrap shrink-0 shadow-2xs transition-colors';
        } else {
          badge.className = 'px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold whitespace-nowrap shrink-0 shadow-2xs transition-colors';
        }
      }

      // 3. Highlight Preset Button
      document.querySelectorAll('.azimuth-preset-btn').forEach(btn => {
        btn.className = 'azimuth-preset-btn py-1 px-1 rounded bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 border border-slate-200 text-center transition cursor-pointer';
      });
      const exactBtn = document.getElementById(`azimuth-btn-${deg}`);
      if (exactBtn) {
        if (deg === 188) {
          exactBtn.className = 'azimuth-preset-btn py-1 px-1 rounded bg-amber-500 text-white font-bold border border-amber-500 text-center transition shadow-2xs cursor-pointer';
        } else {
          exactBtn.className = 'azimuth-preset-btn py-1 px-1 rounded bg-slate-900 text-white font-bold border border-slate-900 text-center transition shadow-2xs cursor-pointer';
        }
      }

      // 4. Two-way CAD Polygon Sync
      if (syncCad) {
        let rot = deg - 180;
        if (rot > 180) rot -= 360;
        if (rot < -180) rot += 360;
        setPolygonRotation(rot, false);
      }

      // 5. Update Full Energy and Financial Simulation
      updateSimulation();
    }

    function onAzimuthSliderChange(val) {
      setAzimuth(Number(val), true);
    }

    function nudgeAzimuth(delta) {
      const current = simState.azimuth !== undefined ? simState.azimuth : 188;
      const next = ((current + delta) % 360 + 360) % 360;
      setAzimuth(next, true);
    }

    function cycleAzimuthPreset() {
      const current = simState.azimuth !== undefined ? simState.azimuth : 188;
      const idx = AZIMUTH_PRESETS.indexOf(current);
      const next = (idx === -1 || idx === AZIMUTH_PRESETS.length - 1) ? AZIMUTH_PRESETS[0] : AZIMUTH_PRESETS[idx + 1];
      setAzimuth(next, true);
      showCadToast(`Orientasi kompas: ${next}°`);
    }

    function generatePanels() {
      const box = document.getElementById('cad-array-box');
      if (box) {
        box.classList.add('brightness-150');
        setTimeout(() => box.classList.remove('brightness-150'), 300);
      }
      
      const grid = document.getElementById('pv-module-grid');
      if (grid) {
        grid.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
      }
      
      // Auto switch to PV Array tab
      const pvTabBtn = document.querySelectorAll('.studio-tab-btn')[1];
      if(pvTabBtn) pvTabBtn.click();
    }

    // ========================================================
    // CAD POLYGON & PV MODULE ARRAY DYNAMIC RENDERING
    // ========================================================
    function renderPolygonModules() {
      const box = document.getElementById('cad-array-box');
      const roofSurface = document.getElementById('cad-roof-surface');
      const setbackBox = document.getElementById('canvas-setback-box');
      const gutterStrip = document.getElementById('canvas-gutter-strip');
      const grid = document.getElementById('pv-module-grid');
      if (!box || !setbackBox || !grid) return;

      const currentSpec = MODULE_SPECS[simState.modulePower] || MODULE_SPECS[550];
      const usableRidge = Math.max(1, simState.ridge - 2 * simState.setback);
      const usableSlope = Math.max(1, simState.slope - simState.setback - simState.gutter);
      const netArea = usableRidge * usableSlope;

      // 1. Update Box & Setback Margins (20px per meter)
      const setbackPx = Math.round(simState.setback * 20);
      const gutterPx = Math.round(simState.gutter * 20);

      setbackBox.style.top = setbackPx + 'px';
      setbackBox.style.left = setbackPx + 'px';
      setbackBox.style.right = setbackPx + 'px';
      setbackBox.style.bottom = gutterPx + 'px';

      const setbackLabel = document.getElementById('canvas-setback-label');
      if (setbackLabel) setbackLabel.textContent = simState.setback.toFixed(2) + 'm';

      // 2. Update Gutter Waterway Strip
      if (gutterStrip) {
        gutterStrip.style.height = gutterPx + 'px';
      }
      const gutterLabel = document.getElementById('canvas-gutter-label');
      if (gutterLabel) gutterLabel.textContent = simState.gutter.toFixed(2) + 'm';

      // 3. Apply Roof Shape Clipping (Rectangle, L-Shape, or Trapezoid)
      if (roofSurface) {
        if (simState.roofShape === 'l-shape') {
          const lClip = 'polygon(0% 0%, 65% 0%, 65% 42%, 100% 42%, 100% 100%, 0% 100%)';
          roofSurface.style.clipPath = lClip;
          setbackBox.style.clipPath = lClip;
          roofSurface.style.borderRadius = '0px';
        } else if (simState.roofShape === 'trapezoid') {
          const trapClip = 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)';
          roofSurface.style.clipPath = trapClip;
          setbackBox.style.clipPath = trapClip;
          roofSurface.style.borderRadius = '0px';
        } else {
          roofSurface.style.clipPath = 'none';
          setbackBox.style.clipPath = 'none';
          roofSurface.style.borderRadius = '8px';
        }
      }

      // 4. Physical Dimensions Calculation for Selected Module
      const isPortrait = simState.orientation === 'portrait';
      const panelW_m = isPortrait ? currentSpec.w : currentSpec.l;
      const panelL_m = isPortrait ? currentSpec.l : currentSpec.w;
      const panelW_px = Math.round(panelW_m * 20);
      const panelH_px = Math.round(panelL_m * 20);
      const visualGap = Math.max(1, Math.min(6, Math.round((simState.panelGap / 100) * 20)));

      // Position PV Module Grid inside Usable Area with Centered Alignment
      grid.style.top = (setbackPx + 2) + 'px';
      grid.style.left = (setbackPx + 2) + 'px';
      grid.style.right = (setbackPx + 2) + 'px';
      grid.style.bottom = (gutterPx + 2) + 'px';
      grid.style.display = 'grid';
      grid.style.gridTemplateColumns = `repeat(${simState.cols}, ${panelW_px}px)`;
      grid.style.gridTemplateRows = `repeat(${simState.rows}, ${panelH_px}px)`;
      grid.style.gap = visualGap + 'px';
      grid.style.justifyContent = 'center';
      grid.style.alignContent = 'center';

      // 5. Render Individual Interactive Slots
      grid.innerHTML = '';
      let panelCounter = 1;
      const obstacleRow = Math.min(simState.rows - 1, 1);
      const obstacleCol = Math.max(1, Math.floor((simState.cols - 2) / 2));

      for (let r = 0; r < simState.rows; r++) {
        for (let c = 0; c < simState.cols; c++) {
          const key = `${r}_${c}`;

          // Check Roof Geometric Boundary (Out-of-bounds)
          if (simState.roofShape === 'l-shape' && c >= Math.ceil(simState.cols * 0.65) && r < Math.floor(simState.rows * 0.42)) {
            grid.insertAdjacentHTML('beforeend', `<div style="width:${panelW_px}px; height:${panelH_px}px;" class="rounded border border-dashed border-sky-400/20 bg-sky-950/10 pointer-events-none"></div>`);
            continue;
          }
          if (simState.roofShape === 'trapezoid' && r === 0 && (c === 0 || c === simState.cols - 1)) {
            grid.insertAdjacentHTML('beforeend', `<div style="width:${panelW_px}px; height:${panelH_px}px;" class="rounded border border-dashed border-amber-400/20 bg-amber-950/10 pointer-events-none"></div>`);
            continue;
          }

          // Determine Slot State
          let slotState = simState.slotOverrides[key];
          if (!slotState) {
            if (simState.hasObstacle && r === obstacleRow && (c === obstacleCol || c === obstacleCol + 1)) {
              slotState = 'hvac';
            } else if (simState.hasSkylight && r === 0 && c === Math.min(1, simState.cols - 1)) {
              slotState = 'skylight';
            } else {
              slotState = 'active';
            }
          }

          // Render Slot by State
          if (slotState === 'skylight') {
            const skylightHtml = `
              <div style="width:${panelW_px}px; height:${panelH_px}px;"
                   onclick="toggleSlotState(${r}, ${c})"
                   class="group relative rounded-xs bg-sky-400/30 border border-sky-400/90 flex flex-col items-center justify-center text-center backdrop-blur-xs select-none shadow-xs cursor-pointer transition-all hover:scale-105 hover:ring-2 hover:ring-sky-300"
                   title="Slot [${r+1},${c+1}]: Skylight Kaca Atap • Klik untuk ganti ke Rintangan HVAC">
                <span class="material-symbols-outlined text-sky-200 text-[11px] leading-none">grid_view</span>
                <span class="text-[6.5px] font-bold text-sky-100 tracking-tight leading-none mt-0.5">Skylight</span>
                <span class="text-[5.5px] text-sky-200/80 leading-none">Kaca</span>
              </div>
            `;
            grid.insertAdjacentHTML('beforeend', skylightHtml);
          } else if (slotState === 'hvac') {
            const hvacHtml = `
              <div style="width:${panelW_px}px; height:${panelH_px}px;"
                   onclick="toggleSlotState(${r}, ${c})"
                   class="group relative rounded-xs bg-rose-500/25 border border-rose-500/80 flex flex-col items-center justify-center text-center backdrop-blur-xs select-none shadow-xs cursor-pointer transition-all hover:scale-105 hover:ring-2 hover:ring-rose-400"
                   title="Slot [${r+1},${c+1}]: Rintangan HVAC Chiller • Klik untuk ganti ke Slot Kosong">
                <span class="material-symbols-outlined text-rose-300 text-[13px] leading-none">ac_unit</span>
                <span class="text-[6.5px] font-bold text-rose-100 tracking-tight leading-none mt-0.5">HVAC</span>
                <span class="text-[5.5px] text-rose-200/80 leading-none">Chiller</span>
              </div>
            `;
            grid.insertAdjacentHTML('beforeend', hvacHtml);
          } else if (slotState === 'empty') {
            const emptyHtml = `
              <div style="width:${panelW_px}px; height:${panelH_px}px;"
                   onclick="toggleSlotState(${r}, ${c})"
                   class="group relative rounded-xs bg-slate-900/40 border border-dashed border-slate-600/70 hover:border-amber-400/80 flex flex-col items-center justify-center text-center backdrop-blur-xs select-none cursor-pointer transition-all hover:scale-105 hover:bg-slate-800/60"
                   title="Slot [${r+1},${c+1}]: Slot Racking Kosong • Klik untuk pasang Panel Surya">
                <span class="material-symbols-outlined text-slate-400 group-hover:text-amber-300 text-[12px] leading-none transition-colors">add</span>
                <span class="text-[6px] font-medium text-slate-400 group-hover:text-amber-200 leading-none">Kosong</span>
              </div>
            `;
            grid.insertAdjacentHTML('beforeend', emptyHtml);
          } else {
            // Active Solar Panel
            const pId = panelCounter++;
            const isStringA = r < Math.ceil(simState.rows / 2);
            const stringName = isStringA ? 'Str A' : 'Str B';
            const stringBorder = isStringA ? 'border-sky-400/80 hover:border-sky-300' : 'border-amber-400/80 hover:border-amber-300';
            const stringBadgeColor = isStringA ? 'bg-sky-500/90 text-white' : 'bg-amber-500/90 text-white';

            let bgGrad = 'bg-gradient-to-b from-slate-800 via-slate-900 to-blue-950';
            let cellLineColor = 'bg-sky-200/20';
            if (simState.modulePower === 450) {
              bgGrad = 'bg-gradient-to-b from-slate-950 via-neutral-900 to-black';
              cellLineColor = 'bg-white/10';
            } else if (simState.modulePower === 580) {
              bgGrad = 'bg-gradient-to-b from-slate-900 via-sky-950 to-slate-950';
              cellLineColor = 'bg-cyan-200/25';
            }

            const tiltX = (simState.extraTilt || 0) * 0.4;
            const tiltShadow = (simState.extraTilt || 0) * 0.5 + 1;
            const transformStyle = `transform: perspective(300px) rotateX(${tiltX}deg); box-shadow: 0 ${tiltShadow}px ${tiltShadow * 1.5}px rgba(0,0,0,0.6);`;

            let invBadge = '';
            if (simState.inverterType === 'string') {
              invBadge = `<span class="absolute top-0.5 right-0.5 px-0.5 py-0.2 rounded-xs ${stringBadgeColor} font-code-metric text-[5.5px] font-extrabold leading-none shadow-2xs">${stringName}</span>`;
            } else {
              invBadge = `
                <div class="absolute top-0.5 left-1/2 -translate-x-1/2 px-1 py-0.5 rounded-xs bg-slate-950/95 border border-emerald-400 text-[6px] font-extrabold text-emerald-300 flex items-center gap-0.5 shadow-xs z-10 leading-none">
                  <span class="w-1 h-1 rounded-full bg-emerald-400"></span>
                  <span>μ</span>
                </div>
              `;
            }

            const cellDivisions = isPortrait
              ? `<div class="w-full h-px ${cellLineColor}"></div><div class="w-full h-px ${cellLineColor}"></div><div class="w-full h-px ${cellLineColor}"></div>`
              : `<div class="h-full w-px ${cellLineColor}"></div><div class="h-full w-px ${cellLineColor}"></div><div class="h-full w-px ${cellLineColor}"></div>`;

            const flexDir = isPortrait ? 'flex-col' : 'flex-row';

            const panelHtml = `
              <div style="width:${panelW_px}px; height:${panelH_px}px; ${transformStyle}"
                   onclick="toggleSlotState(${r}, ${c})"
                   class="pv-module group relative rounded-xs ${bgGrad} border ${stringBorder} p-0.5 flex ${flexDir} justify-between transition-all duration-200 hover:ring-2 hover:ring-amber-400 hover:scale-105 cursor-pointer"
                   title="Slot [${r+1},${c+1}] • Modul #${pId} • ${simState.modulePower}W (${simState.orientation.toUpperCase()}) • Klik untuk ganti ke Skylight">
                ${invBadge}
                ${cellDivisions}
              </div>
            `;
            grid.insertAdjacentHTML('beforeend', panelHtml);
          }
        }
      }

      // 6. Update Tab 2 Summary Cards & Badges
      const pvarrayCountEl = document.getElementById('pvarray-module-count');
      if (pvarrayCountEl) pvarrayCountEl.textContent = `${simState.moduleCount} Modul`;

      const pvarrayDimEl = document.getElementById('pvarray-grid-dim');
      if (pvarrayDimEl) pvarrayDimEl.textContent = `${simState.rows} Baris × ${simState.cols} Kolom`;

      const pvarrayKwpEl = document.getElementById('pvarray-kwp');
      if (pvarrayKwpEl) pvarrayKwpEl.textContent = `${((simState.moduleCount * simState.modulePower) / 1000).toFixed(2)} kWp`;

      const pvarrayAreaEl = document.getElementById('pvarray-area');
      if (pvarrayAreaEl) {
        const modAreaTotal = (simState.moduleCount * currentSpec.w * currentSpec.l).toFixed(1);
        pvarrayAreaEl.textContent = `${modAreaTotal} m² / ${netArea.toFixed(1)} m²`;
      }

      const densityBadge = document.getElementById('arrayDensityBadge');
      if (densityBadge) {
        const pct = Math.min(100, Math.round(((simState.moduleCount * currentSpec.w * currentSpec.l) / netArea) * 100)) || 0;
        densityBadge.textContent = `Kerapatan ${pct}%`;
      }

      // 7. Update Measurement Overlay if active
      const measureDiag = document.getElementById('measure-diag-val');
      if (measureDiag) {
        const diagM = Math.sqrt(Math.pow(simState.ridge, 2) + Math.pow(simState.slope, 2)).toFixed(2);
        measureDiag.textContent = `Diag: ${diagM}m`;
      }
    }

    function highlightPanel(el, id) {
      el.classList.add('ring-2', 'ring-amber-400', 'scale-105');
      setTimeout(() => el.classList.remove('ring-2', 'ring-amber-400', 'scale-105'), 500);
    }

    // Dynamic Slot Query & State Toggle (Active -> Skylight -> HVAC -> Empty -> Active)
    function getSlotCurrentState(r, c) {
      const key = `${r}_${c}`;
      if (simState.slotOverrides[key]) return simState.slotOverrides[key];
      const obstacleRow = Math.min(simState.rows - 1, 1);
      const obstacleCol = Math.max(1, Math.floor((simState.cols - 2) / 2));
      if (simState.hasObstacle && r === obstacleRow && (c === obstacleCol || c === obstacleCol + 1)) {
        return 'hvac';
      }
      if (simState.hasSkylight && r === 0 && c === Math.min(1, simState.cols - 1)) {
        return 'skylight';
      }
      return 'active';
    }

    function toggleSlotState(r, c) {
      const current = getSlotCurrentState(r, c);
      let next;
      let labelText = '';
      if (current === 'active') {
        next = 'skylight';
        labelText = 'Skylight Kaca Atap (Zona Bebas)';
      } else if (current === 'skylight') {
        next = 'hvac';
        labelText = 'Rintangan HVAC Chiller (Keepout)';
      } else if (current === 'hvac') {
        next = 'empty';
        labelText = 'Slot Kosong / Racking Dilepas';
      } else {
        next = 'active';
        labelText = `Panel Surya Aktif (${simState.modulePower}W)`;
      }

      simState.slotOverrides[`${r}_${c}`] = next;
      updateSimulation();
      showCadToast(`Slot [Baris ${r+1}, Kolom ${c+1}]: ${labelText}`);
    }

    function adjustModuleCount(delta) {
      const validSlots = [];
      for (let r = 0; r < simState.rows; r++) {
        for (let c = 0; c < simState.cols; c++) {
          if (simState.roofShape === 'l-shape' && c >= Math.ceil(simState.cols * 0.65) && r < Math.floor(simState.rows * 0.42)) continue;
          if (simState.roofShape === 'trapezoid' && r === 0 && (c === 0 || c === simState.cols - 1)) continue;
          validSlots.push({ r, c, key: `${r}_${c}` });
        }
      }

      if (delta < 0) {
        for (let i = validSlots.length - 1; i >= 0; i--) {
          const slot = validSlots[i];
          const st = getSlotCurrentState(slot.r, slot.c);
          if (st === 'active') {
            simState.slotOverrides[slot.key] = 'empty';
            break;
          }
        }
      } else if (delta > 0) {
        for (let i = 0; i < validSlots.length; i++) {
          const slot = validSlots[i];
          const st = getSlotCurrentState(slot.r, slot.c);
          if (st === 'empty') {
            simState.slotOverrides[slot.key] = 'active';
            break;
          }
        }
      }

      updateSimulation();
      showCadToast(`Jumlah modul disesuaikan: ${simState.moduleCount} Modul terpasang`);
    }

    function setCustomModuleCount(targetVal) {
      targetVal = Math.max(0, Math.min(simState.maxAvailableSlots, Number(targetVal)));
      const validSlots = [];
      for (let r = 0; r < simState.rows; r++) {
        for (let c = 0; c < simState.cols; c++) {
          if (simState.roofShape === 'l-shape' && c >= Math.ceil(simState.cols * 0.65) && r < Math.floor(simState.rows * 0.42)) continue;
          if (simState.roofShape === 'trapezoid' && r === 0 && (c === 0 || c === simState.cols - 1)) continue;
          validSlots.push({ r, c, key: `${r}_${c}` });
        }
      }

      let allocatedActive = 0;
      validSlots.forEach(slot => {
        const cur = getSlotCurrentState(slot.r, slot.c);
        if (cur === 'skylight' || cur === 'hvac') {
          return;
        }
        if (allocatedActive < targetVal) {
          simState.slotOverrides[slot.key] = 'active';
          allocatedActive++;
        } else {
          simState.slotOverrides[slot.key] = 'empty';
        }
      });

      updateSimulation();
      showCadToast(`Kapasitas diset: ${simState.moduleCount} Modul aktif`);
    }

    function setCountPreset(preset) {
      const validSlots = [];
      for (let r = 0; r < simState.rows; r++) {
        for (let c = 0; c < simState.cols; c++) {
          if (simState.roofShape === 'l-shape' && c >= Math.ceil(simState.cols * 0.65) && r < Math.floor(simState.rows * 0.42)) continue;
          if (simState.roofShape === 'trapezoid' && r === 0 && (c === 0 || c === simState.cols - 1)) continue;
          validSlots.push({ r, c, key: `${r}_${c}` });
        }
      }

      if (preset === 'max') {
        validSlots.forEach(slot => {
          const cur = getSlotCurrentState(slot.r, slot.c);
          if (cur === 'empty') {
            simState.slotOverrides[slot.key] = 'active';
          }
        });
        updateSimulation();
        showCadToast(`Preset Maksimal: ${simState.moduleCount} Modul terpasang`);
      } else if (preset === 'opt') {
        const optCount = Math.max(4, Math.round(simState.maxAvailableSlots * 0.8));
        setCustomModuleCount(optCount);
        showCadToast(`Preset Rekomendasi: ${optCount} Modul (Optimal ROI)`);
      } else if (preset === 'min') {
        const minCount = Math.max(2, Math.round(simState.maxAvailableSlots * 0.5));
        setCustomModuleCount(minCount);
        showCadToast(`Preset Ekonomis: ${minCount} Modul`);
      }
    }

    // Handlers for Geometry & PV Array Parameters
    function onSetbackChange(val) {
      simState.setback = Number(val);
      const disp = document.getElementById('setbackDisplay');
      if (disp) disp.textContent = Number(val).toFixed(2) + ' m';
      const slider = document.getElementById('setbackSlider');
      if (slider && Number(slider.value) !== Number(val)) slider.value = val;
      updateSimulation();
    }

    function onGutterChange(val) {
      simState.gutter = Number(val);
      const disp = document.getElementById('gutterDisplay');
      if (disp) disp.textContent = Number(val).toFixed(2) + ' m';
      const slider = document.getElementById('gutterSlider');
      if (slider && Number(slider.value) !== Number(val)) slider.value = val;
      updateSimulation();
    }

    function setLayoutOrientation(type) {
      simState.orientation = type;
      const btnPort = document.getElementById('btn-layout-portrait');
      const btnLand = document.getElementById('btn-layout-landscape');

      if (type === 'portrait') {
        if (btnPort) btnPort.className = 'py-1.5 px-3 rounded-md bg-slate-900 text-white shadow-sm text-xs font-semibold flex items-center justify-center gap-1.5 transition-all';
        if (btnLand) btnLand.className = 'py-1.5 px-3 rounded-md text-slate-500 hover:text-slate-800 text-xs font-medium flex items-center justify-center gap-1.5 transition-all';
      } else {
        if (btnLand) btnLand.className = 'py-1.5 px-3 rounded-md bg-slate-900 text-white shadow-sm text-xs font-semibold flex items-center justify-center gap-1.5 transition-all';
        if (btnPort) btnPort.className = 'py-1.5 px-3 rounded-md text-slate-500 hover:text-slate-800 text-xs font-medium flex items-center justify-center gap-1.5 transition-all';
      }

      // Reset slot overrides on orientation swap for clean repacking
      simState.slotOverrides = {};
      simState.customCount = null;

      updateSimulation();
      showCadToast(`Orientasi Modul: ${type.toUpperCase()}`);
    }

    function onGapChange(val) {
      simState.panelGap = Number(val);
      const disp = document.getElementById('gapValDisplay');
      if (disp) disp.textContent = val + ' cm';
      const slider = document.getElementById('gapSlider');
      if (slider && Number(slider.value) !== Number(val)) slider.value = val;
      updateSimulation();
    }

    function onExtraTiltChange(val) {
      simState.extraTilt = Number(val);
      const disp = document.getElementById('rackValDisplay');
      if (disp) disp.textContent = val + '°';
      const slider = document.getElementById('rackSlider');
      if (slider && Number(slider.value) !== Number(val)) slider.value = val;
      updateSimulation();
    }

    function onModuleChange(val) {
      simState.modulePower = Number(val);
      const spec = MODULE_SPECS[val] || MODULE_SPECS[550];
      const effBadge = document.getElementById('moduleEffBadge');
      if (effBadge) effBadge.textContent = spec.eff + ' Efisiensi';
      const dimBadge = document.getElementById('moduleDimBadge');
      if (dimBadge) dimBadge.textContent = `${spec.l}m × ${spec.w}m`;
      const techBadge = document.getElementById('moduleTechBadge');
      if (techBadge) techBadge.textContent = spec.desc;

      // Reset slot overrides so grid cleanly repacks with new physical dimensions
      simState.slotOverrides = {};
      simState.customCount = null;

      updateSimulation();
      showCadToast(`Tipe Modul: ${spec.name} (${spec.l}m × ${spec.w}m)`);
    }

    function setInverterType(type) {
      simState.inverterType = type;
      const btnString = document.getElementById('btn-string-inv');
      const btnMicro = document.getElementById('btn-micro-inv');
      const sizingRatio = document.getElementById('invSizingRatio');
      const sizingDesc = document.getElementById('invSizingDesc');
      const effDisplay = document.getElementById('invEffDisplay');
      const ratingDesc = document.getElementById('invRatingDesc');

      if (type === 'string') {
        if (btnString) btnString.className = 'py-1.5 px-2 rounded-md bg-slate-900 text-white shadow-sm text-xs font-semibold text-center transition';
        if (btnMicro) btnMicro.className = 'py-1.5 px-2 rounded-md text-slate-500 hover:text-slate-900 text-xs font-medium text-center transition';
        if (sizingRatio) sizingRatio.textContent = 'DC/AC: 1.22';
        if (sizingDesc) sizingDesc.textContent = 'Optimal Sizing';
        if (effDisplay) effDisplay.textContent = '98.4%';
        if (ratingDesc) ratingDesc.textContent = 'CEC Rating';
      } else {
        if (btnMicro) btnMicro.className = 'py-1.5 px-2 rounded-md bg-slate-900 text-white shadow-sm text-xs font-semibold text-center transition';
        if (btnString) btnString.className = 'py-1.5 px-2 rounded-md text-slate-500 hover:text-slate-900 text-xs font-medium text-center transition';
        if (sizingRatio) sizingRatio.textContent = 'DC/AC: 1.15';
        if (sizingDesc) sizingDesc.textContent = 'Per-Module MPPT';
        if (effDisplay) effDisplay.textContent = '97.2%';
        if (ratingDesc) ratingDesc.textContent = 'Rapid Shutdown Ready';
      }
      updateSimulation();
    }

    function autoPackModules() {
      const modules = document.querySelectorAll('.pv-module');
      modules.forEach(m => {
        m.classList.add('ring-2', 'ring-amber-400');
        setTimeout(() => m.classList.remove('ring-2', 'ring-amber-400'), 600);
      });
      // Toggle orientation or optimal fit
      const nextOri = simState.orientation === 'portrait' ? 'landscape' : 'portrait';
      setLayoutOrientation(nextOri);
      showCadToast(`Tata letak diatur ulang: Orientasi ${nextOri.toUpperCase()}`);
    }

    function triggerSimulationFlash() {
      const box = document.getElementById('cad-array-box');
      if (box) {
        box.classList.add('scale-[1.01]', 'filter', 'brightness-110');
        setTimeout(() => box.classList.remove('scale-[1.01]', 'filter', 'brightness-110'), 300);
      }
      calculateFinancials();
      showCadToast('Konfigurasi tata letak berhasil diterapkan!');
    }

    // ========================================================
    // ADVANCED POLYGON EDITING, ROTATION, MOVE & SHAPES
    // ========================================================
    function setRoofShape(shape) {
      simState.roofShape = shape;
      simState.slotOverrides = {};
      simState.customCount = null;

      document.querySelectorAll('.roof-shape-btn').forEach(btn => {
        btn.className = 'roof-shape-btn py-2 px-1 rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 text-center transition-all flex flex-col items-center gap-1';
      });
      const activeBtn = document.getElementById('btn-shape-' + (shape === 'l-shape' ? 'lshape' : shape));
      if (activeBtn) {
        activeBtn.className = 'roof-shape-btn py-2 px-1 rounded-lg bg-slate-900 text-white border border-slate-900 text-center shadow-xs transition-all flex flex-col items-center gap-1';
      }
      const badge = document.getElementById('polygonStatusBadge');
      if (badge) {
        if (shape === 'rectangle') badge.textContent = 'Gable Standar';
        else if (shape === 'l-shape') badge.textContent = 'Bentuk L Corner';
        else badge.textContent = 'Limasan (Hip)';
      }
      updateSimulation();
      showCadToast(`Bentuk atap: ${shape === 'l-shape' ? 'Bentuk L (Corner)' : shape === 'trapezoid' ? 'Limasan (Hip)' : 'Persegi (Gable)'}`);
    }

    function setPolygonRotation(deg, syncAzimuth = true) {
      currentRotation = Number(deg);
      const disp = document.getElementById('polygonRotationDisplay');
      if (disp) disp.textContent = (currentRotation > 0 ? '+' : '') + currentRotation + '°';
      const slider = document.getElementById('polygonRotationSlider');
      if (slider && Number(slider.value) !== Number(deg)) slider.value = deg;
      
      const box = document.getElementById('cad-array-box');
      if (box) {
        box.style.transform = `translate(calc(-50% + ${currentOffsetX}px), calc(-50% + ${currentOffsetY}px)) rotate(${currentRotation}deg) scale(${zoomLevel})`;
      }
      const badge = document.getElementById('rotate-hud-badge');
      if (badge) badge.textContent = `${deg}°`;

      if (syncAzimuth && typeof setAzimuth === 'function') {
        let az = ((Number(deg) + 180) % 360 + 360) % 360;
        setAzimuth(az, false);
      }
    }

    function nudgePolygon(dx, dy) {
      currentOffsetX += dx;
      currentOffsetY += dy;
      const disp = document.getElementById('polygonOffsetDisplay');
      if (disp) disp.textContent = `X: ${currentOffsetX >= 0 ? '+' : ''}${currentOffsetX}px, Y: ${currentOffsetY >= 0 ? '+' : ''}${currentOffsetY}px`;
      const box = document.getElementById('cad-array-box');
      if (box) {
        box.style.transform = `translate(calc(-50% + ${currentOffsetX}px), calc(-50% + ${currentOffsetY}px)) rotate(${currentRotation}deg) scale(${zoomLevel})`;
      }
    }

    function centerPolygonPosition() {
      currentOffsetX = 0;
      currentOffsetY = 0;
      const disp = document.getElementById('polygonOffsetDisplay');
      if (disp) disp.textContent = 'X: 0px, Y: 0px';
      const box = document.getElementById('cad-array-box');
      if (box) {
        box.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg) scale(${zoomLevel})`;
      }
      showCadToast('📍 Posisi poligon dipusatkan kembali ke tengah atap.');
    }

    function toggleObstacle(type) {
      if (type === 'hvac') {
        simState.hasObstacle = !simState.hasObstacle;
        const obstacleRow = Math.min(simState.rows - 1, 1);
        const obstacleCol = Math.max(1, Math.floor((simState.cols - 2) / 2));
        delete simState.slotOverrides[`${obstacleRow}_${obstacleCol}`];
        delete simState.slotOverrides[`${obstacleRow}_${obstacleCol + 1}`];

        const btn = document.getElementById('btn-toggle-hvac');
        const label = document.getElementById('hvacBtnLabel');
        if (simState.hasObstacle) {
          if (btn) btn.className = 'py-1.5 px-2 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition';
          if (label) label.textContent = 'HVAC Chiller (Aktif)';
          showCadToast('Rintangan HVAC Chiller diaktifkan (Keepout 2 slot panel)');
        } else {
          if (btn) btn.className = 'py-1.5 px-2 rounded-lg bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 text-xs font-medium flex items-center justify-center gap-1.5 transition';
          if (label) label.textContent = '+ HVAC Chiller';
          showCadToast('Rintangan HVAC Chiller dinonaktifkan (Slot panel dipulihkan)');
        }
      } else if (type === 'skylight') {
        simState.hasSkylight = !simState.hasSkylight;
        delete simState.slotOverrides[`0_${Math.min(1, simState.cols - 1)}`];

        const btn = document.getElementById('btn-toggle-skylight');
        const label = document.getElementById('skylightBtnLabel');
        if (simState.hasSkylight) {
          if (btn) btn.className = 'py-1.5 px-2 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition';
          if (label) label.textContent = 'Skylight (Aktif)';
          showCadToast('Rintangan Skylight Kaca diaktifkan');
        } else {
          if (btn) btn.className = 'py-1.5 px-2 rounded-lg bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 text-xs font-medium flex items-center justify-center gap-1.5 transition';
          if (label) label.textContent = '+ Skylight Kaca';
          showCadToast('Rintangan Skylight Kaca dinonaktifkan');
        }
      }
      const badge = document.getElementById('obstacleCountBadge');
      if (badge) {
        const count = (simState.hasObstacle ? 1 : 0) + (simState.hasSkylight ? 1 : 0);
        badge.textContent = `${count} Rintangan Aktif`;
      }
      updateSimulation();
    }

    let toastTimer = null;
    function showCadToast(msg) {
      const toast = document.getElementById('cad-tool-toast');
      const toastMsg = document.getElementById('cad-tool-toast-msg');
      if (!toast) return;
      if (toastMsg) toastMsg.textContent = msg;
      toast.classList.remove('hidden');
      toast.classList.add('flex');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('flex');
      }, 2600);
    }

    let activeCadTool = 'select';
    function setCadTool(tool, btn) {
      activeCadTool = tool;
      document.querySelectorAll('.cad-tool-btn').forEach(b => {
        b.classList.remove('bg-amber-500', 'text-white', 'shadow-sm');
        b.classList.add('text-slate-500', 'hover:text-slate-900', 'hover:bg-slate-100');
      });
      if (btn) {
        btn.classList.remove('text-slate-500', 'hover:text-slate-900', 'hover:bg-slate-100');
        btn.classList.add('bg-amber-500', 'text-white', 'shadow-sm');
      }

      const box = document.getElementById('cad-array-box');
      const handles = document.querySelectorAll('.cad-handle');
      const measureOverlay = document.getElementById('measure-overlay');

      if (tool === 'select') {
        if (box) box.style.cursor = 'grab';
        handles.forEach(h => h.classList.remove('scale-125', 'ring-4', 'ring-amber-400', 'animate-pulse'));
        if (measureOverlay) measureOverlay.classList.add('hidden');
        showCadToast('Mode Geser: Seret poligon atap secara bebas di atas citra satelit.');
      } else if (tool === 'edit_polygon') {
        if (box) box.style.cursor = 'crosshair';
        handles.forEach(h => h.classList.add('scale-125', 'ring-4', 'ring-amber-400', 'animate-pulse'));
        if (measureOverlay) measureOverlay.classList.add('hidden');
        showCadToast('Mode Edit Simpul: Tarik titik sudut untuk merubah geometri atap.');
      } else if (tool === 'add_obstacle') {
        toggleObstacle('skylight');
      } else if (tool === 'measure') {
        if (measureOverlay) measureOverlay.classList.toggle('hidden');
        const isShown = measureOverlay && !measureOverlay.classList.contains('hidden');
        showCadToast(isShown ? `Penggaris CAD: Bubungan ${simState.ridge.toFixed(2)}m • Kemiringan ${simState.slope.toFixed(2)}m` : 'Penggaris CAD Dinonaktifkan');
      }
    }

    // Reset Defaults Function (Restores AI Automatic Baseline)
    function resetCanvasDefaults() {
      currentOffsetX = 0;
      currentOffsetY = 0;
      currentRotation = 8;
      zoomLevel = 1;
      simState.ridge = 12.48;
      simState.slope = 7.28;
      simState.pitch = 22;
      simState.azimuth = 188;
      simState.roofShape = 'rectangle';
      simState.hasObstacle = true;
      simState.hasSkylight = false;
      simState.setback = 0.50;
      simState.gutter = 0.60;
      simState.modulePower = 550;
      simState.orientation = 'portrait';
      simState.panelGap = 3;
      simState.extraTilt = 10;
      simState.inverterType = 'string';
      simState.slotOverrides = {};
      simState.customCount = null;

      const inputR = document.getElementById('input-ridge');
      if (inputR) inputR.value = "12.48";
      const inputS = document.getElementById('input-slope');
      if (inputS) inputS.value = "7.28";

      setPitchValue(22);
      onSetbackChange(0.50);
      onGutterChange(0.60);
      onGapChange(3);
      onExtraTiltChange(10);
      setLayoutOrientation('portrait');
      setInverterType('string');
      setRoofShape('rectangle');
      setPolygonRotation(8, false);
      setAzimuth(188, false);

      const moduleSelect = document.getElementById('moduleSelect');
      if (moduleSelect) moduleSelect.value = "550";
      onModuleChange(550);

      const offsetDisp = document.getElementById('polygonOffsetDisplay');
      if (offsetDisp) offsetDisp.textContent = 'X: 0px, Y: 0px';

      const box = document.getElementById('cad-array-box');
      if (box) {
        box.style.width = (simState.ridge * 20) + 'px';
        box.style.height = (simState.slope * 20) + 'px';
        box.style.transform = `translate(-50%, -50%) rotate(-4deg) scale(1)`;
        box.classList.add('ring-4', 'ring-emerald-400');
        setTimeout(() => box.classList.remove('ring-4', 'ring-emerald-400'), 600);
      }

      setMapLayer('satellite');
      showCadToast('↺ Poligon & geometri berhasil direset ke deteksi otomatis!');
    }

    let zoomLevel = 1;
    function zoomCanvas(factor) {
      zoomLevel *= factor;
      if (zoomLevel < 0.7) zoomLevel = 0.7;
      if (zoomLevel > 1.6) zoomLevel = 1.6;
      const box = document.getElementById('cad-array-box');
      if (box) {
        box.style.transform = `translate(calc(-50% + ${currentOffsetX}px), calc(-50% + ${currentOffsetY}px)) rotate(${currentRotation}deg) scale(${zoomLevel})`;
      }
      showCadToast(`Zoom CAD: ${Math.round(zoomLevel * 100)}%`);
    }

    // Financial Calculation Logic
    function onBillSliderChange(val) {
      simState.bill = Number(val);
      
      const formatted = 'Rp ' + simState.bill.toLocaleString('id-ID');
      const billDisplay = document.getElementById('billValueDisplay');
      if(billDisplay) billDisplay.textContent = formatted;
      
      const yearly = simState.bill * 12;
      const billYearly = document.getElementById('billYearlyText');
      if(billYearly) billYearly.textContent = 'Rp ' + (yearly / 1000000).toFixed(1) + 'M / tahun';
      
      updateSimulation();
    }

    function calculateFinancials() {
      const tariffSelect = document.getElementById('plnTariffSelect');
      if (tariffSelect) simState.tariff = Number(tariffSelect.value);
      
      const bill = document.getElementById('billSlider').value;
      onBillSliderChange(bill);
    }

    // Modals Handling
    function openPdfModal() {
      document.getElementById('modal-pdf').classList.remove('hidden');
    }
    function closePdfModal() {
      document.getElementById('modal-pdf').classList.add('hidden');
      document.getElementById('pdf-download-toast').classList.add('hidden');
    }
    function simulatePdfDownload() {
      const toast = document.getElementById('pdf-download-toast');
      toast.classList.remove('hidden');
      setTimeout(() => {
        closePdfModal();
      }, 1400);
    }

    function openInstallerModal() {
      document.getElementById('modal-installer').classList.remove('hidden');
      document.getElementById('installer-form-fields').classList.remove('hidden');
      document.getElementById('installer-form-success').classList.add('hidden');
    }
    function closeInstallerModal() {
      document.getElementById('modal-installer').classList.add('hidden');
    }
    function submitInstallerQuote() {
      document.getElementById('installer-form-fields').classList.add('hidden');
      document.getElementById('installer-form-success').classList.remove('hidden');
    }

    function toggleLayerDrawer() {
      const panel = document.getElementById('layer-drawer-panel');
      const chevron = document.getElementById('navbar-layer-chevron');
      if (!panel) return;
      const isHidden = panel.classList.contains('hidden');
      if (isHidden) {
        panel.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      } else {
        panel.classList.add('hidden');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      }
    }

    function closeLayerDrawer() {
      const panel = document.getElementById('layer-drawer-panel');
      const chevron = document.getElementById('navbar-layer-chevron');
      if (panel) panel.classList.add('hidden');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }

    function selectCvLayer(type) {
      setMapLayer(type);
      closeLayerDrawer();
    }

    // Close Layer Drawer on outside click
    document.addEventListener('click', function(e) {
      const panel = document.getElementById('layer-drawer-panel');
      const btn = document.getElementById('btn-layer-drawer');
      if (panel && !panel.classList.contains('hidden')) {
        if (!panel.contains(e.target) && !btn.contains(e.target)) {
          closeLayerDrawer();
        }
      }
    });

    let currentMapLayer = 'satellite';
    let currentSimulatedHour = 12;

    function setMapLayer(type) {
      const validTypes = ['satellite', 'cv', 'heatmap'];
      if (!validTypes.includes(type)) {
        if (type === 'grayscale' || type === 'edge' || type === 'otsu' || type === 'obstacle') {
          type = 'cv'; // Backward-compatible alias
        } else {
          type = 'satellite';
        }
      }
      currentMapLayer = type;

      // 1. Update Navbar Trigger Button Title & Icon
      const navbarTitle = document.getElementById('navbar-active-layer-title');
      const navbarIcon = document.getElementById('navbar-active-layer-icon');
      
      const layerMeta = {
        satellite: { title: 'Satelit RGB', icon: 'satellite_alt', color: 'text-sky-600' },
        cv: { title: 'Deteksi Atap [CV]', icon: 'polyline', color: 'text-emerald-600' },
        heatmap: { title: 'Heatmap Surya', icon: 'wb_sunny', color: 'text-amber-500' }
      };

      const curMeta = layerMeta[type] || layerMeta.satellite;
      if (navbarTitle) navbarTitle.textContent = curMeta.title;
      if (navbarIcon) {
        navbarIcon.textContent = curMeta.icon;
        navbarIcon.className = `material-symbols-outlined text-[17px] ${curMeta.color}`;
      }

      // 2. Update Active Item Highlight in Drawer Panel
      validTypes.forEach(t => {
        const item = document.getElementById(`layer-item-${t}`);
        if (!item) return;
        const badge = item.querySelector('.layer-active-badge');
        if (t === type) {
          item.className = 'layer-drawer-item w-full p-2.5 rounded-xl border border-amber-400 bg-amber-50/80 text-left flex items-start gap-2.5 transition cursor-pointer shadow-2xs';
          if (badge) badge.classList.remove('hidden');
        } else {
          item.className = 'layer-drawer-item w-full p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-left flex items-start gap-2.5 transition cursor-pointer';
          if (badge) badge.classList.add('hidden');
        }
      });

      // 3. Control Canvas Overlays & Background Shader Filters
      const mapBg = document.getElementById('map-bg');
      const heatmap = document.getElementById('heatmap-overlay');
      const cvOverlay = document.getElementById('cv-vision-overlay');
      const radiometerHud = document.getElementById('radiometer-probe-hud');

      // Hide all overlays first
      if (heatmap) heatmap.classList.add('opacity-0');
      if (cvOverlay) cvOverlay.classList.add('opacity-0');
      if (radiometerHud) radiometerHud.classList.add('hidden');

      // 4. Update Telemetry in Drawer Footer
      const drawerAlgo = document.getElementById('drawer-telemetry-algo');
      const drawerStage = document.getElementById('drawer-telemetry-stage');
      const drawerFormula = document.getElementById('drawer-telemetry-formula');

      if (type === 'satellite') {
        if (mapBg) mapBg.style.filter = 'none';
        if (drawerAlgo) drawerAlgo.textContent = 'Ortofoto Satelit 90° Nadir';
        if (drawerStage) drawerStage.textContent = 'INPUT CITRA RGB';
        if (drawerFormula) drawerFormula.textContent = 'Sensor: WorldView-3 | Resolusi: 1024×1024 px';
        showCadToast('👁️ Mode: Ortofoto Satelit RGB Asli');
      } 
      else if (type === 'cv') {
        if (mapBg) mapBg.style.filter = 'contrast(135%) brightness(82%) saturate(110%)';
        if (cvOverlay) cvOverlay.classList.remove('opacity-0');
        if (drawerAlgo) drawerAlgo.textContent = 'Fusi Deteksi Atap (Canny + Otsu + Halangan)';
        if (drawerStage) drawerStage.textContent = 'SEGMENTASI & FITUR';
        if (drawerFormula) drawerFormula.textContent = 'G = √(Gx² + Gy²) | Otsu T*=138 | AC Setback 0.5m';
        showCadToast('⚡ Mode: Deteksi Poligon Atap, Tepi Canny & Halangan [CV]');
      } 
      else if (type === 'heatmap') {
        if (mapBg) mapBg.style.filter = 'grayscale(80%) contrast(140%) brightness(45%)';
        if (heatmap) heatmap.classList.remove('opacity-0');
        if (drawerAlgo) drawerAlgo.textContent = 'Radiometri Iradiansi Surya Terdistribusi';
        if (drawerStage) drawerStage.textContent = 'ANALISIS RADIOMETRI';
        if (drawerFormula) drawerFormula.textContent = 'G_eff = G_in · cos(θ) · η_azimuth | 4.85 kWh/m²/hari';
        showCadToast('☀️ Mode: Radiometri Heatmap Surya (Arahkan kursor ke atap untuk probe iradiansi)');
      }
    }

    // ==========================================
    // INTERACTIVE CV ACTIONS (Literal Bisa Dipakai)
    // ==========================================
    function syncCadToCvContour() {
      // Snap CAD array dimensions and rotation exactly to the CV Otsu/Canny detected contour
      simState.ridge = 12.48;
      simState.slope = 7.28;
      centerPolygonPosition();
      setPolygonRotation(-4, true);
      updateDimensions();
      calculateFinancials();
      showCadToast('🎯 Modul CAD disinkronkan ke kontur poligon atap CV (12.48m × 7.28m, -4° Rotasi)');
    }

    function toggleObstacleFiltering() {
      toggleObstacle('hvac');
      const drawerBtn = document.getElementById('btn-toggle-obstacle-filter');
      if (drawerBtn) {
        if (simState.hasObstacle) {
          drawerBtn.textContent = 'AKTIF';
          drawerBtn.className = 'px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300 transition cursor-pointer';
        } else {
          drawerBtn.textContent = 'NON-AKTIF';
          drawerBtn.className = 'px-2 py-0.5 rounded-lg bg-slate-200 text-slate-600 font-bold text-[10px] border border-slate-300 transition cursor-pointer';
        }
      }
    }

    function onObstacleClick(type) {
      if (type === 'ac') {
        showCadToast('⚠️ Rintangan Terdeteksi CV: Unit Outdoor AC (Dimensi: 0.85 m², Setback Wajib: 0.50 m)');
      } else if (type === 'skylight') {
        showCadToast('💡 Rintangan Terdeteksi CV: Jendela Kaca Skylight Atap (0.62 m², Transparan)');
      }
    }

    function setSimulatedSunHour(hour) {
      currentSimulatedHour = hour;
      const btn9 = document.getElementById('btn-sun-9');
      const btn12 = document.getElementById('btn-sun-12');
      const btn15 = document.getElementById('btn-sun-15');
      const label = document.getElementById('sun-hour-label');
      const heatmap = document.getElementById('heatmap-overlay');

      const inactiveBtn = 'py-1 rounded bg-white hover:bg-amber-100/70 border border-amber-200 text-slate-700 font-medium transition cursor-pointer';
      const activeBtn = 'py-1 rounded bg-amber-500 text-slate-950 font-bold border border-amber-600 transition cursor-pointer shadow-xs';

      if (btn9) btn9.className = hour === 9 ? activeBtn : inactiveBtn;
      if (btn12) btn12.className = hour === 12 ? activeBtn : inactiveBtn;
      if (btn15) btn15.className = hour === 15 ? activeBtn : inactiveBtn;

      if (label) {
        if (hour === 9) label.textContent = '09:00 (Pagi - 760 W/m²)';
        else if (hour === 12) label.textContent = '12:00 (Puncak - 980 W/m²)';
        else if (hour === 15) label.textContent = '15:00 (Sore - 690 W/m²)';
      }

      if (heatmap) {
        if (hour === 9) {
          heatmap.style.background = 'radial-gradient(ellipse at 35% 40%, rgba(251,191,36,0.38), rgba(249,115,22,0.2), transparent 70%)';
        } else if (hour === 12) {
          heatmap.style.background = 'radial-gradient(ellipse at center, rgba(245,158,11,0.52), rgba(244,63,94,0.26), transparent 75%)';
        } else if (hour === 15) {
          heatmap.style.background = 'radial-gradient(ellipse at 65% 40%, rgba(249,115,22,0.38), rgba(225,29,72,0.22), transparent 70%)';
        }
      }

      showCadToast(`☀️ Simulasi Insolasi Jam ${hour}:00 dimuat`);
    }

    // Initialize on load & DOM Event Listeners
    window.addEventListener('DOMContentLoaded', () => {
      onLandingCalculatorChange(2800000);
      initEcoForest();
      setPitchValue(22);
      setPolygonRotation(8, false);
      setAzimuth(188, false);
      calculateFinancials();
      updateDimensions();
      
      // Interactivity State for CAD Box
      const box = document.getElementById('cad-array-box');
      const rotateBadge = document.getElementById('rotate-hud-badge');
      let isResizing = false, isDragging = false, isRotating = false;
      let activeHandle = null;
      let startX, startY, startR, startS, dragStartX, dragStartY;
      let centerX = 0, centerY = 0;

      // 1. Resizing (Corner & Edge Handles with directional awareness)
      document.querySelectorAll('.cad-handle').forEach(handle => {
        handle.addEventListener('mousedown', function(e) {
          isResizing = true;
          activeHandle = this.getAttribute('data-handle');
          startX = e.clientX;
          startY = e.clientY;
          startR = simState.ridge;
          startS = simState.slope;
          box.style.transition = 'none';
          e.preventDefault();
          e.stopPropagation();
        });
      });

      // 2. Dragging (Move Box over map)
      box.addEventListener('mousedown', function(e) {
        if (e.target.closest('.cad-handle, #rotate-handle, .pv-module button, .pv-module input')) return;
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        box.style.cursor = 'grabbing';
        box.style.transition = 'none';
        e.preventDefault();
      });

      // 3. Rotating (Angle around box center)
      const rotateHandle = document.getElementById('rotate-handle');
      if (rotateHandle) {
        rotateHandle.addEventListener('mousedown', function(e) {
          isRotating = true;
          const rect = box.getBoundingClientRect();
          centerX = rect.left + rect.width / 2;
          centerY = rect.top + rect.height / 2;
          if (rotateBadge) rotateBadge.classList.remove('hidden');
          box.style.transition = 'none';
          e.preventDefault();
          e.stopPropagation();
        });
      }

      // Mouse Move Dispatcher
      document.addEventListener('mousemove', function(e) {
        if (isResizing) {
          let dx = e.clientX - startX;
          let dy = e.clientY - startY;
          let newR = startR;
          let newS = startS;

          if (activeHandle === 'tr') {
            newR = startR + (dx * 0.05);
            newS = startS - (dy * 0.05);
          } else if (activeHandle === 'tl') {
            newR = startR - (dx * 0.05);
            newS = startS - (dy * 0.05);
          } else if (activeHandle === 'br') {
            newR = startR + (dx * 0.05);
            newS = startS + (dy * 0.05);
          } else if (activeHandle === 'bl') {
            newR = startR - (dx * 0.05);
            newS = startS + (dy * 0.05);
          } else if (activeHandle === 'right') {
            newR = startR + (dx * 0.05);
          } else if (activeHandle === 'left') {
            newR = startR - (dx * 0.05);
          } else if (activeHandle === 'bottom') {
            newS = startS + (dy * 0.05);
          } else if (activeHandle === 'top') {
            newS = startS - (dy * 0.05);
          }

          newR = Math.max(5, Math.min(30, newR));
          newS = Math.max(3, Math.min(20, newS));

          simState.ridge = newR;
          simState.slope = newS;

          const rInput = document.getElementById('input-ridge');
          const sInput = document.getElementById('input-slope');
          if (rInput) rInput.value = newR.toFixed(2);
          if (sInput) sInput.value = newS.toFixed(2);

          const rDisp = document.getElementById('canvas-ridge-val');
          const sDisp = document.getElementById('canvas-slope-val');
          if (rDisp) rDisp.textContent = newR.toFixed(2) + ' m';
          if (sDisp) sDisp.textContent = newS.toFixed(2) + ' m';

          box.style.width = (newR * 20) + 'px';
          box.style.height = (newS * 20) + 'px';
          box.style.transform = `translate(calc(-50% + ${currentOffsetX}px), calc(-50% + ${currentOffsetY}px)) rotate(${currentRotation}deg) scale(${zoomLevel})`;
        } else if (isDragging) {
          let dx = e.clientX - dragStartX;
          let dy = e.clientY - dragStartY;
          dragStartX = e.clientX;
          dragStartY = e.clientY;
          currentOffsetX += dx;
          currentOffsetY += dy;
          box.style.transform = `translate(calc(-50% + ${currentOffsetX}px), calc(-50% + ${currentOffsetY}px)) rotate(${currentRotation}deg) scale(${zoomLevel})`;

          const disp = document.getElementById('polygonOffsetDisplay');
          if (disp) disp.textContent = `X: ${currentOffsetX >= 0 ? '+' : ''}${currentOffsetX}px, Y: ${currentOffsetY >= 0 ? '+' : ''}${currentOffsetY}px`;
        } else if (isRotating) {
          const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
          let rot = Math.round(angle + 90);
          if (rot > 180) rot -= 360;
          if (rot < -180) rot += 360;
          currentRotation = rot;

          box.style.transform = `translate(calc(-50% + ${currentOffsetX}px), calc(-50% + ${currentOffsetY}px)) rotate(${currentRotation}deg) scale(${zoomLevel})`;

          if (rotateBadge) rotateBadge.textContent = `${rot}°`;
          const disp = document.getElementById('polygonRotationDisplay');
          if (disp) disp.textContent = `${rot > 0 ? '+' : ''}${rot}°`;
          const slider = document.getElementById('polygonRotationSlider');
          if (slider && Number(slider.value) !== rot) slider.value = rot;

          // Live sync compass azimuth during interactive CAD mouse rotation
          if (typeof setAzimuth === 'function') {
            let az = ((rot + 180) % 360 + 360) % 360;
            setAzimuth(az, false);
          }
        }
      });

      // Mouse Up Dispatcher (Commits changes smoothly)
      document.addEventListener('mouseup', function() {
        if (isResizing) {
          isResizing = false;
          box.style.transition = 'width 0.1s, height 0.1s';
          updateSimulation();
        }
        if (isDragging) {
          isDragging = false;
          box.style.cursor = 'grab';
          box.style.transition = 'width 0.1s, height 0.1s';
        }
        if (isRotating) {
          isRotating = false;
          if (rotateBadge) rotateBadge.classList.add('hidden');
          box.style.transition = 'width 0.1s, height 0.1s';
          updateSimulation();
        }
      });

      // 4. Live Cursor Radiometer Probe HUD for Heatmap Layer
      const canvasContainer = document.getElementById('canvas-container');
      const radiometerHud = document.getElementById('radiometer-probe-hud');
      if (canvasContainer && radiometerHud) {
        canvasContainer.addEventListener('mousemove', function(e) {
          if (currentMapLayer !== 'heatmap') {
            radiometerHud.classList.add('hidden');
            return;
          }
          radiometerHud.classList.remove('hidden');
          const rect = canvasContainer.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          radiometerHud.style.left = `${x}px`;
          radiometerHud.style.top = `${y}px`;

          // Dynamic calculation based on solar hour and distance to center
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const dist = Math.hypot(x - cx, y - cy);
          const maxDist = Math.hypot(cx, cy);
          const factor = Math.max(0.68, 1 - (dist / maxDist) * 0.32);

          let baseVal = 4.85;
          if (currentSimulatedHour === 9) baseVal = 3.82;
          else if (currentSimulatedHour === 15) baseVal = 3.51;

          const liveVal = (baseVal * factor).toFixed(2);
          const valEl = document.getElementById('radiometer-probe-val');
          if (valEl) {
            valEl.textContent = `${liveVal} kWh/m²/hari`;
          }
        });

        canvasContainer.addEventListener('mouseleave', function() {
          if (radiometerHud) radiometerHud.classList.add('hidden');
        });
      }
    });

    // --- Delphi-Style Onboarding & Auth Flow State Machine ---
    let onboardState = {
      email: 'budi.santoso@gmail.com',
      name: 'Alex Smith',
      propertyType: 'residential',
      location: 'Jl. Diponegoro No. 24, Menteng, Jakarta Pusat',
      billMonthly: 2800000,
      kwp: 7.7,
      isRegister: false
    };

    function authGoToScreen(screenId) {
      const screens = ['auth-step-email', 'auth-step-setup', 'auth-step-calibrating', 'auth-step-persona'];
      screens.forEach(s => {
        const el = document.getElementById(s);
        if (el) el.classList.add('hidden');
      });
      const active = document.getElementById(screenId);
      if (active) active.classList.remove('hidden');

      const container = document.getElementById('state-auth');
      if (container) container.scrollTop = 0;
    }

    function showLoginForm() {
      onboardState.isRegister = false;
      const title = document.getElementById('delphi-auth-title');
      const subtitle = document.getElementById('delphi-auth-subtitle');
      if (title) title.textContent = 'Sign In to Your Account';
      if (subtitle) subtitle.textContent = 'Akses simulasi atap, monitoring hemat energi, & proposal PLN resmi.';
      authGoToScreen('auth-step-email');
    }

    function showRegisterForm() {
      onboardState.isRegister = true;
      const title = document.getElementById('delphi-auth-title');
      const subtitle = document.getElementById('delphi-auth-subtitle');
      if (title) title.textContent = 'Create Your Solar Account';
      if (subtitle) subtitle.textContent = 'Mulai perjalanan mandiri energi dan pangkas tagihan listrik hingga 85%.';
      authGoToScreen('auth-step-email');
    }

    function toggleAuthMode() {
      if (onboardState.isRegister) {
        showLoginForm();
      } else {
        showRegisterForm();
      }
    }

    function authSubmitEmail() {
      const emailInput = document.getElementById('auth-input-email');
      if (emailInput && emailInput.value.trim()) {
        onboardState.email = emailInput.value.trim();
      }
      const modal = document.getElementById('auth-modal-terms');
      if (modal) modal.classList.remove('hidden');
    }

    function authSubmitGoogle() {
      onboardState.email = 'alex.smith.google@gmail.com';
      const modal = document.getElementById('auth-modal-terms');
      if (modal) modal.classList.remove('hidden');
    }

    function authToggleTermsCheck(isChecked) {
      const btn = document.getElementById('auth-terms-btn');
      if (!btn) return;
      if (isChecked) {
        btn.disabled = false;
        btn.className = 'w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm cursor-pointer transition shadow-xs';
      } else {
        btn.disabled = true;
        btn.className = 'w-full py-3 rounded-full bg-slate-400 text-white font-bold text-xs sm:text-sm cursor-not-allowed transition shadow-xs';
      }
    }

    function authAcceptTerms() {
      const modal = document.getElementById('auth-modal-terms');
      if (modal) modal.classList.add('hidden');
      authGoToScreen('auth-step-setup');
    }

    function authBackToEmail() {
      authGoToScreen('auth-step-email');
    }

    function authBackToSetup() {
      authGoToScreen('auth-step-setup');
    }

    function authSelectProperty(type, btnEl) {
      onboardState.propertyType = type;
      document.querySelectorAll('.onboard-prop-pill').forEach(btn => {
        btn.className = 'onboard-prop-pill p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-medium hover:bg-slate-100 transition cursor-pointer';
      });
      if (btnEl) {
        btnEl.className = 'onboard-prop-pill p-2.5 rounded-xl border-2 border-amber-500 bg-amber-50/70 text-amber-950 font-bold transition cursor-pointer';
      }
    }

    function authSetLocation(loc) {
      const locInput = document.getElementById('onboard-input-location');
      if (locInput) locInput.value = loc;
    }

    function authSelectBill(amount, btnEl) {
      onboardState.billMonthly = amount;
      document.querySelectorAll('.onboard-bill-pill').forEach(btn => {
        btn.className = 'onboard-bill-pill py-2 px-1 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium transition cursor-pointer';
      });
      if (btnEl) {
        btnEl.className = 'onboard-bill-pill py-2 px-1 rounded-xl border-2 border-amber-500 bg-amber-50/70 text-amber-950 font-bold transition cursor-pointer';
      }
    }

    function authStartCalibration() {
      const nameInput = document.getElementById('onboard-input-name');
      const locInput = document.getElementById('onboard-input-location');
      if (nameInput && nameInput.value.trim()) {
        onboardState.name = nameInput.value.trim();
      }
      if (locInput && locInput.value.trim()) {
        onboardState.location = locInput.value.trim();
      }

      const estKwp = Math.max(2.2, Math.round((onboardState.billMonthly / 360000) * 10) / 10);
      onboardState.kwp = estKwp;

      authGoToScreen('auth-step-calibrating');

      const mainStatus = document.getElementById('calibration-main-status');
      const subStatus = document.getElementById('calibration-sub-status');
      
      const steps = [
        { main: 'Calibrating your rooftop...', sub: 'Menghubungkan citra ortofoto satelit 90° nadir & azimuth matahari...' },
        { main: 'Detecting solar azimuth & roof pitch...', sub: 'Sudut azimuth optimal 188° SSW terdeteksi. Insolasi 4.85 kWh/m²/hari...' },
        { main: 'Filtering shadows & obstacles...', sub: 'Deteksi unit AC chiller & bayangan tajuk pohon selesai...' },
        { main: 'Generating solar profile for ' + onboardState.name + '...', sub: 'Proyeksi penghematan Rp ' + (Math.round(onboardState.billMonthly * 0.85 / 100000) / 10).toFixed(1) + ' Jt/bulan...' }
      ];

      let stepIdx = 0;
      const interval = setInterval(() => {
        stepIdx++;
        if (stepIdx < steps.length) {
          if (mainStatus) mainStatus.textContent = steps[stepIdx].main;
          if (subStatus) subStatus.textContent = steps[stepIdx].sub;
        } else {
          clearInterval(interval);
          authFinishCalibration();
        }
      }, 700);
    }

    function authFinishCalibration() {
      const initials = onboardState.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'AS';
      
      const topAvatar = document.getElementById('persona-top-avatar');
      if (topAvatar) topAvatar.textContent = initials;
      const topName = document.getElementById('persona-top-name');
      if (topName) topName.textContent = onboardState.name;

      const railAvatar = document.getElementById('persona-rail-avatar');
      if (railAvatar) railAvatar.textContent = initials;
      const bigAvatar = document.getElementById('persona-big-avatar');
      if (bigAvatar) bigAvatar.textContent = initials;

      const cardName = document.getElementById('persona-card-name');
      if (cardName) cardName.textContent = onboardState.name;

      const propLabel = onboardState.propertyType === 'commercial' ? 'Ruko Komersial' : (onboardState.propertyType === 'industrial' ? 'Pabrik / Industri' : 'Rumah Tinggal Residensi');
      const cardRole = document.getElementById('persona-card-role');
      if (cardRole) {
        cardRole.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span>Pemilik ' + propLabel + ' • ' + onboardState.location + '</span>';
      }

      const panelsCount = Math.ceil(onboardState.kwp * 1000 / 550);
      const estSaveMonthly = Math.round(onboardState.billMonthly * 0.85);
      const estSaveMillion = (estSaveMonthly / 1000000).toFixed(1);
      const co2Tons = (onboardState.kwp * 1.2).toFixed(1);

      const cardBio = document.getElementById('persona-card-bio');
      if (cardBio) {
        cardBio.textContent = 'Proyek PLTS Atap ' + onboardState.kwp.toFixed(1) + ' kWp (' + panelsCount + ' modul surya 550Wp Tier-1). Diestimasi memangkas tagihan listrik PLN bulanan hingga 85% (~Rp ' + estSaveMillion + ' Juta/bln) dengan payback period 4.5 tahun dan reduksi emisi ' + co2Tons + ' Ton CO₂ per tahun. Sistem siap terhubung ke izin Net-Metering PLN.';
      }

      authGoToScreen('auth-step-persona');
    }

    function askPersonaQuestion(qIndex) {
      const box = document.getElementById('persona-answer-box');
      const title = document.getElementById('persona-answer-title');
      const body = document.getElementById('persona-answer-body');
      if (!box || !title || !body) return;

      const estSaveMonthly = Math.round(onboardState.billMonthly * 0.85);
      const annualSave = estSaveMonthly * 12;
      let total25Yr = 0;
      let currAnnual = annualSave;
      for (let yr = 1; yr <= 25; yr++) {
        total25Yr += currAnnual;
        currAnnual = currAnnual * 1.03 * 0.995;
      }
      const net25Yr = Math.round(total25Yr - (onboardState.kwp * 13800000));
      const netMillion = Math.round(net25Yr / 1000000);

      if (qIndex === 1) {
        title.textContent = 'Estimasi Penghematan Finansial 25 Tahun:';
        body.innerHTML = 'Dengan kapasitas PLTS <strong>' + onboardState.kwp.toFixed(1) + ' kWp</strong>, proyeksi akumulasi penghematan bersih Anda mencapai <strong>Rp ' + netMillion.toLocaleString('id-ID') + ' Juta</strong> selama masa garansi 25 tahun (dengan asumsi kenaikan tarif PLN 3% per tahun). Balik modal (BEP) tercapai dalam <strong>4.5 tahun</strong>.';
      } else if (qIndex === 2) {
        title.textContent = 'Analisis Citra Visi Komputer Bayangan Atap:';
        body.innerHTML = 'Berdasarkan ortofoto satelit beresolusi tinggi, atap properti Anda di <strong>' + onboardState.location + '</strong> memiliki tingkat bebas bayangan sebesar <strong>98.4%</strong>. Algoritma kami secara otomatis memberikan jarak aman (setback) 0.5 meter dari halangan tajuk pohon dan pipa ventilasi atap.';
      } else {
        title.textContent = 'Alur Izin Sambung Net-Metering (Exim) ke PLN:';
        body.innerHTML = '1. Unduh berkas proposal teknis resmi dari SunSight.<br/>2. Mitra kontraktor EPC terverifikasi kami akan mengajukan permohonan ke kantor PLN Unit Pelaksana Pelayanan Pelanggan (UP3).<br/>3. PLN melakukan uji laik operasi (SLO) dan mengganti meteran lama Anda dengan kWh Net-Metering (Exim) dalam 7–14 hari kerja.';
      }

      box.classList.remove('hidden');
    }

    function handlePersonaCustomChat(query) {
      if (!query || !query.trim()) return;
      const box = document.getElementById('persona-answer-box');
      const title = document.getElementById('persona-answer-title');
      const body = document.getElementById('persona-answer-body');
      if (box && title && body) {
        title.textContent = 'SunSight AI Solar Assistant:';
        body.innerHTML = 'Terima kasih atas pertanyaan: <em>"' + query + '"</em>.<br/>Sistem PLTS ' + onboardState.kwp.toFixed(1) + ' kWp Anda di ' + onboardState.location + ' dirancang dengan rasio DC/AC inverter 1.22 untuk efisiensi puncak. Anda dapat langsung membuka <strong>Studio CAD 3D</strong> untuk mengubah orientasi dan jumlah panel secara real-time!';
        box.classList.remove('hidden');
      }
      const input = document.getElementById('persona-chat-input');
      if (input) input.value = '';
    }

    function focusPersonaChat() {
      const input = document.getElementById('persona-chat-input');
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    function sharePersonaProfile() {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.origin + window.location.pathname + '#sunsight-profile');
        alert('Tautan ringkasan profil atap berhasil disalin ke clipboard!');
      } else {
        alert('Tautan proyek siap dibagikan!');
      }
    }

    function authFinishSetupAndGoToDashboard() {
      const nameInput = document.getElementById('onboard-input-name');
      const locInput = document.getElementById('onboard-input-location');
      
      if (nameInput && nameInput.value.trim()) {
        onboardState.name = nameInput.value.trim();
      } else {
        onboardState.name = 'Alex Smith';
      }
      
      if (locInput && locInput.value.trim()) {
        onboardState.location = locInput.value.trim();
      } else {
        onboardState.location = 'Jl. Diponegoro No. 24, Menteng, Jakarta Pusat';
      }

      const estKwp = Math.max(2.2, Math.round((onboardState.billMonthly / 360000) * 10) / 10);
      onboardState.kwp = estKwp;

      // Extract Initials
      const words = onboardState.name.trim().split(/\s+/).filter(Boolean);
      let initials = 'AS';
      if (words.length >= 2) {
        initials = (words[0][0] + words[words.length - 1][0]).toUpperCase();
      } else if (words.length === 1 && words[0].length > 0) {
        initials = words[0].slice(0, 2).toUpperCase();
      }

      // Update Dashboard Navbar Profile
      const dashName = document.getElementById('dash-user-name');
      if (dashName) {
        const shortName = words.length > 1 ? words[0] + ' ' + words[1][0] + '.' : words[0];
        dashName.textContent = shortName;
      }
      const dashAvatar = document.getElementById('dash-user-avatar-initials');
      if (dashAvatar) dashAvatar.textContent = initials;

      // Update State Profile
      const profAvatar = document.getElementById('profile-user-avatar');
      if (profAvatar) profAvatar.textContent = initials;
      const profName = document.getElementById('profile-input-name');
      if (profName) profName.value = onboardState.name;
      const profEmail = document.getElementById('profile-input-email');
      if (profEmail) profEmail.value = onboardState.email;

      // Sync Monthly Bill with Dashboard Calculator
      const billSlider = document.getElementById('dash-calc-bill-slider');
      if (billSlider && onboardState.billMonthly) {
        billSlider.value = onboardState.billMonthly;
        if (typeof updateDashCalculator === 'function') {
          updateDashCalculator();
        }
      }

      // Sync Search Bar with Location
      const dashSearch = document.getElementById('dash-global-search');
      if (dashSearch && onboardState.location) {
        dashSearch.placeholder = 'Lokasi aktif: ' + onboardState.location;
      }

      // Reset auth screen state for next time
      authGoToScreen('auth-step-email');

      // Navigate straight to the main Dashboard!
      switchState('state-dashboard');

      // Ensure Live tab is active and display welcome toast
      setTimeout(() => {
        if (typeof switchDashTab === 'function') {
          switchDashTab('live');
        }
        showDashboardWelcomeToast(onboardState.name, onboardState.propertyType);
      }, 50);
    }

    function showDashboardWelcomeToast(userName, propType) {
      const existing = document.getElementById('dash-welcome-toast');
      if (existing) existing.remove();

      const typeLabel = propType === 'commercial' ? 'Komersial' : (propType === 'industrial' ? 'Industri' : 'Residensial');
      const toast = document.createElement('div');
      toast.id = 'dash-welcome-toast';
      toast.className = 'fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-3 animate-fadeIn text-xs';
      toast.innerHTML = `
        <div class="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[18px]">wb_sunny</span>
        </div>
        <div>
          <div class="font-bold text-amber-400">Selamat datang, ${userName}!</div>
          <div class="text-slate-300 text-[11px]">Dashboard pemantauan surya properti ${typeLabel} siap digunakan.</div>
        </div>
        <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white ml-2 cursor-pointer">
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      `;
      document.body.appendChild(toast);
      setTimeout(() => {
        if (toast && toast.parentElement) {
          toast.remove();
        }
      }, 6000);
    }

    window.authGoToScreen = authGoToScreen;
    window.showLoginForm = showLoginForm;
    window.showRegisterForm = showRegisterForm;
    window.toggleAuthMode = toggleAuthMode;
    window.authSubmitEmail = authSubmitEmail;
    window.authSubmitGoogle = authSubmitGoogle;
    window.authToggleTermsCheck = authToggleTermsCheck;
    window.authAcceptTerms = authAcceptTerms;
    window.authBackToEmail = authBackToEmail;
    window.authBackToSetup = authBackToSetup;
    window.authSelectProperty = authSelectProperty;
    window.authSetLocation = authSetLocation;
    window.authSelectBill = authSelectBill;
    window.authStartCalibration = authStartCalibration;
    window.authFinishCalibration = authFinishCalibration;
    window.authFinishSetupAndGoToDashboard = authFinishSetupAndGoToDashboard;
    window.askPersonaQuestion = askPersonaQuestion;
    window.handlePersonaCustomChat = handlePersonaCustomChat;
    window.focusPersonaChat = focusPersonaChat;
    window.sharePersonaProfile = sharePersonaProfile;

    // --- Dashboard Unique Interactive Functions ---
    function switchDashHeroLayer(layer) {
      const layerPanels = document.getElementById('dash-layer-panels');
      const layerCad = document.getElementById('dash-layer-cad');
      const layerHeat = document.getElementById('dash-layer-heat');
      const tabPanels = document.getElementById('dash-tab-panels');
      const tabCad = document.getElementById('dash-tab-cad');
      const tabHeat = document.getElementById('dash-tab-heat');

      if (!layerPanels || !layerCad || !layerHeat) return;

      layerPanels.classList.add('hidden');
      layerCad.classList.add('hidden');
      layerHeat.classList.add('hidden');

      const inactiveClass = 'px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer';
      const activeClass = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-slate-900 shadow-xs border border-slate-200/80 transition cursor-pointer';

      if (tabPanels) tabPanels.className = inactiveClass;
      if (tabCad) tabCad.className = inactiveClass;
      if (tabHeat) tabHeat.className = inactiveClass;

      if (layer === 'panels') {
        layerPanels.classList.remove('hidden');
        if (tabPanels) tabPanels.className = activeClass;
      } else if (layer === 'cad') {
        layerCad.classList.remove('hidden');
        if (tabCad) tabCad.className = activeClass;
      } else if (layer === 'heat') {
        layerHeat.classList.remove('hidden');
        if (tabHeat) tabHeat.className = activeClass;
      }
    }

    function updateSunDial(val) {
      const hour = parseFloat(val);
      const hourInt = Math.floor(hour);
      const mins = (hour % 1 !== 0) ? '30' : '00';
      const timeStr = `${hourInt < 10 ? '0' + hourInt : hourInt}:${mins} WIB`;
      
      const timeEl = document.getElementById('sun-dial-time');
      const powerEl = document.getElementById('sun-dial-power');
      const radEl = document.getElementById('sun-dial-rad');
      const statusEl = document.getElementById('sun-dial-status');
      const sunMarker = document.getElementById('sun-dial-marker');

      let norm = Math.sin((hour - 6) / 12 * Math.PI);
      if (norm < 0) norm = 0;

      const power = (norm * 11.4).toFixed(1);
      const rad = Math.round(norm * 980);

      if (timeEl) timeEl.textContent = timeStr;
      if (powerEl) powerEl.textContent = `${power} kW`;
      if (radEl) radEl.textContent = `${rad} W/m²`;

      let statusText = 'Matahari Terbit';
      if (hour >= 10 && hour <= 14) statusText = 'Puncak Radiasi Optimal';
      else if (hour > 14 && hour <= 17) statusText = 'Radiasi Sore';
      else if (hour > 17) statusText = 'Menjelang Senja';
      else if (hour < 10) statusText = 'Radiasi Pagi';

      if (statusEl) statusEl.textContent = statusText;

      if (sunMarker) {
        const percent = ((hour - 6) / 12) * 100;
        sunMarker.style.left = `calc(${Math.min(96, Math.max(4, percent))}% - 12px)`;
      }
    }

    // --- Lindy Style Filter Pills (Landing Page) ---
    function filterLandingLindyCategory(category) {
      const allPill = document.getElementById('landing-cat-all');
      const desainPill = document.getElementById('landing-cat-desain');
      const propertiPill = document.getElementById('landing-cat-properti');
      const hematPill = document.getElementById('landing-cat-hemat');

      const secDesain = document.getElementById('landing-lindy-sec-desain');
      const secProperti = document.getElementById('landing-lindy-sec-properti');
      const secPopuler = document.getElementById('landing-lindy-sec-populer');

      const activeClass = 'px-3.5 py-1 rounded-full text-xs font-bold bg-white text-slate-900 border border-slate-200/90 shadow-2xs transition cursor-pointer';
      const inactiveClass = 'px-3 py-1 rounded-full text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition cursor-pointer';

      [allPill, desainPill, propertiPill, hematPill].forEach(p => {
        if (p) p.className = inactiveClass;
      });

      if (category === 'all') {
        if (allPill) allPill.className = activeClass;
        if (secDesain) secDesain.classList.remove('hidden');
        if (secProperti) secProperti.classList.remove('hidden');
        if (secPopuler) secPopuler.classList.remove('hidden');
      } else if (category === 'desain') {
        if (desainPill) desainPill.className = activeClass;
        if (secDesain) secDesain.classList.remove('hidden');
        if (secProperti) secProperti.classList.add('hidden');
        if (secPopuler) secPopuler.classList.add('hidden');
      } else if (category === 'properti') {
        if (propertiPill) propertiPill.className = activeClass;
        if (secDesain) secDesain.classList.add('hidden');
        if (secProperti) secProperti.classList.remove('hidden');
        if (secPopuler) secPopuler.classList.remove('hidden');
      } else if (category === 'hemat') {
        if (hematPill) hematPill.className = activeClass;
        if (secDesain) secDesain.classList.remove('hidden');
        if (secProperti) secProperti.classList.remove('hidden');
        if (secPopuler) secPopuler.classList.add('hidden');
      }
    }

    // --- Shopify Live View: Dynamic Live Clock ---
    let liveClockTimer = null;
    function startDashLiveClock() {
      if (liveClockTimer) clearInterval(liveClockTimer);
      const clockEl = document.getElementById('dash-live-clock');
      function updateClock() {
        if (!clockEl) return;
        const now = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const m = months[now.getMonth()];
        const d = now.getDate();
        const y = now.getFullYear();
        let h = now.getHours();
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12;
        const hh = h < 10 ? '0' + h : h;
        const mm = String(now.getMinutes()).padStart(2, '0');
        const ss = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${m} ${d}, ${y} at ${hh}:${mm}:${ss} ${ampm} WIB`;
      }
      updateClock();
      liveClockTimer = setInterval(updateClock, 1000);
    }

    // --- Shopify Live View: 3D Dotted Canvas Globe Engine ---
    let globeState = {
      canvas: null,
      ctx: null,
      width: 0,
      height: 0,
      radius: 220,
      rotX: 0.12,
      rotY: -1.86, // Angled facing Indonesia
      targetRotX: 0.12,
      targetRotY: -1.86,
      scale: 1.0,
      targetScale: 1.0,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0,
      dragVelocityX: 0,
      dragVelocityY: 0,
      points: [],
      cities: [
        { id: 'Jakarta', name: 'Jakarta Pusat • Menteng', prov: 'DKI Jakarta', lat: -6.2, lng: 106.8, rad: '5.1 kWh/m²/hari', weather: 'Cerah Terik • 31°C', simCount: '54 Properti', addr: 'Jl. Diponegoro No. 24, Menteng, Jakarta Pusat' },
        { id: 'BSD', name: 'Tangerang Selatan • BSD', prov: 'Banten', lat: -6.3, lng: 106.6, rad: '5.0 kWh/m²/hari', weather: 'Cerah Berawan • 30°C', simCount: '36 Properti', addr: 'Jl. Grand Boulevard, BSD City, Tangerang Selatan' },
        { id: 'Bandung', name: 'Bandung (Dago Pakar)', prov: 'Jawa Barat', lat: -6.9, lng: 107.6, rad: '4.8 kWh/m²/hari', weather: 'Sejuk Cerah • 25°C', simCount: '23 Properti', addr: 'Jl. Dago Pakar Permai No. 12, Bandung' },
        { id: 'Surabaya', name: 'Surabaya (CitraLand)', prov: 'Jawa Timur', lat: -7.2, lng: 112.7, rad: '5.4 kWh/m²/hari', weather: 'Sinar Penuh • 33°C', simCount: '15 Properti', addr: 'Bukit Golf Utama, CitraLand, Surabaya Barat' },
        { id: 'Bali', name: 'Denpasar, Bali', prov: 'Bali', lat: -8.4, lng: 115.1, rad: '5.6 kWh/m²/hari', weather: 'Tropis Cerah • 30°C', simCount: '18 Properti', addr: 'Jl. Sunset Road No. 88, Kuta, Bali' },
        { id: 'IKN', name: 'IKN Nusantara', prov: 'Kalimantan Timur', lat: -0.9, lng: 116.8, rad: '5.2 kWh/m²/hari', weather: 'Smart Solar Grid • 29°C', simCount: '12 Properti', addr: 'Kawasan Inti Pusat Pemerintahan (KIPP), IKN' },
        { id: 'Medan', name: 'Medan', prov: 'Sumatera Utara', lat: 3.5, lng: 98.6, rad: '4.7 kWh/m²/hari', weather: 'Cerah Berawan • 32°C', simCount: '9 Properti', addr: 'Jl. Diponegoro No. 15, Medan' }
      ],
      showOverlay: true,
      mode: 'dots', // 'dots' or 'wireframe'
      activeCity: null,
      animId: null,
      pulseTime: 0
    };

    function initShopifyGlobe() {
      const canvas = document.getElementById('shopify-globe-canvas');
      if (!canvas) return;

      globeState.canvas = canvas;
      globeState.ctx = canvas.getContext('2d');

      function resize() {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        globeState.width = rect.width;
        globeState.height = rect.height;
        globeState.radius = Math.min(rect.width, rect.height) * 0.40;
      }
      resize();
      window.addEventListener('resize', resize);

      // Generate Fibonacci Sphere Dots with High Density on Equatorial Landmass
      globeState.points = [];
      const numDots = 1400;
      const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
      for (let i = 0; i < numDots; i++) {
        const y = 1 - (i / (numDots - 1)) * 2; // -1 to 1
        const rAtY = Math.sqrt(1 - y * y);
        const theta = 2 * Math.PI * i / phi;
        const x = Math.cos(theta) * rAtY;
        const z = Math.sin(theta) * rAtY;

        // Convert cartesian unit sphere to lat/lng in degrees
        const lat = Math.asin(y) * (180 / Math.PI);
        const lng = Math.atan2(z, x) * (180 / Math.PI);

        // Density weighting: add more points near maritime Southeast Asia / Equator
        const isIndoRegion = (lat >= -12 && lat <= 8 && lng >= 94 && lng <= 142);
        const isAsiaEquator = (lat >= -20 && lat <= 40 && lng >= 60 && lng <= 160);

        globeState.points.push({
          x, y, z, lat, lng,
          size: isIndoRegion ? 1.8 : 1.2,
          isHighlight: isIndoRegion
        });
      }

      // Add extra clustered dots specifically along Indonesian Archipelago
      const indoClusters = [
        { lat: -6.5, lng: 107.0, count: 60, spread: 3.5 }, // Java
        { lat: -0.5, lng: 101.5, count: 50, spread: 5.0 }, // Sumatra
        { lat: 0.5, lng: 114.0, count: 50, spread: 4.5 },  // Kalimantan
        { lat: -2.0, lng: 120.5, count: 40, spread: 3.5 }, // Sulawesi
        { lat: -8.5, lng: 116.0, count: 35, spread: 2.5 }, // Bali & Nusa Tenggara
        { lat: -4.0, lng: 136.0, count: 45, spread: 4.5 }  // Papua
      ];
      indoClusters.forEach(c => {
        for (let j = 0; j < c.count; j++) {
          const lat = c.lat + (Math.random() - 0.5) * c.spread;
          const lng = c.lng + (Math.random() - 0.5) * c.spread * 1.5;
          const phiLat = lat * (Math.PI / 180);
          const thetaLng = lng * (Math.PI / 180);
          globeState.points.push({
            x: Math.cos(phiLat) * Math.cos(thetaLng),
            y: Math.sin(phiLat),
            z: Math.cos(phiLat) * Math.sin(thetaLng),
            lat, lng,
            size: 1.6,
            isHighlight: true
          });
        }
      });

      // Mouse Drag & Touch Listeners
      canvas.addEventListener('mousedown', e => {
        globeState.isDragging = true;
        globeState.lastMouseX = e.clientX;
        globeState.lastMouseY = e.clientY;
        globeState.dragVelocityX = 0;
        globeState.dragVelocityY = 0;
      });

      window.addEventListener('mousemove', e => {
        if (!globeState.isDragging) {
          checkCityHover(e);
          return;
        }
        const dx = e.clientX - globeState.lastMouseX;
        const dy = e.clientY - globeState.lastMouseY;
        globeState.lastMouseX = e.clientX;
        globeState.lastMouseY = e.clientY;

        globeState.dragVelocityX = dx * 0.005;
        globeState.dragVelocityY = dy * 0.005;

        globeState.targetRotY += globeState.dragVelocityX;
        globeState.targetRotX += globeState.dragVelocityY;

        // Clamp vertical pitch to avoid upside-down flip
        globeState.targetRotX = Math.max(-0.85, Math.min(0.85, globeState.targetRotX));
      });

      window.addEventListener('mouseup', () => {
        globeState.isDragging = false;
      });

      // Touch handlers
      canvas.addEventListener('touchstart', e => {
        if (e.touches.length === 1) {
          globeState.isDragging = true;
          globeState.lastMouseX = e.touches[0].clientX;
          globeState.lastMouseY = e.touches[0].clientY;
        }
      }, { passive: true });

      canvas.addEventListener('touchmove', e => {
        if (!globeState.isDragging || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - globeState.lastMouseX;
        const dy = e.touches[0].clientY - globeState.lastMouseY;
        globeState.lastMouseX = e.touches[0].clientX;
        globeState.lastMouseY = e.touches[0].clientY;

        globeState.targetRotY += dx * 0.006;
        globeState.targetRotX += dy * 0.006;
        globeState.targetRotX = Math.max(-0.85, Math.min(0.85, globeState.targetRotX));
      }, { passive: true });

      canvas.addEventListener('touchend', () => {
        globeState.isDragging = false;
      });

      // Click on canvas to select city
      canvas.addEventListener('click', e => {
        const city = getCityUnderCursor(e);
        if (city) {
          selectGlobeCity(city);
        }
      });

      // Start 60fps render loop
      if (globeState.animId) cancelAnimationFrame(globeState.animId);
      renderGlobeFrame();
    }

    function checkCityHover(e) {
      if (!globeState.canvas) return;
      const city = getCityUnderCursor(e);
      if (city) {
        globeState.canvas.style.cursor = 'pointer';
      } else {
        globeState.canvas.style.cursor = globeState.isDragging ? 'grabbing' : 'grab';
      }
    }

    function getCityUnderCursor(e) {
      const rect = globeState.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (let i = 0; i < globeState.cities.length; i++) {
        const c = globeState.cities[i];
        if (c.screenX !== undefined && c.screenY !== undefined && c.isFront) {
          const dist = Math.hypot(mx - c.screenX, my - c.screenY);
          if (dist < 18) return c;
        }
      }
      return null;
    }

    function selectGlobeCity(city) {
      globeState.activeCity = city;
      focusGlobeCity(city.id);
      showGlobeTooltip(city);
    }

    function showGlobeTooltip(city) {
      const tooltip = document.getElementById('globe-city-tooltip');
      if (!tooltip) return;

      document.getElementById('tooltip-province').textContent = city.prov;
      document.getElementById('tooltip-city-name').textContent = city.name;
      document.getElementById('tooltip-irradiance').textContent = city.rad;
      document.getElementById('tooltip-weather').textContent = city.weather;
      document.getElementById('tooltip-sim-count').textContent = city.simCount;

      tooltip.classList.remove('hidden');
    }

    function closeGlobeTooltip() {
      const tooltip = document.getElementById('globe-city-tooltip');
      if (tooltip) tooltip.classList.add('hidden');
    }

    function simulateTooltipLocation() {
      if (!globeState.activeCity) return;
      setLandingSampleAddress(globeState.activeCity.addr);
      goToStudioDirect();
    }

    function focusGlobeCity(cityId) {
      const city = globeState.cities.find(c => c.id.toLowerCase() === cityId.toLowerCase() || c.name.toLowerCase().includes(cityId.toLowerCase()));
      if (!city) return;

      globeState.activeCity = city;
      showGlobeTooltip(city);

      // Convert lat/lng to targetRotX and targetRotY so city faces camera (center)
      const latRad = city.lat * (Math.PI / 180);
      const lngRad = city.lng * (Math.PI / 180);

      globeState.targetRotX = -latRad;
      globeState.targetRotY = -lngRad - Math.PI / 2;
      globeState.targetScale = 1.15;
    }

    function handleGlobeSearch(query) {
      if (!query || !query.trim()) return;
      const q = query.trim().toLowerCase();
      const match = globeState.cities.find(c => 
        c.name.toLowerCase().includes(q) || 
        c.prov.toLowerCase().includes(q) || 
        c.id.toLowerCase().includes(q)
      );
      if (match) {
        selectGlobeCity(match);
      }
    }

    function zoomGlobe(factor) {
      globeState.targetScale = Math.max(0.7, Math.min(1.6, globeState.targetScale * factor));
    }

    function toggleGlobeOverlay() {
      globeState.showOverlay = !globeState.showOverlay;
      const btn = document.getElementById('btn-globe-eye');
      if (btn) {
        btn.classList.toggle('text-cyan-600', globeState.showOverlay);
      }
    }

    function toggleGlobeStyle() {
      globeState.mode = (globeState.mode === 'dots') ? 'wireframe' : 'dots';
    }

    function resetGlobeView() {
      globeState.targetRotX = 0.12;
      globeState.targetRotY = -1.86;
      globeState.targetScale = 1.0;
      closeGlobeTooltip();
    }

    // --- Core 3D Globe Render Function (60 FPS) ---
    function renderGlobeFrame() {
      globeState.pulseTime += 0.04;

      // Inertia and Auto-rotation
      if (!globeState.isDragging) {
        globeState.targetRotY += 0.0016; // Gentle smooth rotation
      }

      // Smooth Lerp Damping
      globeState.rotX += (globeState.targetRotX - globeState.rotX) * 0.08;
      globeState.rotY += (globeState.targetRotY - globeState.rotY) * 0.08;
      globeState.scale += (globeState.targetScale - globeState.scale) * 0.08;

      const { ctx, width, height, radius, rotX, rotY, scale, points, cities, showOverlay, mode } = globeState;
      if (!ctx || width === 0) {
        globeState.animId = requestAnimationFrame(renderGlobeFrame);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const currentRadius = radius * scale;

      // 1. Soft Ambient Sphere Gradient (Shopify signature cyan-tinted glow)
      const sphereGrad = ctx.createRadialGradient(
        cx - currentRadius * 0.25, 
        cy - currentRadius * 0.25, 
        currentRadius * 0.1, 
        cx, 
        cy, 
        currentRadius
      );
      sphereGrad.addColorStop(0, '#f2fbfc');
      sphereGrad.addColorStop(0.7, '#e4f5f5');
      sphereGrad.addColorStop(1, '#d5efee');

      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Subtle Outer Atmosphere Halo
      const haloGrad = ctx.createRadialGradient(cx, cy, currentRadius * 0.96, cx, cy, currentRadius * 1.08);
      haloGrad.addColorStop(0, 'rgba(0, 192, 163, 0.18)');
      haloGrad.addColorStop(1, 'rgba(0, 192, 163, 0.0)');
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius * 1.08, 0, Math.PI * 2);
      ctx.fillStyle = haloGrad;
      ctx.fill();

      // 2. Trigonometric 3D Rotation Transform Helper
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      function project3D(x, y, z) {
        // Rotate around Y-axis (Yaw)
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        // Rotate around X-axis (Pitch)
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        return {
          px: cx + x1 * currentRadius,
          py: cy - y2 * currentRadius,
          pz: z2
        };
      }

      // 3. Render 3D Dotted Matrix / Landmasses
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const proj = project3D(pt.x, pt.y, pt.z);

        // Only draw points on the front hemisphere (z > 0)
        if (proj.pz > -0.05) {
          const depthAlpha = Math.max(0.12, Math.min(1.0, (proj.pz + 0.1) * 1.1));
          const dotSize = pt.size * (0.8 + proj.pz * 0.4);

          ctx.beginPath();
          ctx.arc(proj.px, proj.py, Math.max(0.8, dotSize), 0, Math.PI * 2);

          if (pt.isHighlight) {
            ctx.fillStyle = `rgba(0, 180, 160, ${depthAlpha * 0.95})`; // Emerald cyan
          } else {
            ctx.fillStyle = `rgba(0, 160, 170, ${depthAlpha * 0.55})`; // Subtle cyan
          }
          ctx.fill();
        }
      }

      // 4. Render City Pins & Pulsing Radar Waves
      if (showOverlay) {
        cities.forEach(city => {
          const phiLat = city.lat * (Math.PI / 180);
          const thetaLng = city.lng * (Math.PI / 180);
          const cx3 = Math.cos(phiLat) * Math.cos(thetaLng);
          const cy3 = Math.sin(phiLat);
          const cz3 = Math.cos(phiLat) * Math.sin(thetaLng);

          const proj = project3D(cx3, cy3, cz3);
          city.screenX = proj.px;
          city.screenY = proj.py;
          city.isFront = proj.pz > 0.05;

          if (city.isFront) {
            const isSelected = (globeState.activeCity && globeState.activeCity.id === city.id);
            const pulse = (Math.sin(globeState.pulseTime * 2.5) + 1) / 2; // 0 to 1

            // Radar Ripple Wave
            ctx.beginPath();
            ctx.arc(proj.px, proj.py, 7 + pulse * 14, 0, Math.PI * 2);
            ctx.strokeStyle = isSelected 
              ? `rgba(168, 85, 247, ${0.8 - pulse * 0.6})` 
              : `rgba(0, 192, 163, ${0.7 - pulse * 0.5})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Pin Core Marker (Shopify signature purple/cyan pinpoint)
            ctx.beginPath();
            ctx.arc(proj.px, proj.py, isSelected ? 5 : 3.8, 0, Math.PI * 2);
            ctx.fillStyle = isSelected ? '#a855f7' : '#00c0a3';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();

            // City Tag Label (Crisp readable pill)
            ctx.font = isSelected ? 'bold 11px Inter, sans-serif' : '500 10px Inter, sans-serif';
            ctx.fillStyle = '#0f172a';
            ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
            ctx.shadowBlur = 4;
            ctx.fillText(city.id, proj.px + 8, proj.py + 3.5);
            ctx.shadowBlur = 0;
          }
        });
      }

      ctx.restore();
      globeState.animId = requestAnimationFrame(renderGlobeFrame);
    }

    // Dashboard Sub-page / Tab Switching
    function switchDashTab(tabId) {
      const allTabs = ['live', 'properti', 'kalkulator', 'roi', 'katalog', 'installer', 'sensor'];
      
      allTabs.forEach(t => {
        const panel = document.getElementById('dash-tab-' + t);
        if (panel) {
          panel.classList.add('hidden');
        }
        const btn = document.getElementById('dash-tab-btn-' + t);
        if (btn) {
          btn.className = 'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer';
          const icon = btn.querySelector('.tab-icon');
          if (icon) {
            icon.className = 'material-symbols-outlined text-[18px] text-slate-500 tab-icon';
          }
        }
      });

      const activePanel = document.getElementById('dash-tab-' + tabId);
      if (activePanel) {
        activePanel.classList.remove('hidden');
      }

      const activeBtn = document.getElementById('dash-tab-btn-' + tabId);
      if (activeBtn) {
        activeBtn.className = 'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200/80 shadow-2xs cursor-pointer transition';
        const icon = activeBtn.querySelector('.tab-icon');
        if (icon) {
          icon.className = 'material-symbols-outlined text-[18px] text-amber-600 tab-icon';
        }
      }

      if (tabId === 'live') {
        setTimeout(() => {
          if (typeof initShopifyGlobe === 'function') initShopifyGlobe();
        }, 50);
      } else if (tabId === 'kalkulator') {
        updateDashCalculator();
      }
    }
    window.switchDashTab = switchDashTab;

    // Interactive Dashboard PLN Solar Calculator
    function updateDashCalculator() {
      const slider = document.getElementById('dash-calc-bill-slider');
      if (!slider) return;
      const billVal = parseInt(slider.value || '2500000', 10);
      
      const billDisplay = document.getElementById('dash-calc-bill-display');
      if (billDisplay) {
        billDisplay.textContent = 'Rp ' + billVal.toLocaleString('id-ID');
      }

      const checkedTariff = document.querySelector('input[name="dash-tariff"]:checked');
      const ratePerKwh = parseFloat(checkedTariff?.value || '1699.53');

      const citySelect = document.getElementById('dash-calc-city');
      const psh = parseFloat(citySelect?.value || '4.8'); // peak sun hours

      // Monthly consumption in kWh
      const monthlyKwh = billVal / ratePerKwh;

      // Yield per kWp per month with 0.80 system performance ratio
      const kwhPerKwpMonth = psh * 30 * 0.80;

      // Target covering ~85% of monthly consumption
      const recommendedKwp = Math.min(30, Math.max(1.5, Math.round((monthlyKwh * 0.85 / kwhPerKwpMonth) * 10) / 10));
      const estMonthlyGen = Math.round(recommendedKwp * kwhPerKwpMonth);
      const estMonthlySaving = Math.round(Math.min(billVal * 0.88, estMonthlyGen * ratePerKwh));
      const estAnnualSaving = estMonthlySaving * 12;

      // System cost ~Rp 13.8M / kWp
      const estCost = recommendedKwp * 13800000;
      const bepYears = Math.max(3.2, Math.round((estCost / estAnnualSaving) * 10) / 10);

      // 25-yr cumulative savings (3% tariff inflation, 0.5% module degradation)
      let total25Yr = 0;
      let currAnnual = estAnnualSaving;
      for (let yr = 1; yr <= 25; yr++) {
        total25Yr += currAnnual;
        currAnnual = currAnnual * 1.03 * 0.995;
      }
      const net25Yr = Math.round(total25Yr - estCost);
      const co2Tons = (estMonthlyGen * 12 * 0.79 / 1000).toFixed(1);

      // DOM Updates
      const kwpEl = document.getElementById('dash-calc-kwp');
      if (kwpEl) kwpEl.textContent = recommendedKwp.toFixed(1) + ' kWp';

      const panelsEl = document.getElementById('dash-calc-panels');
      if (panelsEl) panelsEl.textContent = Math.ceil(recommendedKwp * 1000 / 550) + ' Panel (550Wp)';

      const genEl = document.getElementById('dash-calc-gen');
      if (genEl) genEl.textContent = estMonthlyGen.toLocaleString('id-ID') + ' kWh';

      const monthSaveEl = document.getElementById('dash-calc-monthly-save');
      if (monthSaveEl) monthSaveEl.textContent = 'Rp ' + estMonthlySaving.toLocaleString('id-ID');

      const annSaveEl = document.getElementById('dash-calc-annual-save');
      if (annSaveEl) annSaveEl.textContent = 'Rp ' + (estAnnualSaving / 1000000).toFixed(1) + ' Jt';

      const bepEl = document.getElementById('dash-calc-bep');
      if (bepEl) bepEl.textContent = bepYears.toFixed(1) + ' Tahun';

      const net25El = document.getElementById('dash-calc-net25');
      if (net25El) net25El.textContent = 'Rp ' + (net25Yr / 1000000).toFixed(1) + ' Juta';

      const co2El = document.getElementById('dash-calc-co2');
      if (co2El) co2El.textContent = co2Tons + ' Ton/thn';
    }
    window.updateDashCalculator = updateDashCalculator;

    // Auto-initialize on load if dashboard is visible
    document.addEventListener('DOMContentLoaded', () => {
      const dashSec = document.getElementById('state-dashboard');
      if (dashSec && !dashSec.classList.contains('hidden')) {
        setTimeout(initShopifyGlobe, 100);
        startDashLiveClock();
        updateDashCalculator();
      }
    });



