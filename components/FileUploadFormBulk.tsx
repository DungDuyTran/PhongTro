"use client";

import { useState, useRef } from "react";

export default function FileUploadFormBulk({ className = "" }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    setShowUploadSection(true);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setMessage("");
      setErrors([]);
      setShowUploadSection(true);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setMessage("Vui lòng chọn một file Excel để tải lên.");
      return;
    }

    setIsLoading(true);
    setMessage("Đang tải lên và xử lý file, vui lòng chờ...");
    setErrors([]);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/phongtro/insertbulk", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setErrors(data.errors || []);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setShowUploadSection(false);
      } else {
        setMessage(`Lỗi: ${data.message || "Không thể xử lý yêu cầu."}`);
        setErrors(data.errors || []);
      }
    } catch (error: any) {
      setMessage(
        `Lỗi kết nối hoặc lỗi không xác định: ${
          error.message || "Đã xảy ra lỗi."
        }`
      );
      console.error("Lỗi upload file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showUploadSection) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#1D2636] p-6 rounded-lg shadow-xl max-w-lg w-11/12">
          <h2 className="text-center text-white text-xl font-bold mb-5">
            Import Dữ liệu Phòng Trọ
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                id="excelFile"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            {selectedFile ? (
              <p className="text-sm text-gray-700 mb-4">
                Đã chọn:{" "}
                <strong className="font-semibold">{selectedFile.name}</strong> (
                {Math.round(selectedFile.size / 1024)} MB)
              </p>
            ) : (
              <p className="text-sm text-gray-500 mb-4">
                Chưa có file nào được chọn. Vui lòng chọn file.
              </p>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowUploadSection(false);
                  setSelectedFile(null);
                  setMessage("");
                  setErrors([]);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm font-medium"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={!selectedFile || isLoading}
                className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-sm font-semibold transition-opacity duration-300 ${
                  !selectedFile || isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {isLoading ? "Đang Import..." : "Tải lên và Import"}
              </button>
            </div>
          </form>

          {message && (
            <p
              className={`mt-5 p-3 rounded-md text-sm ${
                errors.length > 0
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  : "bg-green-100 text-green-800 border border-green-200"
              }`}
            >
              {message}
            </p>
          )}

          {errors.length > 0 && (
            <div className="mt-5 pt-4 border-t border-dashed border-gray-300">
              <h3 className="text-red-700 text-base font-semibold mb-3">
                Các dòng dữ liệu không hợp lệ:
              </h3>
              <ul className="list-none pl-0 max-h-52 overflow-y-auto border border-red-200 rounded-md p-3">
                {errors.map((errorRow, index) => (
                  <li
                    key={index}
                    className="mb-2 p-2 bg-red-50 rounded-md text-red-800 text-sm"
                  >
                    <strong className="text-red-900">
                      Dòng {errorRow.row}:
                    </strong>
                    <ul className="list-disc ml-6 mt-1">
                      {Object.entries(errorRow.errors).map(([field, msgs]) => (
                        <li key={field} className="mb-1">
                          <strong className="text-red-900">{field}</strong>:{" "}
                          {(msgs as string[]).join(", ")}
                        </li>
                      ))}
                    </ul>
                    {errorRow.originalData && (
                      <p className="text-xs text-red-800 mt-2 italic">
                        Dữ liệu gốc: {JSON.stringify(errorRow.originalData)}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleButtonClick}
      disabled={isLoading}
      className={`px-4 py-2 font-semibold rounded-md transition-opacity duration-300  bg-green-600${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      } ${className}`}
    >
      {isLoading ? "Đang xử lý..." : "Import Excel"}
    </button>
  );
}
