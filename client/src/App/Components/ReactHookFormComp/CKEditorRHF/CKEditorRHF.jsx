
// import Editor from "ckeditor5-custom-build/build/ckeditor";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { Alert } from "@mui/material";
// import { bool, string } from "prop-types";
// import { memo } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// // import { useFileInsertMutation } from "src/apis/fileApi";
// import PSCInputSkeleton from "../../PSCInputSkeleton";
// import { v4 as uuid } from "uuid";
// import "./CKEditorRHF.styles.scss";

// // import { Alignment } from "@ckeditor/ckeditor5-alignment";

// const CKEditorRHF = (props) => {
//   const {
//     name,
//     label,
//     required,
//     setBase64Data,
//     skeletonLoading = false,
//     ...otherProps
//   } = props,
//     {
//       formState: { errors },
//       control,
//     } = useFormContext();

//   // const [fileInsertMutation] = useFileInsertMutation();

//   const handleEditorInit = (editor) => {
//     editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
//       // return {
//       //   upload: async () => {
//       //     try {
//       //       const _id = uuid();
//       //       const file = await loader.file;

//       //     //   return new Promise((resolve, reject) => {
//       //     //     const reader = new FileReader();
//       //     //     reader.onloadend = (e) => {
//       //     //       const newFile = {
//       //     //         // Config File Obj here
//       //     //         // pdfPath:
//       //     //       //     getFileType(file.name) === ".pdf" ? e.target.result : null,
//       //     //       //   file: {
//       //     //       //     ...file,
//       //     //       //     FileBase64: reader.result
//       //     //       //       ?.replace("data:", "")
//       //     //       //       ?.replace(/^.+,/, ""),
//       //     //       //   },
//       //     //       //   Id: _id,
//       //     //       //   FileBase64: reader.result
//       //     //       //     ?.replace("data:", "")
//       //     //       //     ?.replace(/^.+,/, ""),
//       //     //       //   fileName: file.name,
//       //     //       //   size: file.size,
//       //     //       //   explain: "",
//       //     //       // };
//       //     //       // fileInsertMutation(newFile)
//       //     //       //   .unwrap()
//       //     //       //   .then(({ Data }) => {
//       //     //       //     resolve({ default: Data?.FilePath });
//       //     //       //     // Get the file URL from the uploaded file response
//       //     //       //     // const fileUrl = Data?.FilePath;
//       //     //       //     // Insert the file URL into the editor
//       //     //       //     // const imageElement = editor.model.schema.create("image", {
//       //     //       //     //   src: fileUrl,
//       //     //       //     // });

//       //     //       //     // editor.model.insertContent(
//       //     //       //     //   imageElement,
//       //     //       //     //   editor.model.document.selection
//       //     //       //     // );
//       //     //       //   });
//       //     //     };

//       //     //     reader.onerror = (error) => {
//       //     //       console.error("Error reading file:", error);
//       //     //       reject(error);
//       //     //     };

//       //     //     reader.readAsDataURL(file);
//       //     //   });
//       //     // } catch (error) {
//       //     //   console.error("Error uploading file:", error);
//       //     // }
//       //   },
//       //   delete: async (file) => {
//       //     try {
//       //       //console.log("delete");
//       //       // Perform the delete logic here using the 'file' object
//       //       // await deleteFileFromServer(file);
//       //       // Remove the file from the editor content, if necessary
//       //     } catch (error) {
//       //       console.error("Error deleting file:", error);
//       //     }
//       //   },
//       // };
//     };
//     // show lên các toolbar item có thể sử dụng
//     // const toolbar = Array.from(editor?.ui?.componentFactory?.names());
//     // console.log("toolbar :>> ", toolbar);
//   };

//   return (
//     <div>
//       <Controller
//         name={name}
//         control={control}
//         render={({ field: { value, onChange, ...otherField } }) => (
//           <PSCInputSkeleton loading={skeletonLoading} multiline={2}>
//             {label && <h6 className="font-weight-bold">{label}</h6>}
//             <CKEditor
//               editor={Editor}
//               onReady={handleEditorInit}
//               data={value}
//               onChange={(e, editor) => {
//                 const data = editor.getData();
//                 onChange(data);
//               }}
//               config={{
//                 // ckfinder: {
//                 //   uploadUrl:
//                 //     "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",
//                 //   options: {
//                 //     resourceType: "Images",
//                 //   },
//                 // },
//                 // ckbox: {
//                 //   // Feature configuration.
//                 //   defaultUploadCategories: {
//                 //     Bitmaps: ["bmp"],
//                 //     Pictures: ["jpg", "jpeg"],
//                 //     Scans: ["png", "tiff"],
//                 //   },
//                 //   ignoreDataId: true,
//                 //   // serviceOrigin: "https://example.com/",
//                 //   // tokenUrl: "https://example.com/cs-token-endpoint",
//                 // },
//                 // plugins:[Alignment],
//                 toolbar: {
//                   shouldNotGroupWhenFull: true,
//                   items: [
//                     // "selectAll",
//                     "undo",
//                     "redo",
//                     "|",
//                     "heading",
//                     "|",
//                     "bold",
//                     "italic",
//                     "blockQuote",
//                     "link",
//                     "|",
//                     "alignment",
//                     "numberedList",
//                     "bulletedList",
//                     "indent",
//                     "outdent",
//                     // "CKBox",
//                     // "imageUpload",
//                     // {
//                     //   label: "Insert",
//                     //   icon: "plus",
//                     //   items: [
//                     //     "imageTextAlternative",
//                     //     "toggleImageCaption",
//                     //     "imageStyle:side",
//                     //     "imageStyle:wrapText",
//                     //     "imageStyle:breakText",
//                     //   ],
//                     // },
//                     // "mediaEmbed",
//                     // "|",
//                     // "insertTable",
//                     // "tableColumn",
//                     // "tableRow",
//                     // "mergeTableCells",
//                     // "ckfinder",
//                     // "|",
//                     // "uploadImage",

//                   ],

//                   // shouldNotGroupWhenFull: true,
//                 },
//                 removePlugins: ["Title", "Markdown", "MediaEmbedToolbar"],
//               }}
//               {...otherField}
//               {...otherProps}
//             />
//           </PSCInputSkeleton>
//         )}
//       />

    
//     </div>
//   );
// };

// // Specifies Type for props:
// CKEditorRHF.propTypes = {
//   name: string,
//   required: bool,
//   skeletonLoading: bool,
// };

// export default memo(CKEditorRHF);
