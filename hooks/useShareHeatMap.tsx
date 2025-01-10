import { uploadFile } from "@/lib/ipfs/uploadToIpfs";
import { useEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image";
import getIpfsLink from "@/lib/ipfs/getIpfsLink";

const useShareHeatMap = () => {
  const heatmap = useRef() as any;
  const [loading, setLoading] = useState(false);
  const [blob, setBlob] = useState<any>(null);

  const download = async () => {
    if (!blob) return;
    setLoading(true);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "heatmap.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setLoading(false);
  };

  const tweets = async () => {
    if (!blob) return;
    setLoading(true);
    const fileName = "heatmap.png";
    const fileType = "image/png";
    const mapFile = new File([blob], fileName, { type: fileType });
    const { cid } = await uploadFile(mapFile);
    const tweetLink = `https://x.com/intent/tweet?text=${encodeURIComponent(getIpfsLink(`ipfs://${cid}`))}`;
    window.open(tweetLink, "_blank");
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const domBlob = await domtoimage.toBlob(heatmap.current);
      setBlob(domBlob);
    };
    if (!heatmap.current) return;
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heatmap.current]);

  return {
    loading,
    download,
    tweets,
    blob,
    heatmap,
  };
};

export default useShareHeatMap;
