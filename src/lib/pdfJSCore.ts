import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const generatePdf = () => {
  const doc = new jsPDF();

  autoTable(doc, {
    body: [
      [
        {
          content: "Company brand",
          styles: {
            fontSize: 20,
            halign: "left",
            textColor: "#ffffff",
          },
        },
        {
          content: "Invoice",
          styles: {
            fontSize: 20,
            halign: "right",
            textColor: "#ffffff",
          },
        },
      ],
    ],
    didDrawPage: function (data) {
      // Header
      doc.setFontSize(20);
      doc.setTextColor(40);
      doc.text("Report", data.settings.margin.left, 22);

      // Footer
      //const str = "Page " + doc.internal.getNumberOfPages().toString();

      doc.setFontSize(10);

      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      //const pageSize = doc.internal.pageSize;
      /*const pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();*/
      //doc.text(str, data.settings.margin.left, pageHeight - 10);
    },
    styles: {
      fillColor: "#3366ff",
    },
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content:
            "Reference: #INV0001" +
            "\nDate: 2022-01-27" +
            "\nInvoice number: 123456",
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content:
            "Billed to:" +
            "\nJohn Doe" +
            "\nBilling Address line 1" +
            "\nBilling Address line 2" +
            "\nZip code - City" +
            "\nCountry",
          styles: {
            halign: "left",
          },
        },
        {
          content:
            "Shipping address:" +
            "\nJohn Doe" +
            "\nShipping Address line 1" +
            "\nShipping Address line 2" +
            "\nZip code - City" +
            "\nCountry",
          styles: {
            halign: "left",
          },
        },
        {
          content:
            "From:" +
            "\nCompany name" +
            "\nShipping Address line 1" +
            "\nShipping Address line 2" +
            "\nZip code - City" +
            "\nCountry",
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Amount due:",
          styles: {
            fontSize: 14,
            halign: "right",
          },
        },
      ],
      [
        {
          content: "$4000",
          styles: {
            fontSize: 20,
            halign: "right",
            textColor: "#3366ff",
          },
        },
      ],
      [
        {
          content: "Due date: 2022-02-01",
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Products & Services",
          styles: {
            fontSize: 14,
            halign: "left",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      ["Product or service name", "Category", "2", "$450", "$50", "$1000"],
      ["Product or service name", "Category", "2", "$450", "$50", "$1000"],
      ["Product or service name", "Category", "2", "$450", "$50", "$1000"],
      ["Product or service name", "Category", "2", "$450", "$50", "$1000"],
    ],
    head: [["Items", "Category", "Quantity", "Price", "Tax", "Amount"]],
    headStyles: {
      fillColor: "#343a40",
    },
    theme: "striped",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Subtotal:",
          styles: {
            halign: "right",
          },
        },
        {
          content: "$3600",
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Total tax:",
          styles: {
            halign: "right",
          },
        },
        {
          content: "$400",
          styles: {
            halign: "right",
          },
        },
      ],
      [
        {
          content: "Total amount:",
          styles: {
            halign: "right",
          },
        },
        {
          content: "$4000",
          styles: {
            halign: "right",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "Terms & notes",
          styles: {
            fontSize: 14,
            halign: "left",
          },
        },
      ],
      [
        {
          content:
            "orem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia" +
            "molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum" +
            "numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium",
          styles: {
            halign: "left",
          },
        },
      ],
    ],
    theme: "plain",
  });

  autoTable(doc, {
    body: [
      [
        {
          content: "This is a centered footer",
          styles: {
            halign: "center",
          },
        },
      ],
    ],
    theme: "plain",
  });

  return doc.save("invoice");
};

export { generatePdf };
