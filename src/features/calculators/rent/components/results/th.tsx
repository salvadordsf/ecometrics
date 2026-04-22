export const Th = ({
  children,
  align = "right",
}: {
  children: string;
  align?: "left" | "right";
}) => (
  <th
    className={`px-4 py-2 text-xs tracking-[0.1em] uppercase text-gray-500 font-medium text-${align}`}
  >
    {children}
  </th>
);
