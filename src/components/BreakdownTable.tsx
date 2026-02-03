import { HeatPumpResult } from '../logic/heatPumpCalculations';

interface BreakdownTableProps {
    result: HeatPumpResult;
}

export default function BreakdownTable({ result }: BreakdownTableProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="card">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                Cost Breakdown
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Low Estimate</th>
                        <th>High Estimate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Heat Pump System</td>
                        <td>{formatCurrency(result.systemLow)}</td>
                        <td>{formatCurrency(result.systemHigh)}</td>
                    </tr>
                    <tr>
                        <td>Installation Labor</td>
                        <td>{formatCurrency(result.installLow)}</td>
                        <td>{formatCurrency(result.installHigh)}</td>
                    </tr>
                    {(result.ductworkLow > 0 || result.ductworkHigh > 0) && (
                        <tr>
                            <td>Ductwork Installation</td>
                            <td>{formatCurrency(result.ductworkLow)}</td>
                            <td>{formatCurrency(result.ductworkHigh)}</td>
                        </tr>
                    )}
                    {(result.electricalLow > 0 || result.electricalHigh > 0) && (
                        <tr>
                            <td>Electrical Upgrade</td>
                            <td>{formatCurrency(result.electricalLow)}</td>
                            <td>{formatCurrency(result.electricalHigh)}</td>
                        </tr>
                    )}
                    {result.climateSurcharge > 0 && (
                        <tr>
                            <td>Cold Climate Equipment</td>
                            <td colSpan={2} style={{ textAlign: 'center' }}>~{formatCurrency(result.climateSurcharge)} included</td>
                        </tr>
                    )}
                    <tr style={{ fontWeight: 600 }}>
                        <td>Total Estimated Cost</td>
                        <td>{formatCurrency(result.totalLow)}</td>
                        <td>{formatCurrency(result.totalHigh)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
