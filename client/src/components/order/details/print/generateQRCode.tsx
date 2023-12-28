import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

//************************************
// Description: Tạo mã code dẫn đến phần thông tin chi tiết của đơn.
//************************************

interface GenerateQRProps {
  url: string;
}

const GenerateQR: React.FC<GenerateQRProps> = ({ url }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        if (canvasRef.current) {
          await QRCode.toCanvas(canvasRef.current, url, { width:100});
          console.log('QR code generated successfully.');
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQRCode();
  }, [url]);

  return (
    <div>
      <canvas ref={canvasRef} width={200} height={200}></canvas>
    </div>
  );
};

export default GenerateQR;