import { HeatPumpInput } from '../logic/heatPumpCalculations';

interface InputCardProps {
    values: HeatPumpInput;
    onChange: (values: HeatPumpInput) => void;
}

export default function InputCard({ values, onChange }: InputCardProps) {
    const handleChange = (field: keyof HeatPumpInput, value: string) => {
        onChange({ ...values, [field]: value });
    };

    return (
        <div className="card">
            <div className="form-group">
                <label htmlFor="pumpType">Heat Pump Type</label>
                <select
                    id="pumpType"
                    value={values.pumpType}
                    onChange={(e) => handleChange('pumpType', e.target.value)}
                >
                    <option value="airSource">Air-Source Heat Pump</option>
                    <option value="ductless">Ductless Mini-Split</option>
                    <option value="groundSource">Ground-Source (Geothermal)</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="homeSize">Home Size</label>
                <select
                    id="homeSize"
                    value={values.homeSize}
                    onChange={(e) => handleChange('homeSize', e.target.value)}
                >
                    <option value="small">&lt; 1,500 sq ft</option>
                    <option value="medium">1,500 – 2,500 sq ft</option>
                    <option value="large">2,500+ sq ft</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="climateZone">Climate Zone</label>
                <select
                    id="climateZone"
                    value={values.climateZone}
                    onChange={(e) => handleChange('climateZone', e.target.value)}
                >
                    <option value="mild">Mild (rarely below 30°F)</option>
                    <option value="cold">Cold (regular freezing temps)</option>
                    <option value="veryCold">Very Cold (below 0°F common)</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="existingDuctwork">Existing Ductwork</label>
                <select
                    id="existingDuctwork"
                    value={values.existingDuctwork}
                    onChange={(e) => handleChange('existingDuctwork', e.target.value)}
                >
                    <option value="yes">Yes, have ductwork</option>
                    <option value="no">No ductwork</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="electricalUpgrade">Electrical Upgrade Needed</label>
                <select
                    id="electricalUpgrade"
                    value={values.electricalUpgrade}
                    onChange={(e) => handleChange('electricalUpgrade', e.target.value)}
                >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="region">Region</label>
                <select
                    id="region"
                    value={values.region}
                    onChange={(e) => handleChange('region', e.target.value)}
                >
                    <option value="low">Low-Cost Area</option>
                    <option value="average">Average Cost Area</option>
                    <option value="high">High-Cost Metro</option>
                </select>
            </div>
        </div>
    );
}
