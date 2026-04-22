export const VarDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="max-w-3xl p-2 pb-10 text-text-primary">
      <h3 className="mb-3 font-semibold text-xl">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
};
