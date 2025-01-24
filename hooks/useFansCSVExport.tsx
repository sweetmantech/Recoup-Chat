import { mkConfig, generateCsv, download } from "export-to-csv";

const useFansCSVExport = () => {
  const exportCSV = (fansProfiles: any) => {
    const csvConfig = mkConfig({ useKeysAsHeaders: true });
    const csv = generateCsv(csvConfig)(fansProfiles);
    download(csvConfig)(csv);
  };

  return {
    exportCSV,
  };
};

export default useFansCSVExport;
