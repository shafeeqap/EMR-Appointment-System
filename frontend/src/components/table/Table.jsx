import React from "react";
import clsx from "clsx";

const Table = ({
  columns = [],
  data = [],
  className,
  layoutStyle,
  columnStyle,
}) => {
  return (
    <div className={clsx(layoutStyle, "overflow-x-auto bg-white rounded-lg")}>
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className={clsx(className, "text-xs uppercase tracking-wider")}>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className={columnStyle}>
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
