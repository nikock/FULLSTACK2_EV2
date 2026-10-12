function StatCard({ titulo, valor, detalle, variante = 'azul' }) {
  return (
    <div className={`stat-card stat-${variante}`} data-testid="stat-card">
      <p className="stat-titulo">{titulo}</p>
      <p className="stat-valor">{valor}</p>
      {detalle && <p className="stat-detalle">{detalle}</p>}
    </div>
  );
}

export default StatCard;