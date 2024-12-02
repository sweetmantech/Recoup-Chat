import getBlob from "./getBlob";
import { uploadToIpfs } from "./ipfs";

const uploadPfpToIpfs = async (image: string) => {
  const { blob, type } = await getBlob(image);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const avatarBlob = new Blob([blob as any], { type });
  const fileName = "avatar.png";
  const avatarFile = new File([avatarBlob], fileName, { type });
  const formData = new FormData();
  formData.append("file", avatarFile);
  const avatarCid = await uploadToIpfs(formData);

  return avatarCid;
};

export default uploadPfpToIpfs;
