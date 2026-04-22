export const VarDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="max-w-3xl p-2 pb-10 text-neutral-200">
      <h3 className="mb-3 font-semibold text-xl">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};
