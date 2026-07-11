import React from "react";


const Table = ({ columns = [], data = [] }) => {
  return (
    <div className="mt-6 shadow-md overflow-x-auto bg-white rounded-lg">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-300 text-gray-600 text-xs  tracking-wider">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-100 transition duration-150"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-3">
                  {col.render ? (
                    col.render(row, rowIndex)
                  ) : (
                    <>
                      <p>{row[col.accessor]}</p>
                      {col.description && (
                        <small className="text-secondary">
                          {row[col.description]}
                        </small>
                      )}
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
