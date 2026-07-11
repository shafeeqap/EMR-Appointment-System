import React from "react";
import { History } from "lucide-react";
import Table from "../../../components/table/Table";

const Histories = ({ columns, patientData, history, page, setPage }) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        <History className="text-green-600" />

        <h3 className="font-semibold text-lg text-green-600">
          Appointment History
        </h3>
      </div>

      <Table columns={columns} data={history} />

      {patientData?.totalPages > 1 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={patientData?.totalPages || 1}
        />
      )}
    </>
  );
};

export default Histories;
