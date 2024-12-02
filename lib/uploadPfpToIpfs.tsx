import getBlob from "./getBlob";
import { uploadToIpfs } from "./ipfs";

const uploadPfpToIpfs = async (image: string) => {
  const avatarBlobBuffer = await getBlob(image);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const avatarBlob = new Blob([avatarBlobBuffer as any], { type: "image/png" });
  const fileName = "avatar.png";
  const avatarFile = new File([avatarBlob], fileName, { type: "image/png" });
  const formData = new FormData();
  formData.append("file", avatarFile);
  const avatarCid = await uploadToIpfs(formData);

  return `https://ipfs.decentralized-content.com/ipfs/${avatarCid}`;
};

export default uploadPfpToIpfs;
