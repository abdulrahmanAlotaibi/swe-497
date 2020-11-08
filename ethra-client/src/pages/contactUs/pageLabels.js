import { v4 as uuidv4 } from "uuid";
export const inputs = [
  {
    _id: uuidv4(),
    label: "Email",
    element: "input",
    type: "email",
    id: "email",
    name: "email",
    required: true,
    defaultValue: null,
  },
  {
    _id: uuidv4(),
    label: "Subject",
    element: "input",
    type: "text",
    id: "subject",
    name: "subject",
    defaultValue: null,
  },
  {
    _id: uuidv4(),
    label: "Message",
    element: "textarea",
    id: "subject",
    name: "subject",
    cols: "30",
    rows: "10",
    defaultValue: null,
  },
];
