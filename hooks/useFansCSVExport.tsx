import { mkConfig, generateCsv, download } from "export-to-csv";

const useFansCSVExport = () => {
  const exportCSV = (fansProfiles: any) => {
    const profiles = fansProfiles.filter((profile: any) => profile);
    const csvConfig = mkConfig({ useKeysAsHeaders: true });
    const csv = generateCsv(csvConfig)(profiles);
    download(csvConfig)(csv);
  };

  return {
    exportCSV,
  };
};

export default useFansCSVExport;
