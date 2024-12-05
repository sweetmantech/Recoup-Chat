const AnalysisPlan = () => {
  return (
    <div className="font-bold text-sm">
      <p className="pb-4">{`Here's the plan -`}</p>
      <ul className="list-inside pl-4">
        <li className="list-disc">Artist Analysis</li>
        <li className="list-disc">Fan Segmentation</li>
        <li className="list-disc">Report Generation</li>
      </ul>
      <p className="font-normal pt-6">{`Let's get started!`}</p>
    </div>
  );
};

export default AnalysisPlan;
