const CurrentState = () => {
  const latestTimestamp = new Date().toLocaleTimeString();

  return (
    <div className="bg-black/50 p-4 rounded border border-green-900">
      <h2 className="text-sm font-bold mb-2 flex gap-2">
        <span>CURRENT_STATE</span>
        {latestTimestamp && (
          <span className="text-green-600">@{latestTimestamp}</span>
        )}
      </h2>
      <div className="flex items-start gap-2">
        <span className="text-blue-400">{">"}</span>
        <p className="text-sm whitespace-pre-line">
          Awaiting new events...
          <span className="animate-pulse">_</span>
        </p>
      </div>
    </div>
  );
};

export default CurrentState;
