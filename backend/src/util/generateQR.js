import QRCode from "qrcode";

export default async function generateQrCode(slug) {
  const url = `http://localhost:5173/gift/${slug}`;

  const qrImage = await QRCode.toDataURL(url);

  return qrImage;
}
