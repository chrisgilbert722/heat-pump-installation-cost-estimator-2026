export interface HeatPumpInput {
    pumpType: 'airSource' | 'ductless' | 'groundSource';
    homeSize: 'small' | 'medium' | 'large';
    climateZone: 'mild' | 'cold' | 'veryCold';
    existingDuctwork: 'yes' | 'no';
    electricalUpgrade: 'yes' | 'no';
    region: 'low' | 'average' | 'high';
}

export interface HeatPumpResult {
    totalLow: number;
    totalHigh: number;
    systemLow: number;
    systemHigh: number;
    installLow: number;
    installHigh: number;
    ductworkLow: number;
    ductworkHigh: number;
    electricalLow: number;
    electricalHigh: number;
    climateSurcharge: number;
}

const BASE_SYSTEM_COSTS: Record<string, { low: number; high: number }> = {
    airSource: { low: 4000, high: 8000 },
    ductless: { low: 3500, high: 7500 },
    groundSource: { low: 10000, high: 20000 }
};

const HOME_SIZE_ADDERS: Record<string, { low: number; high: number }> = {
    small: { low: 0, high: 0 },
    medium: { low: 1000, high: 2000 },
    large: { low: 2000, high: 4000 }
};

const CLIMATE_SURCHARGES: Record<string, { low: number; high: number }> = {
    mild: { low: 0, high: 0 },
    cold: { low: 1000, high: 2000 },
    veryCold: { low: 2000, high: 3000 }
};

const DUCTWORK_COST: { low: number; high: number } = { low: 2000, high: 5000 };
const ELECTRICAL_COST: { low: number; high: number } = { low: 1000, high: 3000 };

const BASE_INSTALL_COSTS: Record<string, { low: number; high: number }> = {
    airSource: { low: 2000, high: 4000 },
    ductless: { low: 1500, high: 3500 },
    groundSource: { low: 5000, high: 10000 }
};

const REGION_MULTIPLIERS: Record<string, number> = {
    low: 0.85,
    average: 1.0,
    high: 1.25
};

export function calculateHeatPumpCost(input: HeatPumpInput): HeatPumpResult {
    const baseCost = BASE_SYSTEM_COSTS[input.pumpType];
    const sizeAdder = HOME_SIZE_ADDERS[input.homeSize];
    const climateCost = CLIMATE_SURCHARGES[input.climateZone];
    const installCost = BASE_INSTALL_COSTS[input.pumpType];
    const regionMult = REGION_MULTIPLIERS[input.region];

    // System cost with size adjustment
    let systemLow = baseCost.low + sizeAdder.low;
    let systemHigh = baseCost.high + sizeAdder.high;

    // Installation labor
    let installLow = installCost.low;
    let installHigh = installCost.high;

    // Ductwork (if needed and not ductless)
    let ductworkLow = 0;
    let ductworkHigh = 0;
    if (input.existingDuctwork === 'no' && input.pumpType !== 'ductless') {
        ductworkLow = DUCTWORK_COST.low;
        ductworkHigh = DUCTWORK_COST.high;
    }

    // Electrical upgrade
    let electricalLow = 0;
    let electricalHigh = 0;
    if (input.electricalUpgrade === 'yes') {
        electricalLow = ELECTRICAL_COST.low;
        electricalHigh = ELECTRICAL_COST.high;
    }

    // Climate surcharge
    let climateSurcharge = Math.round((climateCost.low + climateCost.high) / 2);

    // Calculate totals before region multiplier
    let totalLow = systemLow + installLow + ductworkLow + electricalLow + climateCost.low;
    let totalHigh = systemHigh + installHigh + ductworkHigh + electricalHigh + climateCost.high;

    // Apply region multiplier
    totalLow = totalLow * regionMult;
    totalHigh = totalHigh * regionMult;
    systemLow = systemLow * regionMult;
    systemHigh = systemHigh * regionMult;
    installLow = installLow * regionMult;
    installHigh = installHigh * regionMult;
    ductworkLow = ductworkLow * regionMult;
    ductworkHigh = ductworkHigh * regionMult;
    electricalLow = electricalLow * regionMult;
    electricalHigh = electricalHigh * regionMult;

    return {
        totalLow: Math.round(totalLow),
        totalHigh: Math.round(totalHigh),
        systemLow: Math.round(systemLow),
        systemHigh: Math.round(systemHigh),
        installLow: Math.round(installLow),
        installHigh: Math.round(installHigh),
        ductworkLow: Math.round(ductworkLow),
        ductworkHigh: Math.round(ductworkHigh),
        electricalLow: Math.round(electricalLow),
        electricalHigh: Math.round(electricalHigh),
        climateSurcharge
    };
}

export const defaultValues: HeatPumpInput = {
    pumpType: 'airSource',
    homeSize: 'medium',
    climateZone: 'mild',
    existingDuctwork: 'yes',
    electricalUpgrade: 'no',
    region: 'average'
};
