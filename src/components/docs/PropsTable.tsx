interface Prop {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: Prop[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto mb-6 border border-eva-mid-gray">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-eva-dark-gray">
            <th
              className="text-left px-3 py-2 text-eva-orange uppercase tracking-wider font-bold border-b border-eva-mid-gray"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              Prop
            </th>
            <th
              className="text-left px-3 py-2 text-eva-orange uppercase tracking-wider font-bold border-b border-eva-mid-gray"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              Type
            </th>
            <th
              className="text-left px-3 py-2 text-eva-orange uppercase tracking-wider font-bold border-b border-eva-mid-gray"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              Default
            </th>
            <th
              className="text-left px-3 py-2 text-eva-orange uppercase tracking-wider font-bold border-b border-eva-mid-gray"
              style={{ fontFamily: "var(--font-eva-display)" }}
            >
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-eva-mid-gray/40 hover:bg-eva-dark-gray/50 transition-colors"
            >
              <td className="px-3 py-2 font-mono text-eva-cyan whitespace-nowrap">
                {prop.name}
                {prop.required && (
                  <span className="text-eva-red ml-1">*</span>
                )}
              </td>
              <td className="px-3 py-2 font-mono text-eva-magenta whitespace-nowrap">
                {prop.type}
              </td>
              <td className="px-3 py-2 font-mono text-eva-green">
                {prop.default || "—"}
              </td>
              <td
                className="px-3 py-2 text-eva-white"
                style={{ fontFamily: "var(--font-eva-body)" }}
              >
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
