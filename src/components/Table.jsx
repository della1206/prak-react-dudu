export default function Table({ headers, children }) {
  return (
    <div className="overflow-x-auto w-full rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-4 border-b border-gray-200">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {children}
        </tbody>
      </table>
    </div>
  );
}