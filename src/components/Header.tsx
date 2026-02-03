export default function Header() {
    return (
        <header className="card">
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                Heat Pump Installation Cost Estimator 2026
            </h1>
            <p style={{ color: 'var(--color-text-light)' }}>
                Calculate heat pump installation costs for air-source, ductless, and ground-source systems based on your home and climate.
            </p>
        </header>
    );
}
