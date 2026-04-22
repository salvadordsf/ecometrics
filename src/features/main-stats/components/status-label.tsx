export const StatusLabel = () => {
  return (
    <div className="p-4 flex gap-3">
      {/* Healthy - Green */}
      <div className="border border-green-800 bg-green-800/20 rounded-3xl px-3 py-0.5 text-green-300">
        <span className="text-neutral-200">Saludable</span>
      </div>

      {/* Risk - Yellow */}
      <div className="border border-yellow-600 bg-yellow-600/20 rounded-3xl px-3 py-0.5 text-yellow-300">
        <span className="text-neutral-200">En riesgo</span>
      </div>

      {/* Critic - Red */}
      <div className="border border-red-600 bg-red-600/20 rounded-3xl px-3 py-0.5 text-red-300">
        <span className="text-neutral-200">Crítico</span>
      </div>
    </div>
  );
};
