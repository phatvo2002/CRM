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
    }
}
