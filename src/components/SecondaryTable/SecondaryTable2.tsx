import { useState } from "react";
import SelectForTable from "../SelectForTable";
import { SecondaryTable2, SecondaryTable2Options } from "./";

export const Type2 = () => {
  const groupTableProps: SecondaryTable2Options = {
    rowIds,
    rows,
    heads,
    width: "100%",
    height: "500px",
    styles: {
      column: {
        description: { textAlign: "left", paddingRight: "500 px" },
      },
    },
  };
  return <SecondaryTable2 {...groupTableProps} />;
};


const Status = ({ initialValue = 'idea' }) => {
  const [type, setType] = useState<string | null>(initialValue);
  return (
    <SelectForTable
      placeholder="Select Type"
      value={type}
      options={[
        { value: "idea", title: "Ongoing", accessible: true },
        { value: "bug", title: "pending", accessible: true },
      ]}
      onChange={(d) => {
        console.log(d);
        setType(d as string | null);
      }}
    />
  );
};

const heads = [
  { id: "CreatedOn", titleData: "Created ON" },
  { id: "description", titleData: "Description" },
  { id: "Type", titleData: "Type" },
  { id: "Page", titleData: "Page" },
  { id: "submittedBy", titleData: "Submitted By" },
  { id: "status", titleData: "Status" },
];

const rowIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

const backendData = [
  {
    CreatedOn: "25 Nov 2021",
    description: "Even save a list to apply to other campaigns or ad groups. That way we can block similar terms that are junk across multiple campaigns.",
    Type: "IDEA",
    Page: "/blackpink",
    submittedBy: "Priyanka",
  },
  {
    CreatedOn: "22 Nov 2021",
    description: "Even save a list to apply to other campaigns or ad groups. That way we can block similar terms that are junk across multiple campaigns.",
    Type: "IDEA",
    Page: "/blackpink",
    submittedBy: "Priyanka",
  },
  {
    CreatedOn: "19 Nov 2021",
    description: "Product dimension should be renamed as Advertised Product as we already have Product Search Term which leads to confusion.",
    Type: "IDEA",
    Page: "/blackpink",
    submittedBy: "Priyanka",
  },
  {

    CreatedOn: "19 Nov 2021",
    description: "Campaign on/off toggle does not work on campaign detail page view",
    Type: "BUG",
    Page: "/Chewy",
    submittedBy: "Priyanka",
  },
  {
    CreatedOn: "15 Nov 2021",
    description: "Campaign pages does not load....it shows some unexpected error.",
    Type: "BUG",
    Page: "/Amazon",
    submittedBy: "Priyanka",
  },
  {
    CreatedOn: "11 Nov 2021",
    description: "Bids not getting applied via bulk or for single changes. It shows Bids applied but the new bids are not visible.",
    Type: "IDEA",
    Page: "/DermaCo",
    submittedBy: "Priyanka",
  },
  {
    CreatedOn: "08 Nov 2021",
    description: "this is it",
    Type: "IDEA",
    Page: "/blackpink",
    submittedBy: "Priyanka",
  },
];


const rows = backendData.map(v => ({ ...v, status: <Status /> }));
console.log(rows);