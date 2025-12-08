import PDFDocument from "pdfkit";
import bwipjs from "bwip-js";

interface IItem {
    name:string,
    quantity: number,
    price: number
}

export  const generateStyledInvoice = async(
    shopInfo: {
        name: string;
        address:string;
     phone:string;
    },
    invoiceNumber:string,
    customerName:string,
    paymentMethod: string,
    items: IItem[],
    discount: number,
    tax:number,
    grandTotal: number,
    subtotal: number
): Promise<Buffer> =>{
    return new Promise(async(resolve) =>{
        const doc = new PDFDocument({margin: 50});
        let buffers: Buffer[] = [];
        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () =>resolve(Buffer.concat(buffers)))
        
    // ---------------------------------------
    // Shop Header Section with style
    // ---------------------------------------
         doc
      .fontSize(26)
      .fillColor("#1a73e8")
      .text(shopInfo.name, { align: "center" });
        doc
      .fontSize(12)
      .fillColor("#000")
      .text(shopInfo.address, { align: "center" })
      .text(`Phone: ${shopInfo.phone}`, { align: "center" })
      .moveDown(2);
       // ---------------------------------------
    // Invoice Title and Number
    // ---------------------------------------
    doc
      .fontSize(18)
      .text("INVOICE", { align: "center", underline: true })
      .moveDown();

    doc.fontSize(12).text(`Invoice No: ${invoiceNumber}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.text(`Customer: ${customerName}`).moveDown(2);

    // ---------------------------------------
    // Generate Barcode
    // ---------------------------------------
    const barcodePng = await bwipjs.toBuffer({
      bcid: "code128",
      text: invoiceNumber,
      scale: 3,
      height: 10,
      includetext: true,
    });

    doc.image(barcodePng,{ fit: [100, 100] }).moveDown(2);

    // ---------------------------------------
    // Table Header
    // ---------------------------------------
    doc
      .fontSize(14)
      .fillColor("#1a73e8")
      .text("Items", { underline: true })
      .moveDown(0.5);

    doc.fillColor("#000").fontSize(12);
    doc.text("Product", 50);
    doc.text("Qty", 250);
    doc.text("Price", 300);
    doc.text("Total", 400);
    doc.moveDown();

    let subtotal = 0;
     // ---------------------------------------
    // Items
    // ---------------------------------------
    items.forEach((item, i) => {
      const total = item.quantity * item.price;
      subtotal += total;

      doc.text(item.name, 50);
      doc.text(String(item.quantity), 250);
      doc.text(item.price.toFixed(2), 300);
      doc.text(total.toFixed(2), 400);
      doc.moveDown();
    });

    // ---------------------------------------
    // Calculations
    // ---------------------------------------
    const discountAmount = (subtotal * discount) / 100;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = (afterDiscount * tax) / 100;
    const grandTotal = afterDiscount + taxAmount;

    doc.moveDown(2);
    doc.fontSize(13);

    doc.text(`Subtotal: ${subtotal.toFixed(2)}`, { align: "right" });
    doc.text(`Discount (${discount}%): -${discountAmount.toFixed(2)}`, {
      align: "right",
    });
    doc.text(`Tax (${tax}%): +${taxAmount.toFixed(2)}`, { align: "right" });

    doc
      .fontSize(16)
      .fillColor("#1a73e8")
      .text(`Grand Total: ${grandTotal.toFixed(2)}`, {
        align: "right",
        underline: true,
      })
      .fillColor("#000")
      .moveDown(2);

    // ---------------------------------------
    // Payment Section
    // ---------------------------------------
    doc
      .fontSize(14)
      .text("Payment Details", { underline: true })
      .moveDown(0.5);

    doc.fontSize(12).text(`Payment Method: ${paymentMethod}`);
    doc.moveDown(2);

    // ---------------------------------------
    // Footer
    // ---------------------------------------
    doc
      .fontSize(12)
      .fillColor("#1a73e8")
      .text("Thank you for shopping with us!", { align: "center" })
      .fillColor("#000");

    doc.end();

    })

}