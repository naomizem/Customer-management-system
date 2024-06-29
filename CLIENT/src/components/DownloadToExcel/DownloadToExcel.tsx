import React, { FC } from 'react';
import * as XLSX from 'xlsx';
import { FaFileExcel } from 'react-icons/fa';
import { Status } from '../../enums/typeCustemers.enum';
import { customersDetalies } from '../../model/customersDetalies.model';

interface DownloadToExcelProps {
  customers: customersDetalies[];
  paturData: any;
  morashaData: any;
}

const DownloadToExcel: FC<DownloadToExcelProps> = ({ customers, paturData, morashaData }) => {

  const handleExport = () => {
    const data = customers.map((customer: any) => ({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      status: customer.status,
      ...(customer.status === Status.Patur ? { zuir: paturData[customer.id]?.zuir, haratKeva: paturData[customer.id]?.haratKeva } : {}),
      ...(customer.status === Status.Morasha ? { T100: morashaData[customer.id]?.T100 } : {}),
      pay: customer.pay,
      dochSnati: customer.dochSnati,
      note: customer.note,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    // Add styles
    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center', vertical: 'center', readingOrder: 2 }, // readingOrder: 2 sets RTL direction
    };

    const wscols = [
      { wpx: 100 }, // id
      { wpx: 100 }, // name
      { wpx: 100 }, // phone
      { wpx: 100 }, // status
      { wpx: 100 }, // zuir
      { wpx: 100 }, // haratKeva
      { wpx: 100 }, // T100
      { wpx: 100 }, // pay
      { wpx: 100 }, // dochSnati
      { wpx: 100 }, // note
    ];

    worksheet['!cols'] = wscols;

    // Iterate over the range to apply styles
    const range = XLSX.utils.decode_range(worksheet['!ref']!);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: C })];
      if (cell) cell.s = headerStyle;
    }

    worksheet['!cols'].forEach(col => { col.hidden = false; }); // Ensure columns are not hidden
    worksheet['!direction'] = 'rtl'; // Set worksheet direction to RTL

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
    XLSX.writeFile(workbook, 'customers.xlsx');
  };

  return (
<button className="btn btn-success d-flex align-items-center" onClick={handleExport}>
  <FaFileExcel className="mr-2" size={20} style={{ cursor: 'pointer', color: 'white' }} />
  <span style={{ color: 'white' }}>הורדה לאקסל</span>
</button>


  );

}
export default DownloadToExcel;
