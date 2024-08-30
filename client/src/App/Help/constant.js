export const topBarHeight = 64;
export const sideNavWidth = 260;
export const navbarHeight = 60;
export const sidenavCompactWidth = 80;
export const containedLayoutWidth = 1200;
export const TYPE_MODAL = {
  INSERT: "INSERT",
  UPDATE: "UPDATE",
  VIEW: "VIEW",
};

export const palletColor = {
  primary: "RGB(20, 70, 140)",
  secondary: "#dc004e",
  warning: "#ff9800",
  delete: "#f44336",
  refresh: "#8bc34a",
  submit: "#2e7d32",
  view: "#01579b",
  copy: "#003863",
  exportExcel: "#70AD47",
  exportWord: "#1A76D2",
  async: "#8bc34a",
  xuatBan: "#70AD47",
};

//config ckeditor
export const editorConfiguration = {
  toolbar: {
    shouldNotGroupWhenFull: true,
  },
  fontSize: {
    options: [12, 14, 16, 18, 20, 22, 24, 25],
  },
  fontFamily: {
    options: [
      "Arial",
      "sans-serif",
      "Comic Sans MS",
      "Courier New",
      "Georgia",
      "Lucida Sans Unicode",
      "Tahoma",
      "Geneva",
      "Times New Roman",
      "Trebuchet MS",
      "Verdana",
      "Muli",
    ],
  },
  removePlugins: ["Title", "Markdown", "MediaEmbedToolbar"],
};
