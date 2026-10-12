function EncabezadoAdmin({ titulo, subtitulo, children }) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-4">
      <div>
        <h1 className="h3 mb-0">{titulo}</h1>
        {subtitulo && <p className="text-muted mb-0">{subtitulo}</p>}
      </div>
      <div className="d-flex gap-2 flex-wrap">{children}</div>
    </div>
  );
}

export default EncabezadoAdmin;
