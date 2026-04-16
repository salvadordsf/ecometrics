export const StatusLabel = () => {
  return (
    <div className="p-4 flex gap-3">
      {/* Healthy - Green */}
      <div className="flex items-center gap-1 ">
        <div className="w-3 h-3 bg-green-700 rounded-3xl shadow"></div>
        <span className="text-neutral-200">Saludable</span>
      </div>

      {/* Risk - Yellow */}
      <div className="flex items-center gap-1 ">
        <div className="w-3 h-3 bg-yellow-400 rounded-3xl shadow"></div>
        <span className="text-neutral-200">En riesgo</span>
      </div>

      {/* Critic - Red */}
      <div className="flex items-center gap-1 ">
        <div className="w-3 h-3 bg-red-700 rounded-3xl shadow"></div>
        <span className="text-neutral-200">Crítico</span>
      </div>
      
    </div>
  );
};
