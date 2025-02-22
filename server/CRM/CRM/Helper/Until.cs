
using OpenXmlPowerTools;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;
namespace CRM.Helper
{
    public static class Until
    {
        public static string GetmimeType(string extension)
        {
            string mimeType = string.Empty;
            switch (extension)
            {
                case ".png":
                    mimeType = "image/png";
                    break;
                case ".jpg":
                    mimeType = "image/jpg";
                    break;
                case ".jpeg":
                    mimeType = "image/jpeg";
                    break;
                case ".pdf":
                    mimeType = "application/pdf";
                    break;
                case ".xlsx":
                    mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    break;
                case ".xls":
                    mimeType = "application/vnd.ms-excel";
                    break;
                case ".docx":
                    mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    break;
                case ".doc":
                    mimeType = "application/msword";
                    break;
                default:
                    // no support
                    break;
            }
            return mimeType;
        }
        public static string UploadFileImage(IFormFile file)
        {
            try
            {
                string folder = $"UploadFiles/Images/{DateTime.Now.ToString("yyyyMMdd")}/";
                // full path to file in temp location
                var filePath = Path.Combine(
                    Directory.GetCurrentDirectory(), "wwwroot",
                    folder);

                bool folderExists = Directory.Exists(filePath);
                if (!folderExists)
                    Directory.CreateDirectory(filePath);

                var url = "";

                var id = Guid.NewGuid();
                var fullpath = filePath + $"{id}_{file.FileName.Replace(" ", "")}";
                using (var image = Image.Load(file.OpenReadStream()))
                {
                    int width = image.Width;
                    if (image.Width > 800)
                    {
                        width = 800;
                    }
                    image.Mutate(x => x
                         .Resize(width, 0)
                     );

                    image.Save(fullpath);
                    url = url + folder + $"{id}_{file.FileName.Replace(" ", "")}";
                }
                return url;
            }
            catch (Exception exp)
            {
                string message = $"file / upload failed! + {exp.Message}";
                return "";
            }
        }

        public static bool DeleteFile(string fileName)
        {
            try
            {
                if (!string.IsNullOrEmpty(fileName))
                {
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileName);

                    if (System.IO.File.Exists(filePath))
                        System.IO.File.Delete(filePath);
                    return true;
                }
                return false;
            }
            catch (Exception exp)
            {
                string message = $"file / upload failed! + {exp.Message}";
                return false;
            }

        }

        public static XElement ObjectToXml<T>(T obj)
        {
            XmlSerializer ser = new XmlSerializer(typeof(T));
            {
                XDocument doc = new XDocument();
                using (XmlWriter xw = doc.CreateWriter())
                {
                    ser.Serialize(xw, obj);
                    xw.Close();
                }
                return doc.Root;
            }
        }

        public static async Task<byte[]> RenderTemplate<T>(string path, T data)
        {
            var templateDoc = new FileInfo(path);
            var obj = ObjectToXml<T>(data);
            WmlDocument wmlDoc = new WmlDocument(templateDoc.FullName);
            WmlDocument wmlAssembledDoc = OpenXmlPowerTools.DocumentAssembler.AssembleDocument(wmlDoc, obj, out _);
            if (true)
            {
                return wmlAssembledDoc.DocumentByteArray;
            }

            //return await File.ReadAllBytesAsync(path);
        }
    }
}
